export type Pizza = {
  id: string;
  category: number;
  name: string;
  sizes: number[];
  types: number[];
  price: number;
  rating: number;
  imageUrl: string;
};

export type FetchPizzasArgs = Record<string, string>;

export enum Status {
  LOADING = 'loading',
  SUCCESS = 'success',
  ERROR = 'error',
}

export type SearchPizzaParams = {
  categoryId: string;
  sortBy: string;
  search: string;
  currentPage: string;
};

export interface PizzaSliceState {
  items: Pizza[];
  status: Status;
}
