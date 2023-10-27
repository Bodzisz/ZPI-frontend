import { useState } from "react";
import { Container, Paper, Text } from "@mantine/core";
import {
  CitySearchInput,
  AttractionSearchInput,
} from "./SearchInputs/SearchInputs";

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
      <Text
        size="s"
        style={{
          paddingLeft: "300px",
          paddingRight: "300px",
          paddingBottom: "50px",
          paddingTop: "20px",
        }}
      >
        Witaj na stronie internetowej poświęconej atrakcjom Dolnego Śląska!
        Odkryj piękno naszego regionu, pełnego historycznych zabytków,
        malowniczych krajobrazów i niezwykłych atrakcji. Dolny Śląsk zachwyca
        swoją różnorodnością, od urokliwych miast i wsi po przyrodnicze cuda.
      </Text>

      <div style={{ display: "flex", justifyContent: "center", gap: "200px" }}>
        <Paper>
          <Container size="lg">
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                gap: "200px",
                paddingBottom: 60,
              }}
            >
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
            </div>
          </Container>
        </Paper>
      </div>
    </>
  );
};

export default LandingPage;
