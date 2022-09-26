import React from 'react';
import PizzaItem from './PizzaItem';
import PizzaSkeleton from './PizzaItem/PizzaItemSkeleton';

const Items = ({ pizzas, isLoading }) => {
  return (
    <div className="content__items">
      {isLoading 
      ? [... new Array(6)].map((_, i) => <PizzaSkeleton  key={i} />)
      : pizzas.map((pizza) => <PizzaItem key={pizza.id} {...pizza}/> )}
    </div>
  );
};

export default Items;
