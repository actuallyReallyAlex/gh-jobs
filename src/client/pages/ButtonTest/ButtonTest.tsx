import * as React from "react";

import { Button, OldButton } from "../../components/Button/index";

import { Container, OldContainer } from "./ButtonTest-styled";

const ButtonTest: React.SFC = () => {
  return (
    <div>
      <Container>
        <h2>New Buttons</h2>
        <div>
          <Button buttonStyle="primary" label="Primary" type="button" />
          <Button buttonStyle="secondary" label="Secondary" type="button" />
          <Button buttonStyle="danger" label="Danger" type="button" />
        </div>
      </Container>

      <OldContainer>
        <h2>Old Buttons</h2>
        <div>
          <OldButton buttonStyle="primary" label="Primary" type="button" />
          <OldButton buttonStyle="secondary" label="Secondary" type="button" />
          <OldButton buttonStyle="danger" label="Danger" type="button" />
        </div>
      </OldContainer>
    </div>
  );
};

export default ButtonTest;
