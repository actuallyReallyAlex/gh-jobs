import * as React from "react";

// eslint-disable-next-line
const Copyright: React.SFC<{}> = () => {
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
