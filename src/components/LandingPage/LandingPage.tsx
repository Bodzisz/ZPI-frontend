import { useState } from "react";
import { Center, Container, Group, Text } from "@mantine/core";
import {
  CitySearchInput,
  AttractionSearchInput,
} from "./SearchInputs/SearchInputs";
import classes from "./LandingPage.module.css";

const LandingPage = () => {
  const [cityQuery, setCityQuery] = useState("");
  const [attractionQuery, setAttractionQuery] = useState("");

  const handleCitySearch = (value: string) => {
    setCityQuery(value);
  };

  const handleAttractionSearch = (value: string) => {
    setAttractionQuery(value);
  };

  return (
    <>
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

          <Container size={"md"} pt={"50px"} pb={"100px"}>
            <Text size="m" c={"white"}>
              Witaj na stronie internetowej poświęconej atrakcjom Dolnego
              Śląska! Odkryj piękno naszego regionu, pełnego historycznych
              zabytków, malowniczych krajobrazów i niezwykłych atrakcji. Dolny
              Śląsk zachwyca swoją różnorodnością, od urokliwych miast i wsi po
              przyrodnicze cuda.
            </Text>
          </Container>

          <Group justify="center" gap={"200px"} visibleFrom="sm">
            <CitySearchInput
              value={cityQuery}
              onChange={(e: React.ChangeEvent<HTMLInputElement>): void =>
                handleCitySearch(e.target.value)
              }
            />
            <AttractionSearchInput
              value={attractionQuery}
              onChange={(e: React.ChangeEvent<HTMLInputElement>): void =>
                handleAttractionSearch(e.target.value)
              }
            />
          </Group>
        </div>
      </div>
    </>
  );
};

export default LandingPage;
