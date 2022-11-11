import React from 'react';
import Categories from '../components/Categories';
import Items from '../components/Items';
import Sort from '../components/Sort';
import { useEffect, useRef } from 'react';
import Pagination from '../components/Pagination';
import { useSelector } from 'react-redux';
import {
  filterSelector,
  searchValueSelector,
  setCategoryId,
  setCurrentPage,
  setFilters,
} from '../app/slices/filterSlice';
import { useNavigate } from 'react-router-dom';
import { sortTitles } from '../components/Sort';
import qs from 'qs';
import { fetchPizzas, pizzasSelector, SearchPizzaParams } from '../app/slices/pizzasSlice';
import { useAppDispatch } from '../app/store';

const Home: React.FC = () => {
  const { categoryId, sort, currentPage } = useSelector(filterSelector);
  const searchValue = useSelector(searchValueSelector);
  const isSearch = useRef(false);
  const isMounted = useRef(false);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { items: pizzas, status } = useSelector(pizzasSelector);

  const onChangeCategory = (idx: number) => {
    dispatch(setCategoryId(idx));
  };

  const onChangePage = (page: number) => {
    dispatch(setCurrentPage(page));
  };
  const filteredPizzas = pizzas.filter((item: any) =>
    item.name.toLowerCase().includes(searchValue.toLowerCase()),
  );
  const getPizzas = async () => {
    const search = searchValue ? `&search=${searchValue}` : '';
    const sortBy = sort.name;
    dispatch(
      fetchPizzas({
        categoryId: String(categoryId),
        sortBy,
        search,
        currentPage: String(currentPage),
      })!,
    );
    window.scrollTo(0, 0);
  };

  useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1));
      const sort = sortTitles.find((obj) => obj.name === params.sortName);
      if (sort) {
        dispatch(
          setFilters({
            categoryId: Number(params.categoryId),
            searchValue,
            currentPage: Number(params.currentPage),
            sort,
          }),
        );
      }

      isSearch.current = true;
    }
  }, []);

  useEffect(() => {
    if (!isSearch.current) {
      getPizzas();
    }
    isSearch.current = false;
  }, [categoryId, sort, searchValue, currentPage]);

  useEffect(() => {
    if (isMounted.current) {
      const queryString = qs.stringify({
        sortName: sort.name,
        categoryId,
        currentPage,
      });
      navigate(`?${queryString}`);
    }
    isMounted.current = true;
  }, [categoryId, sort, currentPage]);

  return (
    <div className="container">
      <div className="content__top">
        <Categories value={categoryId} onChangeCategory={onChangeCategory} />
        <Sort />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <Items pizzas={filteredPizzas} status={status} />
      <Pagination currentPage={currentPage} onChangePage={onChangePage} />
    </div>
  );
};

export default Home;
