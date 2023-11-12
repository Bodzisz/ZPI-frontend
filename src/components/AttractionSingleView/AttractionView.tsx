import React, { useEffect, useState } from "react";
import { Text, Image, Card, Group, Badge, Button, Loader, Center, Container } from "@mantine/core";
import { Attraction } from "../../api/interfaces/Attraction";
import { useSelectedAttractionContext } from "../../SelectedAttractionContext";
import { fetchAtrractionById, fetchDistanceFromUser } from "../../api/apiFetchRequests";
import { FetchError } from "../../api/interfaces/FetchError";
import ServerError from "../ServerError/ServerError";
import AttractionsMap from "../AttractionsMap/AttractionsMap";

interface AttractionDetailsProps {
    attraction: number;
  }
  const AttractionDetails: React.FC<AttractionDetailsProps> = ({ attraction }) => {
    const [fullAttraction, setFullAttraction] = useState<Attraction | null>(null)
    const { setSelectedAttraction } = useSelectedAttractionContext();
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [errorStatus, setErorrStatus] = useState<number | null>(null);
    const [userPosition, setUserPosition] = useState<[number, number] | null>(null);
    const [distanceFromUser, setDistanceFromUser] = useState<number | null>(null);
    const [showButton, setShowButton] = useState(true);

    const handleClick = () => {
      if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(function(position) {
          setUserPosition([position.coords.latitude, position.coords.longitude]);
          setShowButton(false); // Hide the button after getting the user's location
        });
      }
      
    };

    useEffect(() =>{
        fetchAtrractionById(attraction).then((data) => {
            setFullAttraction(data);
          })
          .catch((error: FetchError) => {
        setErorrStatus(error.status);
      })
          .finally(() => {
            setIsLoading(false);
          });
          
        }
, [])

    useEffect(() =>{
      if(userPosition){
        fetchDistanceFromUser(attraction, userPosition[0], userPosition[1]).then((data) => {
          setDistanceFromUser(data)
        })
      }
      }
    , [userPosition])


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
          return<> <div >
          <Text size="sm" c="dimmed" style={{ marginBottom: 10, marginTop: 10 }}>
            <strong>Powiat:</strong> {fullAttraction?.district}
          </Text>
          <Text size="sm" c="dimmed" style={{ marginBottom: 10 }}>
            <strong>Miasto:</strong> {fullAttraction?.city}
          </Text>
            <Text size="md" c="dimmed" lineClamp={10}>
                {fullAttraction?.description}
            </Text>
            {fullAttraction? <div style={{marginTop: 10}}><AttractionsMap attraction={attraction}></AttractionsMap></div> : ""}
            
        </div>
        <div style={{width: 600}}>
        <Text size="md" c="dimmed" lineClamp={10}>
        Komentarze
    </Text>
    </div>
    </>
        }
      };



  
    return (
      <div style={{ display: "flex" }}>
        <div style={{ marginRight: "20px" }}>
          <Card
            style={{ width: 600, height: 600 }}
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
                width={600}
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
            </Group>
  
            
  
            <div>
      {showButton ? (
        <button onClick={handleClick}>Get User Location</button>
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
