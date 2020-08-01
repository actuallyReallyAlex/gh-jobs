import styled from "styled-components";

const SearchInputOuterContainer = styled.div`
  background-image: url("/assets/backgroundImg.png");
  background-position: center;
  background-size: cover;
  border-radius: 0.5rem;
  padding: 35px 20%;

  @media only screen and (max-width: 600px) {
    padding: 35px 5%;
  }
`;

const SearchInputInnerContainer = styled.div`
  align-items: stretch;
  display: flex;
  flex-wrap: wrap;
  width: 100%;
`;

const SearchInputForm = styled.form`
  display: flex;
  width: 100%;
`;

const SearchInputLeft = styled.div`
  align-items: center;
  background-color: #ffffff;
  border: 1px solid #b9bdcf;
  border-bottom-left-radius: 0.25rem;
  border-right: none;
  border-top-left-radius: 0.25rem;
  display: flex;
  margin-right: -1px;
  padding: 0.375rem 0.75rem;
  padding-right: 0;
  text-align: center;

  i {
    color: #b9bdcf;
    font-size: 16px;
  }
`;

const SearchInputInput = styled.input`
  background-clip: padding-box;
  background-color: #fff;
  border: 1px solid #b9bdcf;
  border-bottom-right-radius: 0;
  border-left: none;
  border-right: none;
  border-top-right-radius: 0;
  flex: 1 1 auto;
  font-size: 12px;
  font-weight: 400;
  height: calc(1.5em + 0.75rem + 2px);
  line-height: 14px;
  margin-bottom: 0;
  min-width: 0;
  padding: 0.375rem 0.75rem;
  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
  width: 1%;

  :focus {
    outline: none;
  }
`;

const SearchInputButtonContainer = styled.div`
  display: flex;
  margin-left: -1px;
`;

export {
  SearchInputOuterContainer,
  SearchInputInnerContainer,
  SearchInputForm,
  SearchInputLeft,
  SearchInputInput,
  SearchInputButtonContainer,
};
