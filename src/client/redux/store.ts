import { applyMiddleware, compose, createStore } from "redux";
import thunk from "redux-thunk";
import throttle from "lodash/throttle";
import { saveState } from "../util";
import rootReducer from "./reducers";

const composeEnhancers =
  (window["__REDUX_DEVTOOLS_EXTENSION_COMPOSE__"] as typeof compose) || compose;

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk))
);

store.subscribe(
  throttle(() => {
    saveState({
      application: store.getState().application,
    });
  }, 1000)
);

export default store;
