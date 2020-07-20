import * as React from "react";

export interface FormErrorProps {
  error: string;
}

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
