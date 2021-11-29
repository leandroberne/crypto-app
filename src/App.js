import React, { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import image from './assets/cryptomonedas.png';
import Form from './components/Form';
import axios from 'axios';
import Quotation from './components/Quotation';
import Spinner from './components/Spinner';

const Container = styled.div`
  max-width: 900px;
  margin: 0 auto;
  @media (min-width: 992px) {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    column-gap: 2rem;
  }
`;

const Image = styled.img`
  max-width: 100%;
  margin-top: 5rem;
`;

const Heading = styled.h1`
  font-family: 'Bebas Neue', cursive;
  color: #fff;
  text-align: left;
  font-weight: 700;
  font-size: 50px;
  margin-bottom: 50px;
  margin-top: 80px;

  &::after {
    content: '';
    width: 100px;
    height: 6px;
    background-color: #66a2fe;
    display: block;
  }
`;

const App = () => {
  const [currency, setCurrency] = useState('');
  const [crypto, setCrypto] = useState('');
  const [result, setResult] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (currency !== '' || crypto !== '') {
      const quotationAPI = async () => {
        const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${crypto}&tsyms=${currency}`;
        const { data } = await axios.get(url);
        setLoading(true);
        setTimeout(() => {
          setLoading(false);
          setResult(data.DISPLAY[crypto][currency]);
        }, 1000);
      };
      quotationAPI();
    }
  }, [currency, crypto]);

  return (
    <Container>
      <div>
        <Image src={image} alt='Imagen Crypto' />
      </div>
      <div>
        <Heading>Cotiza Cryptomonedas al instante</Heading>
        <Form setCurrency={setCurrency} setCrypto={setCrypto} />
        {loading ? <Spinner /> : <Quotation result={result} />}
      </div>
    </Container>
  );
};

export default App;
