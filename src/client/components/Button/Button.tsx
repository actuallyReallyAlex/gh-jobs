import * as React from "react";

import { StyledButton } from "./Button-styled";

import { ButtonStyle, ButtonType } from "../../types";

export interface ButtonProps {
  buttonStyle: ButtonStyle;
  disabled?: boolean;
  id?: string;
  label: string;
  onClick?: () => void;
  type: ButtonType;
}

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
