import { useAppDispatch, useAppSelector } from "../../hooks";
import { changeQuantity } from "../../card/model/cartSlice";
import { removeFromWishlist } from "../model/wishlistSlice";

export function WishlistPage() {
  const dispatch = useAppDispatch();
  const wishlistItems = useAppSelector((state) => state.wishlist.items);

  return (
    <section aria-label="Wishlist" className="space-y-5">
      <div>
        <p className="text-[10px] font-semibold uppercase tracking-[0.32em] text-amber-300/70">
          Saved selection
        </p>
        <h2 className="engraved-text mt-1 text-2xl font-semibold">Wishlist</h2>
      </div>

      {wishlistItems.length === 0 ? (
        <p className="rounded-xl border border-dashed border-white/15 bg-white/2.5 p-8 text-center text-stone-400">
          Your wishlist is empty.
        </p>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {wishlistItems.map((product) => (
            <article
              key={product.id}
              className="metallic-card group relative flex flex-col gap-5 overflow-hidden rounded-xl border border-stone-500/70 bg-[#171a1d] p-5 shadow-[0_14px_40px_rgba(0,0,0,0.35)] transition duration-500 hover:-translate-y-1 hover:border-amber-300/60"
            >
              <div className="card-glint" aria-hidden="true" />
              <div className="relative">
                <h3 className="engraved-text text-lg font-semibold text-stone-100">
                  {product.name}
                </h3>
                <p className="mt-2 text-sm font-medium text-amber-300/80">
                  ${product.price.toFixed(2)}
                </p>
              </div>

              <div className="relative mt-auto flex flex-col gap-2">
                <button
                  type="button"
                  onClick={() => {
                    dispatch(changeQuantity({ product, delta: 1 }));
                    dispatch(removeFromWishlist(product.id));
                  }}
                  className="metallic-button rounded-lg px-3 py-2.5 text-sm font-semibold text-stone-950 transition hover:brightness-110"
                >
                  Add to Cart
                </button>
                <button
                  type="button"
                  onClick={() => dispatch(removeFromWishlist(product.id))}
                  className="rounded-lg border border-white/15 px-3 py-2.5 text-sm font-medium text-stone-400 transition hover:border-red-400/60 hover:bg-red-400/10 hover:text-red-200"
                >
                  Remove
                </button>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}
