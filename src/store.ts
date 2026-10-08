import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./card/model/cartSlice";
import wishlistReducer from "./wishlist/model/wishlistSlice";

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    wishlist: wishlistReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
