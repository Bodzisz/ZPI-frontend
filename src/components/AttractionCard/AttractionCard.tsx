import React from 'react';
import { Text, Image, Card, Group, Badge, Button } from '@mantine/core';

interface AttractionCardProps {
  imgSrc: string;
  alt: string
  title: string
  
}

const AttractionCard: React.FC<AttractionCardProps> = ({ imgSrc, alt, title}) => {
  return (
    <div style={{width: 300}}>
    <Card shadow="sm" padding="lg" radius="md" withBorder>
      <Card.Section>
        <Image
          src={imgSrc}
          height={160}
          width={200}
          alt={alt}
        />
      </Card.Section>
      

      <Group justify="space-between" mt="md" mb="xs">
        <Text fw={500}>{title}</Text>
        <Badge color="green" variant="light">
          Otwarte
        </Badge>
      </Group>

      <Text size="sm" c="dimmed">
        With Fjord Tours you can explore more of the magical fjord landscapes with tours and
        activities on and around the fjords of Norway
      </Text>

      <Button variant="light" color="blue" fullWidth mt="md" radius="md">
        Book classic tour now
      </Button>
    </Card>
    </div>
  );
};
export { AttractionCard };





