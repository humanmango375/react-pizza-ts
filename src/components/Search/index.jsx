import React from 'react';
import { useContext } from 'react';
import { SearchContext } from '../../App';
import s from './Search.module.scss';
import debounce from 'lodash.debounce';
import { useState, useCallback } from 'react';

const Search = () => {
  const { setSearchValue } = useContext(SearchContext);
  const [ value, setValue ]= useState('');

  const delayedSearch = useCallback(
    debounce((str) => {
      setSearchValue(str);
    }, 1000), []
  );

  const onChangeInput = (e) => {
    setValue(e.target.value);
    delayedSearch(e.target.value);
  };

  return (
    <>
      <input
        value={value}
        onChange={onChangeInput}
        className={s.root}
        type="text"
        placeholder="Поиск"
      />
    </>
  );
};

export default Search;
