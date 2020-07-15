import * as React from "react";
import { connect } from "react-redux";

import { pagination } from "../redux/thunks";

import { RootState } from "../types";

export interface PaginationItemProps {
  currentPage: number;
  handlePaginationClick: (pageNumber: number) => void;
  page: number;
}

const PaginationItem: React.SFC<PaginationItemProps> = (
  props: PaginationItemProps
) => {
  const { currentPage, handlePaginationClick, page } = props;
  return (
    <li
      className={
        page === currentPage ? `pagination__item__selected` : `pagination__item`
      }
    >
      <button onClick={() => handlePaginationClick(page)}>{page}</button>
    </li>
  );
};

const mapStateToProps = (state: RootState) => ({
  currentPage: state.application.currentPage,
});

const mapDispatchToProps = (dispatch) => ({
  handlePaginationClick: (pageNumber: number) =>
    dispatch(pagination(pageNumber)),
});

export default connect(mapStateToProps, mapDispatchToProps)(PaginationItem);
