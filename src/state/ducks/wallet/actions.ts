import { action, ActionType } from "typesafe-actions";
import Pocket from "../../../interfaces/Pocket.interface";
import types from "./types";
import Currency from '../../../interfaces/Currency.interface';

export const exchange = (fromCurrency: Currency, toCurrency: Currency, rate: number, amount: number) =>
  action(types.EXCHANGE, { fromCurrency, toCurrency, rate, amount });

const actions = {
  exchange
}

export type WalletActionTypes = ActionType<typeof actions>;

export default actions;
