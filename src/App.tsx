import React from "react";
import "./views/exchange/ExchangePage";
import "./App.css";
import styled from "styled-components";
import ExchangePage from "./views/exchange/ExchangePage";

const Container = styled.div``;

const App: React.FC = () => {
  return (
    <Container>
      <ExchangePage />
    </Container>
  );
};

export default App;
