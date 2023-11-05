import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import {
  fetchAttractionPicture,
  fetchAttractionsLocations,
} from "../../api/apiFetchRequests";
import { AttractionLocation } from "../../api/interfaces/AttractionLocation";
import { Button, Title, Center, Image, Container } from "@mantine/core";
import { FetchError } from "../../api/interfaces/FetchError";
import ServerError from "../ServerError/ServerError";
import { LeafletMouseEvent } from "leaflet";

const AttractionsMap = () => {
  const [attractionsLocations, setAttractionsLocations] = useState<
    AttractionLocation[]
  >([]);
  const [openedAttractionId, setOpenedAttractionId] = useState<number | null>(
    null
  );
  const [openedAttracionPicture, setOpenedAttractionPicture] = useState<
    string | null
  >(null);
  const [errorStatus, setErrorStatus] = useState<number | null>(null);

  useEffect(() => {
    fetchAttractionsLocations()
      .then((data) => {
        setErrorStatus(null);
        setAttractionsLocations(data);
      })
      .catch((error: FetchError) => {
        setErrorStatus(error.status);
      });
  }, []);

  useEffect(() => {
    if (openedAttractionId !== null) {
      fetchAttractionPicture(openedAttractionId)
        .then((data) => {
          setOpenedAttractionPicture(data.picture);
        })
        .catch(() => {
          setOpenedAttractionPicture(null);
        });
    }
  }, [openedAttractionId]);

  const handleMarkerClick = (event: LeafletMouseEvent) => {
    const location: AttractionLocation = attractionsLocations.filter(
      (loc) =>
        loc.xcoordinate === event.latlng.lat &&
        loc.ycoordinate === event.latlng.lng
    )[0];
    setOpenedAttractionId(location ? location.id : null);
  };

  const getAttractionMarker = (location: AttractionLocation) => {
    return (
      <Marker
        position={[location.xcoordinate, location.ycoordinate]}
        eventHandlers={{
          click: handleMarkerClick,
        }}
        key={location.id}
      >
        <Popup minWidth={200} maxWidth={200}>
          <Title order={6}>{location.title}</Title>
          {openedAttracionPicture ? (
            <Image
              src={`data:image/png;base64,${openedAttracionPicture}`}
              height={100}
              width={"100%"}
              alt={location.title}
              radius={"sm"}
            />
          ) : (
            <></>
          )}

          <Center pt={"10px"}>
            <Button>Zobacz więcej</Button>
          </Center>
        </Popup>
      </Marker>
    );
  };

  const getContent = () => {
    if (errorStatus === null) {
      return (
        <MapContainer
          center={[51.167506, 16.595754]}
          zoom={9}
          scrollWheelZoom={false}
          style={{
            height: "calc(100vh - 155px)",
          }}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {attractionsLocations.map((location) => {
            return getAttractionMarker(location);
          })}
        </MapContainer>
      );
    } else {
      return (
        <Container pt={"10%"}>
          <ServerError status={errorStatus} />
        </Container>
      );
    }
  };

  return getContent();
};

export default AttractionsMap;
