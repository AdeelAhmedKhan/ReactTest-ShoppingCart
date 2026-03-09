import { setShipping } from "../store/checkoutSlice";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import type { ShippingForm } from "../types";

export const useCheckout = () => {
  const dispatch = useAppDispatch();
  const shipping = useAppSelector((state) => state.checkout.shipping);

  return {
    shipping,
    saveShipping: (payload: ShippingForm) => dispatch(setShipping(payload))
  };
};
