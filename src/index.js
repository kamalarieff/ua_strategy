import React from "react";
import ReactDOM from "react-dom";
import { Route, Link, BrowserRouter as Router, Switch } from "react-router-dom";
import "./index.css";
import App from "./App";
import Dashboard from "./Dashboard";
import CarStore from "./CarStore";
import * as serviceWorker from "./serviceWorker";
import { Provider } from "react-redux";
import { ConnectedRouter } from "connected-react-router";
import configureStore, { history } from "./store";
import ReduxToastr from "react-redux-toastr";

ReactDOM.render(
  <Provider store={configureStore()}>
    <ConnectedRouter history={history}>
      {/* place ConnectedRouter under Provider */}
      <>
        {/* your usual react-router v4/v5 routing */}
        <Switch>
          <Route exact path="/" component={App} />
          <Route exact path="/dashboard" component={Dashboard} />
          <Route exact path="/carstore" component={CarStore} />>
        </Switch>
      </>
    </ConnectedRouter>
    <ReduxToastr
      timeOut={4000}
      newestOnTop={false}
      preventDuplicates
      position="top-center"
      transitionIn="fadeIn"
      transitionOut="fadeOut"
      progressBar
      closeOnToastrClick
    />
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
