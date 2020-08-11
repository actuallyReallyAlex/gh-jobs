import * as React from "react";
import { connect } from "react-redux";
import { RootState } from "../../types";

export interface SettingsProps {
  email: string;
}

const Settings: React.SFC<SettingsProps> = (props: SettingsProps) => {
  const { email } = props;

  return (
    <div>
      <span>{email}</span>
    </div>
  );
};

const mapStateToProps = (state: RootState) => ({
  email: state.user.email,
});

export default connect(mapStateToProps)(Settings);
