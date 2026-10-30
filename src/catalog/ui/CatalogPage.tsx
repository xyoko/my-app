import { useEffect, useState } from "react";
import { Card } from "../../card/ui/card";
import { itemsApi, type News } from "../../entity/items";

export function CatalogPage() {
  const [newsItems, setNewsItems] = useState<News[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  async function loadNews() {
    const result = await itemsApi.getAll();
    setNewsItems(result);
    setIsLoading(false);
  }

  useEffect(() => {
    void loadNews();
  }, []);

  async function handleCreateSample() {
    await itemsApi.create({
      title: `Demo News ${Date.now()}`,
      summary: `Summary ${Date.now()}`,
    });
    await loadNews();
  }

  async function handlePatch(news: News) {
    await itemsApi.patch(String(news.id), {
      summary: "Updated with PATCH",
    });
    await loadNews();
  }

  async function handleDelete(id: string | number) {
    setIsLoading(true);
    await itemsApi.remove(id);
    await loadNews();
  }

  return (
    <section className="space-y-5" aria-label="News">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-[0.32em] text-amber-300/70">
            News catalog
          </p>
          <h2 className="engraved-text mt-1 text-2xl font-semibold text-stone-100">
            Latest stories
          </h2>
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => {
            setIsLoading(true);
            void loadNews();
          }}
          className="rounded bg-emerald-300 px-3 py-2 text-sm font-semibold text-emerald-950"
        >
          Load stories
        </button>
        <button
          type="button"
          onClick={() => {
            setIsLoading(true);
            void handleCreateSample();
          }}
          className="rounded bg-emerald-300 px-3 py-2 text-sm font-semibold text-emerald-950"
        >
          Add sample story
        </button>
      </div>


      {isLoading && (
        <p className="rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-sm text-stone-300" role="status">
          Loading stories…
        </p>
      )}

      {!isLoading && newsItems.length === 0 && (
        <p className="text-sm text-stone-400">No news items were returned.</p>
      )}

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {(!isLoading && newsItems.length > 0) && (
          newsItems.map((item) => (
            <div key={String(item.id)} className="space-y-3">
              <Card item={item} />
              <div className="flex gap-2">
                <button
                type="button"
                onClick={() => {
                  setIsLoading(true);
                  void handlePatch(item);
                }}
                className="rounded border border-amber-300/40 bg-amber-300/10 px-2 py-1 text-xs text-amber-200"
              >
                PATCH
              </button>
              <button
                type="button"
                onClick={() => {
                  setIsLoading(true);
                  void handleDelete(item.id);
                }}
                className="rounded border border-rose-300/40 bg-rose-300/10 px-2 py-1 text-xs text-rose-200"
              >
                DELETE
              </button>
            </div>
          </div>
          ))
        )}
      </div>
    </section>
  );
}
