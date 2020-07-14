import * as React from "react";

export interface CheckboxProps {
  id?: string;
  label: string;
  name?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value: string;
}

const Checkbox: React.SFC<CheckboxProps> = (props: CheckboxProps) => {
  const { id, label, name, onChange, value } = props;
  return (
    <label className="checkbox__container">
      {label}
      <input
        id={id}
        name={name}
        onChange={onChange}
        type="checkbox"
        value={value}
      />
      <span className="checkmark" />
    </label>
  );
};

export default Checkbox;
