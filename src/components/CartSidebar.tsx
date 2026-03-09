import { formatCurrency } from "../utils/currency";

type CartItemRow = {
  productId: number;
  quantity: number;
  lineTotal: number;
  product: {
    name: string;
    price: number;
  };
};

type Props = {
  items: CartItemRow[];
  subtotal: number;
  tax: number;
  discount: number;
  total: number;
  onIncrease: (productId: number) => void;
  onDecrease: (productId: number) => void;
  onRemove: (productId: number) => void;
};

export const CartSidebar = ({
  items,
  subtotal,
  tax,
  discount,
  total,
  onIncrease,
  onDecrease,
  onRemove
}: Props) => {
  return (
    <aside className="glass-card p-5 lg:sticky lg:top-24">
      <h2 className="text-lg font-extrabold text-slate-900">Cart Summary</h2>

      <div className="mt-4 space-y-3">
        {items.length === 0 ? (
          <p className="rounded-xl border border-dashed border-slate-300 bg-white p-3 text-sm text-slate-500">
            Your cart is empty.
          </p>
        ) : (
          items.map((item) => (
            <div key={item.productId} className="rounded-xl border border-slate-200 bg-white p-3">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <p className="font-semibold text-slate-900">{item.product.name}</p>
                  <p className="text-xs text-slate-500">{formatCurrency(item.product.price)} each</p>
                </div>
                <button
                  onClick={() => onRemove(item.productId)}
                  className="text-xs font-semibold text-rose-600 hover:text-rose-700"
                >
                  Remove
                </button>
              </div>
              <div className="mt-2 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <button className="btn-soft h-8 w-8 px-0" onClick={() => onDecrease(item.productId)}>
                    -
                  </button>
                  <span className="text-sm font-semibold">{item.quantity}</span>
                  <button className="btn-soft h-8 w-8 px-0" onClick={() => onIncrease(item.productId)}>
                    +
                  </button>
                </div>
                <p className="font-bold text-slate-900">{formatCurrency(item.lineTotal)}</p>
              </div>
            </div>
          ))
        )}
      </div>

      <div className="mt-5 space-y-2 border-t border-slate-200 pt-4 text-sm">
        <div className="flex justify-between text-slate-600">
          <span>Subtotal</span>
          <span>{formatCurrency(subtotal)}</span>
        </div>
        <div className="flex justify-between text-slate-600">
          <span>Tax (8%)</span>
          <span>{formatCurrency(tax)}</span>
        </div>
        <div className="flex justify-between text-slate-600">
          <span>Discount</span>
          <span>-{formatCurrency(discount)}</span>
        </div>
        <div className="mt-1 flex justify-between border-t border-slate-200 pt-2 text-base font-extrabold text-slate-900">
          <span>Total</span>
          <span>{formatCurrency(total)}</span>
        </div>
      </div>
    </aside>
  );
};
