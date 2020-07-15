import * as React from "react";
import { connect } from "react-redux";

import { pagination } from "../redux/thunks";
import PaginationNavigation from "./PaginationNavigation";

import { RootState } from "../types";

export interface PaginationProps {
  currentPage: number;
  handlePaginationClick: (pageNumber: number) => void;
  totalPages: number;
}

const Pagination: React.SFC<PaginationProps> = (props: PaginationProps) => {
  const { currentPage, handlePaginationClick, totalPages } = props;

  const pageButtons = [];

  for (let i = 1; i < totalPages + 1; i++) {
    if (i === 4) {
      // * dot dot dot
      pageButtons.push(
        <li className="pagination__item__more" key={i}>
          <i className="material-icons">more_horiz</i>
        </li>
      );
    } else if (i <= 3 || i === totalPages + 1) {
      // * regular button
      pageButtons.push(
        <li
          className={
            i === currentPage
              ? `pagination__item__selected`
              : `pagination__item`
          }
          key={i}
        >
          <button onClick={() => handlePaginationClick(i)}>{i}</button>
        </li>
      );
    }
  }

  return (
    <nav>
      <ul className="pagination__list">
        <PaginationNavigation type="left" />
        {pageButtons.map((button) => button)}
        <PaginationNavigation type="right" />
      </ul>
    </nav>
  );
};

const mapStateToProps = (state: RootState) => ({
  currentPage: state.application.currentPage,
  totalPages: state.application.totalPages,
});

const mapDispatchToProps = (dispatch) => ({
  handlePaginationClick: (pageNumber: number) =>
    dispatch(pagination(pageNumber)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Pagination);
