import React from 'react';

const Categories = ({ value, onChangeCategory }) => {
  const categories = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые'];

  return (
    <div className="categories">
      <ul>
        {categories.map((cat, i) => (
          <li key={i} className={i === value ? 'active' : ''} onClick={() => onChangeCategory(i)}>
            {cat}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Categories;
