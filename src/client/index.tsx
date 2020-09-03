import * as React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import * as Sentry from "@sentry/react";

import App from "./App";
import store from "./redux/store";

import "./index.css";
import "react-toastify/dist/ReactToastify.css";

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("/service-worker.js")
      .then((registration) => {
        console.log("SW registered: ", registration);
      })
      .catch((registrationError) => {
        console.log("SW registration failed: ", registrationError);
      });
  });
}

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
