import { combineReducers } from "redux";

import application from "./application";
import login from "./login";
import user from "./user";

export default combineReducers({
  application,
  login,
  user,
});
