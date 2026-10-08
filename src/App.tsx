
import { useState } from "react";
import { Card } from "./card/ui/card";
import { items } from "./entity/items";
import { useAppSelector } from "./hooks";
import { CartPage } from "./cart/ui/CartPage";
import { WishlistPage } from "./wishlist/ui/WishlistPage";

export default function App() {
	const [page, setPage] = useState<"products" | "cart" | "wishlist">(
		"products",
	);
	const cartCount = useAppSelector((state) =>
		state.cart.items.reduce((sum, item) => sum + item.quantity, 0),
	);

	return (
		<main className="app-shell mx-auto min-h-screen max-w-5xl space-y-6 bg-[#0b0d0f] p-4 text-stone-100 sm:p-6">
			<header className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-5">
				<div>
					<p className="text-[10px] font-semibold uppercase tracking-[0.32em] text-amber-300/70">
						Curated collection
					</p>
					<h1 className="engraved-text mt-1 text-2xl font-semibold tracking-tight text-stone-100">
						Store
					</h1>
				</div>
				<nav className="flex gap-2" aria-label="Main navigation">
					<button
						type="button"
						aria-current={page === "products" ? "page" : undefined}
						onClick={() => setPage("products")}
						className={`nav-link rounded px-3 py-2 text-sm font-medium transition ${page === "products" ? "nav-link-active" : ""}`}
					>
						Products
					</button>
					<button
						type="button"
						aria-current={page === "cart" ? "page" : undefined}
						onClick={() => setPage("cart")}
						className={`nav-link rounded px-3 py-2 text-sm font-medium transition ${page === "cart" ? "nav-link-active" : ""}`}
					>
						Cart ({cartCount})
					</button>
					<button
						type="button"
						aria-current={page === "wishlist" ? "page" : undefined}
						onClick={() => setPage("wishlist")}
						className={`nav-link rounded px-3 py-2 text-sm font-medium transition ${page === "wishlist" ? "nav-link-active" : ""}`}
					>
						Wishlist
					</button>
				</nav>
			</header>
			{page === "products" ? (
				<section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3" aria-label="Products">
					{items.map((product) => (
						<Card key={product.id} product={product} />
					))}
				</section>
			) : page === "wishlist" ? (
				<WishlistPage />
			) : (
				<CartPage />
			)}
		</main>
	);
}
