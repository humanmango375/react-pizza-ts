import React from 'react';
import s from './pagination.module.scss';
import ReactPaginate from 'react-paginate';

interface PaginationProps {
  currentPage: number;
  onChangePage: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, onChangePage }) => {
  return (
    <div>
      <ReactPaginate
        className={s.pagination}
        breakLabel="..."
        nextLabel=">"
        onPageChange={(e) => onChangePage(e.selected + 1)}
        pageRangeDisplayed={5}
        pageCount={3}
        forcePage={currentPage - 1}
        previousLabel="<"
      />
    </div>
  );
};

export default Pagination;
