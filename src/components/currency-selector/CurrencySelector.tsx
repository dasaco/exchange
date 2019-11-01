import React, { useState } from 'react';
import styled from "styled-components";

const Container = styled.div``;

const Toggle = styled.button`
  display: flex;
`;

const CurrencyText = styled.span`
  font-size: 39px;
  text-transform: uppercase;
`;

type Props = {
  value: string;
  onChange: Function;
}

const CurrencyInput: React.FC<Props> = ({ value, onChange }) => {
  const [isSelectOpen, setIsSelectOpen] = useState(false);

  return <Container>
    <Toggle onClick={() => setIsSelectOpen(!isSelectOpen)}>
      <CurrencyText>{value}</CurrencyText>
      <CurrencyText>></CurrencyText>
    </Toggle>
  </Container>
}

export default CurrencyInput;