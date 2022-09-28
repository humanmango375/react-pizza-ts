import React from 'react';
import { useContext } from 'react';
import { SearchContext } from '../../App';
import s from './Search.module.scss';

const Search = () => {
  const { searchValue, setSearchValue } = useContext(SearchContext);

  return (
    <>
      <input
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
        className={s.root}
        type="text"
        placeholder="Поиск"
      />
    </>
  );
};

export default Search;
