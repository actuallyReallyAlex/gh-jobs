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

export {
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
