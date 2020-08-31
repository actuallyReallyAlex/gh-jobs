import styled from "styled-components";

const Container = styled.div`
  align-items: center;
  display: grid;
  justify-content: center;
`;

const Image = styled.img`
  background-image: linear-gradient(135deg, #ce9ffc 10%, #7367f0 100%);
  border-radius: 50%;
  grid-area: 1 / 1;
  height: 150px;
  width: 150px;
`;

const Initials = styled.span`
  color: #ffffff;
  font-size: 3.5rem;
  grid-area: 1 / 1;
  margin: 0 auto;
`;

export { Container, Image, Initials };
