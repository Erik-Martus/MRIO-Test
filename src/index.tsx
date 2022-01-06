import * as React from "react";
import * as ReactDom from "react-dom";
import App from "./App";
import "./styles.scss";

ReactDom.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
