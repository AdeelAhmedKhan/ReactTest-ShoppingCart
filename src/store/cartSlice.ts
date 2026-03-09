import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { CartItem, CartState } from "../types";

const MIN_QTY = 1;
const MAX_QTY = 10;

const initialState: CartState = {
  items: [],
  isHydrated: false
};

const findItem = (items: CartItem[], productId: number) =>
  items.find((item) => item.productId === productId);

const clampQty = (qty: number) => Math.max(MIN_QTY, Math.min(MAX_QTY, qty));

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<number>) => {
      const existing = findItem(state.items, action.payload);
      if (existing) {
        existing.quantity = clampQty(existing.quantity + 1);
        return;
      }
      state.items.push({ productId: action.payload, quantity: MIN_QTY });
    },
    removeFromCart: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter((item) => item.productId !== action.payload);
    },
    increaseQty: (state, action: PayloadAction<number>) => {
      const existing = findItem(state.items, action.payload);
      if (existing) {
        existing.quantity = clampQty(existing.quantity + 1);
      }
    },
    decreaseQty: (state, action: PayloadAction<number>) => {
      const existing = findItem(state.items, action.payload);
      if (!existing) return;
      if (existing.quantity <= MIN_QTY) {
        state.items = state.items.filter((item) => item.productId !== action.payload);
        return;
      }
      existing.quantity = clampQty(existing.quantity - 1);
    },
    setQty: (state, action: PayloadAction<{ productId: number; quantity: number }>) => {
      const existing = findItem(state.items, action.payload.productId);
      if (!existing) return;
      existing.quantity = clampQty(action.payload.quantity);
    },
    clearCart: (state) => {
      state.items = [];
    },
    hydrateCart: (state, action: PayloadAction<CartItem[]>) => {
      state.items = action.payload
        .filter((item) => item.quantity >= MIN_QTY)
        .map((item) => ({
          productId: item.productId,
          quantity: clampQty(item.quantity)
        }));
      state.isHydrated = true;
    }
  }
});

export const {
  addToCart,
  removeFromCart,
  increaseQty,
  decreaseQty,
  setQty,
  clearCart,
  hydrateCart
} = cartSlice.actions;

export const cartReducer = cartSlice.reducer;
