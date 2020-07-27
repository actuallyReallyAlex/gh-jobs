import * as React from "react";
import { connect } from "react-redux";

import { NotificationContainer } from "./Notification-styled";

import {
  setNotificationMessage,
  setNotificationType,
} from "../../redux/actions/application";

import { NotificationType } from "../../types";

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
    <NotificationContainer type={type}>
      <i className="material-icons">{type}</i>
      <span id="notification-text">{message}</span>
    </NotificationContainer>
  );
};

const mapDispatchToProps = (dispatch) => ({
  handleResetNotification: () => {
    dispatch(setNotificationMessage(""));
    dispatch(setNotificationType("info"));
  },
});

export default connect(null, mapDispatchToProps)(Notification);
