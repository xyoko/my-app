import { useAppSelector } from "../../hooks";
import { items } from "../../entity/items";
import { QuantityControl } from "./QuantityControl";

export function CartPage() {
  const cartItems = useAppSelector((state) => state.cart.items);
  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  if (cartItems.length === 0) {
    return <p className="text-slate-600">Your cart is empty.</p>;
  }

  return (
    <section className="space-y-4" aria-label="Shopping cart">
      {cartItems.map((cartItem) => {
        const product = items.find((item) => item.id === cartItem.id);
        if (!product) return null;

        return (
          <div
            key={cartItem.id}
            className="flex flex-wrap items-center justify-between gap-4 rounded-lg border border-black bg-white p-4 shadow-sm"
          >
            <div>
              <h2 className="font-semibold text-slate-900">{product.name}</h2>
              <p className="mt-1 text-sm text-slate-600">
                ${product.price} each
              </p>
            </div>
            <QuantityControl product={product} quantity={cartItem.quantity} />
            <p className="min-w-20 text-right font-medium tabular-nums">
              ${(product.price * cartItem.quantity)}
            </p>
          </div>
        );
      })}
      <div className="flex justify-end border-t border-black pt-4">
        <p className="font-semibold text-slate-900">
          Total: ${total.toFixed(2)}
        </p>
      </div>
    </section>
  );
}