import styled from "styled-components";

import { PaginationNavigationType } from "../../types";

const PaginationNavContainer = styled.nav`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
`;

const PaginationList = styled.ul`
  display: flex;
  flex-direction: row;
  list-style: none;
`;

interface PaginationNavigationListItemProps {
  currentPage: number;
  totalPages: number;
  type: PaginationNavigationType;
}

const PaginationNavigationListItem = styled.li<
  PaginationNavigationListItemProps
>`
  margin-left: 6px;
  margin-right: 6px;

  button {
    background: transparent;
    border: 1px solid #b7bcce;
    border-radius: 4px;
    color: #b9bdcf;
    box-sizing: border-box;
    font-size: 12px;
    font-style: normal;
    font-weight: normal;
    height: 36px;
    line-height: 14px;
    text-align: center;
    width: 36px;

    :hover {
      border: 1px solid #1e86ff;
      color: #1e86ff;
      cursor: ${(props) => {
        if (
          (props.type === "left" && props.currentPage === 1) ||
          (props.type === "right" && props.currentPage === props.totalPages)
        ) {
          return "not-allowed";
        }
      }};
    }

    :focus {
      outline: #1e86ff auto 1px;
    }
  }

  i {
    font-size: 18px;
  }
`;

interface PaginationListItemProps {
  currentPage: number;
  page: number;
}

const PaginationListItem = styled.li<PaginationListItemProps>`
  margin-left: 6px;
  margin-right: 6px;

  button {
    background: ${(props) =>
      props.page === props.currentPage ? "#1e86ff" : "transparent"};
    border: ${(props) =>
      props.page === props.currentPage
        ? "1px solid #1e86ff"
        : "1px solid #b7bcce"};
    border-radius: 4px;
    color: ${(props) =>
      props.page === props.currentPage ? "#ffffff" : "#b9bdcf"};
    box-sizing: border-box;
    font-size: 12px;
    font-style: normal;
    font-weight: normal;
    height: 36px;
    line-height: 14px;
    text-align: center;
    width: 36px;

    :hover {
      border: 1px solid #1e86ff;
      color: ${(props) =>
        props.page === props.currentPage ? "#ffffff" : "#1e86ff"};
    }

    :focus {
      outline: #1e86ff auto 1px;
    }
  }
`;

const PaginationItemMore = styled.li`
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-left: 6px;
  margin-right: 6px;

  i {
    color: #b7bcce;
    font-size: 18px;
  }
`;

export {
  PaginationNavContainer,
  PaginationList,
  PaginationNavigationListItem,
  PaginationListItem,
  PaginationItemMore,
};
