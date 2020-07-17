import * as React from "react";

export interface CopyrightProps {}

const Copyright: React.SFC<CopyrightProps> = () => {
  return (
    <p className="copyright">
      Copyright ©&nbsp;
      <a href="https://alexlee.dev/" rel="noopener noreferrer" target="_blank">
        Alex Lee&nbsp;
      </a>
      {new Date().getFullYear()}
    </p>
  );
};

export default Copyright;
