import {
  Paper,
  TextInput,
  PasswordInput,
  Button,
  Container,
  Text,
  Anchor,
  Center,
  Title,
} from "@mantine/core";
import { useState } from "react";
import classes from "./SignUpPage.module.css";
import { useForm } from "@mantine/form";
import { register } from "../../api/apiFetchRequests";

interface SignUpForm {
  firstName: string;
  lastName: string;
  login: string;
  password: string;
  passwordConfirm: string;
}

const SignUpPage = ({ setSelectedTab }: { setSelectedTab: Function }) => {
  const [error, setError] = useState<string | null>(null);
  const [didRegister, setDidRegister] = useState<boolean>(false);
  const form = useForm({
    initialValues: {
      firstName: "",
      lastName: "",
      login: "",
      password: "",
      passwordConfirm: "",
    },
    validate: {
      passwordConfirm: (value: string, values: SignUpForm) =>
        values.password !== value ? "Hasła muszą być takie same" : null,
      password: (value: string, values: SignUpForm) =>
        values.passwordConfirm !== value
          ? "Hasła muszą być takie same"
          : value.length < 3
          ? "Hasło musi zawierać przynajmniej 3 znaki"
          : null,
      login: (value: string) =>
        value.trim().length < 3
          ? "Login musi zawierać przynajmniej 5 znaków"
          : null,
      firstName: (value: string) =>
        value.trim() === "" ? "Imię nie moze być puste" : null,
      lastName: (value: string) =>
        value.trim() === "" ? "Nazwisko nie moze być puste" : null,
    },
  });

  const handleRegisterClick = () => {
    register({
      firstName: form.values.firstName,
      lastName: form.values.lastName,
      login: form.values.login,
      password: form.values.password,
      role: "USER",
    })
      .then(() => {
        setError(null);
        setDidRegister(true);
      })
      .catch(() => {
        setError("Nie udało się zarejestrować");
      });
  };

  const getContent = () => {
    if (didRegister) {
      return (
        <Paper
          withBorder
          shadow="md"
          p={30}
          radius="md"
          pos={"absolute"}
          top={"30%"}
        >
          <Center>
            <Title order={2}>Udało Ci się zarejestować!</Title>
          </Center>
          <Center pt={20}>
            <Button onClick={() => setSelectedTab(6)}>
              Przejdź do logowania
            </Button>
          </Center>
        </Paper>
      );
    } else {
      return (
        <Paper
          withBorder
          shadow="md"
          p={30}
          mt={15}
          radius="md"
          style={{
            border: error === null ? "0px solid red" : "0.5px solid red",
          }}
        >
          <form onSubmit={form.onSubmit(handleRegisterClick)}>
            <TextInput
              label="Imię"
              placeholder="Twoje imię"
              required
              {...form.getInputProps("firstName")}
            />
            <TextInput
              label="Nazwisko"
              placeholder="Twoje nazwisko"
              required
              mt="md"
              {...form.getInputProps("lastName")}
            />
            <TextInput
              label="Login"
              placeholder="Twój login"
              required
              mt="md"
              {...form.getInputProps("login")}
            />
            <PasswordInput
              label="Hasło"
              placeholder="Twoje hasło"
              required
              mt="md"
              {...form.getInputProps("password")}
            />
            <PasswordInput
              label="Powtórz hasło"
              placeholder="Twoje hasło"
              required
              mt="md"
              {...form.getInputProps("passwordConfirm")}
            />
            <Button type="submit" fullWidth mt="xl">
              Zarejestruj się
            </Button>
          </form>
          <Center pt={20}>
            <Text c="red" hidden={error === null}>
              {error}
            </Text>
          </Center>
          <Text c="dimmed" size="sm" ta="center" mt={15}>
            Masz już konto?{" "}
            <Anchor
              size="sm"
              component="button"
              onClick={() => setSelectedTab(5)}
            >
              Zaloguj się
            </Anchor>
          </Text>
        </Paper>
      );
    }
  };

  return (
    <div className={classes.wrapper}>
      <Container size={420} pt={30}>
        {getContent()}
      </Container>
    </div>
  );
};

export default SignUpPage;
