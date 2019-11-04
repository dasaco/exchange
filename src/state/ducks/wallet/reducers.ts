import { Reducer } from "redux";
import Pocket from "../../../interfaces/Pocket.interface";
import { types } from ".";

export interface WalletState {
  pockets: Pocket[];
}

const initialState: WalletState = {
  pockets: [
    {
      id: 1,
      amount: 10,
      currency: {
        base: "GBP",
        imagePath: "",
        prefix: "£"
      }
    },
    {
      id: 2,
      amount: 30,
      currency: {
        base: "EUR",
        imagePath: "",
        prefix: "€"
      }
    },
    {
      id: 3,
      amount: 50,
      currency: {
        base: "USD",
        imagePath: "",
        prefix: "$"
      }
    }
  ]
};

const reducer: Reducer<WalletState> = (
  state = initialState,
  { type, payload }
) => {
  switch (type) {
    case types.EXCHANGE: {
      const fromPocket = state.pockets.find(
        p => p.currency.base === payload.fromCurrency.base
      );
      const toPocket = state.pockets.find(
        p => p.currency.base === payload.toCurrency.base
      );

      console.log({ payload });

      if (!fromPocket || !toPocket) {
        return state;
      }

      return {
        ...state,
        pockets: state.pockets.map(p => {
          if (p.currency.base === fromPocket.currency.base) {
            return {
              ...p,
              amount: p.amount - payload.amount
            };
          } else if (p.currency.base === toPocket.currency.base) {
            return {
              ...p,
              amount: p.amount + payload.amount * payload.rate
            };
          }

          return p;
        })
      };
    }

    default:
      return state;
  }
};

export default reducer;
