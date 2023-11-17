import React, { ChangeEventHandler } from "react";
import {
  TextInput,
  Button,
  Group,
  SegmentedControl,
  useMantineTheme,
} from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";

interface SearchInputProps {
  value: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
  searchType: string;
  setSearchType: (value: string) => void;
  handleSearch: () => void;
}

const SearchInput: React.FC<SearchInputProps> = ({
  value,
  onChange,
  searchType,
  setSearchType,
  handleSearch
}) => {
  const theme = useMantineTheme();
  const mobile = useMediaQuery(`(max-width: ${theme.breakpoints.sm})`);

  return (
    <Group justify="center">
      <SegmentedControl
        value={searchType}
        onChange={setSearchType}
        data={[
          { label: "Atrakcje", value: "atrakcje" },
          { label: "Miasta", value: "miasta" },
        ]}
      />
      <TextInput
        placeholder="Wpisz szukaną frazę"
        value={value}
        onChange={onChange}
        maw={"650px"}
        w={mobile ? "80%" : "80vh"}
        wrapperProps={{ paddingLeft: "0" }}
      />
      <Button
        variant="filled"
        size="sm"
        style={{ marginLeft: "8px" }}
        onClick={handleSearch}
      >
        Szukaj
      </Button>
    </Group>
  );
};

export { SearchInput };
