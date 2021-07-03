import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./container/App";
import { Provider } from "react-redux";
import { ConnectedRouter } from "connected-react-router";
import { store, history } from "./store/configureStore";
require("dotenv").config({ path: "../.env" });
const app = (
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <App />
    </ConnectedRouter>
  </Provider>
);
ReactDOM.render(app, document.getElementById("root"));
