import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CheckoutProgress } from "../components/CheckoutProgress";
import { useCart } from "../hooks/useCart";
import { useCheckout } from "../hooks/useCheckout";
import type { ShippingForm } from "../types";

export const CheckoutShippingPage = () => {
  const cart = useCart();
  const { shipping, saveShipping } = useCheckout();
  const navigate = useNavigate();

  const [form, setForm] = useState<ShippingForm>(shipping);
  const [errors, setErrors] = useState<Partial<Record<keyof ShippingForm, string>>>({});

  useEffect(() => {
    if (cart.items.length === 0) {
      navigate("/checkout/cart", { replace: true });
    }
  }, [cart.items.length, navigate]);

  const hasSavedShipping = useMemo(
    () => Object.values(shipping).some((value) => value.trim().length > 0),
    [shipping]
  );

  const validate = () => {
    const nextErrors: Partial<Record<keyof ShippingForm, string>> = {};

    if (!form.fullName.trim()) nextErrors.fullName = "Full name is required.";
    if (!form.address.trim()) nextErrors.address = "Address is required.";
    if (!form.city.trim()) nextErrors.city = "City is required.";
    if (!/^\d{5,6}$/.test(form.zipCode.trim())) nextErrors.zipCode = "Zip must be 5 or 6 digits.";

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const onContinue = () => {
    if (!validate()) return;
    saveShipping(form);
    navigate("/checkout/summary");
  };

  return (
    <section>
      <div className="page-head">
        <div>
          <h1 className="page-title">Checkout: Shipping</h1>
          <p className="page-subtitle">Add shipping details to continue to summary.</p>
        </div>
      </div>

      <CheckoutProgress />

      <div className="grid gap-4 lg:grid-cols-[1fr_330px]">
        <div className="glass-card p-4">
          <div className="grid gap-3 sm:grid-cols-2">
            <div>
              <label className="mb-1 block text-sm font-semibold text-slate-700">Full Name</label>
              <input
                value={form.fullName}
                onChange={(event) => setForm((prev) => ({ ...prev, fullName: event.target.value }))}
                className="input-base"
              />
              {errors.fullName && <p className="mt-1 text-sm text-rose-600">{errors.fullName}</p>}
            </div>

            <div>
              <label className="mb-1 block text-sm font-semibold text-slate-700">City</label>
              <input
                value={form.city}
                onChange={(event) => setForm((prev) => ({ ...prev, city: event.target.value }))}
                className="input-base"
              />
              {errors.city && <p className="mt-1 text-sm text-rose-600">{errors.city}</p>}
            </div>

            <div className="sm:col-span-2">
              <label className="mb-1 block text-sm font-semibold text-slate-700">Address</label>
              <input
                value={form.address}
                onChange={(event) => setForm((prev) => ({ ...prev, address: event.target.value }))}
                className="input-base"
              />
              {errors.address && <p className="mt-1 text-sm text-rose-600">{errors.address}</p>}
            </div>

            <div>
              <label className="mb-1 block text-sm font-semibold text-slate-700">Zip Code</label>
              <input
                value={form.zipCode}
                onChange={(event) => setForm((prev) => ({ ...prev, zipCode: event.target.value }))}
                className="input-base"
              />
              {errors.zipCode && <p className="mt-1 text-sm text-rose-600">{errors.zipCode}</p>}
            </div>
          </div>
        </div>

        <aside className="glass-card p-4">
          <h2 className="text-base font-extrabold">Saved Shipping</h2>
          {hasSavedShipping ? (
            <div className="mt-2 space-y-1 text-sm text-slate-600">
              <p>{shipping.fullName}</p>
              <p>{shipping.address}</p>
              <p>{shipping.city}</p>
              <p>{shipping.zipCode}</p>
            </div>
          ) : (
            <p className="mt-2 text-sm text-slate-500">No saved shipping yet.</p>
          )}

          <div className="mt-4 grid gap-2">
            <button onClick={() => navigate("/checkout/cart")} className="btn-soft">
              Back to Cart
            </button>
            <button onClick={onContinue} className="btn-primary">
              Continue to Summary
            </button>
          </div>
        </aside>
      </div>
    </section>
  );
};
