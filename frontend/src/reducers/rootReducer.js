import { combineReducers } from "redux";
import userManagement from "../Components/user-redux/reducer";
import dashboardManagement from "../Components/Dashboard/redux/reducer";

const reducers = combineReducers({
  userManagement,
  dashboardManagement,
});

export default reducers;
