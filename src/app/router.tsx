import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import { CatalogPage } from "../pages/catalog";
import { NewsCreatePage } from "../pages/news-create";
import { NewsEditPage } from "../pages/news-edit";

export const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <App />,
      children: [
        { index: true, element: <CatalogPage /> },
        { path: "post", element: <NewsCreatePage /> },
        { path: "patch/:id?", element: <NewsEditPage /> },
        { path: "*", element: <CatalogPage /> },
      ],
    },
  ],
  { basename: import.meta.env.BASE_URL },
);
