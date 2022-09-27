import React, { useState } from 'react';

const Categories = ({ value, onSelectCategorie }) => {
  const categories = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые'];

  return (
    <div className="categories">
      <ul>
        {categories.map((cat, i) => (
          <li key={i} className={i === value ? 'active' : ''} onClick={() => onSelectCategorie(i)}>
            {cat}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Categories;
