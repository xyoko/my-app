import type { News } from "../../entity/items";

type CardProps = {
  item: News;
};

export function Card({ item }: CardProps) {
  return (
    <article className="overflow-hidden rounded-xl border border-white/10 bg-[#12171a] shadow-lg shadow-black/20">
      {item.image_url ? (
        <img src={item.image_url} alt={item.title} className="h-40 w-full object-cover" />
      ) : null}

      <div className="space-y-3 p-4">
        <div className="flex items-center justify-between gap-3 text-[10px] uppercase tracking-[0.26em] text-amber-200/70">
          <span>{item.author ?? "News Desk"}</span>
        </div>

        <h3 className="text-lg font-semibold text-stone-100">{item.title}</h3>

        <p className="text-sm text-stone-300">{item.summary ?? "No summary provided yet."}</p>

        {item.content ? <p className="text-sm text-stone-400">{item.content}</p> : null}
      </div>
    </article>
  );
}
