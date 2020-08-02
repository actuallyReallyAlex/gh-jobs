import * as React from "react";

export interface ErrorFallbackProps {
  error: Error;
  componentStack: string;
  resetErrorBoundary: () => void;
}

const ErrorFallback: React.SFC<ErrorFallbackProps> = (
  props: ErrorFallbackProps
) => {
  const { error, componentStack, resetErrorBoundary } = props;
  return (
    <div role="alert">
      <p>Something went wrong:</p>
      <pre>{error.message}</pre>
      <pre>{componentStack}</pre>
      <button onClick={resetErrorBoundary}>Try again</button>
    </div>
  );
};

export default ErrorFallback;
