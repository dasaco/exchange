import React from 'react';
import styled from "styled-components";
import CurrencySelector from '../currency-selector/CurrencySelector';

const Container = styled.div`
`;

const Top = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const LeftSide = styled.div`
`;

const RightSide = styled.div`
`;

const AmountInput = styled.input`
  border: none;
  font-size: 39px;
  text-align: right;
  outline: none;
  background-color: transparent;
`;

type Props = {
  value: number;
  onAmountChange: Function;
}

const CurrencyInput: React.FC<Props> = ({ value, onAmountChange }) => {
  return <Container>
    <Top>
      <LeftSide>
        <CurrencySelector value={"Eur"} onChange={() => {}} />
      </LeftSide>
      <RightSide>
        <AmountInput type="text" pattern="[0-9]*" value={value} onChange={(e) => onAmountChange(parseInt(e.target.value))} />
      </RightSide>
    </Top>
    <p>Balance: 56.52</p>
  </Container>
}

export default CurrencyInput;