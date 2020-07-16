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

// const Pagination: React.SFC<PaginationProps> = (props: PaginationProps) => {
//   const { currentPage, totalPages } = props;

//   // * This only works if totalPages = 10 :)
//   return (
//     <nav>
//       <ul className="pagination__list">
//         <PaginationNavigation type="left" />
//         <PaginationItem page={1} />
//         {currentPage > 3 && <PaginationMore />}
//         {currentPage < 4 && <PaginationItem page={2} />}
//         {currentPage < 5 && currentPage >= 1 && <PaginationItem page={3} />}
//         {currentPage < 6 && currentPage > 2 && <PaginationItem page={4} />}
//         {currentPage < 7 && currentPage > 3 && <PaginationItem page={5} />}
//         {currentPage < 8 && currentPage > 4 && <PaginationItem page={6} />}
//         {currentPage < 9 && currentPage > 5 && <PaginationItem page={7} />}
//         {currentPage <= 10 && currentPage > 6 && <PaginationItem page={8} />}
//         {currentPage <= 11 && currentPage > 7 && <PaginationItem page={9} />}
//         {currentPage < 8 && <PaginationMore />}
//         <PaginationItem page={10} />
//         <PaginationNavigation type="right" />
//       </ul>
//     </nav>
//   );
// };

const Pagination: React.SFC<PaginationProps> = (props: PaginationProps) => {
  const { currentPage, handleSetTotalPages, totalPages } = props;

  // ? Rename to rightSibling / leftSibling?
  const [rightSibling, setRightSibling] = React.useState(3);
  const [leftSibling, setLeftSibling] = React.useState(0);

  const maxButtons = 3;

  const siblings = 1;

  // ? is 3 the "rightSibling" or is the the max number of buttons?

  React.useEffect(() => {
    console.log({ currentPage, leftSibling, rightSibling });
    // * Right Boundary Math
    // if (currentPage === rightSibling) {
    console.log(`setting rightSibling to ${currentPage + 1}`);
    if (currentPage !== 1) {
      setRightSibling(currentPage + 1);
    }
    // }

    // * Left Boundary Math
    console.log(`setting leftSibling to ${currentPage - 1}`);
    setLeftSibling(currentPage - 1);
    // if (currentPage - leftSibling === maxButtons) {
    //   setLeftSibling(leftSibling + 1);
    // }
  }, [currentPage]);

  const pageButtons = [];

  for (let i = 1; i < totalPages + 1; i++) {
    // debugger;
    // * Options:
    // * "More"
    // * "Item"
    // * None

    // * 1 needs to be displayed when far enough away
    if (i === 1 && currentPage >= 3) {
      pageButtons.push(<PaginationItem key={i} page={i} />);
    } else if (i === totalPages && currentPage < totalPages) {
      // * Last page needs to be displayed when far enough away
      pageButtons.push(<PaginationItem key={i} page={i} />);
    } else if (i === rightSibling + 1 || i === leftSibling - 1) {
      //? not right
      // * More
      pageButtons.push(<PaginationMore key={i} />);
    } else if (
      (i <= rightSibling && i >= leftSibling) ||
      i === totalPages + 1
    ) {
      // * Item
      pageButtons.push(<PaginationItem key={i} page={i} />);
    } else {
      // * None
      // console.log(i);
    }
  }

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
