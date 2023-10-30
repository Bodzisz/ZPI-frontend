import {
  MantineProvider,
  Title,
  TitleProps,
  createPolymorphicComponent,
  createTheme,
} from "@mantine/core";
import styled from "@emotion/styled";
import { useEffect, useState } from "react";
import { checkResponseStatus, getApiUrl } from "./api/apiConfig";
import AppHeader from "./components/AppHeader/AppHeader";
import LandingPage from "./components/LandingPage/LandingPage";
import "@mantine/core/styles.css";
import ServerError from "./components/ServerError/ServerError";
import { FetchError } from "./api/interfaces/FetchError";
import { FooterCentered } from "./components/Footer/Footer";
import AttractionsPage from "./components/AttractionsPage/AttractionsPage";
import "@mantine/carousel/styles.css";

const theme = createTheme({
  primaryColor: "cyan",
});

const _CenterTitle = styled(Title)`
  display: flex;
  justify-content: center;
  padding-top: 100px;
`;

const CenterTitle = createPolymorphicComponent<"title", TitleProps>(
  _CenterTitle
);

export default function App() {
  const [selectedTab, setSelectedTab] = useState(1);
  const [fetchErrorStatus, setFetchErrorStatus] = useState<number | null>(null);

  useEffect(() => {
    logApiHealth();
    console.log(selectedTab);
  }, []);

  const getContent = () => {
    switch (selectedTab) {
      case 1:
        return <LandingPage />;
      case 2:
        return <AttractionsPage />;
      case 3:
        return <CenterTitle>Kontakt</CenterTitle>;
      default:
        return <></>;
    }
  };

  const logApiHealth = (): void => {
    const apiUrl = getApiUrl();
    console.log(`API URL: ${apiUrl}`);
    fetch(apiUrl + "health", {
      method: "GET",
    })
      .then((response) => {
        checkResponseStatus(response);
        console.log("API health: OK");
        setFetchErrorStatus(null);
      })
      .catch((error: FetchError) => {
        console.log("API health: ERROR");
        setFetchErrorStatus(error.status);
      });
  };

  return (
    <MantineProvider theme={theme} defaultColorScheme="auto">
      <AppHeader selectedTab={selectedTab} setSelectedTab={setSelectedTab} />
      <div>
        {fetchErrorStatus === null ? (
          getContent()
        ) : (
          <ServerError status={fetchErrorStatus} />
        )}
      </div>
      <div>
        <FooterCentered></FooterCentered>
      </div>
    </MantineProvider>
  );
}
