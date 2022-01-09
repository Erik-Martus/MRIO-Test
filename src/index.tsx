import * as React from "react";
import * as ReactDom from "react-dom";
import "./styles/styles.scss";
import App from "./App";
import store from "./store/store";
import { Provider } from "react-redux";
import { ThemeProvider, createTheme } from "@mui/material/styles";

const theme = createTheme({
  typography: {
    fontFamily: "Inter, Helvetica, Arial, sans-serif",
  },
  palette: {
    primary: {
      main: "#6D5BD0",
    },
    text: {
      primary: "#25213B",
    },
    background: {
      default: "#FFFFFF",
      paper: "#F4F2FF",
    },
  },
});

ReactDom.render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
