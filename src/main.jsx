import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./utils/i18n.js";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { USE_MOCK } from "./config/index.js";

if (USE_MOCK === "true") {
  import("./mocks/browser").then(({ worker }) => {
    worker.start();
  });
}

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);
