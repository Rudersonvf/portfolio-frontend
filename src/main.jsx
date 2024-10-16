import "./utils/i18n.js";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

import App from "./App.jsx";
import { StrictMode } from "react";
import { USE_MOCK } from "./config/index.js";
import { createRoot } from "react-dom/client";

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
