import styled from "styled-components";

const SearchContainer = styled.div`
  display: flex;
  margin-top: 42px;
  @media only screen and (max-width: 800px) {
    flex-direction: column;
  }

  @media only screen and (max-width: 600px) {
    flex-direction: column;
  }
`;

const SearchJobsContainer = styled.div`
  width: 75%;

  @media only screen and (max-width: 800px) {
    width: 100%;
  }

  @media only screen and (max-width: 600px) {
    width: 100%;
  }
`;

const SearchNoResults = styled.p`
  text-align: center;
`;

export { SearchContainer, SearchJobsContainer, SearchNoResults };
