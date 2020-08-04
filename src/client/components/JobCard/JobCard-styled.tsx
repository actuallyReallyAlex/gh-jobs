import styled from "styled-components";

const StyledContainer = styled.div`
  background-color: #fff;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.05);
  border-radius: 4px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 16px;
  margin-top: 16px;
  padding: 15px;

  a {
    text-decoration: none;
  }

  @media only screen and (max-width: 600px) {
    margin-bottom: 13px;
    margin-top: 13px;
  }
`;

const StyledLeftContainer = styled.div`
  display: flex;
  width: 100%;
`;

const StyledLogoContainer = styled.div`
  background-color: #f2f2f2;
  border-radius: 4px;
  height: 90px;
  width: 90px;

  img {
    height: 90px;
    object-fit: contain;
    width: 90px;
  }
`;

const StyledLogoNotFoundContainer = styled.div`
  align-items: center;
  color: #bdbdbd;
  display: flex;
  font-size: 12px;
  font-weight: 500;
  height: 100%;
  justify-content: center;
  line-height: 14px;
  text-align: center;
  width: 100%;
`;

const StyledMiddleContainer = styled.div`
  margin-left: 16px;
`;

const StyledCompany = styled.p`
  color: #334680;
  font-size: 12px;
  font-weight: bold;
  line-height: 14px;
  margin: 0;
`;

const StyledTitle = styled.p`
  color: #334680;
  font-size: 18px;
  font-weight: normal;
  line-height: 21px;
  margin-bottom: 12px;
  margin-top: 8px;
`;

const StyledFullTime = styled.p`
  border: 1px solid #334680;
  border-radius: 4px;
  color: #334680;
  font-size: 12px;
  font-weight: bold;
  line-height: 14px;
  padding: 6px 8px;
  text-align: center;
  width: 53px;
`;

const StyledRightContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const StyledActions = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
`;

interface SavedButtonProps {
  jobIsSaved: boolean;
}

const StyledSavedButton = styled.button<SavedButtonProps>`
  background: transparent;
  border: none;
  color: ${(props) => (props.jobIsSaved ? "#1e86ff" : "#b9bdcf")};
  margin: 0;
  padding: 0;

  &:hover {
    color: #1e86ff;
    cursor: pointer;
  }
`;

interface HideButtonProps {
  jobIsHidden: boolean;
}

const StyledHideButton = styled.button<HideButtonProps>`
  background: transparent;
  border: none;
  color: ${(props) => (props.jobIsHidden ? "#ff1e1e" : "#b9bdcf")};
  margin: 0;
  padding: 0;

  &:hover {
    color: #ff1e1e;
    cursor: pointer;
  }
`;

const StyledInfoContainer = styled.div`
  align-self: flex-end;
  display: flex;
  flex-direction: column;
`;

const StyledLocationContainer = styled.div`
  align-items: center;
  display: flex;
  justify-content: flex-end;

  i {
    color: #b9bdcf;
    font-size: 15px;
    margin-right: 5px;
  }

  p {
    color: #b9bdcf;
    font-size: 12px;
    font-weight: 500;
    line-height: 14px;
    margin: 0;
    max-width: 160px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  @media only screen and (max-width: 600px) {
    p {
      margin-bottom: 0;
      margin-top: 0;
    }
  }

  @media only screen and (max-width: 450px) {
    p {
      max-width: 65px;
    }
  }
`;

const StyledCreatedContainer = styled.div`
  align-items: center;
  display: flex;
  color: #b9bdcf;
  font-size: 12px;
  font-weight: 500;
  justify-content: flex-end;
  line-height: 14px;
  margin-top: 15px;

  i {
    color: #b9bdcf;
    font-size: 15px;
    margin-right: 5px;
  }

  p {
    margin: 0;
    max-width: 160px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  @media only screen and (max-width: 600px) {
    p {
      margin-bottom: 0;
      margin-top: 0;
    }
  }

  @media only screen and (max-width: 450px) {
    p {
      max-width: 65px;
    }
  }
`;

export {
  StyledContainer,
  StyledLogoContainer,
  StyledLeftContainer,
  StyledLogoNotFoundContainer,
  StyledMiddleContainer,
  StyledCompany,
  StyledTitle,
  StyledFullTime,
  StyledRightContainer,
  StyledActions,
  StyledSavedButton,
  StyledInfoContainer,
  StyledLocationContainer,
  StyledCreatedContainer,
  StyledHideButton,
};
