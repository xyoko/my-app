
import { NavLink, Route, Routes } from "react-router-dom";
import { Card } from "./card/ui/card";
import { items } from "./entity/items";
import { useAppSelector } from "./hooks";
import { CartPage } from "./cart/ui/CartPage";
import { WishlistPage } from "./wishlist/ui/WishlistPage";

export default function App() {
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
					<NavLink
						to="/"
						className={({ isActive }) =>
							`nav-link rounded px-3 py-2 text-sm font-medium transition ${
								isActive ? "nav-link-active" : ""
							}`
						}
					>
						Products
					</NavLink>
					<NavLink
						to="/cart"
						className={({ isActive }) =>
							`nav-link rounded px-3 py-2 text-sm font-medium transition ${
								isActive ? "nav-link-active" : ""
							}`
						}
					>
						Cart ({cartCount})
					</NavLink>
					<NavLink
						to="/wishlist"
						className={({ isActive }) =>
							`nav-link rounded px-3 py-2 text-sm font-medium transition ${
								isActive ? "nav-link-active" : ""
							}`
						}
					>
						Wishlist
					</NavLink>
				</nav>
			</header>
			<Routes>
				<Route
					path="/"
					element={
						<section
							className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
							aria-label="Products"
						>
							{items.map((product) => (
								<Card key={product.id} product={product} />
							))}
						</section>
					}
				/>
				<Route path="/cart" element={<CartPage />} />
				<Route path="/wishlist" element={<WishlistPage />} />
				<Route path="*" element={<CartPage />} />
			</Routes>
		</main>
	);
}
