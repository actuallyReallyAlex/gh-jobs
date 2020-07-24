import * as React from "react";

import { ButtonStyle, ButtonType } from "../types";

export interface ButtonProps {
  disabled?: boolean;
  id?: string;
  label: string;
  onClick?: () => void;
  style: ButtonStyle;
  type: ButtonType;
}

const Button: React.SFC<ButtonProps> = (props: ButtonProps) => {
  const { disabled, id, label, onClick, style, type } = props;
  return (
    <button
      disabled={disabled ? disabled : undefined}
      className={`button__${style}`}
      id={id ? id : undefined}
      onClick={onClick ? onClick : undefined}
      type={type}
    >
      {label}
    </button>
  );
};

export default Button;
