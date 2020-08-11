import * as React from "react";
import { connect } from "react-redux";

import Button from "../../components/Button";

import { logOut, logOutAll } from "../../redux/thunks";

export interface SettingsProps {
  handleLogOut: () => void;
  handleLogOutAll: () => void;
}

const Settings: React.SFC<SettingsProps> = (props: SettingsProps) => {
  const { handleLogOut, handleLogOutAll } = props;

  return (
    <div>
      <Button
        buttonStyle="danger"
        id="log-out"
        label="Log out"
        onClick={() => handleLogOut()}
        type="button"
      />
      <Button
        buttonStyle="danger"
        id="log-out-all"
        label="Log out of all devices"
        onClick={() => handleLogOutAll()}
        type="button"
      />
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  handleLogOut: () => dispatch(logOut()),
  handleLogOutAll: () => dispatch(logOutAll()),
});

export default connect(null, mapDispatchToProps)(Settings);
