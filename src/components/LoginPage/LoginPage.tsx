import {
  Paper,
  TextInput,
  PasswordInput,
  Button,
  Title,
  Text,
  Anchor,
  Container,
  Center,
} from "@mantine/core";
import classes from "./LoginPage.module.css";
import { useForm } from "@mantine/form";
import { authenticate } from "../../api/apiFetchRequests";
import { setUser } from "../../util/User";
import { useState } from "react";

const LoginPage = ({
  setSelectedTab,
  setStateUser,
}: {
  setSelectedTab: Function;
  setStateUser: Function;
}) => {
  const [error, setError] = useState<string | null>(null);
  const form = useForm({
    initialValues: {
      login: "",
      password: "",
    },
  });

  const handleLoginOnClick = () => {
    authenticate({
      login: form.values.login,
      password: form.values.password,
    })
      .then((data) => {
        setUser(data);
        setStateUser(data);
        setError(null);
        setSelectedTab(1);
      })
      .catch(() => {
        setError("Nie udało się zalogować");
      });
  };

  return (
    <div className={classes.wrapper}>
      <Container size={420} pt={50}>
        <Title ta="center" className={classes.title}>
          Witamy z powrotem!
        </Title>

        <Paper
          withBorder
          shadow="md"
          p={30}
          mt={30}
          radius="md"
          style={{
            border: error === null ? "0px solid red" : "0.5px solid red",
          }}
        >
          <TextInput
            label="Login"
            placeholder="Twój login"
            required
            {...form.getInputProps("login")}
          />
          <PasswordInput
            label="Hasło"
            placeholder="Twoje hasło"
            required
            mt="md"
            {...form.getInputProps("password")}
          />
          <Center pt={20}>
            <Text c="red" hidden={error === null}>
              {error}
            </Text>
          </Center>
          <Button fullWidth mt="md" onClick={handleLoginOnClick}>
            Zaloguj
          </Button>
          <Text c="dimmed" size="sm" ta="center" mt={15}>
            Nie masz jeszcze konta?{" "}
            <Anchor
              size="sm"
              component="button"
              onClick={() => setSelectedTab(6)}
            >
              Zarejestruj się
            </Anchor>
          </Text>
        </Paper>
      </Container>
    </div>
  );
};

export default LoginPage;
