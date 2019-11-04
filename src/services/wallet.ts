import Pocket from '../interfaces/Pocket.interface';

export const isBalanceEnough = (pocket: Pocket, amount: number) => {
  return pocket.amount > amount
}