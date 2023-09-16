import {
  MantineProvider,
  Title,
  TitleProps,
  createPolymorphicComponent,
} from "@mantine/core";
import styled from "@emotion/styled";
import { useEffect } from "react";
import {
  getApiUrl,
  getDefaultResponseHandler,
} from "./components/api/apiConfig";

const _CenterTitle = styled(Title)`
  display: flex;
  justify-content: center;
  padding-top: 100px;
`;

const CenterTitle = createPolymorphicComponent<"title", TitleProps>(
  _CenterTitle
);

export default function App() {
  useEffect(() => {
    logApiHealth();
  }, []);

  const logApiHealth = (): void => {
    const apiUrl = getApiUrl();
    console.log(`API URL: ${apiUrl}`);
    fetch(apiUrl + "health", {
      method: "GET",
    })
      .then(getDefaultResponseHandler)
      .then((data) => {
        console.log(`API health: ${data.health}`);
      })
      .catch(() => {
        console.log("API health: ERROR");
      });
  };

  return (
    <MantineProvider withGlobalStyles withNormalizeCSS>
      <CenterTitle>Hala Madrid!</CenterTitle>
    </MantineProvider>
  );
}
