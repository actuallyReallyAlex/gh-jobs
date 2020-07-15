import * as React from "react";
import { connect } from "react-redux";

import { RootState } from "../types";

export interface LoadingIndicatorProps {
  isLoading: boolean;
}

/**
 * Displays Loading Indicator.
 */
const LoadingIndicator: React.SFC<LoadingIndicatorProps> = (
  props: LoadingIndicatorProps
) => {
  const { isLoading } = props;
  return (
    <>
      <div className={!isLoading ? "hidden" : "shade"} />
      <div className={!isLoading ? "hidden" : undefined} id="loading-indicator">
        <div className="orbit-spinner">
          <div className="orbit" />
          <div className="orbit" />
          <div className="orbit" />
        </div>
      </div>
    </>
  );
};

const mapStateToProps = (state: RootState) => ({
  isLoading: state.application.isLoading,
});

export default connect(mapStateToProps)(LoadingIndicator);
