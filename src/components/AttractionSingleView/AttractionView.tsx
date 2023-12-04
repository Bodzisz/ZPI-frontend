import React, { useEffect, useState } from "react";
import {
  Text,
  Image,
  Card,
  Group,
  Badge,
  Button,
  Loader,
  Center,
  Container,
  Input,
  Paper,
  Title,
  useMantineTheme,
} from "@mantine/core";
import { Attraction } from "../../api/interfaces/Attraction";
import { useSelectedAttractionContext } from "../../SelectedAttractionContext";
import {
  addAttractionComment,
  addAttractionRating,
  deleteComment,
  fetchAtrractionById,
  fetchAttractionsCommentsByID,
  fetchAttractionsRatingsByID,
  fetchDistanceFromUser,
} from "../../api/apiFetchRequests";
import { FetchError } from "../../api/interfaces/FetchError";
import {
  MyComment,
  Rating,
  NewMyComment,
  NewRating,
} from "../../api/interfaces/Comment";
import ServerError from "../ServerError/ServerError";
import AttractionsMap from "../AttractionsMap/AttractionsMap";
import { User } from "../../api/interfaces/User";
import { getUser } from "../../util/User";
import AttractionDeleteModal from "./AttractionDeleteModal";
import AttractionEditModal from "./AttractionEditModal";
import { useMediaQuery } from "@mantine/hooks";

