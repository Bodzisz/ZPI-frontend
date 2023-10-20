import React, { ChangeEventHandler } from 'react';
import { TextInput, Paper, Button } from '@mantine/core';

interface CitySearchInputProps {
  value: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
}

const CitySearchInput: React.FC<CitySearchInputProps> = ({ value, onChange}) => {

  const handleSearch = () => {
    //search logic
  };
  return (
    <Paper >
      <div style={{ display: 'flex', alignItems: 'center' }}>
      <TextInput
        label="Miasta"
        placeholder="Wyszukaj miasto"
        value={value}
        onChange={onChange}
        style={{ width: '280px' }} 
        
      />
      <Button
          variant="filled"
          color="teal"
          size="sm"
          style={{ marginLeft: '8px', marginTop: '25px' }}
          onClick={handleSearch}
        >Search</Button>
    </div>
    </Paper>
    
  );
};

interface AttractionSearchInputProps {
  value: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
}

const AttractionSearchInput: React.FC<AttractionSearchInputProps> = ({ value, onChange }) => {

  const handleSearch = () => {
    //search logic
  };
  return (
    <Paper>
      <div style={{ display: 'flex', alignItems: 'center' }}>
      <TextInput
        label="Atrakcje"
        placeholder="Wyszukaj atrakcje"
        value={value}
        onChange={onChange}
        style={{ width: '280px' }} 
      />
    <Button
          variant="filled"
          color="teal"
          size="sm"
          style={{ marginLeft: '8px', marginTop: '25px' }} 
          onClick={handleSearch}
          >Search</Button>
        </div>
    </Paper>
  );
};

export { CitySearchInput, AttractionSearchInput };