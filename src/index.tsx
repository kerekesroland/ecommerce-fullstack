import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./i18";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <Suspense fallback={<div>Loading...</div>}>
      <App />
    </Suspense>
  </React.StrictMode>
);
