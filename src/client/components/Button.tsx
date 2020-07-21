import * as React from "react";

import { ButtonStyle, ButtonType } from "../types";

export interface ButtonProps {
  id: string;
  label: string;
  onClick: () => void;
  style: ButtonStyle;
  type: ButtonType;
}

const Button: React.SFC<ButtonProps> = (props: ButtonProps) => {
  const { id, label, onClick, style, type } = props;
  return (
    <button
      className={`button__${style}`}
      id={id}
      onClick={onClick}
      type={type}
    >
      {label}
    </button>
  );
};

export default Button;
