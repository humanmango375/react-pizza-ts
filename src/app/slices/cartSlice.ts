import { RootState } from './../store';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import getCartFromLocalStorage from '../../utils/getCartFromLocalStorage';
import calcTotalPrice from '../../utils/calcTotalPrice';

export interface ICartItem {
  id: string;
  name: string;
  imageUrl: string;
  type: string;
  size: number;
  price: number;
  count: number;
}

export interface CartSliceState {
  totalPrice: number;
  items: ICartItem[];
}

const { items, totalPrice } = getCartFromLocalStorage()

const initialState: CartSliceState = {
  totalPrice,
  items,
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addCartItem(state, action: PayloadAction<ICartItem>) {
      const findItem = state.items.find((item) => item.id === action.payload.id);
      if (findItem) {
        findItem.count++;
      } else {
        state.items.push({
          ...action.payload,
          count: 1,
        });
      }
      state.totalPrice = state.items.reduce(
        (prev, current) => prev + current.price * current.count,
        0,
      );
    },
    removeCartItem(state, action: PayloadAction<string>) {
      state.items = state.items.filter((obj) => obj.id !== action.payload);
      state.totalPrice = state.items.reduce(
        (prev, current) => prev + current.price * current.count,
        0,
      );
    },
    decrementItem(state, action: PayloadAction<string>) {
      const findItem = state.items.find((item) => item.id === action.payload);
      if (findItem) {
        findItem.count--;
      }
      state.totalPrice = calcTotalPrice(state.items);
    },
    clearCart(state) {
      state.items = [];
      state.totalPrice = 0;
    },
  },
});

// SELECTORS
export const cartSelector = (state: RootState) => state.cart;
export const totalPriceSelector = (state: RootState) => state.cart.totalPrice;
export const itemByIdSelector = (id: number) => (state: RootState) =>
  state.cart.items.find((obj) => +obj.id === id);

export const { addCartItem, removeCartItem, decrementItem, clearCart } = cartSlice.actions;

export default cartSlice.reducer;
