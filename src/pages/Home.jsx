import React from 'react';
import Categories from '../components/Categories';
import Items from '../components/Items';
import Sort from '../components/Sort';
import { useEffect, useRef } from 'react';
import Pagination from '../components/Pagination';
import { useDispatch, useSelector } from 'react-redux';
import { filterSelector, searchValueSelector, setCategoryId, setCurrentPage, setFilters } from '../app/slices/filterSlice';
import { useNavigate } from 'react-router-dom';
import { sortTitles } from '../components/Sort';
import qs from 'qs';
import { fetchPizzas, pizzasSelector } from '../app/slices/pizzasSlice';

const Home = () => {
  const { categoryId, sort, currentPage } = useSelector(filterSelector);
  const searchValue = useSelector(searchValueSelector);
  const isSearch = useRef(false);
  const isMounted = useRef(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { items: pizzas, status } = useSelector(pizzasSelector);

  const onChangeCategory = (id) => {
    dispatch(setCategoryId(id));
  };

  const onChangePage = (page) => {
    dispatch(setCurrentPage(page));
  };
  const filteredPizzas = pizzas.filter((item) =>
    item.name.toLowerCase().includes(searchValue.toLowerCase()),
  );
  const getPizzas = async () => {
    const search = searchValue ? `&search=${searchValue}` : '';

    dispatch(fetchPizzas({ categoryId, sort, search, currentPage }));
    window.scrollTo(0, 0);
  };

  useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1));
      const sort = sortTitles.find((obj) => obj.name === params.sortName);
      dispatch(
        setFilters({
          ...params,
          sort,
        }),
      );
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
    <div className="content">
      <div className="container">
        <div className="content__top">
          <Categories value={categoryId} onChangeCategory={onChangeCategory} />
          <Sort />
        </div>
        <h2 className="content__title">Все пиццы</h2>
        <Items pizzas={filteredPizzas} status={status} />
        <Pagination currentPage={currentPage} onChangePage={onChangePage} />
      </div>
    </div>
  );
};

export default Home;
