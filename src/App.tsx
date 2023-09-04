import {
  MantineProvider,
  Title,
  TitleProps,
  createPolymorphicComponent,
} from "@mantine/core";
import styled from "@emotion/styled";

const _CenterTitle = styled(Title)`
  display: flex;
  justify-content: center;
  padding-top: 100px;
`;

const CenterTitle = createPolymorphicComponent<"title", TitleProps>(
  _CenterTitle
);

export default function App() {
  return (
    <MantineProvider withGlobalStyles withNormalizeCSS>
      <CenterTitle>Hala Madrid!</CenterTitle>
    </MantineProvider>
  );
}
