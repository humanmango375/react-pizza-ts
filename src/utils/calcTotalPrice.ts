import { ICartItem } from './../app/slices/cartSlice';
const calcTotalPrice = (items: ICartItem[]): number => {
  return items.reduce((prev, current) => prev + current.price * current.count, 0);
};

export default calcTotalPrice;
