import * as React from "react";

export interface InputProps {
  icon?: string;
  id: string;
  label: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  value: string;
}

const Input: React.SFC<InputProps> = (props: InputProps) => {
  const { icon, id, label, onChange, placeholder, value } = props;
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
          id={id}
          onChange={onChange}
          placeholder={placeholder}
          type="text"
          value={value}
        />
      </div>

      {/* <button onClick={() => handleLocationSearch()}>Search</button>{" "} */}
    </div>
  );
};

export default Input;
