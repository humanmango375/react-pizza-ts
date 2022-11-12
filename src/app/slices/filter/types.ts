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
