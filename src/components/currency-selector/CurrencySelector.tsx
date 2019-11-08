import React, { useState } from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { AppState } from "../../state/store";
import Currency from "../../interfaces/Currency.interface";
import {
  Container,
  Toggle,
  CurrencyText,
  CurrencySelector,
  CurrencyItem,
  CurrencyItemAmount,
  CurrencyItemName,
  DownArrow,
  CurrencyImage,
  CurrencyInfo
} from "./CurrencySelector.style";

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
              <CurrencyInfo>
                <CurrencyImage backgroundImage={p.currency.imagePath} />
                <CurrencyItemName>{p.currency.base}</CurrencyItemName>
              </CurrencyInfo>
              <CurrencyItemAmount>{p.amount}</CurrencyItemAmount>
            </CurrencyItem>
          ))}
        </CurrencySelector>
      )}
    </Container>
  );
};

export default CurrencyInput;
