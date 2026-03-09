import type { Product } from "../types";
import { formatCurrency } from "../utils/currency";

type Props = {
  product: Product;
  quantity: number;
  onAdd: () => void;
  onIncrease: () => void;
  onDecrease: () => void;
};

export const ProductCard = ({ product, quantity, onAdd, onIncrease, onDecrease }: Props) => {
  return (
    <article className="solid-card group overflow-hidden p-3 transition duration-200 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-slate-300/60">
      <div className="relative overflow-hidden rounded-xl">
        <img
          src={product.image}
          alt={product.name}
          className="h-48 w-full object-cover transition duration-300 group-hover:scale-105"
        />
        <span className="pill absolute left-2 top-2">{product.category}</span>
      </div>

      <div className="p-1 pt-3">
        <h3 className="line-clamp-1 text-base font-bold text-slate-900">{product.name}</h3>
        <p className="mt-1 text-lg font-extrabold text-slate-900">{formatCurrency(product.price)}</p>

        {quantity > 0 ? (
          <div className="mt-3 flex items-center gap-2">
            <button
              className="btn-soft h-10 w-10 px-0"
              onClick={onDecrease}
              aria-label={`Decrease ${product.name}`}
            >
              -
            </button>
            <span className="inline-flex h-10 min-w-12 items-center justify-center rounded-xl border border-slate-200 bg-white px-3 text-sm font-semibold">
              {quantity}
            </span>
            <button
              className="btn-soft h-10 w-10 px-0"
              onClick={onIncrease}
              aria-label={`Increase ${product.name}`}
            >
              +
            </button>
          </div>
        ) : (
          <button className="btn-primary mt-3 w-full" onClick={onAdd}>
            Add to Cart
          </button>
        )}
      </div>
    </article>
  );
};
