import React, { useState } from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { AppState } from "../../state/store";
import Currency from "../../interfaces/Currency.interface";

const Container = styled.div`
  position: relative;
`;

const Toggle = styled.button`
  display: flex;
  align-items: center;
  border: none;
  background-color: transparent;
  outline: none;
  padding: 0;
`;

const CurrencyText = styled.span`
  font-size: 39px;
  text-transform: uppercase;
  color: #292929;
`;

const CurrencySelector = styled.div`
  position: absolute;
  width: 300px;
  background-color: #fff;
  border-radius: 17px;
  padding: 15px;
  top: 60px;
  display: flex;
  flex-direction: column;
  z-index: 1;
`;
const CurrencyItem = styled.div`
  display: flex;
  justify-content: space-between;
  height: 40px;
  align-items: center;
  padding: 0 5px;

  &:hover {
    background-color: #e8e8e8;
    cursor: pointer;
  }
`;
const CurrencyItemAmount = styled.div``;
const CurrencyItemName = styled.div``;

const DownArrow = styled.i`
  border: solid black;
  border-width: 0 3px 3px 0;
  display: inline-block;
  padding: 3px;
  transform: rotate(45deg);
  -webkit-transform: rotate(45deg);
  margin-left: 10px;
`;

type Props = {
  currency: Currency | null;
  onChange: Function;
};

const CurrencyInput: React.FC<Props> = ({ currency, onChange }) => {
  const [isSelectOpen, setIsSelectOpen] = useState(false);
  const pockets = useSelector((state: AppState) => state.WalletReducer.pockets);

  return (
    <Container>
      <Toggle onClick={() => setIsSelectOpen(!isSelectOpen)}>
        <CurrencyText>{currency ? currency.base : "none"}</CurrencyText>
        <DownArrow />
      </Toggle>

      {isSelectOpen && (
        <CurrencySelector>
          {pockets.map(p => (
            <CurrencyItem
              key={p.id}
              onClick={() => {
                onChange(p.currency);
                setIsSelectOpen(false);
              }}
            >
              <CurrencyItemName>{p.currency.base}</CurrencyItemName>
              <CurrencyItemAmount>{p.amount}</CurrencyItemAmount>
            </CurrencyItem>
          ))}
        </CurrencySelector>
      )}
    </Container>
  );
};

export default CurrencyInput;
