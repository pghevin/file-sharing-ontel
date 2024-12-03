import * as types from "./actionTypes";

const initialState = {
  user: {},
  error: "",
};

export default function reduce(state = initialState, action = {}) {
  switch (action.type) {
    case types.USER_LOGIN_ACTION:
      return {
        ...state,
        user: action.payload,
      };

    case types.USER_LOGIN_ACTION_FAIL:
      return {
        ...state,
        error: action.payload,
      };

    case types.USER_LOGOUT_ACTION:
      return initialState;

    default:
      return state;
  }
}
