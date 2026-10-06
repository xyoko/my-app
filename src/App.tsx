
import { useState } from "react";
import { Card } from "./card/ui/card";
import { items } from "./entity/items";
import { useAppSelector } from "./hooks";
import { CartPage } from "./cart/ui/CartPage";

export default function App() {
	const [page, setPage] = useState<"products" | "cart">("products");
	const cartCount = useAppSelector((state) =>
		state.cart.items.reduce((sum, item) => sum + item.quantity, 0),
	);

	return (
		<main className="mx-auto min-h-screen max-w-5xl space-y-6 bg-white p-6 text-black">
			<header className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 pb-4">
				<h1 className="text-2xl font-bold">Store</h1>
				<nav className="flex gap-2" aria-label="Main navigation">
					<button
						type="button"
						aria-current={page === "products" ? "page" : undefined}
						onClick={() => setPage("products")}
						className={`rounded px-3 py-2 text-sm font-medium ${page === "products" ? "bg-black text-white" : "text-red-600"}`}
					>
						Products
					</button>
					<button
						type="button"
						aria-current={page === "cart" ? "page" : undefined}
						onClick={() => setPage("cart")}
						className={`rounded px-3 py-2 text-sm font-medium ${page === "cart" ? "bg-black text-white" : "text-red-600"}`}
					>
						Cart ({cartCount})
					</button>
				</nav>
			</header>
			{page === "products" ? (
				<section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3" aria-label="Products">
					{items.map((product) => (
						<Card key={product.id} product={product} />
					))}
				</section>
			) : (
				<CartPage />
			)}
		</main>
	);
}
