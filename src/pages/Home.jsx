import React from 'react';
import { useState } from 'react';
import Categories from '../components/Categories';
import Items from '../components/Items';
import Sort from '../components/Sort';
import axios from 'axios';
import { useEffect } from 'react';

const Home = () => {
  const [pizzas, setPizzas] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [categorie, setCategorie] = useState(0);
  const [sort, setSort] = useState({ name: 'rating', title: 'популярности' });

  useEffect(() => {
    setIsLoading(true);
    axios
      .get(
        `https://62f4e313535c0c50e764a03d.mockapi.io/pizzas?${
          categorie !== 0 ? `category=${categorie}` : ''
        }&sortBy=${sort.name}`,
      )
      .then((response) => {
        setPizzas(response.data);
        setIsLoading(false);
        window.scrollTo(0, 0);
      });
  }, [categorie, sort]);

  return (
    <div className="content">
      <div className="container">
        <div className="content__top">
          <Categories value={categorie} onSelectCategorie={(i) => setCategorie(i)} />
          <Sort value={sort} changeSort={(i) => setSort(i)} />
        </div>
        <h2 className="content__title">Все пиццы</h2>
        <Items pizzas={pizzas} isLoading={isLoading} />
      </div>
    </div>
  );
};

export default Home;
