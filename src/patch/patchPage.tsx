import { itemsApi, type News } from "../entity/items";
import { useEffect, useState, type FormEvent } from "react";
import { useLocation, useNavigate } from "react-router-dom";

type RouteState = {
  item?: News;
};

export function EditModell() {
  const location = useLocation();
  const navigate = useNavigate();
  const routedItem = (location.state as RouteState | null)?.item ?? null;

  const [id, setId] = useState(routedItem ? String(routedItem.id) : "");
  const [title, setTitle] = useState(routedItem?.title ?? "");
  const [imageUrl, setImageUrl] = useState(routedItem?.image_url ?? "");
  const [summary, setSummary] = useState(routedItem?.summary ?? "");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!routedItem) return;

    setId(String(routedItem.id));
    setTitle(routedItem.title);
    setImageUrl(routedItem.image_url ?? "");
    setSummary(routedItem.summary ?? "");
  }, [routedItem]);

  async function loadById(targetId: string) {
    const cleanId = targetId.trim();

    if (!cleanId) {
      window.alert("Please enter an item ID.");
      return;
    }

    setIsLoading(true);

    try {
      const item = await itemsApi.getById(cleanId);
      setId(String(item.id));
      setTitle(item.title);
      setImageUrl(item.image_url ?? "");
      setSummary(item.summary ?? "");
    } catch {
      window.alert("News item not found by this ID.");
    } finally {
      setIsLoading(false);
    }
  }

  async function handleSearch(e?: FormEvent<HTMLFormElement>) {
    e?.preventDefault();
    await loadById(id);
  }

  async function handlePatch(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!id.trim()) {
      window.alert("Please search for an item first.");
      return;
    }

    const payload = {
      title: title.trim() || undefined,
      summary: summary.trim() || undefined,
      image_url: imageUrl.trim() || undefined,
    };

    if (!payload.title || !payload.summary || !payload.image_url) {
      window.alert("Title, summary, and image URL are required.");
      return;
    }

    await itemsApi.patch(id, payload);
    navigate("/");
  }

  return (
    <div className="space-y-5" aria-label="News">
      <form onSubmit={handleSearch} className="space-y-3 rounded-xl border border-white/10 bg-[#111518] p-4">
        <div className="flex gap-2">
          <input
            type="text"
            value={id}
            onChange={(e) => setId(e.target.value)}
            placeholder="Search by ID"
            className="w-full rounded border border-stone-500/70 bg-[#171a1d] p-2 text-stone-100"
          />
          <button
            type="submit"
            disabled={isLoading}
            className="rounded bg-sky-300 px-3 py-2 font-semibold text-sky-950 disabled:opacity-60"
          >
            {isLoading ? "Loading..." : "Search"}
          </button>
        </div>
      </form>

      <form onSubmit={handlePatch} className="space-y-3 rounded-xl border border-white/10 bg-[#111518] p-4">
        <div className="space-y-2">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Story title"
            className="w-full rounded border border-stone-500/70 bg-[#171a1d] p-2 text-stone-100"
          />

          <input
            type="url"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            placeholder="Image URL"
            className="w-full rounded border border-stone-500/70 bg-[#171a1d] p-2 text-stone-100"
          />

          <input
            type="text"
            value={summary}
            onChange={(e) => setSummary(e.target.value)}
            placeholder="Story summary"
            className="w-full rounded border border-stone-500/70 bg-[#171a1d] p-2 text-stone-100"
          />
        </div>

        <button type="submit" className="rounded bg-emerald-300 px-3 py-2 font-semibold text-emerald-950">
          Save patch
        </button>
      </form>
    </div>
  );
}
