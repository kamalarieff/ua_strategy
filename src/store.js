/*
 * src/store.js
 * With initialState
 */
import { createStore, applyMiddleware } from "redux";
import rootReducer from "./reducers";
import { composeWithDevTools } from "redux-devtools-extension";
export default function configureStore(initialState = {}) {
  return createStore(rootReducer, initialState, composeWithDevTools());
}
