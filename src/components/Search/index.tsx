import debounce from 'lodash.debounce';
import { useState, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { searchValueSelector } from '../../app/slices/filter/selectors';
import { setSearchValue } from '../../app/slices/filter/slice';
import s from './Search.module.scss';

const Search = () => {
  const searchValue = useSelector(searchValueSelector);
  const dispatch = useDispatch();
  const [value, setValue] = useState('');

  const delayedSearch = useCallback(
    debounce((str) => {
      dispatch(setSearchValue(str));
    }, 1000),
    [],
  );

  const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
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
