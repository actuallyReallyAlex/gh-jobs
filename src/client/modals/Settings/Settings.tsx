import * as React from "react";
import { connect } from "react-redux";

import Button from "../../components/Button";

import { logOut } from "../../redux/thunks";

export interface SettingsProps {
  handleLogOut: () => void;
}

const Settings: React.SFC<SettingsProps> = (props: SettingsProps) => {
  const { handleLogOut } = props;

  return (
    <div>
      <Button
        buttonStyle="danger"
        id="log-out"
        label="Log out"
        onClick={() => handleLogOut()}
        type="button"
      />
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  handleLogOut: () => dispatch(logOut()),
});

export default connect(null, mapDispatchToProps)(Settings);
