import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
// import { Provider } from "react-redux";

import App from "./App";
import store from "./store";

import * as serviceWorker from "./serviceWorker";
import "./css/index.css";

ReactDOM.render(
  // <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  ,
  document.getElementById("root")
);

serviceWorker.unregister();
