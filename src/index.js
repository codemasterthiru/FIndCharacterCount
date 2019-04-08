import React from "react";
import ReactDOM from "react-dom";

import "./styles.css";
import { FindCharacterCount } from "./FindCharacterCount";

function App() {
  return (
    <div className="App">
      <FindCharacterCount />
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
