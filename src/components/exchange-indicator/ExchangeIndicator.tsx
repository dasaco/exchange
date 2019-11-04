import React from "react";
import styled from "styled-components";
import Currency from "../../interfaces/Currency.interface";
import { getMoneyString } from "../../services/exchange";

const Container = styled.div`
  position: absolute;
  top: -16px;
  background-color: #ffffff;
  padding: 9px 21px;
  border-radius: 20px;
  border: 1px solid #e8e8e8;
`;
const Text = styled.div`
  color: #1b69cc;
  font-size: 14px;
`;

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
