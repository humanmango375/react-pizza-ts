import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  items: [],
  status: 'loading',
};

export const fetchPizzas = createAsyncThunk(
  'pizza/fetchPizzasStatus',
  async ({ categoryId, sort, search, currentPage }) => {
    const { data } = await axios.get(
      `https://62f4e313535c0c50e764a03d.mockapi.io/pizzas?page=${currentPage}&limit=4&${
        categoryId !== 0 ? `category=${categoryId}` : ''
      }${search}&sortBy=${sort.name}`,
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
  extraReducers: {
    [fetchPizzas.fulfilled]: (state, action) => {
      state.items = action.payload;
      state.status = 'success';
    },
    [fetchPizzas.rejected]: (state) => {
      state.items = [];
      state.status = 'error';
    },
    [fetchPizzas.pending]: (state) => {
      state.items = [];
      state.status = 'loading';
    },
  },
});

// Selectors
export const pizzasSelector = (state) => state.pizza;

export const { setItems } = pizzasSlice.actions;

export default pizzasSlice.reducer;
