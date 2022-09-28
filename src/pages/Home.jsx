import React from 'react';
import { useState } from 'react';
import Categories from '../components/Categories';
import Items from '../components/Items';
import Sort from '../components/Sort';
import axios from 'axios';
import { useEffect } from 'react';
import Pagination from '../components/Pagination';
import { useContext } from 'react';
import { SearchContext } from '../App';

const Home = () => {
  const [pizzas, setPizzas] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [categorie, setCategorie] = useState(0);
  const [page, setPage] = useState(1);
  const [sort, setSort] = useState({ name: 'rating', title: 'популярности' });

  const { searchValue } = useContext(SearchContext);

  const filteredPizzas = pizzas.filter((item) =>
    item.name.toLowerCase().includes(searchValue.toLowerCase()),
  );

  useEffect(() => {
    const search = searchValue ? `&search=${searchValue}` : '';
    setIsLoading(true);
    axios
      .get(
        `https://62f4e313535c0c50e764a03d.mockapi.io/pizzas?page=${page}&limit=4&${
          categorie !== 0 ? `category=${categorie}` : ''
        }${search}&sortBy=${sort.name}`,
      )
      .then((response) => {
        setPizzas(response.data);
        setIsLoading(false);
        window.scrollTo(0, 0);
      });
  }, [categorie, sort, searchValue, page]);

  return (
    <div className="content">
      <div className="container">
        <div className="content__top">
          <Categories value={categorie} onSelectCategorie={(i) => setCategorie(i)} />
          <Sort value={sort} changeSort={(i) => setSort(i)} />
        </div>
        <h2 className="content__title">Все пиццы</h2>
        <Items pizzas={filteredPizzas} isLoading={isLoading} />
        <Pagination onChangePage={(page) => setPage(page)} />
      </div>
    </div>
  );
};

export default Home;
