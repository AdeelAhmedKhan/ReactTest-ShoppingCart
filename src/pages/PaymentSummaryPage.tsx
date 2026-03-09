import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { CheckoutProgress } from "../components/CheckoutProgress";
import { useCart } from "../hooks/useCart";
import { useCheckout } from "../hooks/useCheckout";
import { formatCurrency } from "../utils/currency";

export const PaymentSummaryPage = () => {
  const cart = useCart();
  const { shipping } = useCheckout();
  const navigate = useNavigate();

  useEffect(() => {
    if (cart.items.length === 0) {
      navigate("/checkout/cart", { replace: true });
    }
  }, [cart.items.length, navigate]);

  return (
    <section>
      <div className="page-head">
        <div>
          <h1 className="page-title">Checkout: Payment Summary</h1>
          <p className="page-subtitle">Final read-only confirmation for items, shipping, and total.</p>
        </div>
      </div>

      <CheckoutProgress />

      <div className="grid gap-4 lg:grid-cols-[1fr_340px]">
        <div className="glass-card p-4">
          <h2 className="text-lg font-extrabold">Items</h2>
          <div className="mt-3 space-y-2">
            {cart.items.map((item) => (
              <div key={item.productId} className="solid-card flex items-center justify-between p-3">
                <div>
                  <p className="font-semibold">{item.product.name}</p>
                  <p className="text-sm text-slate-500">Qty: {item.quantity}</p>
                </div>
                <p className="font-extrabold">{formatCurrency(item.lineTotal)}</p>
              </div>
            ))}
          </div>
        </div>

        <aside className="space-y-4">
          <div className="glass-card p-4">
            <h2 className="text-base font-extrabold">Shipping (Read-only)</h2>
            <div className="mt-2 space-y-1 text-sm text-slate-600">
              <p>{shipping.fullName || "-"}</p>
              <p>{shipping.address || "-"}</p>
              <p>{shipping.city || "-"}</p>
              <p>{shipping.zipCode || "-"}</p>
            </div>
          </div>

          <div className="glass-card p-4">
            <h2 className="text-base font-extrabold">Totals</h2>
            <div className="mt-2 space-y-1 text-sm">
              <div className="flex justify-between"><span>Subtotal</span><span>{formatCurrency(cart.subtotal)}</span></div>
              <div className="flex justify-between"><span>Tax (8%)</span><span>{formatCurrency(cart.tax)}</span></div>
              <div className="flex justify-between"><span>Discount</span><span>-{formatCurrency(cart.discount)}</span></div>
              <div className="mt-2 flex justify-between border-t border-slate-200 pt-2 text-base font-extrabold"><span>Total</span><span>{formatCurrency(cart.total)}</span></div>
            </div>
          </div>
        </aside>
      </div>
    </section>
  );
};
