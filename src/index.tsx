import * as React from "react";
import * as ReactDom from "react-dom";
import "./styles/styles.scss";
import App from "./App";
import store from "./store/store";
import { Provider } from "react-redux";

ReactDom.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
