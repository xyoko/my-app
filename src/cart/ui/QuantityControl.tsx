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
        className="grid size-8 place-items-center rounded border border-slate-300 text-lg hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-40"
      >
        -
      </button>
      <span className="min-w-5 text-center tabular-nums">{quantity}</span>
      <button
        type="button"
        onClick={() => dispatch(changeQuantity({ product, delta: 1 }))}
        aria-label={`Increase ${product.name} quantity`}
        className="grid size-8 place-items-center rounded border border-slate-300 text-lg hover:bg-slate-100"
      >
        +
      </button>
    </div>
  );
}