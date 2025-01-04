import React from "react";
import ReactDOM from "react-dom/client";
import "./index.scss";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { ModalProvider } from "./contexts/Modal.jsx";
import { ResponsiveSearch } from "./screens/responsiveSearch.jsx";

const queryClient = new QueryClient();

function initSearchLib(rootElement = document.getElementById("searchLib")) {
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <QueryClientProvider client={queryClient}>
        <ModalProvider>
          <ResponsiveSearch />
        </ModalProvider>
      </QueryClientProvider>
    </React.StrictMode>
  );
}

// if in development mode, render immediately
if (import.meta.env.DEV) {
  initSearchLib();
}

window.initSearchLib = initSearchLib;
