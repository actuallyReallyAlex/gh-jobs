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

  // * This only works if totalPages = 10 :)
  return (
    <nav>
      <ul className="pagination__list">
        <PaginationNavigation type="left" />
        <PaginationItem page={1} />
        {currentPage > 3 && <PaginationMore />}
        {currentPage < 4 && <PaginationItem page={2} />}
        {currentPage < 5 && currentPage >= 1 && <PaginationItem page={3} />}
        {currentPage < 6 && currentPage > 2 && <PaginationItem page={4} />}
        {currentPage < 7 && currentPage > 3 && <PaginationItem page={5} />}
        {currentPage < 8 && currentPage > 4 && <PaginationItem page={6} />}
        {currentPage < 9 && currentPage > 5 && <PaginationItem page={7} />}
        {currentPage <= 10 && currentPage > 6 && <PaginationItem page={8} />}
        {currentPage <= 11 && currentPage > 7 && <PaginationItem page={9} />}
        {currentPage < 8 && <PaginationMore />}
        <PaginationItem page={10} />
        <PaginationNavigation type="right" />
      </ul>
    </nav>
  );
};

// const Pagination: React.SFC<PaginationProps> = (props: PaginationProps) => {
//   const { currentPage, totalPages } = props;

//   // ? Rename to rightSibling / leftSibling?
//   const [rightBoundary, setRightBoundary] = React.useState(3);
//   const [leftBoundary, setLeftBoundary] = React.useState(0);

//   const maxButtons = 3;

//   const siblings = 1;

//   // ? is 3 the "rightBoundary" or is the the max number of buttons?

//   React.useEffect(() => {
//     // * Right Boundary Math
//     if (currentPage === rightBoundary) {
//       setRightBoundary(currentPage + 1);
//     }

//     // * Left Boundary Math
//     if (currentPage - leftBoundary === maxButtons) {
//       setLeftBoundary(leftBoundary + 1);
//     }
//   }, [currentPage]);

//   const pageButtons = [];

//   for (let i = 1; i < totalPages + 1; i++) {
//     // * Options:
//     // * "More"
//     // * "Item"
//     // * None

//     // * Should be "More" if:
//     //  * i === rightBoundary + 1
//     // OR
//     //  * i === leftBoundary + 1

//     if (i === rightBoundary + 1 || i === leftBoundary) {
//       //? not right
//       // * dot dot dot
//       pageButtons.push(<PaginationMore key={i} />);
//     } else if (
//       (i <= rightBoundary && i >= leftBoundary) ||
//       i === totalPages + 1
//     ) {
//       // * regular PaginationItem
//       pageButtons.push(<PaginationItem key={i} page={i} />);
//     } else {
//       console.log(i);
//     }
//   }

//   return (
//     <nav>
//       <ul className="pagination__list">
//         <PaginationNavigation type="left" />
//         {pageButtons.map((button) => button)}
//         <PaginationNavigation type="right" />
//       </ul>
//     </nav>
//   );
// };

const mapStateToProps = (state: RootState) => ({
  currentPage: state.application.currentPage,
  totalPages: state.application.totalPages,
});

export default connect(mapStateToProps)(Pagination);
