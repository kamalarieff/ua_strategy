/*
 * src/store.js
 * With initialState
 */
import { createStore, applyMiddleware, compose } from "redux";
import rootReducer from "./reducers";
import { composeWithDevTools } from "redux-devtools-extension";
import { createBrowserHistory } from "history";
import { routerMiddleware } from "connected-react-router";
export const history = createBrowserHistory();
export default function configureStore(initialState = {}) {
  return createStore(
    rootReducer(history),
    initialState,
    // compose(applyMiddleware(routerMiddleware(history)))
    composeWithDevTools(applyMiddleware(routerMiddleware(history)))
  );
}
