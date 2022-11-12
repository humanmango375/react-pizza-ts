import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { PizzaSliceState, Status, Pizza, SearchPizzaParams } from './types';

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

export const { setItems } = pizzasSlice.actions;

export default pizzasSlice.reducer;
