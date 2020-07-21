import * as React from "react";

export interface FormErrorProps {
  error: string;
}

// TODO - Should refactor this to also display successful messages
// TODO - Need to reset message after like 5 seconds or so
const FormError: React.SFC<FormErrorProps> = (props: FormErrorProps) => {
  const { error } = props;
  return (
    <div className="alert__container">
      <i className="material-icons">warning</i>
      <span id="form-error-text">{error}</span>
    </div>
  );
};

export default FormError;
