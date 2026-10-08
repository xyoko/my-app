import { useAppDispatch } from "../../hooks";
import { changeQuantity } from "../../card/model/cartSlice";
import type { Product } from "../../entity/items";

type QuantityControlProps = {
  product: Product;
  quantity: number;
};

export function QuantityControl({ product, quantity }: QuantityControlProps) {
  const dispatch = useAppDispatch();

  return (
    <div className="inline-flex items-center gap-3" aria-label="Quantity">
      <button
        type="button"
        onClick={() => dispatch(changeQuantity({ product, delta: -1 }))}
        disabled={quantity === 0}
        aria-label={`Decrease ${product.name} quantity`}
        className="grid size-8 place-items-center rounded-lg border border-white/15 text-lg text-stone-300 transition hover:border-amber-300/50 hover:bg-white/5 hover:text-amber-200 disabled:cursor-not-allowed disabled:opacity-30"
      >
        -
      </button>
      <span className="min-w-5 text-center tabular-nums text-stone-200">
        {quantity}
      </span>
      <button
        type="button"
        onClick={() => dispatch(changeQuantity({ product, delta: 1 }))}
        aria-label={`Increase ${product.name} quantity`}
        className="grid size-8 place-items-center rounded-lg border border-white/15 text-lg text-stone-300 transition hover:border-amber-300/50 hover:bg-white/5 hover:text-amber-200"
      >
        +
      </button>
    </div>
  );
}