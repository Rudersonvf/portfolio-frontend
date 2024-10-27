import "./utils/i18n.js";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

import { StrictMode } from "react";

import { createRoot } from "react-dom/client";
import { unstable_HistoryRouter as HistoryRouter } from "react-router-dom";

import App from "./App.jsx";
import { USE_MOCK } from "./config/index.js";
import { history } from "./lib/history";

if (USE_MOCK === "true") {
  import("./mocks/browser").then(({ worker }) => {
    worker.start();
  });
}

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <HistoryRouter history={history}>
      <App />
    </HistoryRouter>
  </StrictMode>
);
