import styled from "styled-components";

const SignupContainer = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;

  form {
    max-width: 444px;
    width: 50%;

    @media only screen and (max-width: 600px) {
      width: 100%;
    }
  }
`;

const SignupTitleContainer = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;

  h1 {
    color: #282538;
    font-family: Poppins;
    font-style: normal;
    font-weight: 200;
    font-size: 24px;
    line-height: 36px;
    margin: 0;
  }

  span {
    align-items: center;
    background: #1e86ff;
    border-radius: 50%;
    display: flex;
    height: 40px;
    justify-content: center;
    margin: 8px;
    width: 40px;

    i {
      color: #ffffff;
    }
  }
`;

const SignupActionsContainer = styled.div`
  align-items: center;
  display: flex;
  flex-direction: row;
  justify-content: center;

  @media only screen and (max-width: 600px) {
    flex-direction: column;
  }
`;

export { SignupContainer, SignupTitleContainer, SignupActionsContainer };
