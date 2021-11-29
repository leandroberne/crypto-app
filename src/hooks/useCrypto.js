import React, { useState } from 'react';
import styled from '@emotion/styled';

const Label = styled.label`
  font-family: 'Bebas Neue', cursive;
  color: #fff;
  text-transform: uppercase;
  font-weight: bold;
  font-size: 2.4rem;
  margin-top: 2rem;
  display: block;
`;

const Select = styled.select`
  width: 100%;
  display: block;
  padding: 1rem;
  --webkit-appearance: none;
  border-radius: 10px;
  border: none;
  font-size: 1.2rem;
`;

const useCrypto = (label, initialState, options) => {
  const [state, setState] = useState(initialState);

  const handleChange = (e) => {
    setState(e.target.value);
  };

  const SelectCrypto = () => (
    <>
      <Label>{label}</Label>
      <Select onChange={handleChange} value={state}>
        <option value=''>--Seleccione--</option>
        {options.map((option) => {
          return (
            <option key={option.CoinInfo.Id} value={option.CoinInfo.Name}>
              {option.CoinInfo.FullName}
            </option>
          );
        })}
      </Select>
    </>
  );

  return [state, SelectCrypto];
};

export default useCrypto;
