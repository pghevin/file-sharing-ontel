import { combineReducers } from "redux";
import userManagement from "../Components/user-redux/reducer";

const reducers = combineReducers({
  userManagement,
});

export default reducers;
