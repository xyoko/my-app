import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Product } from "../../entity/items";

type CartItem = Product & {
  quantity: number;
};

type CartState = {
  items: CartItem[];
};

const initialState: CartState = {
  items: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    changeQuantity: (
      state,
      action: PayloadAction<{ product: Product; delta: number }>,
    ) => {
      const { product, delta } = action.payload;
      const existingItem = state.items.find((item) => item.id === product.id);

      if (existingItem) {
        const nextQuantity = existingItem.quantity + delta;

        if (nextQuantity <= 0) {
          state.items = state.items.filter((item) => item.id !== product.id);
        } else {
          existingItem.quantity = nextQuantity;
        }
      } else {
        if (delta > 0) state.items.push({ ...product, quantity: delta });
      }
    },
  },
});

export const { changeQuantity } = cartSlice.actions;
export default cartSlice.reducer;
