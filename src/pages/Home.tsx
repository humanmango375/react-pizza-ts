import qs from "qs";
import React, { useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { filterSelector, searchValueSelector } from "../app/slices/filter/selectors";
import { setCategoryId, setCurrentPage, setFilters } from "../app/slices/filter/slice";
import { pizzasSelector } from "../app/slices/pizza/selectors";
import { fetchPizzas } from "../app/slices/pizza/slice";
import { useAppDispatch } from "../app/store";
import Categories from "../components/Categories";
import Items from "../components/Items";
import Pagination from "../components/Pagination";
import Sort, { sortTitles } from "../components/Sort";


const Home: React.FC = () => {
  const { categoryId, sort, currentPage } = useSelector(filterSelector);
  const searchValue = useSelector(searchValueSelector);
  const isSearch = useRef(false);
  const isMounted = useRef(false);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { items: pizzas, status } = useSelector(pizzasSelector);

  const onChangeCategory = React.useCallback((idx: number) => {
    dispatch(setCategoryId(idx));
  }, []);

  const onChangePage = React.useCallback((page: number) => {
    dispatch(setCurrentPage(page));
  }, []);

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
      }),
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
