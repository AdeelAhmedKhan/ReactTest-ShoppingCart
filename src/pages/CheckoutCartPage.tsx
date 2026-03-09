import { Link, useNavigate } from "react-router-dom";
import { CheckoutProgress } from "../components/CheckoutProgress";
import { useCart } from "../hooks/useCart";
import { formatCurrency } from "../utils/currency";

export const CheckoutCartPage = () => {
  const cart = useCart();
  const navigate = useNavigate();
  const isEmpty = cart.items.length === 0;

  return (
    <section>
      <div className="page-head">
        <div>
          <h1 className="page-title">Checkout: Cart Review</h1>
          <p className="page-subtitle">Review cart items before entering shipping details.</p>
        </div>
      </div>

      <CheckoutProgress />

      <div className="grid gap-4 lg:grid-cols-[1fr_360px]">
        <div className="glass-card p-4">
          {isEmpty ? (
            <div className="rounded-xl border border-amber-200 bg-amber-50 p-4 text-amber-700">
              <p>Your cart is empty. Add at least one item to proceed.</p>
              <Link to="/products" className="mt-2 inline-block text-sm font-semibold underline">
                Back to products
              </Link>
            </div>
          ) : (
            <div className="space-y-3">
              {cart.items.map((item) => (
                <div
                  key={item.productId}
                  className="solid-card flex flex-col gap-3 p-3 sm:flex-row sm:items-center sm:justify-between"
                >
                  <div>
                    <p className="font-bold text-slate-900">{item.product.name}</p>
                    <p className="text-sm text-slate-500">{formatCurrency(item.product.price)} each</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button onClick={() => cart.decreaseQty(item.productId)} className="btn-soft h-9 w-9 px-0">
                      -
                    </button>
                    <span className="inline-flex h-9 min-w-10 items-center justify-center rounded-lg border border-slate-200 bg-white px-2 text-sm font-semibold">
                      {item.quantity}
                    </span>
                    <button onClick={() => cart.increaseQty(item.productId)} className="btn-soft h-9 w-9 px-0">
                      +
                    </button>
                    <button
                      onClick={() => cart.removeFromCart(item.productId)}
                      className="btn-soft border-rose-200 text-rose-600 hover:bg-rose-50"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <aside className="glass-card p-4">
          <h2 className="text-lg font-extrabold">Order Totals</h2>
          <div className="mt-3 space-y-1 text-sm">
            <div className="flex justify-between"><span>Subtotal</span><span>{formatCurrency(cart.subtotal)}</span></div>
            <div className="flex justify-between"><span>Tax (8%)</span><span>{formatCurrency(cart.tax)}</span></div>
            <div className="flex justify-between"><span>Discount</span><span>-{formatCurrency(cart.discount)}</span></div>
            <div className="mt-2 flex justify-between border-t border-slate-200 pt-2 text-base font-extrabold"><span>Total</span><span>{formatCurrency(cart.total)}</span></div>
          </div>

          <button
            onClick={() => navigate("/checkout/shipping")}
            disabled={isEmpty}
            className="btn-primary mt-4 w-full disabled:cursor-not-allowed disabled:opacity-50"
          >
            Continue to Shipping
          </button>
        </aside>
      </div>
    </section>
  );
};
