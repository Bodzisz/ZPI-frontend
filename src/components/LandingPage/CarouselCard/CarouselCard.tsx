import { Center, Text, Paper, Title } from "@mantine/core";
import classes from "./CarouselCard.module.css";

interface CarouselCardProps {
  image: string;
  title: string;
  onClickFunc: Function;
  id: number;
}

const CarouselCard = ({ image, title, onClickFunc, id }: CarouselCardProps) => {
  return (
    <a href="#" onClick={() => {}} style={{ textDecoration: "none" }}>
      <Paper
        shadow="md"
        radius="md"
        style={{ backgroundImage: `url(${image})` }}
        className={classes.card}
        onClick={() => onClickFunc(id)}
      >
        <Paper
          p={10}
          style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
          w={"100%"}
        >
          <Center>
            <Title order={5} className={classes.cardTitle}>
              <Text>{title}</Text>
            </Title>
          </Center>
        </Paper>
      </Paper>
    </a>
  );
};

export default CarouselCard;
