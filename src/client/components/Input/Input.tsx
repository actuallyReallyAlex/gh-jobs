import * as React from "react";

import {
  StyledInputContainer,
  StyledInputInnerContainer,
  StyledInputLabel,
  StyledLeftContainer,
} from "./Input-styled";

import { InputAutoComplete, InputType } from "../../types";

export interface InputProps {
  autoComplete?: InputAutoComplete;
  disabled?: boolean;
  full?: boolean;
  icon?: string;
  id: string;
  label: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  required?: boolean;
  type?: InputType;
  value: string;
}

const Input: React.SFC<InputProps> = (props: InputProps) => {
  const {
    autoComplete,
    disabled,
    full,
    icon,
    id,
    label,
    onChange,
    placeholder,
    required,
    type,
    value,
  } = props;
  return (
    <StyledInputContainer full={full}>
      <StyledInputLabel htmlFor={id}>{label}</StyledInputLabel>
      <StyledInputInnerContainer>
        {icon && (
          <StyledLeftContainer>
            <i className="material-icons">{icon}</i>
          </StyledLeftContainer>
        )}

        <input
          autoComplete={autoComplete ? autoComplete : undefined}
          disabled={disabled ? disabled : undefined}
          id={id}
          onChange={onChange ? onChange : undefined}
          placeholder={placeholder}
          required={required ? required : undefined}
          type={type ? type : "text"}
          value={value}
        />
      </StyledInputInnerContainer>
    </StyledInputContainer>
  );
};

export default Input;
