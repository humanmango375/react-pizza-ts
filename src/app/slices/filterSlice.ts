import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

export enum SortNames {
  RATING = 'rating',
  PRICE = 'price',
  NAME = 'name',
}

export type SortItemType = {
  name: SortNames;
  title: 'популярности' | 'цене' | 'алфавиту';
};

export interface FilterSliceState {
  categoryId: number;
  searchValue: string;
  sort: SortItemType;
  currentPage: number;
}

const initialState: FilterSliceState = {
  categoryId: 0,
  searchValue: '',
  sort: {
    name: SortNames.RATING,
    title: 'популярности',
  },
  currentPage: 1,
};

export const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setCategoryId(state, action: PayloadAction<number>) {
      state.categoryId = action.payload;
    },
    setSearchValue(state, action: PayloadAction<string>) {
      state.searchValue = action.payload;
    },
    setSort(state, action: PayloadAction<SortItemType>) {
      state.sort = action.payload;
    },
    setCurrentPage(state, action: PayloadAction<number>) {
      state.currentPage = action.payload;
    },
    setFilters(state, action: PayloadAction<FilterSliceState>) {
      state.currentPage = Number(action.payload.currentPage);
      state.categoryId = Number(action.payload.categoryId);
      state.sort = action.payload.sort;
    },
  },
});

// Selectors
export const sortSelector = (state: RootState) => state.filter.sort;
export const filterSelector = (state: RootState) => state.filter;
export const searchValueSelector = (state: RootState) => state.filter.searchValue;

// Action creators are generated for each case reducer function
export const { setCategoryId, setSort, setSearchValue, setCurrentPage, setFilters } =
  filterSlice.actions;

export default filterSlice.reducer;
