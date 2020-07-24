import * as React from "react";
import styled from "styled-components";

import { ButtonStyle, ButtonType } from "../types";

export interface ButtonProps {
  buttonStyle: ButtonStyle;
  disabled?: boolean;
  id?: string;
  label: string;
  onClick?: () => void;
  type: ButtonType;
}

interface StyledButtonProps {
  buttonStyle: ButtonStyle;
  disabled?: boolean;
  id?: string;
  onClick?: () => void;
  type: ButtonType;
}

const StyledButton = styled.button<StyledButtonProps>`
  background-color: ${(props) => {
    if (props.buttonStyle === "primary") {
      return `rgba(27, 108, 205, 1)`;
    } else if (props.buttonStyle === "secondary") {
      return `#b9bdcf`;
    } else if (props.buttonStyle === "danger") {
      return `rgba(205, 27, 27, 1)`;
    }
  }};
  border: 3px solid rgba(255, 255, 255, 1);
  border-bottom-right-radius: 0.25rem;
  border-top-right-radius: 0.25rem;
  color: #fff;
  cursor: pointer;
  display: inline-block;
  font-weight: 400;
  line-height: 1.5;
  padding: 0.375rem 3rem;
  position: relative;
  text-align: center;
  transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out,
    border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
  user-select: none;
  vertical-align: middle;
  z-index: 2;
`;

const Button: React.SFC<ButtonProps> = (props: ButtonProps) => {
  const { buttonStyle, disabled, id, label, onClick, type } = props;
  return (
    <StyledButton
      buttonStyle={buttonStyle}
      disabled={disabled ? disabled : undefined}
      id={id ? id : undefined}
      onClick={onClick ? onClick : undefined}
      type={type}
    >
      {label}
    </StyledButton>
  );
};

export default Button;
