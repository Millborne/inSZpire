import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { Provider } from "react-redux";
import { configStore } from "./reducers/store";

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <Provider store={configStore}>
            <App />
        </Provider>
    </StrictMode>
);
