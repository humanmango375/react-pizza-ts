import React from 'react';
import Categories from '../components/Categories';
import Items from '../components/Items';
import Sort from '../components/Sort';

const Home = ({ pizzas, isLoading }) => {
  return (
    <div className="content">
      <div className="container">
        <div className="content__top">
          <Categories />
          <Sort />
        </div>
        <h2 className="content__title">Все пиццы</h2>
        <Items pizzas={pizzas} isLoading={isLoading} />
      </div>
    </div>
  );
};

export default Home;
