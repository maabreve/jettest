import { combineReducers } from "redux";

import authReducer from "./authReducer";
import apiCallsInProgress from "./apiStatusReducer";

const rootReducer = combineReducers({
  authReducer,
  apiCallsInProgress
});

export default rootReducer;
