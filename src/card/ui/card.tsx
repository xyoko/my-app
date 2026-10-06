import { useAppSelector } from "../../hooks";
import type { Product } from "../../entity/items";
import { QuantityControl } from "../../cart/ui/QuantityControl";

type CardProps = {
  product: Product;
};

export function Card({ product }: CardProps) {
  const quantity = useAppSelector(
    (state) =>
      state.cart.items.find((item) => item.id === product.id)?.quantity ?? 0,
  );
  return (
    <div className="flex flex-row gap-4 rounded-lg border border-white bg-white p-4 shadow-sm">
      <div>
        <h2 className="text-lg font-semibold text-slate-900">{product.name}</h2>
        <p className="mt-1 text-sm text-slate-600">${product.price.toFixed(2)}</p>
      </div>
      <div className="flex items-center justify-between">
        <span className="text-sm text-slate-600">Quantity</span>
        <QuantityControl product={product} quantity={quantity} />
      </div>
    </div>
  );
}