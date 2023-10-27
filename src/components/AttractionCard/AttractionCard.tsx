import React from "react";
import { Text, Image, Card, Group, Badge, Button } from "@mantine/core";
import { Attraction } from "../../api/interfaces/Attraction";

interface AttractionCardProps {
  attraction: Attraction;
}

const AttractionCard: React.FC<AttractionCardProps> = ({ attraction }) => {
  return (
    <Card
      style={{ width: 300, height: 420 }}
      shadow="sm"
      padding="lg"
      radius="md"
      withBorder
      pos={"relative"}
    >
      <Card.Section>
        <Image
          src={`data:image/png;base64,${attraction.picture}`}
          height={160}
          width={200}
          alt={attraction.title}
        />
      </Card.Section>

      <Group justify="space-between" mt="md" mb="xs">
        <Text fw={500}>{attraction.title}</Text>
        <Badge color="green" variant="light">
          {attraction.attractionType.attractionType}
        </Badge>
      </Group>

      <div>
        <Text size="sm" c="dimmed" lineClamp={5}>
          {attraction.description}
        </Text>
      </div>

      <div>
        <Group
          bottom={0}
          pos={"absolute"}
          justify="center"
          pb={"10px"}
          w={"258px"}
        >
          <Button variant="light" color="blue" radius="md">
            Zobacz więcej
          </Button>
        </Group>
      </div>
    </Card>
  );
};
export { AttractionCard };
