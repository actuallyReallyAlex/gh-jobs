import * as React from "react";

import { StyledCopyright } from "./Copyright-styled";

// eslint-disable-next-line
const Copyright: React.SFC<{}> = () => {
  return (
    <StyledCopyright>
      Copyright ©&nbsp;
      <a href="https://alexlee.dev/" rel="noopener noreferrer" target="_blank">
        Alex Lee&nbsp;
      </a>
      {new Date().getFullYear()}
    </StyledCopyright>
  );
};

export default Copyright;
