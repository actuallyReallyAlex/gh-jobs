import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const Row = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  margin-bottom: 25px;
  margin-top: 25px;

  button {
    width: 200px;
  }

  @media only screen and (max-width: 600px) {
    flex-direction: column;

    button {
      width: 100%;
    }
  }
`;

export { Container, Row };
