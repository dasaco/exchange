import Currency from "../interfaces/Currency.interface";

export const getRate = async (
  fromCurrency: string,
  toCurrency: string
): Promise<number | null> => {
  if (fromCurrency === toCurrency) {
    return 1;
  }

  const res = await fetch(
    `https://api.exchangeratesapi.io/latest?base=${fromCurrency}`
  );
  const result = await res.json();

  if (result && result.rates) {
    return result.rates[toCurrency];
  }

  return null;
};

export const getMoneyString = (amount: number, currency: Currency) => {
  return `${currency.prefix || ""}${amount.toFixed(2)}${currency.postfix ||
    ""}`;
};

export default {
  getRate
};
