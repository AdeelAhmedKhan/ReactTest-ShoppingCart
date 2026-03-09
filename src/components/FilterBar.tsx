type Props = {
  search: string;
  setSearch: (value: string) => void;
  category: string;
  setCategory: (value: string) => void;
  categories: string[];
  maxPrice: number;
  setMaxPrice: (value: number) => void;
  maxInitialPrice: number;
};

export const FilterBar = ({
  search,
  setSearch,
  category,
  setCategory,
  categories,
  maxPrice,
  setMaxPrice,
  maxInitialPrice
}: Props) => {
  return (
    <section className="glass-card mb-5 p-4 md:p-5">
      <div className="grid gap-3 lg:grid-cols-[1.4fr_0.8fr_1fr]">
        <input
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          placeholder="Search products"
          className="input-base"
        />

        <select
          value={category}
          onChange={(event) => setCategory(event.target.value)}
          className="input-base"
        >
          {categories.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>

        <div className="rounded-xl border border-slate-200 bg-white p-3">
          <label className="mb-2 block text-xs font-semibold uppercase tracking-wide text-slate-500">
            Max Price: ${maxPrice}
          </label>
          <input
            type="range"
            min={0}
            max={maxInitialPrice}
            value={maxPrice}
            onChange={(event) => setMaxPrice(Number(event.target.value))}
            className="w-full accent-slate-900"
          />
        </div>
      </div>
    </section>
  );
};
