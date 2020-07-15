import * as React from "react";
import { connect } from "react-redux";

import { pagination } from "../redux/thunks";

import { RootState } from "../types";
import { setCurrentPage } from "../redux/actions/application";

export interface PaginationProps {
  currentPage: number;
  handleDecrement: (currentPage: number) => void;
  handleIncrement: (currentPage: number) => void;
  handlePaginationClick: (pageNumber: number) => void;
  totalPages: number;
}

const Pagination: React.SFC<PaginationProps> = (props: PaginationProps) => {
  const {
    currentPage,
    handleDecrement,
    handleIncrement,
    handlePaginationClick,
    totalPages,
  } = props;

  const pageButtons = [];

  for (let i = 1; i < totalPages + 1; i++) {
    pageButtons.push(
      <li
        className={
          i === currentPage ? `pagination__item__selected` : `pagination__item`
        }
        key={i}
      >
        <button onClick={() => handlePaginationClick(i)}>{i}</button>
      </li>
    );
  }

  return (
    <nav>
      <ul className="pagination__list">
        <li
          className={
            currentPage === 1
              ? "pagination__item__disabled"
              : "pagination__item"
          }
        >
          <button
            disabled={currentPage === 1}
            onClick={() => handleDecrement(currentPage)}
          >
            <i className="material-icons">chevron_left</i>
          </button>
        </li>
        {pageButtons.map((button) => button)}
        <li
          className={
            currentPage === totalPages
              ? "pagination__item__disabled"
              : "pagination__item"
          }
        >
          <button
            disabled={currentPage === totalPages}
            onClick={() => handleIncrement(currentPage)}
          >
            <i className="material-icons">chevron_right</i>
          </button>
        </li>
      </ul>
    </nav>
  );
};

const mapStateToProps = (state: RootState) => ({
  currentPage: state.application.currentPage,
  totalPages: state.application.totalPages,
});

const mapDispatchToProps = (dispatch) => ({
  handleDecrement: (currentPage: number) =>
    dispatch(setCurrentPage(currentPage - 1)),
  handleIncrement: (currentPage: number) =>
    dispatch(setCurrentPage(currentPage + 1)),
  handlePaginationClick: (pageNumber: number) =>
    dispatch(pagination(pageNumber)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Pagination);
