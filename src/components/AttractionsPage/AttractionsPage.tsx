import { useEffect, useState } from "react";
import { AttractionCard } from "../AttractionCard/AttractionCard";
import {
  fetchAtrractionsByPage,
  fetchAttractionsByType,
  fetchAttractionsTypes,
  fetchAtrractionsByRating,
  fetchAttractionsBySortedName
} from "../../api/apiFetchRequests";
import { FetchError } from "../../api/interfaces/FetchError";
import { AttractionList } from "../../api/interfaces/Attraction";
import {
  SimpleGrid,
  Loader,
  Center,
  Container,
  Pagination,
  Select,
} from "@mantine/core";
import { useWindowScroll } from "@mantine/hooks";
import ServerError from "../ServerError/ServerError";
import { useSelectedAttractionContext } from "../../SelectedAttractionContext";
import { AttractionType } from "../../api/interfaces/AttractionType";

const starterAttractionList: AttractionList = {
  content: [],
  totalPages: 0,
  totalElements: 0,
  number: 0,
  size: 0,
  numberOfElements: 0,
};

const SORT_TYPES = ["Oceny", "Nazwy"]

const AttractionsPage = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [errorStatus, setErorrStatus] = useState<number | null>(null);
  const [attractions, setAttractions] = useState<AttractionList>(
    starterAttractionList
  );
  const [activePage, setActivePage] = useState<number>(0);
  const [attractionTypes, setAttractionTypes] = useState<AttractionType[]>([]);
  const [selectedAttractionType, setSelectedAttractionType] = useState<
    string | null
  >(null); // State to store the selected attraction type
  const [selectedSortType, setSelectedSortType] = useState<
    string | null
  >(null); // State to store the selected attraction type
  const [, scrollTo] = useWindowScroll();

  const { setSelectedAttraction } = useSelectedAttractionContext();

  useEffect(() => {
    fetchAttractionsTypes()
      .then((data) => {
        setAttractionTypes(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    if (selectedAttractionType) {
      setIsLoading(true);
      fetchAttractionsByType([selectedAttractionType], activePage)
        .then((data: any) => {
          setAttractions(data);
        })
        .catch((error: FetchError) => {
          setErorrStatus(error.status);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
    else{
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
    }
  }, [selectedAttractionType]);

  useEffect(() => {
    if (selectedSortType) {
      setIsLoading(true);
      if(selectedSortType=== SORT_TYPES[0]){
        fetchAtrractionsByRating( activePage)
        .then((data: any) => {
          setAttractions(data);
        })
        .catch((error: FetchError) => {
          setErorrStatus(error.status);
        })
        .finally(() => {
          setIsLoading(false);
        });
      }else{
        fetchAttractionsBySortedName( activePage)
        .then((data: any) => {
          setAttractions(data);
        })
        .catch((error: FetchError) => {
          setErorrStatus(error.status);
        })
        .finally(() => {
          setIsLoading(false);
        });
      }}else {
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
      }
      
  }, [selectedSortType]);

  useEffect(() => {
    if (selectedAttractionType) {
      setIsLoading(true);
      fetchAttractionsByType([selectedAttractionType], activePage)
        .then((data: any) => {
          setAttractions(data);
        })
        .catch((error: FetchError) => {
          setErorrStatus(error.status);
        })
        .finally(() => {
          setIsLoading(false);
        });
    } else if(selectedSortType){
      setIsLoading(true);
      if(selectedSortType=== SORT_TYPES[0]){
        fetchAtrractionsByRating( activePage)
        .then((data: any) => {
          setAttractions(data);
        })
        .catch((error: FetchError) => {
          setErorrStatus(error.status);
        })
        .finally(() => {
          setIsLoading(false);
        });
      }else{
        fetchAttractionsBySortedName( activePage)
        .then((data: any) => {
          setAttractions(data);
        })
        .catch((error: FetchError) => {
          setErorrStatus(error.status);
        })
        .finally(() => {
          setIsLoading(false);
        });
      }
    } else{
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
    }
  }, [activePage]);

  const handlePageChange = (page: number) => {
    setActivePage(page - 1);
    scrollTo({ y: 0 });
  };

  const handleAttractionTypeChange = (value: string | null) => {
    setSelectedAttractionType(value);
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
                  onLookUp={() => {
                    setSelectedAttraction(attraction.id);
                  }}
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
    <div style={{ height: "100vh", paddingTop: "30px" }}>
      <div style={{ paddingBottom: "50px" }}>
        <Container>
          <Select
            
            data={attractionTypes.map((attr) => attr.attractionType)}
            placeholder="Wybierz typ atrakcji"
            value={selectedAttractionType}
            disabled={selectedSortType !== null}
            onChange={(value: string | null) =>
              handleAttractionTypeChange(value)
            }
          />
          <Select
            data={SORT_TYPES.map((sort_type) => sort_type)}
            placeholder="Wybierz tryb sortowania"
            value={selectedSortType}
            disabled={selectedAttractionType !== null}
            onChange={(value: string | null) =>
              setSelectedSortType(value)
            }
          />
        </Container>
      </div>
      {getContent()}
    </div>
  );
};

export default AttractionsPage;
