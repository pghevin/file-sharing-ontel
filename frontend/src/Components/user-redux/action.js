import { post } from "../../api";
import url from "../../api/apisList";
import * as types from "./actionTypes";

export const userLoginAction = (userCredentials) => {
  const apiUrl = url("login");

  return async (dispatch) => {
    try {
      const res = await post(apiUrl, userCredentials);
      let user;

      if (res?.error) {
        dispatch({
          type: types.USER_LOGIN_ACTION_FAIL,
          payload: res?.message || "Invalid Credentials",
        });
        return;
      }

      if (res?.data) {
        user = res?.data;
      }
      dispatch({
        type: types.USER_LOGIN_ACTION,
        payload: user,
      });
    } catch (err) {
      dispatch({
        type: types.USER_LOGIN_ACTION_FAIL,
        payload: err,
      });
    }
  };
};

export const userLogoutAction = () => {
  return async (dispatch) => {
    dispatch({
      type: types.USER_LOGOUT_ACTION,
    });
  };
};
