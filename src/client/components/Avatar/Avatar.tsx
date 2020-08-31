import * as React from "react";
import { connect } from "react-redux";

import { Container, Image, Initials } from "./Avatar-styled";

import { RootState } from "../../types";

export interface AvatarProps {
  name: string;
}

const Avatar: React.SFC<AvatarProps> = (props: AvatarProps) => {
  const { name } = props;
  const splitName = name.split(/ /gm);
  const initials = `${splitName[0][0].toLocaleUpperCase()}${splitName[1][0].toLocaleUpperCase()}`;

  return (
    <Container>
      <Image />
      <Initials>{initials}</Initials>
    </Container>
  );
};

const mapStateToProps = (state: RootState) => ({
  name: state.user.name,
});

export default connect(mapStateToProps)(Avatar);
