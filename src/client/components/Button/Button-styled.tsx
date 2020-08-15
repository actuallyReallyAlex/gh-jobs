import styled from "styled-components";

import { ButtonStyle, ButtonType } from "../../types";

interface StyledButtonProps {
  buttonStyle: ButtonStyle;
  disabled?: boolean;
  id?: string;
  onClick?: () => void;
  type: ButtonType;
}

const defaultColors = {
  primary: "#1e55f7",
  secondary: "#b2b7c6",
  danger: "#f71e1e",
};

const hoverColors = {
  primary: "#153db4",
  secondary: "#8b8f9b",
  danger: "#c21b1b",
};

const StyledButton = styled.button<StyledButtonProps>`
  background-color: ${(props) => defaultColors[props.buttonStyle]};
  border: none;
  border-radius: 7px;
  box-shadow: 0 2px 2px rgba(0, 0, 0, 0.25);
  color: #ffffff;
  cursor: pointer;
  display: inline-block;
  font-size: 14px;
  font-weight: 600;
  line-height: 1.5;
  padding: 10px 24px;
  position: relative;
  text-align: center;
  transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out,
    border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
  user-select: none;
  vertical-align: middle;
  z-index: 2;

  :hover {
    background-color: ${(props) => hoverColors[props.buttonStyle]};
  }
`;

export { StyledButton };
