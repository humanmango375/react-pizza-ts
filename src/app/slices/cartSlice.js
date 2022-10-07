import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  totalPrice: 0,
  items: [],
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addCartItem(state, action) {
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
    removeCartItem(state, action) {
      state.items = state.items.filter((obj) => obj.id !== action.payload);
      state.totalPrice = state.items.reduce(
        (prev, current) => prev + current.price * current.count,
        0,
      );
    },
    decrementItem(state, action) {
      state.items.find((item) => item.id === action.payload).count--;
      state.totalPrice = state.items.reduce(
        (prev, current) => prev + current.price * current.count,
        0,
      );
    },
    clearCart(state) {
      state.items = [];
      state.totalPrice = 0;
    },
  },
});

export const { addCartItem, removeCartItem, decrementItem, clearCart } = cartSlice.actions;

export default cartSlice.reducer;
