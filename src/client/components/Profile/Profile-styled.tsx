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
  align-items: center;
  display: flex;
  flex-direction: column;

  @media only screen and (max-width: 600px) {
    form {
      width: 100%;
    }
  }
`;

interface ProfileFormProps {
  isViewingSavedJobs: boolean;
}

const ProfileForm = styled.form<ProfileFormProps>`
  max-width: ${(props) => (props.isViewingSavedJobs ? "800px" : "444px")};
  width: ${(props) => (props.isViewingSavedJobs ? "100%" : "50%")};
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
`;

const ProfileSavedContainer = styled.div`
  width: 100%;
`;

const ProfileNoResults = styled.p`
  text-align: center;
`;

export {
  ProfileActionsContainer,
  ProfilePage,
  ProfileForm,
  ProfileTitleContainer,
  ProfileSavedContainer,
  ProfileNoResults,
};
