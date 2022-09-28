import React from 'react';
import s from './pagination.module.scss';
import ReactPaginate from 'react-paginate';

const Pagination = ({ onChangePage }) => {
  return (
    <div>
      <ReactPaginate
        className={s.pagination}
        breakLabel="..."
        nextLabel=">"
        onPageChange={(e) => onChangePage(e.selected + 1)}
        pageRangeDisplayed={5}
        pageCount={3}
        previousLabel="<"
        renderOnZeroPageCount={null}
      />
    </div>
  );
};

export default Pagination;