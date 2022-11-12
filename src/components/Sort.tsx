import React, { useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { sortSelector } from "../app/slices/filter/selectors";
import { setSort } from "../app/slices/filter/slice";
import { SortItemType, SortNames } from "../app/slices/filter/types";

type PopupClick = React.MouseEvent<HTMLBodyElement> & {
  path: Node[]
}

export const sortTitles: SortItemType[] = [
  { name: SortNames.RATING, title: 'популярности' },
  { name: SortNames.PRICE, title: 'цене' },
  { name: SortNames.NAME, title: 'алфавиту' },
];

const Sort = React.memo(() => {
  const sort = useSelector(sortSelector);
  const dispatch = useDispatch();
  const sortRef = useRef(null);
  const [showPopup, setShowPopup] = useState(false);

  const onSortSelect = (obj: SortItemType) => {
    dispatch(setSort(obj));
    setShowPopup(false);
  };

  React.useEffect(() => {
    const handleClickOutsideSort = (e: MouseEvent) => {
      const _event = e as MouseEvent & {
        path: Node[];
      };
      if (sortRef.current && !_event.path.includes(sortRef.current)) {
        setShowPopup(false);
      }
    };
    document.body.addEventListener('click', handleClickOutsideSort);

    return () => {
      document.body.removeEventListener('click', handleClickOutsideSort);
    };
  }, []);

  return (
    <div ref={sortRef} className="sort">
      <div className="sort__label">
        <svg
          style={{ transform: showPopup ? 'rotate(180deg)' : '' }}
          width="10"
          height="6"
          viewBox="0 0 10 6"
          fill="none"
          xmlns="http://www.w3.org/2000/svg">
          <path
            d="M10 5C10 5.16927 9.93815 5.31576 9.81445 5.43945C9.69075 5.56315 9.54427 5.625 9.375 5.625H0.625C0.455729 5.625 0.309245 5.56315 0.185547 5.43945C0.061849 5.31576 0 5.16927 0 5C0 4.83073 0.061849 4.68424 0.185547 4.56055L4.56055 0.185547C4.68424 0.061849 4.83073 0 5 0C5.16927 0 5.31576 0.061849 5.43945 0.185547L9.81445 4.56055C9.93815 4.68424 10 4.83073 10 5Z"
            fill="#2C2C2C"
          />
        </svg>
        <b>Сортировка по:</b>
        <span onClick={() => setShowPopup(!showPopup)}>{sort.title}</span>
      </div>
      {showPopup && (
        <div className="sort__popup">
          <ul>
            {sortTitles.map((obj, index) => (
              <li
                onClick={() => onSortSelect(obj)}
                className={sort.name === obj.name ? 'active' : ''}
                key={index}>
                {obj.title}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
})

export default Sort;
