import { RootState } from "../../store";

export const cartSelector = (state: RootState) => state.cart;
export const totalPriceSelector = (state: RootState) => state.cart.totalPrice;
export const itemByIdSelector = (id: number) => (state: RootState) =>
  state.cart.items.find((obj) => +obj.id === id);