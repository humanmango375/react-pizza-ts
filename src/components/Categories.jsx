import React, { useState } from 'react';

const Categories = () => {
  const categories = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые'];
  const [categorie, setCategorie] = useState(0);

  const onSelectCategorie = (index) => {
    setCategorie(index);
  };

  return (
    <div className="categories">
      <ul>
        {categories.map((cat, index) => (
          <li
            key={index}
            className={index === categorie ? 'active' : ''}
            onClick={() => onSelectCategorie(index)}>
            {cat}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Categories;
