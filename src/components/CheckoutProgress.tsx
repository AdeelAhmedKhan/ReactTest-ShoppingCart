import { Link, useLocation } from "react-router-dom";

const steps = [
  { label: "Cart Review", path: "/checkout/cart" },
  { label: "Shipping", path: "/checkout/shipping" },
  { label: "Payment Summary", path: "/checkout/summary" }
];

export const CheckoutProgress = () => {
  const location = useLocation();

  return (
    <div className="glass-card mb-5 p-3">
      <div className="flex flex-wrap gap-2">
        {steps.map((step, index) => {
          const active = location.pathname === step.path;
          return (
            <Link
              key={step.path}
              to={step.path}
              className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition ${
                active
                  ? "bg-slate-900 text-white shadow-md shadow-slate-300"
                  : "bg-white text-slate-700 hover:bg-slate-100"
              }`}
            >
              <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-white/25 text-[11px]">
                {index + 1}
              </span>
              {step.label}
            </Link>
          );
        })}
      </div>
    </div>
  );
};