interface AttractionDetailsProps {
  attraction: number;
}
const AttractionDetails: React.FC<AttractionDetailsProps> = ({
  attraction,
}) => {
  const [fullAttraction, setFullAttraction] = useState<Attraction | null>(null);
  const { setSelectedAttraction } = useSelectedAttractionContext();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [errorStatus, setErorrStatus] = useState<number | null>(null);
  const [userPosition, setUserPosition] = useState<[number, number] | null>(
    null
  );
  const [distanceFromUser, setDistanceFromUser] = useState<number | null>(null);
  const [showButton, setShowButton] = useState(true);

  const [comments, setComments] = useState<any>([]);
  const [ratings, setRatings] = useState<any>([]);
  const [averageRating, setAverageRating] = useState<any>([]);
  const [deletionModalOpened, setDeletionModalOpened] =
    useState<boolean>(false);
  const [editModalOpened, setEditModalOpened] = useState<boolean>(false);
  const [user, setUser] = useState<User | null>(null);
  const [refreshToggle, setRefreshToggle] = useState<boolean>(false);
  const theme = useMantineTheme();
  const mobile = useMediaQuery(`(max-width: ${theme.breakpoints.sm})`);

  const handleClick = () => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(function (position) {
        setUserPosition([position.coords.latitude, position.coords.longitude]);
        setShowButton(false); // Hide the button after getting the user's location
      });
    }
  };

  useEffect(() => {
    setUser(getUser());
  }, []);

  useEffect(() => {
    // Calculate the average rating
    const sum = ratings.reduce((total, rating) => total + rating.rating, 0);
    const average = ratings.length > 0 ? sum / ratings.length : 0;
    // Update the state with the calculated average rating
    setAverageRating(average);
  }, [ratings]);

  useEffect(() => {
    fetchAtrractionById(attraction)
      .then((data) => {
        console.log(data)
        setFullAttraction(data);
      })
      .catch((error: FetchError) => {
        setErorrStatus(error.status);
      })
      .finally(() => {
        setIsLoading(false);
      });

    fetchAttractionsCommentsByID(attraction)
      .then((data) => {
        setComments(data);
      })
      .catch((error: FetchError) => {
        setErorrStatus(error.status);
      });

    fetchAttractionsRatingsByID(attraction)
      .then((data) => {
        setRatings(data);
      })
      .catch((error: FetchError) => {
        setErorrStatus(error.status);
      });
  }, [refreshToggle]);

  useEffect(() => {
    if (userPosition) {
      fetchDistanceFromUser(attraction, userPosition[0], userPosition[1]).then(
        (data) => {
          setDistanceFromUser(data);
        }
      );
    }
  }, [userPosition]);

  const refresh = () => {
    setRefreshToggle(!refreshToggle);
  };

  const CommentForm = () => {
    const [rating, setRating] = useState(1);
    const [description, setDescription] = useState("");

    const handleAddComment = () => {
      if (user != null) {
        const newComment: NewMyComment = {
          comment: description,
          attractionId: attraction,
          login: user?.username,
        };

        addAttractionComment(newComment, user).then(() =>
          fetchAttractionsCommentsByID(attraction)
            .then((data) => {
              setComments(data);
            })
            .catch((error: FetchError) => {
              setErorrStatus(error.status);
            })
        );
      }

      setDescription("");
    };

    const handleAddRating = () => {
      if (user != null) {
        const newRating: NewRating = {
          login: user?.username,
          attractionId: attraction,
          rating: rating,
        };
        addAttractionRating(newRating, user).then(() =>
          fetchAttractionsRatingsByID(attraction)
            .then((data) => {
              setRatings(data);
            })
            .catch((error: FetchError) => {
              setErorrStatus(error.status);
            })
        );
      }

      setRating(1);
    };

    return (
      <div>
        <div style={{ paddingBottom: 10 }}>
          <Input
            value={description}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
              setDescription(event.target.value)
            }
            w={mobile ? "calc(100vw - 20px)" : "none"}
            placeholder="Wpisz komentarz..."
          />
        </div>

        <Button onClick={handleAddComment}>Dodaj komentarz</Button>
        <div style={{ paddingBottom: 10, paddingTop: 10 }}>
          <span>Ocena: </span>
          <select
            value={rating}
            onChange={(event) => setRating(parseInt(event.target.value))}
          >
            {[1, 2, 3, 4, 5].map((value) => (
              <option key={value} value={value}>
                {value}
              </option>
            ))}
          </select>
        </div>

        <Button mb={mobile ? 100 : 0} onClick={handleAddRating}>
          Dodaj Ocene
        </Button>
      </div>
    );
  };

  const handleDelete = (id: number) => {
    if (user != null) {
      deleteComment(id, user);
      setComments((prevComments: any) =>
        prevComments.filter((comment: { id: number }) => comment.id !== id)
      );
    }
  };

  const CommentComponent: React.FC<{
    description: string;
    username: string;
    id: number;
  }> = ({ description, username, id }) => {
    return (
      <Container size="sm">
        <Paper
          shadow="sm"
          radius="md"
          style={{
            marginBottom: "15px",
            backgroundColor: "#333",
            color: "#fff",
            display: "flex",
            flexDirection: "column",
            padding: "15px",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <p style={{ margin: 0, fontSize: "16px", fontWeight: "bold" }}>
              {username}
            </p>
            {user?.username == username && (
              <button
                style={{
                  backgroundColor: "#ff5555",
                  padding: "5px 10px",
                  border: "none",
                  cursor: "pointer",
                }}
                onClick={() => handleDelete(id)}
              ></button>
            )}
          </div>
          <p
            style={{
              margin: 0,
              color: "#ccc",
              fontSize: "14px",
              marginTop: "10px",
            }}
          >
            {description}
          </p>
        </Paper>
      </Container>
    );
  };

  const RatingComponent: React.FC<{ rating: number; username: string }> = ({
    rating,
    username,
  }) => {
    return (
      <Container size="sm">
        <Paper
          shadow="sm"
          radius="md"
          style={{
            marginBottom: "15px",
            backgroundColor: "#333",
            color: "#fff",
            display: "flex",
            flexDirection: "column",
            padding: "15px",
          }}
        >
          <p style={{ margin: 0, fontSize: "16px", fontWeight: "bold" }}>
            {username}
          </p>
          <Badge
            color="blue"
            style={{ marginBottom: "10px" }}
          >{`Ocena: ${rating}/5`}</Badge>
        </Paper>
      </Container>
    );
  };

  const CommentList: React.FC<{ comments: MyComment[] }> = ({ comments }) => {
    return (
      <div>
        {comments?.map((comment) => (
          <CommentComponent
            description={comment.comment}
            username={comment.username}
            id={comment.id}
          />
        ))}
      </div>
    );
  };

  const RatingsList: React.FC<{ ratings: Rating[] }> = ({ ratings }) => {
    return (
      <div>
        {ratings?.map((rating) => (
          <RatingComponent rating={rating.rating} username={rating.username} />
        ))}
      </div>
    );
  };

  const getAdminButtons = () => {
    if (user !== null && user.role === "ADMIN") {
      return (
        <Group mt={"md"}>
          <Button onClick={() => setEditModalOpened(true)}>Edytuj</Button>
          <Button
            variant="filled"
            color="red"
            onClick={() => setDeletionModalOpened(true)}
          >
            Usuń
          </Button>
          <AttractionDeleteModal
            opened={deletionModalOpened}
            setOpened={setDeletionModalOpened}
            attractionId={attraction}
            user={user}
          />
          {fullAttraction ? (
            <AttractionEditModal
              opened={editModalOpened}
              setOpened={setEditModalOpened}
              attraction={fullAttraction}
              user={user}
              refresh={refresh}
            />
          ) : null}
        </Group>
      );
    } else {
      return <></>;
    }
  };

  const additionalInfo = () => {
    if (errorStatus !== null) {
      return (
        <>
          <Container pt={"10%"}>
            <ServerError status={errorStatus} />
          </Container>
        </>
      );
    } else if (isLoading) {
      return (
        <>
          <Center style={{ height: "50%" }}>
            <Loader color="blue" />
          </Center>
        </>
      );
    } else {
      return (
        <>
          {" "}
          <div>
            <Container>
              <Title order={1} size="h1" mt={10} style={{ marginBottom: 10 }}>
                {fullAttraction?.city}
              </Title>
              <Title
                order={2}
                size="sm"
                c="cyan"
                style={{ marginBottom: 10, marginTop: 10 }}
              >
                {fullAttraction?.district}
              </Title>
              <Text size="md" c="dimmed" lineClamp={10}>
                {fullAttraction?.description}
              </Text>
            </Container>
            {fullAttraction ? (
              <div style={{ marginTop: 10, padding: 5 }}>
                <AttractionsMap
                  width={"100%"}
                  attraction={attraction}
                ></AttractionsMap>
              </div>
            ) : (
              ""
            )}
            {getAdminButtons()}
          </div>
          <div
            style={{
              width: mobile ? "100vw" : 600,
              paddingLeft: 10,
              paddingTop: 10,
            }}
          >
            <CommentList comments={comments}></CommentList>
            <RatingsList ratings={ratings}></RatingsList>

            {user != null ? <CommentForm></CommentForm> : ""}
          </div>
        </>
      );
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: mobile ? "column" : "row" }}>
      <div style={{ marginRight: "20px" }}>
        <Card
          style={{ width: mobile ? "100vw" : 600, height: 600 }}
          shadow="lg"
          padding="lg"
          radius="md"
          withBorder
          pos={"relative"}
        >
          <Card.Section>
            <Image
              src={`data:image/png;base64,${fullAttraction?.picture}`}
              height={450}
              width={mobile ? "100vw" : 600}
              alt={fullAttraction?.title}
            />
          </Card.Section>

          <Group justify="space-between" mt="md" mb="xs">
            <Text size="lg" fw={500}>
              {fullAttraction?.title}
            </Text>
            <Badge color="green" variant="light">
              {fullAttraction?.attractionType}
            </Badge>
          <Badge color="orange" variant="light" >
            Średnia ocena: {typeof(averageRating) === typeof(0) ? (averageRating==0? "brak ocen": averageRating.toFixed(2)) : "brak ocen"}
            </Badge>
          </Group>
       
          <div>
            {showButton ? (
              <button onClick={handleClick}>Policz odleglość ode mnie</button>
            ) : (
              <Text size="md" c="dimmed" lineClamp={10}>
                Jesteś {distanceFromUser} kilometrów od celu
              </Text>
            )}
          </div>

          <Group
            bottom={10}
            pos={"absolute"}
            justify="center"
            pb={"10px"}
            w={"100%"}
          >
            <Button
              variant="light"
              color="blue"
              radius="md"
              onClick={() => {
                setSelectedAttraction(null);
              }}
              pl={10}
            >
              Close
            </Button>
          </Group>
        </Card>
      </div>
      {additionalInfo()}
    </div>
  );
};

export default AttractionDetails;
