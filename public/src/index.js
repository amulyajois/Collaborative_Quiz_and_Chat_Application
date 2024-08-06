import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./index.css";
import { QuizProvider } from "./components/QuizContext";
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,

  document.getElementById("root")
);
