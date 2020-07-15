import * as React from "react";
import { connect } from "react-redux";

import { setCurrentPage } from "../redux/actions/application";

import { PaginationNavigationType, RootState } from "../types";

export interface PaginationNavigationProps {
  currentPage: number;
  handleDecrement: (currentPage: number) => void;
  handleIncrement: (currentPage: number) => void;
  totalPages: number;
  type: PaginationNavigationType;
}

const PaginationNavigation: React.SFC<PaginationNavigationProps> = (
  props: PaginationNavigationProps
) => {
  const {
    currentPage,
    handleDecrement,
    handleIncrement,
    totalPages,
    type,
  } = props;
  return (
    <li
      className={
        type === "left"
          ? currentPage === 1
            ? "pagination__item__disabled"
            : "pagination__item"
          : currentPage === totalPages
          ? "pagination__item__disabled"
          : "pagination__item"
      }
    >
      <button
        disabled={
          type === "left" ? currentPage === 1 : currentPage === totalPages
        }
        onClick={
          type === "left"
            ? () => handleDecrement(currentPage)
            : () => handleIncrement(currentPage)
        }
      >
        <i className="material-icons">
          {type === "left" ? "chevron_left" : "chevron_right"}
        </i>
      </button>
    </li>
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
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PaginationNavigation);
