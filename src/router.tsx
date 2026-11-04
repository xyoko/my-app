import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import { CatalogPage } from "./catalog/ui/CatalogPage";
import { AddModel } from "./edit/model/model";
// import { ButtonGuard } from "./button_guard";
import { EditModell } from "./patch/patchPage";

export const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <App />,
      children: [
        { index: true, element: <CatalogPage /> },
        { path: "post", element: <AddModel /> },
        { path: "patch", element: <EditModell /> },
        { path: "*", element: <CatalogPage /> },
      ],
    },
  ],
  { basename: import.meta.env.BASE_URL },
);
