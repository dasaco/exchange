import configureMockStore from "redux-mock-store";
import reducer, { actions } from ".";

describe("wallet redux", () => {
  const pockets = [
    {
      id: 1,
      amount: 50,
      currency: {
        base: "GBP",
        imagePath: "https://www.countryflags.io/gb/flat/64.png",
        prefix: "£"
      }
    },
    {
      id: 2,
      amount: 30,
      currency: {
        base: "EUR",
        imagePath: "https://www.countryflags.io/eu/flat/64.png",
        prefix: "€"
      }
    },
    {
      id: 3,
      amount: 50,
      currency: {
        base: "USD",
        imagePath: "https://www.countryflags.io/us/flat/64.png",
        prefix: "$"
      }
    }
  ];

  it("works with whole amount", async () => {
    const firstPocket = pockets[0];
    const secondPocket = pockets[1];
    const rate = 1.254;
    const amount = 14;

    const store = reducer(
      { pockets },
      actions.exchange(
        firstPocket.currency,
        secondPocket.currency,
        rate,
        amount
      )
    );

    expect(store.pockets[0].amount).toBe(36);
    expect(store.pockets[1].amount).toBe(47.56);
  });

  it("works with decimal amount", async () => {
    const firstPocket = pockets[0];
    const secondPocket = pockets[1];
    const rate = 1.254;
    const amount = 1.2;

    const store = reducer(
      { pockets },
      actions.exchange(
        firstPocket.currency,
        secondPocket.currency,
        rate,
        amount
      )
    );

    expect(store.pockets[0].amount).toBe(48.8);
    expect(store.pockets[1].amount).toBe(31.5);
  });
});
