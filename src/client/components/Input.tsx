import * as React from "react";

import { InputAutoComplete, InputType } from "../types";

export interface InputProps {
  autoComplete?: InputAutoComplete;
  disabled?: boolean;
  icon?: string;
  id: string;
  label: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  required?: boolean;
  type?: InputType;
  value: string;
}

const Input: React.SFC<InputProps> = (props: InputProps) => {
  const {
    autoComplete,
    disabled,
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
    <div className="input__container">
      <label htmlFor={id}>{label}</label>
      <div className="input__container__inner">
        {icon && (
          <div className="input__addon__left">
            <i className="material-icons grey icon-sm">{icon}</i>
          </div>
        )}

        <input
          autoComplete={autoComplete ? autoComplete : undefined}
          disabled={disabled ? disabled : undefined}
          id={id}
          onChange={onChange}
          placeholder={placeholder}
          required={required ? required : undefined}
          type={type ? type : "text"}
          value={value}
        />
      </div>
    </div>
  );
};

export default Input;
