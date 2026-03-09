import { useMemo } from "react";
import { products } from "../data/products";
import {
  addToCart,
  clearCart,
  decreaseQty,
  increaseQty,
  removeFromCart,
  setQty
} from "../store/cartSlice";
import { useAppDispatch, useAppSelector } from "../store/hooks";

const TAX_RATE = 0.08;
const DISCOUNT_THRESHOLD = 100;
const DISCOUNT_RATE = 0.1;

export const useCart = () => {
  const dispatch = useAppDispatch();
  const items = useAppSelector((state) => state.cart.items);

  const detailedItems = useMemo(
    () =>
      items
        .map((item) => {
          const product = products.find((p) => p.id === item.productId);
          if (!product) return null;
          return {
            ...item,
            product,
            lineTotal: item.quantity * product.price
          };
        })
        .filter((item): item is NonNullable<typeof item> => item !== null),
    [items]
  );

  const subtotal = useMemo(
    () => detailedItems.reduce((sum, item) => sum + item.lineTotal, 0),
    [detailedItems]
  );
  const tax = subtotal * TAX_RATE;
  const discount = subtotal > DISCOUNT_THRESHOLD ? subtotal * DISCOUNT_RATE : 0;
  const total = subtotal + tax - discount;
  const itemCount = detailedItems.reduce((sum, item) => sum + item.quantity, 0);

  return {
    items: detailedItems,
    rawItems: items,
    subtotal,
    tax,
    discount,
    total,
    itemCount,
    addToCart: (productId: number) => dispatch(addToCart(productId)),
    removeFromCart: (productId: number) => dispatch(removeFromCart(productId)),
    increaseQty: (productId: number) => dispatch(increaseQty(productId)),
    decreaseQty: (productId: number) => dispatch(decreaseQty(productId)),
    setQty: (productId: number, quantity: number) => dispatch(setQty({ productId, quantity })),
    clearCart: () => dispatch(clearCart())
  };
};
