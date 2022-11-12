import { ICartItem } from "../app/slices/cart/types";

const calcTotalPrice = (items: ICartItem[]): number => {
  return items.reduce((prev, current) => prev + current.price * current.count, 0);
};

export default calcTotalPrice;
