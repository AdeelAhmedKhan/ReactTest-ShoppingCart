import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { CheckoutState, ShippingForm } from "../types";

const emptyShipping: ShippingForm = {
  fullName: "",
  address: "",
  city: "",
  zipCode: ""
};

const initialState: CheckoutState = {
  shipping: emptyShipping
};

const checkoutSlice = createSlice({
  name: "checkout",
  initialState,
  reducers: {
    setShipping: (state, action: PayloadAction<ShippingForm>) => {
      state.shipping = action.payload;
    }
  }
});

export const { setShipping } = checkoutSlice.actions;
export const checkoutReducer = checkoutSlice.reducer;
