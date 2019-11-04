import React from "react";
import "./views/exchange/ExchangePage";
import styled from "styled-components";
import ExchangePage from "./views/exchange/ExchangePage";
import store from "./state/store";
import { Provider } from "react-redux";

const Container = styled.div``;

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <Container>
        <ExchangePage />
      </Container>
    </Provider>
  );
};

export default App;
