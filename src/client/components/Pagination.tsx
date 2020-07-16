import * as React from "react";
import { connect } from "react-redux";

import PaginationNavigation from "./PaginationNavigation";
import PaginationItem from "./PaginationItem";
import PaginationMore from "./PaginationMore";

import { RootState } from "../types";
import { setTotalPages } from "../redux/actions/application";

export interface PaginationProps {
  currentPage: number;
  handleSetTotalPages: (totalPages: number) => void;
  totalPages: number;
}

const Pagination: React.SFC<PaginationProps> = (props: PaginationProps) => {
  const { currentPage, handleSetTotalPages, totalPages } = props;

  const [rightSibling, setRightSibling] = React.useState(3);
  const [leftSibling, setLeftSibling] = React.useState(0);
  const [pageButtons, setPageButtons] = React.useState([]);

  const maxButtons = 3;

  const siblings = 1;

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
        //? not right
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
    setRightSibling(newRightSibling);
    setLeftSibling(newLeftSibling);
    setPageButtons(newPageButtons);
  }, [currentPage]);

  return (
    <nav>
      <ul className="pagination__list">
        <PaginationNavigation type="left" />
        {pageButtons.map((button) => button)}
        <PaginationNavigation type="right" />
      </ul>
      <button onClick={() => handleSetTotalPages(10)}>
        Set Total Pages to 10
      </button>
    </nav>
  );
};

const mapStateToProps = (state: RootState) => ({
  currentPage: state.application.currentPage,
  totalPages: state.application.totalPages,
});

const mapDispatchToProps = (dispatch) => ({
  handleSetTotalPages: (totalPages: number) =>
    dispatch(setTotalPages(totalPages)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Pagination);
