import { Title, Text, Container } from "@mantine/core";
import classes from "./ServerError.module.css";

const getErrorDescription = (status: number) => {
  switch (status) {
    case 403:
      return "You do not have permissions to visit this view.";
    default:
      return "Our servers could not handle your request. Try refreshing the page.";
  }
};

const ServerError = ({ status = 500 }: { status: number }) => {
  return (
    <div className={classes.root}>
      <Container>
        <div className={classes.label}>{status}</div>
        <Title className={classes.title}>Something bad just happened...</Title>
        <Text size="lg" ta="center" className={classes.description}>
          {getErrorDescription(status)}
        </Text>
      </Container>
    </div>
  );
};

export default ServerError;
