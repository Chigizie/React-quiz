import React from "react";
import ReactDom from "react-dom/client";
import "./index.css";
import App from "./components/App.js";

function Index() {
  return (
    <div>
      <App />
    </div>
  );
}

const root = ReactDom.createRoot(document.getElementById("root"));
root.render(<Index />);
