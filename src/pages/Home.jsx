import React from 'react';
import Categories from '../components/Categories';
import Items from '../components/Items';
import Sort from '../components/Sort';
import axios from 'axios';
import { useEffect, useContext, useState, useRef } from 'react';
import Pagination from '../components/Pagination';
import { SearchContext } from '../App';
import { useDispatch, useSelector } from 'react-redux';
import { setCategoryId, setCurrentPage, setFilters } from '../app/slices/filterSlice';
import { useNavigate } from 'react-router-dom';
import { sortTitles } from '../components/Sort';
import qs from 'qs';

const Home = () => {
  const [pizzas, setPizzas] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { categoryId, sort, currentPage } = useSelector((state) => state.filter);
  const { searchValue } = useContext(SearchContext);
  const isSearch = useRef(false);
  const isMounted = useRef(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onChangeCategory = (id) => {
    dispatch(setCategoryId(id));
  };

  const onChangePage = (page) => {
    dispatch(setCurrentPage(page));
  };
  const filteredPizzas = pizzas.filter((item) =>
    item.name.toLowerCase().includes(searchValue.toLowerCase()),
  );

  const fetchPizzas = () => {
    setIsLoading(true);
    const search = searchValue ? `&search=${searchValue}` : '';
    axios
      .get(
        `https://62f4e313535c0c50e764a03d.mockapi.io/pizzas?page=${currentPage}&limit=4&${
          categoryId !== 0 ? `category=${categoryId}` : ''
        }${search}&sortBy=${sort.name}`,
      )
      .then((response) => {
        setPizzas(response.data);
        setIsLoading(false);
        window.scrollTo(0, 0);
      });
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
      fetchPizzas();
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
        <Items pizzas={filteredPizzas} isLoading={isLoading} />
        <Pagination currentPage={currentPage} onChangePage={onChangePage} />
      </div>
    </div>
  );
};

export default Home;
