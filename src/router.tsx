import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import { CartPage } from "./cart/ui/CartPage";
import { CatalogPage } from "./catalog/ui/CatalogPage";
import { WishlistPage } from "./wishlist/ui/WishlistPage";
import { EditModel } from "./edit/model/model";

export const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <App />,
      children: [
        { index: true, element: <CatalogPage /> },
        { path: "cart", element: <CartPage /> },
        { path: "wishlist", element: <WishlistPage /> },
        { path: "edit", element: <EditModel /> },
        { path: "*", element: <CatalogPage /> },
      ],
    },
  ],
  { basename: import.meta.env.BASE_URL },
);
