import * as React from "react";
import { connect } from "react-redux";

import {
  setNotificationMessage,
  setNotificationType,
} from "../redux/actions/application";

import { NotificationType } from "../types";

export interface NotificationProps {
  handleResetNotification: () => void;
  message: string;
  type: NotificationType;
}

const Notification: React.SFC<NotificationProps> = (
  props: NotificationProps
) => {
  const { handleResetNotification, message, type } = props;

  React.useEffect(() => {
    if (message && type === "info") {
      setTimeout(() => {
        handleResetNotification();
      }, 5000);
    }
  }, [message]);

  return (
    <div className={`notification__container ${type}`}>
      <i className="material-icons">{type}</i>
      <span id="notification-text">{message}</span>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  handleResetNotification: () => {
    dispatch(setNotificationMessage(""));
    dispatch(setNotificationType("info"));
  },
});

export default connect(null, mapDispatchToProps)(Notification);
