import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "styles/index.scss";
import { Routes } from "screens";
import { Provider } from "react-redux";

import { store } from "./store";
import { SrcompStreamConsumer } from "srcomp";

const router = createBrowserRouter(Routes);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <SrcompStreamConsumer />
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
