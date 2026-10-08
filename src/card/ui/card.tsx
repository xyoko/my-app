import { useAppDispatch, useAppSelector } from "../../hooks";
import type { Product } from "../../entity/items";
import { QuantityControl } from "../../cart/ui/QuantityControl";
import { changeQuantity } from "../model/cartSlice";
import { addToWishlist, removeFromWishlist } from "../../wishlist/model/wishlistSlice";

type CardProps = {
  product: Product;
};

export function Card({ product }: CardProps) {
  const dispatch = useAppDispatch();
  const quantity = useAppSelector(
    (state) =>
      state.cart.items.find((item) => item.id === product.id)?.quantity ?? 0,
  );
  const isSaved = useAppSelector((state) =>
    state.wishlist.items.some((item) => item.id === product.id),
  );

  return (
    <div className="metallic-card group relative flex flex-col gap-5 overflow-hidden rounded-xl border border-stone-500/70 bg-[#171a1d] p-5 shadow-[0_14px_40px_rgba(0,0,0,0.35)] transition duration-500 hover:-translate-y-1 hover:border-amber-300/60 hover:shadow-[0_20px_55px_rgba(0,0,0,0.55)]">
      <div className="card-glint" aria-hidden="true" />
      <div className="relative">
        <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.24em] text-stone-500">
          Edition 01
        </p>
        <h2 className="engraved-text text-xl font-semibold tracking-wide text-stone-100">
          {product.name}
        </h2>
        <p className="mt-2 text-sm font-medium text-amber-300/80">
          ${product.price.toFixed(2)}
        </p>
      </div>

      {quantity === 0 ? (
        <button
          type="button"
          onClick={() => dispatch(changeQuantity({ product, delta: 1 }))}
          className="metallic-button w-full rounded-lg py-2.5 text-sm font-semibold text-stone-950 transition hover:brightness-110"
        >
          Add to Cart
        </button>
      ) : (
        <div className="flex items-center justify-between rounded-lg border border-white/10 bg-black/20 px-3 py-2.5">
          <span className="text-xs uppercase tracking-[0.16em] text-stone-500">
            Quantity
          </span>
          <QuantityControl product={product} quantity={quantity} />
        </div>
      )}

      <button
        type="button"
        onClick={() =>
          dispatch(
            isSaved
              ? removeFromWishlist(product.id)
              : addToWishlist(product),
          )
        }
        className={`w-full rounded-lg px-3 py-2.5 text-sm font-medium transition hover:bg-white/5 ${
          isSaved
            ? "border border-amber-300/50 text-amber-200"
            : "border border-white/15 text-stone-300"
        }`}
      >
        {isSaved ? "Saved to Wishlist" : "Add to Wishlist"}
      </button>
    </div>
  );
}