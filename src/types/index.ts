export type Product = {
  id: number;
  name: string;
  category: "Electronics" | "Accessories" | "Home" | "Fitness";
  price: number;
  image: string;
};

export type CartItem = {
  productId: number;
  quantity: number;
};

export type CartState = {
  items: CartItem[];
  isHydrated: boolean;
};

export type ShippingForm = {
  fullName: string;
  address: string;
  city: string;
  zipCode: string;
};

export type CheckoutState = {
  shipping: ShippingForm;
};
