import { CartSliceState } from '../app/slices/cart/types';
import calcTotalPrice from './calcTotalPrice';

const getCartFromLocalStorage = (): CartSliceState => {
  const data = localStorage.getItem('cart');
  const items = data ? JSON.parse(data) : [];

  return { items, totalPrice: calcTotalPrice(items) };
};

export default getCartFromLocalStorage;
