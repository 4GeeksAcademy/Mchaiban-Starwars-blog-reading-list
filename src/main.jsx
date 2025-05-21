// src/main.jsx
import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";                                 // Global styles
import { RouterProvider } from "react-router-dom";    // Your data-router
import { router } from "./routes";                    // createBrowserRouter instance
import { StoreProvider } from "./hooks/useGlobalReducer"; // Your Context provider

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <StoreProvider>
      <RouterProvider router={router} />
    </StoreProvider>
  </React.StrictMode>
);

