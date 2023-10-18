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
import "@mantine/core/styles.css";
import ServerError from "./components/ServerError/ServerError";
import { FetchError } from "./api/interfaces/FetchError";

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
        return <CenterTitle>Strona główna</CenterTitle>;
      case 2:
        return <CenterTitle>Atrakcje</CenterTitle>;
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
    </MantineProvider>
  );
}
