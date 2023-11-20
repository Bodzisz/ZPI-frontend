import { useForm } from "@mantine/form";
import {
  TextInput,
  Button,
  Textarea,
  Paper,
  Container,
  Stepper,
  Center,
  Group,
  useMantineTheme,
  rem,
  Text,
} from "@mantine/core";
import { useState, useMemo, useRef, useEffect } from "react";
import { MapContainer, Marker, TileLayer } from "react-leaflet";
import { Dropzone, IMAGE_MIME_TYPE } from "@mantine/dropzone";
import { IconCloudUpload, IconX, IconDownload } from "@tabler/icons-react";
import { FileWithPath } from "react-dropzone-esm";
import { addAttraction } from "../../api/apiFetchRequests";
import { User } from "../../api/interfaces/User";
import { useSelectedAttractionContext } from "../../SelectedAttractionContext";

interface MarkerCords {
  _latlng: {
    lat: number;
    lng: number;
  };
}

interface AddAttractionPageProps {
  user: User | null;
}

function arrayBufferToBase64(buffer: ArrayBuffer) {
  var binary = "";
  var bytes = new Uint8Array(buffer);
  var len = bytes.byteLength;
  for (var i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return window.btoa(binary);
}

const AddAttractionPage = ({ user }: AddAttractionPageProps) => {
  const [active, setActive] = useState(0);
  const [position, setPosition] = useState([51.167506, 16.595754]);
  const [picture, setPicture] = useState<FileWithPath | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { setSelectedAttraction } = useSelectedAttractionContext();
  const theme = useMantineTheme();
  const form = useForm({
    initialValues: {
      district: "",
      cityName: "",
      postalCode: "",
      attractionType: "",
      title: "",
      description: "",
    },
    validate: {
      postalCode: (value) =>
        /\d{2}-\d{3}/.test(value)
          ? null
          : "Kod pocztowy musi być w formacie XX-XXX",
    },
  });
  const markerRef = useRef(null);
  const openRef = useRef<() => void>(null);
  const eventHandlers = useMemo(
    () => ({
      dragend() {
        const marker: MarkerCords | null = markerRef.current;
        if (marker !== null) {
          // @ts-ignore
          setPosition([marker._latlng.lat, marker._latlng.lng]);
        }
      },
    }),
    []
  );

  const handleAttractionAdding = () => {
    picture?.arrayBuffer().then((ab) => {
      const pictureString: string = arrayBufferToBase64(ab);
      if (user !== null) {
        addAttraction(
          {
            title: form.values.title,
            district: form.values.district,
            cityName: form.values.cityName,
            postalCode: form.values.postalCode,
            description: form.values.description,
            attractionType: form.values.attractionType,
            xCoordinate: position[0],
            yCoordinate: position[1],
            picture: pictureString,
          },
          user
        )
          .then((attraction) => {
            setSelectedAttraction(attraction.id);
            setError(null);
          })
          .catch((error) => {
            console.log(error);
          });
      }
    });
  };

  useEffect(() => {
    console.log(position);
  }, [position]);

  return (
    <Container size={"sm"} pt={30}>
      <Paper withBorder shadow="md" p={30} mt={15} radius="md">
        <Stepper
          active={active}
          onStepClick={setActive}
          allowNextStepsSelect={false}
        >
          <Stepper.Step label="Dane ogólne" description="Podaj dane ogólne">
            <form onSubmit={form.onSubmit(() => setActive(1))}>
              <TextInput
                label="Tytuł atrakcji"
                placeholder="Podaj tytuł atrakcji"
                required
                {...form.getInputProps("title")}
              />
              <TextInput
                label="Powiat"
                placeholder="Podaj powiat"
                required
                mt="md"
                {...form.getInputProps("district")}
              />
              <TextInput
                label="Nazwa Miasta"
                placeholder="Podaj nazwę miasta"
                required
                mt="md"
                {...form.getInputProps("cityName")}
              />
              <TextInput
                label="Kod Pocztowy"
                placeholder="Podaj kod pocztowy"
                required
                mt="md"
                {...form.getInputProps("postalCode")}
              />
              <TextInput
                label="Typ atrakcji"
                placeholder="Podaj typ atrakcji"
                required
                mt="md"
                {...form.getInputProps("attractionType")}
              />
              <Textarea
                label="Opis Atrakcji"
                placeholder="Napisz parę zdań o atrakcji"
                mt="md"
                autosize
                maxRows={8}
                {...form.getInputProps("description")}
              />
              <Button type="submit" fullWidth mt="xl">
                Dalej
              </Button>
            </form>
          </Stepper.Step>
          <Stepper.Step label="Lokalizacja" description="Zaznacz lokalizację">
            <Center mb={"md"}>
              <Text>Przesuń marker w celu ustawienia lokalizacji</Text>
            </Center>

            <MapContainer
              center={[position[0], position[1]]}
              zoom={9}
              scrollWheelZoom={false}
              style={{
                height: 340,
              }}
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <Marker
                position={[position[0], position[1]]}
                draggable={true}
                ref={markerRef}
                eventHandlers={eventHandlers}
              />
            </MapContainer>
            <Center>
              <Button
                variant="default"
                mt="xl"
                mr={"md"}
                onClick={() => setActive(0)}
              >
                Powrót
              </Button>
              <Button mt="xl" onClick={() => setActive(2)}>
                Dalej
              </Button>
            </Center>
          </Stepper.Step>
          <Stepper.Step label="Zdjęcie" description="Wyślij zdjęcie">
            {picture ? (
              <>
                <Center mt={"md"} mb={"md"}>
                  <Text>Dodano {picture.name}</Text>
                </Center>
                <Center mt={"xl"}>
                  <Button
                    variant="default"
                    mr={"md"}
                    onClick={() => setActive(1)}
                  >
                    Powrót
                  </Button>
                  <Button
                    variant="filled"
                    mr={"md"}
                    color="red"
                    onClick={() => setPicture(null)}
                  >
                    Usuń zdjęcie
                  </Button>
                  <Button onClick={() => setActive(3)}>Dalej</Button>
                </Center>
              </>
            ) : (
              <>
                <Dropzone
                  openRef={openRef}
                  onDrop={(files: FileWithPath[]) =>
                    setPicture(files[0].path ? files[0] : null)
                  }
                  onReject={(files) => console.log("rejected files", files)}
                  maxSize={1024 ** 2}
                  accept={IMAGE_MIME_TYPE}
                  maxFiles={1}
                >
                  <div style={{ pointerEvents: "none" }}>
                    <Group justify="center">
                      <Dropzone.Accept>
                        <IconDownload
                          style={{ width: rem(50), height: rem(50) }}
                          color={theme.colors.blue[6]}
                          stroke={1.5}
                        />
                      </Dropzone.Accept>
                      <Dropzone.Reject>
                        <IconX
                          style={{ width: rem(50), height: rem(50) }}
                          color={theme.colors.red[6]}
                          stroke={1.5}
                        />
                      </Dropzone.Reject>
                      <Dropzone.Idle>
                        <IconCloudUpload
                          style={{ width: rem(50), height: rem(50) }}
                          stroke={1.5}
                        />
                      </Dropzone.Idle>
                    </Group>

                    <Text ta="center" fw={700} fz="lg" mt="xl">
                      <Dropzone.Accept>Zrzuć plik tutaj</Dropzone.Accept>
                      <Dropzone.Reject>
                        Plik ze zdjęciem jest nieodpowiedni
                      </Dropzone.Reject>
                      <Dropzone.Idle>Upuść zdjęcie</Dropzone.Idle>
                    </Text>
                    <Text ta="center" fz="sm" mt="xs" c="dimmed">
                      Upuść tutaj zdjęcie lub kliknij przycisk ponizej i wybierz
                      plik z systemu
                    </Text>
                  </div>
                </Dropzone>
                <Center mt={"sm"}>
                  <Button
                    size="md"
                    radius="xl"
                    onClick={() => openRef.current?.()}
                  >
                    Wybierz plik
                  </Button>
                </Center>
              </>
            )}
          </Stepper.Step>
          <Stepper.Completed>
            <Center mt={"lg"}>
              Dane zostały wypełnione. Kliknij przycisk ponizej w celu próby
              dodania atrakcji.
            </Center>
            {error ? (
              <Center mt={"lg"}>
                <Text c={"red"}>Nie udało się dodać atrakcji</Text>
              </Center>
            ) : (
              <></>
            )}
            <Center mt={"xl"}>
              <Button onClick={handleAttractionAdding}>Dodaj</Button>
            </Center>
          </Stepper.Completed>
        </Stepper>
      </Paper>
    </Container>
  );
};

export default AddAttractionPage;
