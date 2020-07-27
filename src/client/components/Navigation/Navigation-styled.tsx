import styled from "styled-components";

import { StyledHeader } from "../Header/Header-styled";

const NavigationContainer = styled.nav`
  align-items: center;
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  a {
    align-items: center;
    color: #1e86ff;
    display: flex;
    font-family: Poppins, sans-serif;
    font-size: 14px;
    font-weight: 500;
    line-height: 21px;
    justify-content: flex-start;
    text-decoration: none;
  }

  a:hover {
    span {
      text-decoration: underline;
    }

    ${StyledHeader} {
      span {
        text-decoration: none;
      }
    }
  }
`;

export { NavigationContainer };
