import styled from "styled-components";

const ProfileActionsContainer = styled.div`
  align-items: center;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 25px;
  margin-top: 25px;

  @media only screen and (max-width: 600px) {
    align-items: normal;
    flex-direction: column;
  }
`;

const ProfilePage = styled.div`
  display: flex;
  flex-direction: column;

  @media only screen and (max-width: 600px) {
    form {
      width: 100%;
    }
  }
`;

interface ProfileFormProps {
  isViewingHiddenJobs: boolean;
  isViewingSavedJobs: boolean;
}

const ProfileForm = styled.form<ProfileFormProps>`
  max-width: ${(props) =>
    props.isViewingSavedJobs || props.isViewingHiddenJobs ? "800px" : "444px"};
  width: ${(props) =>
    props.isViewingSavedJobs || props.isViewingHiddenJobs ? "100%" : "50%"};
`;

const ProfileTitleContainer = styled.div`
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

const ProfileSavedContainer = styled.div`
  width: 100%;
`;

const ProfileHiddenContainer = styled.div`
  width: 100%;
`;

const ProfileNoResults = styled.p`
  text-align: center;
`;

const ProfileBackButton = styled.button`
  align-items: center;
  background: none;
  border: none;
  color: #1e86ff;
  display: flex;
  font-family: Poppins, sans-serif;
  font-size: 14px;
  font-weight: 500;
  line-height: 21px;
  margin-right: 15px;
  justify-content: flex-start;
  text-decoration: none;

  i {
    font-size: 16px;
    margin-right: 5px;
  }

  :hover {
    cursor: pointer;

    i {
      text-decoration: none;
    }

    span {
      text-decoration: underline;
    }
  }
`;

const ProfileHeroContainer = styled.div`
  background: url("/assets/profile.svg");
  background-color: #172b4d;
  border-radius: 1.25rem;
  color: #ffffff;
  height: 400px;
  padding: 50px;
`;

const ProfileAccountDetailsContentContainer = styled.div`
  padding: 25px;

  h4 {
    font-size: 14px;
    margin: 0;
    text-transform: uppercase;
  }

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

  h3 {
    margin-bottom: 20px;
    margin-top: 20px;
  }
`;

const ProfileAccountDetailsContainer = styled.div`
  background-color: rgba(246, 249, 251, 1);
  border-radius: 1.25rem;
  box-shadow: 0 4px 6px rgba(50, 50, 93, 0.11), 0 1px 3px rgba(0, 0, 0, 0.08);
  margin-top: -200px;
  width: 40%;

  @media only screen and (max-width: 600px) {
    width: 100%;
  }
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
  width: 40%;

  h2 {
    margin-top: 100px;
  }

  @media only screen and (max-width: 600px) {
    margin-bottom: 50px;
    margin-top: 100px;
    width: 100%;
  }
`;

const ProfileAccountStatsAvatar = styled.img`
  background-image: linear-gradient(135deg, #ce9ffc 10%, #7367f0 100%);
  border-radius: 50%;
  height: 150px;
  margin: -75px auto;
  width: 150px;
`;

const ProfileInnerContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;

  @media only screen and (max-width: 600px) {
    flex-direction: column;
  }
`;

const ProfileAccountStatsInnerContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  margin-bottom: 25px;
  width: 100%;
`;

export {
  ProfileAccountStatsInnerContainer,
  ProfileInnerContainer,
  ProfileAccountStatsAvatar,
  ProfileAccountStatsContainer,
  ProfileAccountDetailsContentContainer,
  ProfileAccountDetailsHeadingContainer,
  ProfileAccountDetailsContainer,
  ProfileActionsContainer,
  ProfilePage,
  ProfileForm,
  ProfileTitleContainer,
  ProfileSavedContainer,
  ProfileNoResults,
  ProfileBackButton,
  ProfileHiddenContainer,
  ProfileHeroContainer,
};
