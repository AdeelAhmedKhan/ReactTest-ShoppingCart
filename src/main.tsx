import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./index.css";
import { store } from "./store";
import { hydrateCart } from "./store/cartSlice";
import type { CartItem } from "./types";

const STORAGE_KEY = "shopping_cart_items_v1";

const readCartFromStorage = (): CartItem[] => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as CartItem[];
    if (!Array.isArray(parsed)) return [];

    return parsed.filter(
      (item) =>
        typeof item === "object" &&
        item !== null &&
        typeof item.productId === "number" &&
        typeof item.quantity === "number"
    );
  } catch {
    return [];
  }
};

store.dispatch(hydrateCart(readCartFromStorage()));

store.subscribe(() => {
  const items = store.getState().cart.items;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
