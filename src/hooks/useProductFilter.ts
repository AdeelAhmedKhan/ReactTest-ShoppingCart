import { useMemo, useState } from "react";
import type { Product } from "../types";

export const useProductFilter = (allProducts: Product[]) => {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState<string>("All");
  const maxInitialPrice = Math.max(...allProducts.map((p) => p.price));
  const [maxPrice, setMaxPrice] = useState<number>(Math.ceil(maxInitialPrice));

  const categories = useMemo(
    () => ["All", ...Array.from(new Set(allProducts.map((p) => p.category)))],
    [allProducts]
  );

  const filteredProducts = useMemo(() => {
    const searchText = search.trim().toLowerCase();

    return allProducts.filter((product) => {
      const matchSearch = searchText.length === 0 || product.name.toLowerCase().includes(searchText);
      const matchCategory = category === "All" || product.category === category;
      const matchPrice = product.price <= maxPrice;
      return matchSearch && matchCategory && matchPrice;
    });
  }, [allProducts, category, maxPrice, search]);

  return {
    filteredProducts,
    categories,
    search,
    setSearch,
    category,
    setCategory,
    maxPrice,
    setMaxPrice,
    maxInitialPrice: Math.ceil(maxInitialPrice)
  };
};
