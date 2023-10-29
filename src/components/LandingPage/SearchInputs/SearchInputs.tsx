import React, { ChangeEventHandler } from "react";
import { TextInput, Button } from "@mantine/core";

interface CitySearchInputProps {
  value: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
}

const CitySearchInput: React.FC<CitySearchInputProps> = ({
  value,
  onChange,
}) => {
  const handleSearch = () => {
    //search logic
  };
  return (
    <div>
      <div style={{ display: "flex", alignItems: "center" }}>
        <TextInput
          label="Miasta"
          placeholder="Wyszukaj miasto"
          value={value}
          onChange={onChange}
          c={"white"}
        />
        <Button
          variant="filled"
          size="sm"
          style={{ marginLeft: "8px", marginTop: "25px" }}
          onClick={handleSearch}
        >
          Szukaj
        </Button>
      </div>
    </div>
  );
};

interface AttractionSearchInputProps {
  value: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
}

const AttractionSearchInput: React.FC<AttractionSearchInputProps> = ({
  value,
  onChange,
}) => {
  const handleSearch = () => {
    //search logic
  };
  return (
    <div>
      <div style={{ display: "flex", alignItems: "center" }}>
        <TextInput
          label="Atrakcje"
          placeholder="Wyszukaj atrakcje"
          value={value}
          onChange={onChange}
          c={"white"}
        />
        <Button
          variant="filled"
          size="sm"
          style={{ marginLeft: "8px", marginTop: "25px" }}
          onClick={handleSearch}
        >
          Szukaj
        </Button>
      </div>
    </div>
  );
};

export { CitySearchInput, AttractionSearchInput };
