import * as React from "react";
import { connect } from "react-redux";

import PaginationItem from "./PaginationItem";
import PaginationMore from "./PaginationMore";
import PaginationNavigation from "./PaginationNavigation";

import { RootState } from "../types";

export interface PaginationProps {
  currentPage: number;
  totalPages: number;
}

// TODO - Make more dynamic (diff values for maxButtons / siblings / etc)
const Pagination: React.SFC<PaginationProps> = (props: PaginationProps) => {
  const { currentPage, totalPages } = props;

  const [pageButtons, setPageButtons] = React.useState([]);

  React.useEffect(() => {
    let newRightSibling = 3;
    let newLeftSibling = 0;
    const newPageButtons = [];

    // * Right Boundary Math
    if (currentPage !== 1) {
      newRightSibling = currentPage + 1;
    }

    // * Left Boundary Math
    newLeftSibling = currentPage - 1;

    // * Push Buttons into button array
    for (let i = 1; i < totalPages + 1; i++) {
      // * Options: "More" | "Item" | None

      // * 1 needs to be displayed when far enough away
      if (i === 1 && currentPage >= 3) {
        newPageButtons.push(<PaginationItem key={i} page={i} />);
      } else if (i === totalPages && currentPage < totalPages) {
        // * Last page needs to be displayed when far enough away
        newPageButtons.push(<PaginationItem key={i} page={i} />);
      } else if (i === newRightSibling + 1 || i === newLeftSibling - 1) {
        // * More
        newPageButtons.push(<PaginationMore key={i} />);
      } else if (
        (i <= newRightSibling && i >= newLeftSibling) ||
        i === totalPages + 1
      ) {
        // * Item
        newPageButtons.push(<PaginationItem key={i} page={i} />);
      }
    }
    setPageButtons(newPageButtons);
  }, [currentPage, totalPages]);

  return (
    <nav id="pagination">
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
