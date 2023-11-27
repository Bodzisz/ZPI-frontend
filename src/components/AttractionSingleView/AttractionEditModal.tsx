import { Attraction } from "../../api/interfaces/Attraction";
import { User } from "../../api/interfaces/User";
import { Modal } from "@mantine/core";
import AddAttractionPage from "../AddAttractionPage/AddAttractionPage";

interface AttractionEditModalProps {
  opened: boolean;
  setOpened: Function;
  attraction: Attraction;
  user: User;
  refresh: Function;
}

const AttractionEditModal = ({
  opened,
  setOpened,
  attraction,
  user,
  refresh,
}: AttractionEditModalProps) => {
  return (
    <Modal
      opened={opened}
      onClose={() => setOpened(false)}
      title="Edycja atrakcji"
      centered
      size="auto"
    >
      <AddAttractionPage
        user={user}
        attraction={attraction}
        addNew={false}
        refresh={() => {
          refresh();
          setOpened(false);
        }}
      />
    </Modal>
  );
};

export default AttractionEditModal;
