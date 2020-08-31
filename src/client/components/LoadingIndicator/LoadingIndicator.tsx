import * as React from "react";
import { connect } from "react-redux";

import {
  LoadingIndicatorContainer,
  Orbit,
  OrbitContainer,
  Shade,
} from "./LoadingIndicator-styled";

import { RootState } from "../../types";

export interface LoadingIndicatorProps {
  forceLoading?: boolean;
  isLoading: boolean;
}

/**
 * Displays Loading Indicator.
 */
const LoadingIndicator: React.SFC<LoadingIndicatorProps> = (
  props: LoadingIndicatorProps
) => {
  const { forceLoading, isLoading } = props;
  return (
    <>
      <Shade isLoading={forceLoading ? forceLoading : isLoading} />
      <LoadingIndicatorContainer
        id="loading-indicator"
        isLoading={forceLoading ? forceLoading : isLoading}
      >
        <OrbitContainer data-cy="orbit-container">
          <Orbit />
          <Orbit />
          <Orbit />
        </OrbitContainer>
      </LoadingIndicatorContainer>
    </>
  );
};

const mapStateToProps = (state: RootState) => ({
  isLoading: state.application.isLoading,
});

export default connect(mapStateToProps)(LoadingIndicator);
