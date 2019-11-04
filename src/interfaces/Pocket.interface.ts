import Currency from './Currency.interface';

export default interface Pocket {
  id: number;
  amount: number;
  currency: Currency;
}