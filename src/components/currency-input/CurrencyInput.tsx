import React from "react";
import styled from "styled-components";
import CurrencySelector from "../currency-selector/CurrencySelector";
import { useSelector } from "react-redux";
import { AppState } from "../../state/store";
import Currency from "../../interfaces/Currency.interface";
import { getMoneyString } from "../../services/exchange";
import MaskedInput from "react-text-mask";
import createNumberMask from "text-mask-addons/dist/createNumberMask";
import {
  Container,
  Top,
  LeftSide,
  RightSide,
  BottomLine,
  BalanceText,
  ExceedsBalanceText
} from "./CurrencyInput.style";

type Props = {
  value: number;
  currency: Currency | null;
  onAmountChange: Function;
  onCurrencyChange: Function;
  exceedsBalance?: boolean;
};

const CurrencyInput: React.FC<Props> = ({
  value,
  currency,
  onAmountChange,
  onCurrencyChange,
  exceedsBalance
}) => {
  const pocket = useSelector((state: AppState) =>
    currency
      ? state.WalletReducer.pockets.find(p => p.currency.base === currency.base)
      : null
  );

  const moveCaretToEnd = (e: React.ChangeEvent<HTMLInputElement>) => {
    const temp_value = e.target.value;
    e.target.value = "";
    e.target.value = temp_value;
  };

  return (
    <Container>
      <Top>
        <LeftSide>
          <CurrencySelector currency={currency} onChange={onCurrencyChange} />
        </LeftSide>
        <RightSide>
          <MaskedInput
            mask={createNumberMask({
              allowDecimal: true,
              prefix: "",
              thousandsSeparatorSymbol: " "
            })}
            guide={false}
            placeholder="0"
            value={value === 0 ? "" : value.toString()}
            onChange={e => {
              if (e.target.value && e.target.value.trim() !== "") {
                const numericAmount = Number(
                  parseFloat(e.target.value.replace(" ", "")).toFixed(2)
                );
                onAmountChange(numericAmount);
              } else {
                onAmountChange(0);
              }
            }}
            style={{
              border: "none",
              fontSize: 39,
              textAlign: "right",
              outline: "none",
              backgroundColor: "transparent",
              color: exceedsBalance || value <= 0 ? "#8b8b8b" : "#292929"
            }}
            onFocus={moveCaretToEnd}
          />
        </RightSide>
      </Top>
      <BottomLine>
        <BalanceText isHighlighed={exceedsBalance || false}>
          {pocket &&
            `Balance: ${getMoneyString(pocket.amount, pocket.currency)}`}
        </BalanceText>
        <ExceedsBalanceText>
          {exceedsBalance && "exceeds balance"}
        </ExceedsBalanceText>
      </BottomLine>
    </Container>
  );
};

export default CurrencyInput;
