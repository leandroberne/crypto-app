import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import useCurrency from '../hooks/useCurrency';
import useCrypto from '../hooks/useCrypto';
import axios from 'axios';
import Error from './Error';

const Button = styled.input`
  margin-top: 20px;
  font-weight: bold;
  font-size: 20px;
  padding: 10px;
  background-color: #66a2fe;
  border: none;
  width: 100%;
  border-radius: 10px;
  color: #fff;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #326ac0;
    cursor: pointer;
  }
`;

const Form = ({ setCurrency, setCrypto }) => {
  const [cryptoList, setCryptoList] = useState([]);

  const [error, setError] = useState(false);

  const CURRENCIES = [
    { code: 'USD', name: 'Dolar de Estados Unidos' },
    { code: 'EUR', name: 'Euro' },
    { code: 'GBP', name: 'Libra esterlina' },
    { code: 'ARS', name: 'Peso Argentino' },
  ];

  const [currency, SelectCurrencies] = useCurrency(
    'Elige tu moneda',
    '',
    CURRENCIES
  );

  const [crypto, SelectCrypto] = useCrypto(
    'Elige tu criptomoneda',
    '',
    cryptoList
  );

  useEffect(() => {
    const consultAPI = async () => {
      const url = `https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD`;
      const { data } = await axios.get(url);
      setCryptoList(data.Data);
    };
    consultAPI();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (currency.trim() === '' || crypto.trim() === '') {
      setError(true);
    } else {
      setError(false);
      setCurrency(currency);
      setCrypto(crypto);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {error && <Error message='Todos los campos son obligatorios' />}
      <SelectCurrencies />
      <SelectCrypto />
      <Button type='submit' value='Calcular' />
    </form>
  );
};

export default Form;
