import { Button, Center, Loader, Modal, Text } from "@mantine/core";
import { useState } from "react";
import { deleteAttraction } from "../../api/apiFetchRequests";
import { User } from "../../api/interfaces/User";
import { useSelectedAttractionContext } from "../../SelectedAttractionContext";

interface AttractionDeleteModalProps {
  opened: boolean;
  setOpened: Function;
  attractionId: number;
  user: User;
}

const AttractionDeleteModal = ({
  opened,
  setOpened,
  attractionId,
  user,
}: AttractionDeleteModalProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const { setSelectedAttraction } = useSelectedAttractionContext();

  const fetchDeleteAttraction = async () => {
    setIsLoading(true);
    deleteAttraction(attractionId, user.token)
      .then(() => {
        setError(null);
        setOpened(false);
        setSelectedAttraction(null);
      })
      .catch(() => {
        setError("Nie udało się usunąć atrakcji");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const getModalContent = () => {
    if (isLoading) {
      return (
        <Center>
          <Loader />
        </Center>
      );
    } else {
      return (
        <>
          <Text>Czy jesteś pewny, ze chcesz na stałe usunąć tą atrackcję?</Text>
          {error ? (
            <Center>
              <Text c={"red"}>{error}</Text>
            </Center>
          ) : (
            <></>
          )}
          <Center mt={"md"}>
            <Button variant="outline" onClick={() => setOpened(false)}>
              Anuluj
            </Button>
            <Button
              variant="filled"
              color="red"
              ml={20}
              onClick={() => {
                fetchDeleteAttraction();
              }}
            >
              Usuń
            </Button>
          </Center>
        </>
      );
    }
  };

  return (
    <Modal
      opened={opened}
      onClose={() => setOpened(false)}
      zIndex={1000}
      title="Potwierdzenie"
      centered
    >
      {getModalContent()}
    </Modal>
  );
};

export default AttractionDeleteModal;
