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
    border-bottom-left-radius: 4px;
    border-left: 1px solid #b9bdcf;
    border-top-left-radius: 4px;
    color: #b9bdcf;
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
  height: 50px;
  padding-left: 25px;
  padding-right: 25px;

  h3 {
    margin: 0;
  }
`;

const ProfileAccountDetailsContainer = styled.div`
  background-color: rgba(246, 249, 251, 1);
  border-radius: 1.25rem;
  box-shadow: 0 4px 6px rgba(50, 50, 93, 0.11), 0 1px 3px rgba(0, 0, 0, 0.08);
  margin-top: -100px;
  width: 50%;
`;

export {
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
