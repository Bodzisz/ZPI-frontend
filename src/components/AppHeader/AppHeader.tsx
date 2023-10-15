import {
  Group,
  Button,
  Divider,
  Box,
  Burger,
  Drawer,
  ScrollArea,
  Title,
  useMantineTheme,
  Flex,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import classes from "./AppHeader.module.css";
import ThemeSwitchButton from "../ThemeSwitchButton/ThemeSwitchButton";
import styled from "@emotion/styled";

const SelectedLink = styled.a`
  border-bottom: 0.1rem solid ${(p) => p.theme.primaryColor} !important;
`;

const contentPages = [
  {
    id: 1,
    title: "Strona główna",
  },
  {
    id: 2,
    title: "Atrakcje",
  },
  {
    id: 3,
    title: "Kontakt",
  },
];

interface AppHeaderProps {
  selectedTab: number;
  setSelectedTab: Function;
}

const AppHeader = ({ selectedTab, setSelectedTab }: AppHeaderProps) => {
  const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] =
    useDisclosure(false);
  const theme = useMantineTheme();

  const getHeaderTabs = () => {
    return (
      <>
        {contentPages.map((page) => {
          if (page.id === selectedTab) {
            return (
              <SelectedLink
                theme={theme}
                className={classes.link}
                onClick={() => setSelectedTab(page.id)}
                key={page.id}
              >
                {page.title}
              </SelectedLink>
            );
          }
          return (
            <a
              href="#"
              className={classes.link}
              onClick={() => setSelectedTab(page.id)}
              key={page.id}
            >
              {page.title}
            </a>
          );
        })}
      </>
    );
  };

  const getSideButtons = () => {
    return (
      <>
        <Button variant="default">Logowanie</Button>
        <Button>Rejestracja</Button>
      </>
    );
  };

  const getDefaultHeader = () => {
    return (
      <header className={classes.header}>
        <Group justify="space-between" h="100%">
          <Group>
            <Title>Co-robić.pl</Title>
            <ThemeSwitchButton />
          </Group>

          <Group h="100%" gap={0} visibleFrom="sm">
            {getHeaderTabs()}
          </Group>

          <Group visibleFrom="sm">{getSideButtons()}</Group>

          <Burger
            opened={drawerOpened}
            onClick={toggleDrawer}
            hiddenFrom="sm"
          />
        </Group>
      </header>
    );
  };

  const getHeaderForSmallScreens = () => {
    return (
      <Drawer
        opened={drawerOpened}
        onClose={closeDrawer}
        size="100%"
        padding="md"
        hiddenFrom="sm"
        zIndex={1000000}
      >
        <ScrollArea h={`100%`} mx="-md">
          <Group>
            <Title pl={10}>Co-robić.pl</Title>
            <ThemeSwitchButton />
          </Group>
          <Divider my="sm" />

          <Flex gap={"xl"} direction={"column"}>
            {getHeaderTabs()}
          </Flex>

          <Divider my="sm" />
          <Group
            justify="center"
            grow
            pb="xl"
            px="sm"
            bottom={0}
            pos={"fixed"}
            w={"100%"}
          >
            {getSideButtons()}
          </Group>
        </ScrollArea>
      </Drawer>
    );
  };

  return (
    <Box pb={120}>
      {getDefaultHeader()}
      {getHeaderForSmallScreens()}
    </Box>
  );
};

export default AppHeader;
