import { combineReducers } from "redux";

import application from "./application";
import modal from "./modal";
import user from "./user";

export default combineReducers({
  application,
  modal,
  user,
});
