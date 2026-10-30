import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import { CatalogPage } from "./catalog/ui/CatalogPage";
import { EditModel } from "./edit/model/model";

export const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <App />,
      children: [
        { index: true, element: <CatalogPage /> },
        { path: "edit", element: <EditModel /> },
        { path: "*", element: <CatalogPage /> },
      ],
    },
  ],
  { basename: import.meta.env.BASE_URL },
);
