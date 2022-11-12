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