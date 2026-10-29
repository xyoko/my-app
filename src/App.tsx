
import { NavLink, Outlet } from "react-router-dom";
import { useAppSelector } from "./hooks";

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
						end
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
					<NavLink
						to="/edit"
						className={({ isActive }) =>
							`nav-link rounded px-3 py-2 text-sm font-medium transition ${
								isActive ? "nav-link-active" : ""
							}`
						}
					>
						Edit Product
					</NavLink>
				</nav>
			</header>
			<Outlet />
		</main>
	);
}
