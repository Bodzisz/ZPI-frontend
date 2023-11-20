import { useState, useEffect } from "react";
import {
  Center,
  Container,
  Text,
  useMantineTheme,
  Loader,
} from "@mantine/core";
import { SearchInput } from "./SearchInputs/SearchInputs";
import classes from "./LandingPage.module.css";
import { Carousel } from "@mantine/carousel";
import { useMediaQuery } from "@mantine/hooks";
import { Attraction } from "../../api/interfaces/Attraction";
import {
  fetchAtrractionsByPage,
  fetchAttractionsByCity,
  fetchAttractionsByName,
} from "../../api/apiFetchRequests";
import CarouselCard from "./CarouselCard/CarouselCard";
import { FetchError } from "../../api/interfaces/FetchError";
import { useSelectedAttractionContext } from "../../SelectedAttractionContext";

const LandingPage = () => {
  const [query, setQuery] = useState("");
  const [searchType, setSearchType] = useState("atrakcje");
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isError, setIsError] = useState<boolean>(false);
  const [attractions, setAttractions] = useState<Attraction[]>([]);
  const theme = useMantineTheme();
  const mobile = useMediaQuery(`(max-width: ${theme.breakpoints.sm})`);
  const { setSelectedAttraction } = useSelectedAttractionContext();

  useEffect(() => {
    fetchAtrractionsByPage(0)
      .then((data) => {
        setAttractions(data.content.slice(0, 9));
      })
      .catch((error: FetchError) => {
        console.log(
          `Error during fetching carousel attractions (status: ${error.status})`
        );
        setIsError(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const handleSearch = () => {
    if (searchType === "miasta") {
      fetchAttractionsByCity(query)
        .then((data) => {
          console.log(data.content);
          console.log(query);
          setAttractions(data.content);
        })
        .catch((error: FetchError) => {
          console.log(
            `Error during fetching carousel attractions (status: ${error.status})`
          );
          setIsError(true);
        })
        .finally(() => {
          setIsLoading(false);
        });
    } else {
      fetchAttractionsByName(query)
        .then((data) => {
          console.log(data.content);
          console.log(query);
          setAttractions(data.content);
        })
        .catch((error: FetchError) => {
          console.log(
            `Error during fetching carousel attractions (status: ${error.status})`
          );
          setIsError(true);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  };

  const getCarouselSlides = () => {
    return attractions.map((attraction) => (
      <Carousel.Slide key={attraction.id}>
        <CarouselCard
          image={`data:image/png;base64,${attraction.picture}`}
          title={attraction.title}
          onClickFunc={setSelectedAttraction}
          id={attraction.id}
        />
      </Carousel.Slide>
    ));
  };

  const getCarousel = () => {
    if (isLoading) {
      return (
        <Center>
          <Loader />
        </Center>
      );
    } else if (isError) {
      return <></>;
    } else {
      return (
        <Carousel
          slideSize={{ base: "100%", sm: "50%", md: "33.333333%" }}
          slideGap={{ base: 0, sm: "xs" }}
          withIndicators
          align="center"
          slidesToScroll={mobile ? 1 : 3}
          pt={"20px"}
          orientation="horizontal"
          loop
        >
          {getCarouselSlides()}
        </Carousel>
      );
    }
  };

  return (
    <div className={classes.headerPic}>
      <div className={classes.content}>
        <h1 className={classes.title}>
          <Center>
            <Text
              pl={"7px"}
              component="span"
              inherit
              variant="gradient"
              gradient={{ from: "cyan", to: "white" }}
            >
              Znajdź z nami atrakcje!
            </Text>
          </Center>
        </h1>

        <Container size={"md"} pt={"50px"} pb={"50px"}>
          <Text size="m" c={"white"}>
            Witaj na stronie internetowej poświęconej atrakcjom Dolnego Śląska!
            Odkryj piękno naszego regionu, pełnego historycznych zabytków,
            malowniczych krajobrazów i niezwykłych atrakcji. Dolny Śląsk
            zachwyca swoją różnorodnością, od urokliwych miast i wsi po
            przyrodnicze cuda.
          </Text>
        </Container>

        <Center>
          <SearchInput
            value={query}
            onChange={(e: React.ChangeEvent<HTMLInputElement>): void => {
              setQuery(e.target.value);
            }}
            searchType={searchType}
            setSearchType={setSearchType}
            handleSearch={handleSearch}
          />
        </Center>
      </div>
      <Container size={"md"} pt={"50px"} className={classes.carouselContainer}>
        {getCarousel()}
      </Container>
    </div>
  );
};

export default LandingPage;
