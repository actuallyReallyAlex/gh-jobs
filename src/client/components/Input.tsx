import * as React from "react";

export interface InputProps {
  id: string;
  label: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value: string;
}

const Input: React.SFC<InputProps> = (props: InputProps) => {
  const { id, label, onChange, value } = props;
  return (
    <div>
      <label htmlFor={id}>{label}</label>
      <input id={id} onChange={onChange} type="text" value={value} />
      {/* <button onClick={() => handleLocationSearch()}>Search</button>{" "} */}
    </div>
  );
};

export default Input;
