import styled from "styled-components";

const ProfileAccountDetailsContainer = styled.div`
  background-color: rgba(246, 249, 251, 1);
  border-radius: 1.25rem;
  box-shadow: 0 4px 6px rgba(50, 50, 93, 0.11), 0 1px 3px rgba(0, 0, 0, 0.08);
  margin-bottom: 25px;
  margin-top: -200px;
  width: 40%;

  @media only screen and (max-width: 820px) {
    margin-bottom: 0;
    width: 100%;
  }
`;

const ProfileAccountDetailsContentContainer = styled.div`
  padding: 25px;

  input {
    :disabled {
      color: #b9bdcf;
    }
    color: #000000;
  }

  div {
    max-width: 100%;
  }
`;

const ProfileAccountDetailsHeadingContainer = styled.div`
  align-items: center;
  background-color: #ffffff;
  border-top-left-radius: 1.25rem;
  border-top-right-radius: 1.25rem;
  display: flex;
  height: fit-content;
  justify-content: space-between;
  padding-left: 25px;
  padding-right: 25px;

  button {
    margin-bottom: 15px;
    margin-top: 15px;
  }

  h3 {
    margin-bottom: 20px;
    margin-top: 20px;
  }
`;

const ProfileAccountStatsAvatarContainer = styled.div`
  margin: -75px auto;
`;

const ProfileAccountStatsContainer = styled.div`
  align-items: center;
  background-color: rgba(246, 249, 251, 1);
  border-radius: 1.25rem;
  box-shadow: 0 4px 6px rgba(50, 50, 93, 0.11), 0 1px 3px rgba(0, 0, 0, 0.08);
  display: flex;
  flex-direction: column;
  height: fit-content;
  margin-top: -200px;
  padding: 25px;
  width: 40%;

  h3 {
    margin-top: 100px;
  }

  @media only screen and (max-width: 820px) {
    margin-bottom: 50px;
    margin-top: 100px;
    width: auto;
  }
`;

const ProfileAccountStatsInnerContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  margin-bottom: 25px;
  width: 100%;
`;

const ProfileHeroContainer = styled.div`
  background: url("/assets/profile.svg");
  background-color: #172b4d;
  border-radius: 1.25rem;
  color: #ffffff;
  height: 400px;
  padding: 50px;
`;

const ProfileInnerContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;

  @media only screen and (max-width: 820px) {
    flex-direction: column;
  }
`;

const ProfilePage = styled.div`
  display: flex;
  flex-direction: column;

  @media only screen and (max-width: 820px) {
    form {
      width: 100%;
    }
  }
`;

const ProfileAccountStatsActionsContainer = styled.div`
  display: flex;
  justify-content: space-evenly;
  width: 100%;
`;

const ProfileAccountDetailsActionsContainer = styled.div`
  display: flex;

  button:nth-child(1) {
    margin-right: 15px;
  }
`;

export {
  ProfileAccountDetailsActionsContainer,
  ProfileAccountDetailsContainer,
  ProfileAccountDetailsContentContainer,
  ProfileAccountDetailsHeadingContainer,
  ProfileAccountStatsActionsContainer,
  ProfileAccountStatsAvatarContainer,
  ProfileAccountStatsContainer,
  ProfileAccountStatsInnerContainer,
  ProfileHeroContainer,
  ProfileInnerContainer,
  ProfilePage,
};
