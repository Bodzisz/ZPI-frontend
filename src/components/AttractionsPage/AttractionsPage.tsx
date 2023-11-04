import { useEffect, useState } from "react";
import { AttractionCard } from "../AttractionCard/AttractionCard";
import { fetchAtrractions } from "../../api/apiFetchRequests";
import { FetchError } from "../../api/interfaces/FetchError";
import { Attraction } from "../../api/interfaces/Attraction";
import { SimpleGrid, Loader, Center, Container } from "@mantine/core";
import ServerError from "../ServerError/ServerError";

const AttractionsPage = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [errorStatus, setErorrStatus] = useState<number | null>(null);
  const [attractions, setAttractions] = useState<Attraction[]>([]);

  useEffect(() => {
    fetchAtrractions()
      .then((data) => {
        setAttractions(data.content);
      })
      .catch((error: FetchError) => {
        setErorrStatus(error.status);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const getAttractionsList = () => {
    return (
      <Center>
        <SimpleGrid
          cols={{ base: 1, sm: 2, lg: 4 }}
          spacing={{ base: 10, sm: "xl" }}
          verticalSpacing={{ base: "md", sm: "xl" }}
        >
          {attractions.map((attraction) => {
            return <AttractionCard attraction={attraction}></AttractionCard>;
          })}
        </SimpleGrid>
      </Center>
    );
  };

  const getContent = () => {
    if (errorStatus !== null) {
      return (
        <Container pt={"10%"}>
          <ServerError status={errorStatus} />
        </Container>
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
      return getAttractionsList();
    }
  };

  return (
    <div style={{ height: "100vh", paddingTop: "30px" }}>{getContent()}</div>
  );
};

export default AttractionsPage;
