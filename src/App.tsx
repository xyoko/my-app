
import { NavLink, Outlet } from "react-router-dom";


export default function App() {


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
							News
					</NavLink>
					<NavLink
						to="/edit"
						className={({ isActive }) =>
							`nav-link rounded px-3 py-2 text-sm font-medium transition ${
								isActive ? "nav-link-active" : ""
							}`
						}
					>
							New story
					</NavLink>
				</nav>
			</header>
			<Outlet />
		</main>
	);
}
