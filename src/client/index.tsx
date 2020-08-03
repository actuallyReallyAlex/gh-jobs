import * as React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import * as Sentry from "@sentry/react";

import App from "./App";
import store from "./redux/store";

import "./index.css";
import "react-toastify/dist/ReactToastify.css";

if (process.env.NODE_ENV !== "test") {
  Sentry.init({
    dsn:
      "https://4af7dab133e64ef08765616e040118fe@o202486.ingest.sentry.io/5375872",
  });
}

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
