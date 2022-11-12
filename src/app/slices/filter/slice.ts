import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { FilterSliceState, SortNames, SortItemType } from './types';

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

// Action creators are generated for each case reducer function
export const { setCategoryId, setSort, setSearchValue, setCurrentPage, setFilters } =
  filterSlice.actions;

export default filterSlice.reducer;
