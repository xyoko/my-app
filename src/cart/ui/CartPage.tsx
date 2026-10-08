import { useAppDispatch, useAppSelector } from "../../hooks";
import { items } from "../../entity/items";
import { QuantityControl } from "./QuantityControl";
import { clearCart } from "../../card/model/cartSlice";

export function CartPage() {
  const dispatch = useAppDispatch();
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
            className="metallic-card group relative flex flex-wrap items-center justify-between gap-4 overflow-hidden rounded-xl border border-stone-500/70 bg-[#171a1d] p-4 shadow-[0_12px_30px_rgba(0,0,0,0.3)] transition duration-500 hover:border-amber-300/50"
          >
            <div className="card-glint" aria-hidden="true" />
            <div className="relative">
              <h2 className="engraved-text font-semibold text-stone-100">
                {product.name}
              </h2>
              <p className="mt-1 text-sm text-stone-500">
                ${product.price.toFixed(2)} each
              </p>
            </div>
            <div className="relative flex items-center gap-4">
              <QuantityControl product={product} quantity={cartItem.quantity} />
              <p className="min-w-20 text-right font-medium tabular-nums text-amber-200">
                ${(product.price * cartItem.quantity).toFixed(2)}
              </p>
            </div>
          </div>
        );
      })}
      <div className="flex justify-end border-t border-white/10 pt-4">
        <p className="engraved-text font-semibold text-stone-100">
          Total: ${total.toFixed(2)}
        </p>
      </div>
      <div className="flex justify-center">
        <button onClick={() => {dispatch(clearCart())
          window.alert("Thank you for your purchase! Your order has been placed successfully.");
        }} className="rounded-lg border border-amber-300/50 bg-amber-300/10 py-2 px-4 text-amber-200 transition hover:border-amber-300/50 hover:bg-amber-300/20">
          Checkout
        </button>
      </div>
    </section>
  );
}