import React, { useState } from "react";
import styled from "styled-components";
import CurrencyInput from "../../components/currency-input/CurrencyInput";

const Container = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
`;

const TopSection = styled.div`
  background-color: #fff;
  flex: 0.4;
  align-items: flex-end;
  display: flex;
  justify-content: center;
  padding-bottom: 80px;
`;

const BottomSection = styled.div`
  background-color: #e8e8e8;
  flex: 0.6;
  align-items: center;
  display: flex;
  justify-content: flex-start;
  padding-top: 80px;
  flex-direction: column;
`;

const Content = styled.div`
  min-width: 600px;
`;

const Button = styled.div`
  background-color: #f51f90;
  border-radius: 30px;
  color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 17%;
  height: 52px;
  font-weight: bold;
  margin-top: 90px;
`;

const ExchangePage: React.FC = () => {
  const [fromAmount, setFromAmout] = useState(0);
  const [toAmount, setToAmount] = useState(0);

  return (
    <Container>
      <TopSection>
        <Content>
          <CurrencyInput
            value={fromAmount}
            onAmountChange={(v: number) => setFromAmout(v)}
          />
        </Content>
      </TopSection>
      <BottomSection>
        <Content>
          <CurrencyInput
            value={toAmount}
            onAmountChange={(v: number) => setToAmount(v)}
          />
        </Content>
        <Button>Exchange</Button>
      </BottomSection>
    </Container>
  );
};

export default ExchangePage;
