import { Link } from "react-router-dom";
import { CartSidebar } from "../components/CartSidebar";
import { FilterBar } from "../components/FilterBar";
import { ProductCard } from "../components/ProductCard";
import { products } from "../data/products";
import { useCart } from "../hooks/useCart";
import { useProductFilter } from "../hooks/useProductFilter";

export const ProductsPage = () => {
  const cart = useCart();
  const filters = useProductFilter(products);

  return (
    <section>
      <div className="page-head">
        <div>
          <h1 className="page-title">Discover Products</h1>
          <p className="page-subtitle">Clean shopping experience with smart filters and quick checkout.</p>
        </div>
        <Link to="/checkout/cart" className="btn-primary">
          Go to Checkout
        </Link>
      </div>

      <FilterBar
        search={filters.search}
        setSearch={filters.setSearch}
        category={filters.category}
        setCategory={filters.setCategory}
        categories={filters.categories}
        maxPrice={filters.maxPrice}
        setMaxPrice={filters.setMaxPrice}
        maxInitialPrice={filters.maxInitialPrice}
      />

      <div className="grid gap-4 xl:grid-cols-[1fr_400px]">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {filters.filteredProducts.map((product) => {
            const item = cart.rawItems.find((cartItem) => cartItem.productId === product.id);
            return (
              <ProductCard
                key={product.id}
                product={product}
                quantity={item?.quantity ?? 0}
                onAdd={() => cart.addToCart(product.id)}
                onIncrease={() => cart.increaseQty(product.id)}
                onDecrease={() => cart.decreaseQty(product.id)}
              />
            );
          })}
        </div>

        <div className="space-y-3">
          <CartSidebar
            items={cart.items}
            subtotal={cart.subtotal}
            tax={cart.tax}
            discount={cart.discount}
            total={cart.total}
            onIncrease={cart.increaseQty}
            onDecrease={cart.decreaseQty}
            onRemove={cart.removeFromCart}
          />
          <Link to="/checkout/cart" className="btn-primary w-full">
            Checkout Now
          </Link>
        </div>
      </div>
    </section>
  );
};
