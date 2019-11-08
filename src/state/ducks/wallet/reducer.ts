import { Reducer } from "redux";
import Pocket from "../../../interfaces/Pocket.interface";
import { types } from ".";
import pockets from "../../../mock/pockets";

export interface WalletState {
  pockets: Pocket[];
}

const initialState: WalletState = {
  pockets: pockets
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
              amount: parseFloat(
                (p.amount + payload.amount * payload.rate).toFixed(2)
              )
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
