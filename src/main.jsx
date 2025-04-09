import React from "react";
import ReactDOM from "react-dom/client";
// 👉 đổi từ BrowserRouter sang HashRouter
import { HashRouter } from "react-router-dom";
import App from "./App.jsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <HashRouter>
            <App />
        </HashRouter>
    </React.StrictMode>
);
