import styled from "styled-components";

const StyledCopyright = styled.p`
  align-items: center;
  color: #b9bdcf;
  display: flex;
  font-size: 14px;
  font-weight: lighter;
  justify-content: center;
  line-height: 17px;
  margin-top: 50px;
  width: 100%;

  a {
    color: #b9bdcf;
    text-decoration: none;

    :hover {
      color: #8f929b;
      text-decoration: underline;
    }
  }
`;

export { StyledCopyright };
