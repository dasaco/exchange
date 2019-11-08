import React from "react";
import styled from "styled-components";
import Currency from "../../interfaces/Currency.interface";
import { getMoneyString } from "../../services/exchange";
import { Container, Text } from './ExchangeIndicator.style';

type Props = {
  fromCurrency: Currency | null;
  toCurrency: Currency | null;
  rate: number | null;
};

const ExchangeIndicator: React.FC<Props> = ({
  fromCurrency,
  toCurrency,
  rate
}) => {
  if (!fromCurrency || !toCurrency || !rate) {
    return null;
  }

  return (
    <Container>
      <Text>
        {fromCurrency.prefix || ""}1{fromCurrency.postfix || ""} ={" "}
        {toCurrency.prefix || ""}
        {rate}
        {toCurrency.postfix || ""}
      </Text>
    </Container>
  );
};

export default ExchangeIndicator;
