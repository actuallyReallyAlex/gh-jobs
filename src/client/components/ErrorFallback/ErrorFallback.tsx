import * as React from "react";
import { connect } from "react-redux";

import Button from "../Button";

import { setError } from "../../redux/actions/application";

interface ErrorFallbackProps {
  error: Error;
  componentStack: string;
  handleSetError: (error: Error, componentStack: string) => void;
  resetErrorBoundary: () => void;
}

const ErrorFallback: React.SFC<ErrorFallbackProps> = (
  props: ErrorFallbackProps
) => {
  const { error, componentStack, handleSetError, resetErrorBoundary } = props;

  React.useEffect(() => {
    handleSetError(error, componentStack);
  }, []);
  return (
    <div>
      <h1>Technical Difficulties</h1>
      <p>
        Oops! Something went wrong. The error has been reported. Please try
        again.
      </p>
      <Button
        buttonStyle="primary"
        label="Try again"
        onClick={() => resetErrorBoundary()}
        type="button"
      />
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  handleSetError: (error: Error, componentStack: string) =>
    dispatch(setError(error, componentStack)),
});

export default connect(null, mapDispatchToProps)(ErrorFallback);
