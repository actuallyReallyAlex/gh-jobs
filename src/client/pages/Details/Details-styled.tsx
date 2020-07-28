import styled from "styled-components";

const DetailsContainer = styled.div`
  display: flex;
  flex-direction: row;

  @media only screen and (max-width: 600px) {
    flex-direction: column;
  }
`;

const DetailsSideContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding-right: 50px;
  width: 25%;

  @media only screen and (max-width: 600px) {
    width: 100%;
  }
`;

const DetailsHowToContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 36px;
  overflow-wrap: break-word;
`;

const DetailsHowToLabel = styled.span`
  color: #b9bdcf;
  font-family: Poppins, sans-serif;
  font-size: 14px;
  font-style: normal;
  font-weight: bold;
  line-height: 21px;
  text-transform: uppercase;
`;

const DetailsMainContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 75%;

  @media only screen and (max-width: 600px) {
    width: 100%;
  }
`;

const DetailsMainTitleContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

interface DetailsMainInnerTitleContainerProps {
  jobIsSaved: boolean;
}

const DetailsMainInnerTitleContainer = styled.div<
  DetailsMainInnerTitleContainerProps
>`
  align-items: flex-start;
  display: flex;
  flex-direction: column;

  h2 {
    color: #334680;
    font-family: Roboto;
    font-style: normal;
    font-weight: bold;
    font-size: 24px;
    line-height: 28px;
    margin-bottom: 0;
    margin-top: 0;

    @media only screen and (max-width: 600px) {
      margin-top: 36px;
    }
  }

  div {
    display: flex;
    flex-direction: row;
    margin-top: 15px;

    p {
      border: 1px solid #334680;
      border-radius: 4px;
      color: #334680;
      font-size: 12px;
      font-weight: bold;
      line-height: 14px;
      margin-bottom: 0;
      margin-top: 0;
      padding: 6px 8px;
      text-align: center;
      width: 53px;

      @media only screen and (max-width: 600px) {
        margin-left: 0;
        margin-top: 4px;
      }
    }

    button {
      background: transparent;
      border: none;
      color: ${(props) => (props.jobIsSaved ? "#1e86ff" : "#b9bdcf")};
      margin: 0;
      margin-left: 15px;
      padding: 0;

      :hover {
        color: #1e86ff;
        cursor: pointer;
      }
    }
  }
`;

const DetailsCreatedContainer = styled.div`
  align-items: center;
  display: flex;
  align-items: start;
  margin-left: 0;
  margin-top: 10px;

  i {
    color: #b9bdcf;
    font-size: 15px;
    margin-right: 7.5px;s
  }

  p {
    color: #b9bdcf;
    font-size: 12px;
    font-weight: 500;
    line-height: 14px;
    margin-bottom: 0;
    margin-top: 0;
  }
`;

const DetailsCompanyContainer = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 32px;
`;

const DetailsLogoContainer = styled.div`
  background-color: #f2f2f2;
  border-radius: 4px;
  height: 42px;
  margin-right: 12px;
  width: 42px;

  div {
    align-items: center;
    display: flex;
    height: 100%;
    justify-content: center;
    text-align: center;
    width: 100%;

    p {
      color: #bdbdbd;
      font-size: 8px;
      font-weight: 500;
      line-height: 14px;
    }
  }

  img {
    height: 42px;
    object-fit: contain;
    width: 42px;
  }
`;

const DetailsCompanyRightContainer = styled.div`
  display: flex;
  flex-direction: column;

  a {
    color: #334680;
    font-family: Roboto;
    font-size: 18px;
    font-style: normal;
    font-weight: bold;
    line-height: 21px;
    margin: 0;
    text-decoration: none;
  }

  div {
    align-items: flex-start;
    display: flex;
    margin-top: 10px;

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
      margin-top: 0;
    }
  }

  p {
    color: #334680;
    font-family: Roboto;
    font-size: 18px;
    font-style: normal;
    font-weight: bold;
    line-height: 21px;
    margin: 0;
    text-decoration: none;
  }
`;

const DetailsContainerDescription = styled.div`
  color: #334680;
  font-family: Roboto;
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 24px;
`;

export {
  DetailsContainer,
  DetailsSideContainer,
  DetailsHowToContainer,
  DetailsHowToLabel,
  DetailsMainContainer,
  DetailsMainTitleContainer,
  DetailsMainInnerTitleContainer,
  DetailsCreatedContainer,
  DetailsCompanyContainer,
  DetailsLogoContainer,
  DetailsCompanyRightContainer,
  DetailsContainerDescription,
};
