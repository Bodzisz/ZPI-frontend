import {
  Group,
  Button,
  Divider,
  Box,
  Burger,
  Drawer,
  ScrollArea,
  Title,
  Flex,
  Image,
  Text,
  Avatar,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import classes from "./AppHeader.module.css";
import ThemeSwitchButton from "../ThemeSwitchButton/ThemeSwitchButton";
import logo from "../../img/logo.png";
import { User } from "../../api/interfaces/User";
import { logout } from "../../util/User";

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
    title: "Mapa",
  },
  {
    id: 4,
    title: "Kontakt",
  },
];

interface AppHeaderProps {
  selectedTab: number;
  setSelectedTab: Function;
  user: User | null;
  setUser: Function;
}

const AppHeader = ({
  selectedTab,
  setSelectedTab,
  user,
  setUser,
}: AppHeaderProps) => {
  const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] =
    useDisclosure(false);

  const getHeaderTabs = () => {
    return (
      <>
        {contentPages.map((page) => {
          return (
            <a
              href="#"
              className={
                page.id === selectedTab
                  ? `${classes.link} ${classes.selectedLink}`
                  : classes.link
              }
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
    if (user === null) {
      return (
        <>
          <Button variant="default" onClick={() => setSelectedTab(5)}>
            Logowanie
          </Button>
          <Button onClick={() => setSelectedTab(6)}>Rejestracja</Button>
        </>
      );
    } else {
      return (
        <>
          <Avatar radius="xl" />
          <Text pr="xl" fw={700}>
            {user.username}
          </Text>
          <Button
            onClick={() => {
              logout();
              setUser(null);
            }}
          >
            Wyloguj
          </Button>
        </>
      );
    }
  };

  const getDefaultHeader = () => {
    return (
      <header className={classes.header}>
        <Group justify="space-between" h="100%">
          <Group>
            <Image src={logo} h={60} w={60} visibleFrom="sm" />
            <Title>Miejscownik.pl</Title>
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
            <Image src={logo} h={40} w={40} pl={10} />
            <Title pl={10}>Miejscownik.pl</Title>
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
    <Box>
      {getDefaultHeader()}
      {getHeaderForSmallScreens()}
    </Box>
  );
};

export default AppHeader;
