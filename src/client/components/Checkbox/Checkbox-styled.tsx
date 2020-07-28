import styled from "styled-components";

interface CheckboxProps {
  checked: boolean;
}

const CheckboxCheckmark = styled.span<CheckboxProps>`
  background-color: ${(props) =>
    props.checked ? "#1e86ff" : "rgba(243, 245, 250, 1)"};
  border: ${(props) => (props.checked ? "#1e86ff" : "1px solid #b9bdcf")};
  border-radius: 2px;
  box-sizing: border-box;
  height: 18px;
  left: 0;
  position: absolute;
  top: 0;
  width: 18px;

  :after {
    content: "";
    display: ${(props) => (props.checked ? "block" : "none")};
    position: absolute;

    border: solid white;
    border-radius: 1px;
    border-width: 0 1px 1px 0;
    height: 9px;
    left: 6px;
    top: 3px;
    transform: rotate(45deg);
    width: 4px;
    -webkit-transform: rotate(45deg);
    -ms-transform: rotate(45deg);
  }
`;

const CheckboxContainer = styled.label<CheckboxProps>`
  display: block;
  color: #334680;
  cursor: pointer;
  font-family: "Poppins", sans-serif;
  font-size: 14px;
  font-weight: 500;
  line-height: 21px;
  margin-bottom: 12px;
  position: relative;
  padding-left: 30px;
  user-select: none;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;

  input {
    position: absolute;
    opacity: 0;
    cursor: pointer;
    height: 0;
    width: 0;
  }

  :hover {
    span {
      background-color: ${(props) =>
        props.checked ? "undefined" : "rgba(250, 250, 250, 1)"};
    }
  }
`;

export { CheckboxContainer, CheckboxCheckmark };
