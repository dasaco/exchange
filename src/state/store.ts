import { createStore, compose, Store } from "redux";
import { WalletState } from './ducks/wallet/reducers';
import rootReducer from "./rootReducer";

export interface AppState {
  WalletReducer: WalletState;
}

let composeEnhancers = compose;

if (process.env.NODE_ENV !== "production") {
  if ((window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) {
    composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;
  }
}

const store: Store<AppState> = createStore(
  rootReducer,
  composeEnhancers()
);

export default store;
