import React from 'react';
import { Link } from 'react-router-dom';
import PizzaItem from './PizzaItem';
import PizzaSkeleton from './PizzaItem/PizzaItemSkeleton';

interface ItemsProps {
  pizzas: any;
  status: string;
}

const Items: React.FC<ItemsProps> = ({ pizzas, status }) => {
  const pizzasList = pizzas.map((pizza: any) => <PizzaItem key={pizza.id} {...pizza} />);
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
