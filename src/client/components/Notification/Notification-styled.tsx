import styled from "styled-components";

import { NotificationType } from "../../types";

interface NotificationContainerProps {
  type: NotificationType;
}

const NotificationContainer = styled.div<NotificationContainerProps>`
  align-items: center;
  background-color: ${(props) => {
    if (props.type === "error") {
      return "#f8d7da";
    } else if (props.type === "info") {
      return "#d1ecf1";
    } else if (props.type === "warning") {
      return "#fff3cd";
    }
  }};
  border-radius: 4px;
  color: ${(props) => {
    if (props.type === "error") {
      return "#721c24";
    } else if (props.type === "info") {
      return "#0c5460";
    } else if (props.type === "warning") {
      return "#856404";
    }
  }};
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  padding: 15px;
  margin-top: 25px;

  span {
    margin-left: 10px;
  }
`;

export { NotificationContainer };
