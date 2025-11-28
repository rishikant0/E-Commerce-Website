import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App.jsx";
import ShopCartProvider from "./context/ShopContext.jsx";  // ✅ default import

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <ShopCartProvider>
      <App />
    </ShopCartProvider>
  </BrowserRouter>
);
