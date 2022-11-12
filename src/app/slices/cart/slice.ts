import { RootState } from '../../store';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import getCartFromLocalStorage from '../../../utils/getCartFromLocalStorage';
import calcTotalPrice from '../../../utils/calcTotalPrice';
import { CartSliceState, ICartItem } from './types';

const { items, totalPrice } = getCartFromLocalStorage();

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

export const { addCartItem, removeCartItem, decrementItem, clearCart } = cartSlice.actions;

export default cartSlice.reducer;
