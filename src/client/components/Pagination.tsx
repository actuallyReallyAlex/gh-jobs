import * as React from "react";
import { connect } from "react-redux";

import PaginationNavigation from "./PaginationNavigation";
import PaginationItem from "./PaginationItem";
import PaginationMore from "./PaginationMore";

import { RootState } from "../types";

export interface PaginationProps {
  currentPage: number;
  totalPages: number;
}

const Pagination: React.SFC<PaginationProps> = (props: PaginationProps) => {
  const { currentPage, totalPages } = props;

  const [rightBoundary, setRightBoundary] = React.useState(3);
  const [leftBoundary, setLeftBoundary] = React.useState(0);

  const maxButtons = 3;

  // ? is 3 the "rightBoundary" or is the the max number of buttons?

  React.useEffect(() => {
    console.log({ currentPage, leftBoundary, rightBoundary });

    if (currentPage === rightBoundary) {
      setRightBoundary(currentPage + 1);
    }

    if (currentPage - leftBoundary === maxButtons) {
      setLeftBoundary(leftBoundary + 1);
    }
  }, [currentPage]);

  const pageButtons = [];

  for (let i = 1; i < totalPages + 1; i++) {
    if (i === rightBoundary + 1 || i === leftBoundary) {
      //? not right
      // * dot dot dot
      pageButtons.push(<PaginationMore key={i} />);
    } else if (
      (i <= rightBoundary && i >= leftBoundary) ||
      i === totalPages + 1
    ) {
      // * regular PaginationItem
      pageButtons.push(<PaginationItem key={i} page={i} />);
    } else {
      console.log(i);
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

export default connect(mapStateToProps)(Pagination);
