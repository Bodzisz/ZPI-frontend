import {
  MantineProvider,
  Title,
  TitleProps,
  createPolymorphicComponent,
  createTheme,
  AppShell,
} from "@mantine/core";
import styled from "@emotion/styled";
import { useEffect, useState } from "react";
import { checkResponseStatus, getApiUrl } from "./api/apiConfig";
import AppHeader from "./components/AppHeader/AppHeader";
import LandingPage from "./components/LandingPage/LandingPage";
import "@mantine/core/styles.css";
import "@mantine/dropzone/styles.css";
import { FooterCentered } from "./components/Footer/Footer";
import AttractionsPage from "./components/AttractionsPage/AttractionsPage";
import "@mantine/carousel/styles.css";
import AttractionsMap from "./components/AttractionsMap/AttractionsMap";
import LoginPage from "./components/LoginPage/LoginPage";
import SignUpPage from "./components/SignUpPage/SignUpPage";
import { User } from "./api/interfaces/User";
import { getUser } from "./util/User";
import AttractionView from "./components/AttractionSingleView/AttractionView";
import { SelectedAttractionContext } from "./SelectedAttractionContext";
import AddAttractionPage from "./components/AddAttractionPage/AddAttractionPage";

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
  const [user, setUser] = useState<User | null>(getUser());
  const [selectedAttraction, setSelectedAttraction] = useState<number | null>(
    null
  );

  useEffect(() => {
    logApiHealth();
  }, []);

  useEffect(() => {
    console.log(selectedTab);
  }, [selectedTab]);

  const getContent = () => {
    if (selectedAttraction) {
      return (
        <SelectedAttractionContext.Provider
          value={{ selectedAttraction, setSelectedAttraction }}
        >
          {" "}
          <AttractionView attraction={selectedAttraction}></AttractionView>
        </SelectedAttractionContext.Provider>
      );
    }
    switch (selectedTab) {
      case 1:
        return (
          <SelectedAttractionContext.Provider
            value={{ selectedAttraction, setSelectedAttraction }}
          >
            {" "}
            <LandingPage />
          </SelectedAttractionContext.Provider>
        );
      case 2:
        return (
          <SelectedAttractionContext.Provider
            value={{ selectedAttraction, setSelectedAttraction }}
          >
            {" "}
            <AttractionsPage />
          </SelectedAttractionContext.Provider>
        );
      case 3:
        return (
          <SelectedAttractionContext.Provider
            value={{ selectedAttraction, setSelectedAttraction }}
          >
            {" "}
            <AddAttractionPage user={user} />
          </SelectedAttractionContext.Provider>
        );
      case 4:
        return (
          <SelectedAttractionContext.Provider
            value={{ selectedAttraction, setSelectedAttraction }}
          >
            {" "}
            <AttractionsMap />
          </SelectedAttractionContext.Provider>
        );
      case 5:
        return <CenterTitle>Kontakt</CenterTitle>;
      case 6:
        return (
          <LoginPage setSelectedTab={setSelectedTab} setStateUser={setUser} />
        );
      case 7:
        return <SignUpPage setSelectedTab={setSelectedTab} />;
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
      .catch(() => {
        console.log("API health: ERROR");
      });
  };

  return (
    <MantineProvider theme={theme} defaultColorScheme="auto">
      <AppShell
        footer={{
          collapsed: false,
          height: "80px",
          offset: false,
        }}
      >
        <SelectedAttractionContext.Provider
          value={{ selectedAttraction, setSelectedAttraction }}
        >
          <AppHeader
            selectedTab={selectedTab}
            setSelectedTab={setSelectedTab}
            user={user}
            setUser={setUser}
          />
        </SelectedAttractionContext.Provider>
        <AppShell.Main
          style={{
            width: "100%",
            minHeight: "calc(100vh - 155px)",
          }}
        >
          {getContent()}
        </AppShell.Main>
        <AppShell.Footer>
          <FooterCentered />
        </AppShell.Footer>
      </AppShell>
    </MantineProvider>
  );
}
