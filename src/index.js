import React from "react";
import ReactDOM from "react-dom";
import "./index.scss";
import { App } from "./App/App";
import reportWebVitals from "./reportWebVitals";
import ReactGA from "react-ga";
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";

if (process.env.NODE_ENV !== "development") {
  ReactGA.initialize("UA-19732240-7", {
    debug: process.env.NODE_ENV === "development",
  });
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);

serviceWorkerRegistration.register();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
