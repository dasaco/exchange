import React, { useState, useEffect } from "react";
import styled from "styled-components";
import CurrencyInput from "../../components/currency-input/CurrencyInput";
import { useSelector, useDispatch } from "react-redux";
import { AppState } from "../../state/store";
import ExchangeIndicator from "../../components/exchange-indicator/ExchangeIndicator";
import { getRate } from "../../services/exchange";
import Currency from "../../interfaces/Currency.interface";
import { exchange } from "../../state/ducks/wallet/actions";

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
  position: relative;
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
  position: relative;
`;

const Button = styled.button`
  border-radius: 30px;
  color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 17%;
  height: 52px;
  font-weight: bold;
  margin-top: 90px;
  background-color: #f51f90;
  opacity: ${props => (props.disabled ? 0.4 : 1)};
  box-shadow: 2px 10px 30px -17px rgba(245, 31, 144, 1);
  border: none;
  outline: none;
  transition: all 0.3s ease-in-out;

  &:hover {
    cursor: pointer;
  }
`;

const ExchangePage: React.FC = () => {
  const [fromAmount, setFromAmount] = useState(0);
  const [toAmount, setToAmount] = useState(0);
  const [fromCurrency, setFromCurrency] = useState<Currency | null>(null);
  const [toCurrency, setToCurrency] = useState<Currency | null>(null);
  const [exchangeRate, setExchangeRate] = useState<number | null>(null);
  const dispatch = useDispatch();
  const pockets = useSelector((state: AppState) => state.WalletReducer.pockets);
  const exceedsBalance = useSelector((state: AppState) => {
    if (fromCurrency) {
      const pocket = state.WalletReducer.pockets.find(
        p => p.currency.base === fromCurrency.base
      );

      if (pocket && pocket.amount >= fromAmount) {
        return false;
      }
    }

    return true;
  });

  const updateExchangeRate = async (
    from: Currency | null,
    to: Currency | null
  ) => {
    if (from && to) {
      const rate = await getRate(from.base, to.base);
      if (rate) {
        setExchangeRate(rate);
        setToAmount(fromAmount * rate);
      }
    }
  };

  useEffect(() => {
    setFromCurrency(pockets[0] ? pockets[0].currency : null);
    setToCurrency(pockets[1] ? pockets[1].currency : null);
  }, []);

  useEffect(() => {
    updateExchangeRate(fromCurrency, toCurrency);

    const interval = setInterval(() => {
      updateExchangeRate(fromCurrency, toCurrency);
    }, 10000);

    return () => {
      clearInterval(interval);
    };
  }, [fromCurrency, toCurrency]);

  const getNextCurrency = (c: Currency): Currency | null => {
    const pocketIndex = pockets.findIndex(p => p.currency.base === c.base);

    if (pocketIndex === pockets.length - 1 && pockets[0]) {
      return pockets[0].currency;
    } else if (pockets[pocketIndex + 1]) {
      return pockets[pocketIndex + 1].currency;
    }

    return null;
  };

  const onExchange = () => {
    if (fromCurrency && toCurrency && exchangeRate && fromAmount > 0) {
      dispatch(exchange(fromCurrency, toCurrency, exchangeRate, fromAmount));
      setFromAmount(0);
      setToAmount(0);
    }
  };

  return (
    <Container>
      <TopSection>
        <Content>
          <CurrencyInput
            value={fromAmount}
            currency={fromCurrency}
            onAmountChange={(v: number) => {
              setFromAmount(v);
              if (exchangeRate) {
                setToAmount(v * exchangeRate);
              }
            }}
            onCurrencyChange={(v: Currency) => {
              setFromCurrency(v);
              if (toCurrency && v.base === toCurrency.base) {
                setToCurrency(getNextCurrency(toCurrency));
              }
              updateExchangeRate(v, toCurrency);
            }}
            exceedsBalance={exceedsBalance}
          />
        </Content>
      </TopSection>
      <BottomSection>
        <ExchangeIndicator
          rate={exchangeRate}
          fromCurrency={fromCurrency}
          toCurrency={toCurrency}
        />
        <Content>
          <CurrencyInput
            value={toAmount}
            currency={toCurrency}
            onAmountChange={(v: number) => {
              setToAmount(v);
              if (exchangeRate) {
                setFromAmount(v / exchangeRate);
              }
            }}
            onCurrencyChange={(v: Currency) => {
              setToCurrency(v);
              if (fromCurrency && v.base === fromCurrency.base) {
                setFromCurrency(getNextCurrency(fromCurrency));
              }
              updateExchangeRate(fromCurrency, v);
            }}
          />
        </Content>
        <Button
          disabled={fromAmount === 0 || toAmount === 0 || exceedsBalance}
          onClick={onExchange}
        >
          Exchange
        </Button>
      </BottomSection>
    </Container>
  );
};

export default ExchangePage;
