import { RootState } from './../store';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { SortItemType } from './filterSlice';

type Pizza = {
  id: string;
  category: number;
  name: string;
  sizes: number[];
  types: number[];
  price: number;
  rating: number;
  imageUrl: string;
};

type FetchPizzasArgs = Record<string, string>;

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

interface PizzaSliceState {
  items: Pizza[];
  status: Status;
}

const initialState: PizzaSliceState = {
  items: [],
  status: Status.LOADING,
};

export const fetchPizzas = createAsyncThunk<Pizza[], SearchPizzaParams>(
  'pizza/fetchPizzasStatus',
  async ({ categoryId, sortBy, search, currentPage }) => {
    const { data } = await axios.get<Pizza[]>(
      `https://62f4e313535c0c50e764a03d.mockapi.io/pizzas?page=${currentPage}&limit=4&${
        categoryId != '0' ? `category=${categoryId}` : ''
      }${search}&sortBy=${sortBy}`,
    );
    return data;
  },
);

const pizzasSlice = createSlice({
  name: 'pizzas',
  initialState,
  reducers: {
    setItems(state, action) {
      state.items = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPizzas.pending, (state, action) => {
      state.items = [];
      state.status = Status.LOADING;
    });

    builder.addCase(fetchPizzas.fulfilled, (state, action) => {
      state.items = action.payload;
      state.status = Status.SUCCESS;
    });

    builder.addCase(fetchPizzas.rejected, (state, action) => {
      state.items = [];
      state.status = Status.ERROR;
    });
  },
});

// Selectors
export const pizzasSelector = (state: RootState) => state.pizza;

export const { setItems } = pizzasSlice.actions;

export default pizzasSlice.reducer;
