import * as React from "react";
import { connect } from "react-redux";

import { PaginationListItem } from "./Pagination-styled";

import { pagination } from "../../redux/thunks";

import { RootState } from "../../types";

export interface PaginationItemProps {
  currentPage: number;
  handlePaginationClick: (pageNumber: number) => void;
  page: number;
}

const PaginationItem: React.SFC<PaginationItemProps> = (
  props: PaginationItemProps
) => {
  const { currentPage, handlePaginationClick, page } = props;
  const selected = page === currentPage;
  return (
    <PaginationListItem
      data-cy={
        selected ? "pagination-item-selected" : "pagination-item-deselected"
      }
      currentPage={currentPage}
      page={page}
    >
      <button onClick={() => handlePaginationClick(page)}>{page}</button>
    </PaginationListItem>
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
