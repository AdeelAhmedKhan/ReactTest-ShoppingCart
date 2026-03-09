import { Link, NavLink, Route, Routes } from "react-router-dom";
import { useCart } from "./hooks/useCart";
import { CheckoutCartPage } from "./pages/CheckoutCartPage";
import { CheckoutShippingPage } from "./pages/CheckoutShippingPage";
import { PaymentSummaryPage } from "./pages/PaymentSummaryPage";
import { ProductsPage } from "./pages/ProductsPage";

const navClass = ({ isActive }: { isActive: boolean }) =>
  `rounded-full px-4 py-2 text-sm font-semibold transition ${
    isActive
      ? "bg-slate-900 text-white shadow-md shadow-slate-300"
      : "text-slate-700 hover:bg-white/80"
  }`;

function App() {
  const cart = useCart();

  return (
    <div className="min-h-screen overflow-x-hidden">
      <header className="sticky top-0 z-20 border-b border-slate-200/90 bg-white/70 px-4 py-4 backdrop-blur-md md:px-8">
        <div className="flex w-full flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <Link to="/products" className="flex items-center gap-2">
            <span className="inline-block h-3 w-3 rounded-full bg-cyan-500" />
            <span className="text-xl font-extrabold tracking-tight text-slate-900">Welocome to the X Store</span>
          </Link>

          <nav className="flex flex-wrap items-center gap-2">
            <NavLink to="/products" className={navClass}>
              Products
            </NavLink>
            <NavLink to="/checkout/cart" className={navClass}>
              Checkout
            </NavLink>
            <span className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700">
              {cart.itemCount} items
            </span>
          </nav>
        </div>
      </header>

      <main className="w-full px-4 py-6 md:px-8">
        <Routes>
          <Route path="/" element={<ProductsPage />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/checkout/cart" element={<CheckoutCartPage />} />
          <Route path="/checkout/shipping" element={<CheckoutShippingPage />} />
          <Route path="/checkout/summary" element={<PaymentSummaryPage />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
