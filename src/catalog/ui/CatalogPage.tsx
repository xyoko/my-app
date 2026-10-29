import { useEffect, useState } from "react";
import { Card } from "../../card/ui/card";
import { itemsApi, type Product } from "../../entity/items";
import { useNavigate } from "react-router-dom";

export function CatalogPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  async function loadProducts() {
    const result = await itemsApi.getAll();
    setProducts(result);
    setIsLoading(false);
  }

  useEffect(() => {
    void loadProducts();
  }, []);

  async function handleCreateSample() {
    const sample: Product = {
      id: "",
      name: `Demo Product ${Date.now()}`,
      price: 49.99,
      description: "Created with POST",
    };

    await itemsApi.create(sample);
    await loadProducts();
  }

  async function handlePatch(product: Product) {
    await itemsApi.patch(product.id, {
      price: Number((product.price + 10).toFixed(2)),
      description: "Updated with PATCH",
    });
    await loadProducts();
  }
  async function handleDelete(id: string) {
    setIsLoading(true);
    await itemsApi.remove(id);
    await loadProducts();
  }
  async function handleReplace(product: Product) {
    handleDelete(product.id);
    navigate("edit");
  }

  

  return (
    <section className="space-y-5" aria-label="Products">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-[0.32em] text-amber-300/70">
            Product catalog
          </p>
          <h2 className="engraved-text mt-1 text-2xl font-semibold text-stone-100">
            Products
          </h2>
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => void handleCreateSample()}
          className="rounded bg-emerald-300 px-3 py-2 text-sm font-semibold text-emerald-950"
        >
          Add product
        </button>
      </div>

      {isLoading && (
        <p className="rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-sm text-stone-300" role="status">
          Loading products…
        </p>
      )}

      {!isLoading && products.length === 0 && (
        <p className="text-sm text-stone-400">No products were returned.</p>
      )}

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((product) => (
          <div key={product.id} className="space-y-3">
            <Card product={product} />
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => void handlePatch(product)}
                className="rounded border border-amber-300/40 bg-amber-300/10 px-2 py-1 text-xs text-amber-200"
              >
                PATCH
              </button>
              <button
                type="button"
                onClick={() => void handleDelete(product.id)}
                className="rounded border border-rose-300/40 bg-rose-300/10 px-2 py-1 text-xs text-rose-200"
              >
                DELETE
              </button>
               <button
                type="button"
                onClick={() => void handleReplace(product)}
                className="rounded border border-amber-300/40 bg-amber-300/10 px-2 py-1 text-xs text-amber-200"
              >
                REPLACE
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
