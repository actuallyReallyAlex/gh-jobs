import * as React from "react";

import { Container, Figure, Label } from "./Stat-styled";

export interface StatProps {
  figure: number | string;
  label: number | string;
}

const Stat: React.SFC<StatProps> = (props: StatProps) => {
  const { figure, label } = props;
  return (
    <Container>
      <Figure>{figure}</Figure>
      <Label>{label}</Label>
    </Container>
  );
};

export default Stat;
