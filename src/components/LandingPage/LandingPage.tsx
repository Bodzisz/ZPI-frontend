import { useState } from 'react';
import { Container, Paper, Text } from '@mantine/core';
import { CitySearchInput, AttractionSearchInput } from './SearchInputs/SearchInputs';
import { AttractionCard } from '../AttractionCard/AttractionCard';

const LandingPage = () => {
  const [cityQuery, setCityQuery] = useState('');
  const [attractionQuery, setAttractionQuery] = useState('');

  const handleCitySearch = (value: string) => {
    setCityQuery(value);
  };

  const handleAttractionSearch = (value: string) => {
    setAttractionQuery(value);
  };

  return (<>
  <Text size="s" style={{ paddingLeft: '300px', paddingRight: '300px', paddingBottom: '50px',  paddingTop: '20px' }}>
  Witaj na stronie internetowej poświęconej atrakcjom Dolnego Śląska! Odkryj piękno naszego regionu, pełnego historycznych zabytków, malowniczych krajobrazów i niezwykłych atrakcji. Dolny Śląsk zachwyca swoją różnorodnością, od urokliwych miast i wsi po przyrodnicze cuda.
</Text>
   
    <div style={{ display: 'flex', justifyContent: 'center', gap: '200px'}}>
      <Paper>
        <Container size="lg">
        <div style={{ display: 'flex', justifyContent: 'center', gap: '200px', paddingBottom: 60 }}>
          <CitySearchInput value={cityQuery} onChange={(e: React.ChangeEvent<HTMLInputElement>): void => handleCitySearch(e.target.value)} />
          <AttractionSearchInput value={attractionQuery} onChange={(e: React.ChangeEvent<HTMLInputElement>): void => handleAttractionSearch(e.target.value)} />

          </div>
        </Container>
      </Paper>
    </div>

    <div style={{ display: 'flex', justifyContent: 'center', gap: '100px', paddingBottom: 100 }}>
      <AttractionCard imgSrc="https://images.unsplash.com/photo-1527004013197-933c4bb611b3?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=720&q=80" alt="Norway" title="Norway Fjord" />
      <AttractionCard imgSrc="https://retailnet.pl/wp-content/uploads/2023/01/pizza-hut-2-1068x600.jpg" alt="Norway" title="Pizza Hut" />
      <AttractionCard imgSrc="https://www.travelandleisure.com/thmb/rbPz5_6COrWFh94qFRHYLJrRM-g=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/iguazu-falls-argentina-brazil-MOSTBEAUTIFUL0921-e967cc4764ca4eb2b9941bd1b48d64b5.jpg" alt="Norway" title="Beautiful Place" />
      <AttractionCard imgSrc="https://images.travelandleisureasia.com/wp-content/uploads/sites/3/2023/05/08123654/lake-como.jpeg" alt="Norway" title="Beautiful Place" />
    </div>
  </>
  );
};

export default LandingPage;