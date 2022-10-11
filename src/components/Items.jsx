import React from 'react';
import PizzaItem from './PizzaItem';
import PizzaSkeleton from './PizzaItem/PizzaItemSkeleton';

const Items = ({ pizzas, status }) => {
  const pizzasList = pizzas.map((pizza) => <PizzaItem key={pizza.id} {...pizza} />);
  const skeletons = [...new Array(8)].map((_, i) => <PizzaSkeleton key={i} />);

  return (
    <>
      {status === 'error' ? (
        <h2>Произошла ошибка</h2>
      ) : (
        <div className="content__items">{status === 'loading' ? skeletons : pizzasList}</div>
      )}
    </>
  );
};

export default Items;
