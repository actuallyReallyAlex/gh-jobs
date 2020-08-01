import * as React from "react";

import { CheckboxCheckmark, CheckboxContainer } from "./Checkbox-styled";

export interface CheckboxProps {
  checked?: boolean;
  id?: string;
  label: string;
  name?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value: string;
}

const Checkbox: React.SFC<CheckboxProps> = (props: CheckboxProps) => {
  const { checked, id, label, name, onChange, value } = props;
  return (
    <CheckboxContainer checked={checked}>
      {label}
      <input
        checked={checked}
        id={id}
        name={name}
        onChange={onChange}
        type="checkbox"
        value={value}
      />
      <CheckboxCheckmark checked={checked} data-cy="checkmark" />
    </CheckboxContainer>
  );
};

export default Checkbox;
