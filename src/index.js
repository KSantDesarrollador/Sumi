import React from "react";
import ReactDOM from "react-dom";
import App from "./routes/App";
import "bootstrap/dist/css/bootstrap.min.css";
import "./assets/css/dashStyles.css";
import "./assets/icons/material-design-iconic-font.min.css";

ReactDOM.render(
  // <React.StrictMode>
  <App />,
  // </React.StrictMode>,
  document.getElementById("root")
);
