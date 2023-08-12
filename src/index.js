import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Root, {
  action as rootAction,
  loader as rootLoader,
} from "./routes/root";
import Index from "./routes/index";
import ErrorPage from "./error-page";
import City, {
  loader as cityLoader,
  action as cityAction,
} from "./routes/city";

import "./index.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    loader: rootLoader,
    action: rootAction,
    children: [
      {
        errorElement: <ErrorPage />,
        children: [
          { index: true, element: <Index /> },
          {
            path: "city/:cityId",
            element: <City />,
            errorElement: <div>Oops! There was an error.</div>,
            loader: cityLoader,
            action: cityAction,
          },
          // {
          //   path: "cities/:cityId/edit",
          //   element: <EditCity />,
          //   errorElement: <div>Oops! There was an error.</div>,
          //   loader: cityLoader,
          //   action: editAction,
          // },
          // {
          //   path: "cities/:cityId/destroy",
          //   action: destroyAction,
          //   errorElement: <div>Oops! There was an error.</div>,
          // },
        ],
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
