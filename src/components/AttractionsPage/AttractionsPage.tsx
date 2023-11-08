import { useEffect, useState } from "react";
import { AttractionCard } from "../AttractionCard/AttractionCard";
import { fetchAtrractionsByPage } from "../../api/apiFetchRequests";
import { FetchError } from "../../api/interfaces/FetchError";
import { AttractionList } from "../../api/interfaces/Attraction";
import {
  SimpleGrid,
  Loader,
  Center,
  Container,
  Pagination,
} from "@mantine/core";
import { useWindowScroll } from "@mantine/hooks";
import ServerError from "../ServerError/ServerError";

const starterAttractionList: AttractionList = {
  content: [],
  totalPages: 0,
  totalElements: 0,
  number: 0,
  size: 0,
  numberOfElements: 0,
};

const AttractionsPage = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [errorStatus, setErorrStatus] = useState<number | null>(null);
  const [attractions, setAttractions] = useState<AttractionList>(
    starterAttractionList
  );
  const [activePage, setActivePage] = useState<number>(0);
  const [, scrollTo] = useWindowScroll();

  useEffect(() => {
    setIsLoading(true);
    fetchAtrractionsByPage(activePage)
      .then((data) => {
        setAttractions(data);
      })
      .catch((error: FetchError) => {
        setErorrStatus(error.status);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [activePage]);

  const handlePageChange = (page: number) => {
    setActivePage(page - 1);
    scrollTo({ y: 0 });
  };

  const getAttractionsList = () => {
    return (
      <div style={{ paddingBottom: "100px" }}>
        <Center>
          <SimpleGrid
            cols={{ base: 1, sm: 2, lg: 4 }}
            spacing={{ base: 10, sm: "xl" }}
            verticalSpacing={{ base: "md", sm: "xl" }}
          >
            {attractions.content.map((attraction) => {
              return (
                <AttractionCard
                  attraction={attraction}
                  key={attraction.id}
                ></AttractionCard>
              );
            })}
          </SimpleGrid>
        </Center>
        <Center pt={"40px"} pb={"20px"}>
          <Pagination
            total={attractions.totalPages}
            value={activePage + 1}
            onChange={handlePageChange}
            withEdges
          />
        </Center>
      </div>
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
