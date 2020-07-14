import * as React from "react";

export interface CheckboxProps {
  label: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value: string;
}

const Checkbox: React.SFC<CheckboxProps> = (props: CheckboxProps) => {
  const { label, onChange, value } = props;
  return (
    <label className="checkbox__container">
      {label}
      <input onChange={onChange} type="checkbox" value={value} />
      <span className="checkmark" />
    </label>
  );
};

export default Checkbox;
