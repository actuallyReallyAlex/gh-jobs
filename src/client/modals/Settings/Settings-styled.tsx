import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const Row = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;

  button {
    width: 45%;
  }
`;

export { Container, Row };
