import * as React from "react";
import { connect } from "react-redux";

import PaginationNavigation from "./PaginationNavigation";
import PaginationItem from "./PaginationItem";
import PaginationMore from "./PaginationMore";

import { RootState } from "../types";

export interface PaginationProps {
  totalPages: number;
}

const Pagination: React.SFC<PaginationProps> = (props: PaginationProps) => {
  const { totalPages } = props;

  const pageButtons = [];

  for (let i = 1; i < totalPages + 1; i++) {
    if (i === 4) {
      // * dot dot dot
      pageButtons.push(<PaginationMore key={i} />);
    } else if (i <= 3 || i === totalPages + 1) {
      // * regular PaginationItem
      pageButtons.push(<PaginationItem key={i} page={i} />);
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
  totalPages: state.application.totalPages,
});

export default connect(mapStateToProps)(Pagination);
