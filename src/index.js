import React from "react";
import ReactDOM from "react-dom";
import "./styles.css";
import App from "./presentation/app/App";
import { PerfilProvider } from "./presentation/app/hooks/perfilContext";

ReactDOM.render(
    <React.StrictMode>
        <PerfilProvider>
            <App />
        </PerfilProvider>
    </React.StrictMode>,
    document.getElementById("root")
);
