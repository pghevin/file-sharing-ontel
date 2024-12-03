/* eslint-disable */

import { applyMiddleware, createStore, compose } from "redux";
import rootReducer from "./rootReducer";
import { thunk } from "redux-thunk"; // Import thunk correctly
import logger from "redux-logger";
import { loadState, persistState } from "./localStorage";

const middleware = [thunk]; // Use thunk directly
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

if (process.env.NODE_ENV !== "production") {
  middleware.push(logger);
}

let persistedData = loadState();
const store = createStore(
  rootReducer,
  persistedData,
  composeEnhancers(applyMiddleware(...middleware))
);

store.subscribe(() => {
  persistState(store.getState());
});

export default store;
