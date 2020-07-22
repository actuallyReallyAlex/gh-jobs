import * as React from "react";

import { NotificationType } from "../types";

export interface NotificationProps {
  message: string;
  type: NotificationType;
}

// TODO - Need to reset message after like 5 seconds or so
const Notification: React.SFC<NotificationProps> = (
  props: NotificationProps
) => {
  const { message, type } = props;

  return (
    <div className={`notification__container ${type}`}>
      <i className="material-icons">{type}</i>
      <span id="notification-text">{message}</span>
    </div>
  );
};

export default Notification;
