import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { itemsApi, NewsCard, type News } from "../../../entities/news";

export function CatalogPage() {
  const [itemToDelete, setItemToDelete] = useState<News | null>(null);
  const deleteDialogRef = useRef<HTMLDialogElement>(null);
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const {
    data: newsItems = [],
    error,
    isError,
    isFetching,
    isPending,
    refetch,
  } = useQuery({
    queryKey: ["news"],
    queryFn: itemsApi.getAll,
  });
  const createMutation = useMutation({
    mutationFn: () =>
      itemsApi.create({
        title: `Demo News ${Date.now()}`,
        summary: `Summary ${Date.now()}`,
      }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["news"] }),
  });
  const deleteMutation = useMutation({
    mutationFn: (id: string | number) => itemsApi.remove(id),
    onSuccess: async () => {
      setItemToDelete(null);
      await queryClient.invalidateQueries({ queryKey: ["news"] });
    },
  });

  useEffect(() => {
    const dialog = deleteDialogRef.current;

    if (itemToDelete && dialog && !dialog.open) {
      dialog.showModal();
    } else if (!itemToDelete && dialog?.open) {
      dialog.close();
    }
  }, [itemToDelete]);

  //как я понимаю у апи нет sse значит могу пока что не изучать эту тему на 100

    // useEffect(() => {
    //   const socket  = new WebSocket("ws://localhost:3000/ws");
    //   socket.onmessage = (event) => {
    //     try{
    //     const message = JSON.parse(event.data);
    //     if (message.type === "news-updated") {
    //       queryClient.invalidateQueries({ queryKey: ["news"] });
    //     }
    //   } catch (error) {
    //     console.error("Error parsing WebSocket message:", error);
    //   }
    //   };
    //   return () => {
    //     socket.close();
    //   }
    // }, [queryClient]);


  function handlePatch(news: News) {
    navigate(`/patch/${String(news.id)}`, { state: { item: news } });
  }

  function handleDelete() {
    if (!itemToDelete) return;
    deleteMutation.mutate(itemToDelete.id);
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
          onClick={() => void refetch()}
          disabled={isFetching}
          className="rounded bg-emerald-300 px-3 py-2 text-sm font-semibold text-emerald-950"
        >
          {isFetching ? "Loading stories..." : "Load stories"}
        </button>
        <button
          type="button"
          onClick={() => createMutation.mutate()}
          disabled={createMutation.isPending}
          className="rounded bg-emerald-300 px-3 py-2 text-sm font-semibold text-emerald-950"
        >
          {createMutation.isPending ? "Adding story..." : "Add sample story"}
        </button>
      </div>

      {createMutation.isError && (
        <p className="text-sm text-rose-300" role="alert">
          Could not add the sample story. Please try again.
        </p>
      )}

      {isPending && (
        <p className="rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-sm text-stone-300" role="status">
          Loading stories…
        </p>
      )}

      {isError && (
        <p className="text-sm text-rose-300" role="alert">
          Could not load stories: {error.message}
        </p>
      )}

      {!isPending && !isError && newsItems.length === 0 && (
        <p className="text-sm text-stone-400">No news were returned.</p>
      )}

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {(!isPending && !isError && newsItems.length > 0) && (
          newsItems.map((item) => (
            <div key={String(item.id)} className="space-y-3">
              <NewsCard item={item} />
              <div className="flex gap-2">
                <button
                type="button"
                onClick={() => {
                  void handlePatch(item);
                }}
                className="rounded border border-amber-300/40 bg-amber-300/10 px-2 py-1 text-xs text-amber-200"
              >
                PATCH
              </button>
              <button
                type="button"
                onClick={() => {
                  deleteMutation.reset();
                  setItemToDelete(item);
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

      <dialog
        ref={deleteDialogRef}
        aria-labelledby="delete-dialog-title"
        aria-busy={deleteMutation.isPending}
        onCancel={(event) => {
          event.preventDefault();
          if (!deleteMutation.isPending) setItemToDelete(null);
        }}
        onClick={(event) => {
          if (event.target === event.currentTarget && !deleteMutation.isPending) {
            setItemToDelete(null);
          }
        }}
        className="w-[calc(100%-2rem)] max-w-md rounded-lg border border-white/10 bg-[#111518] p-0 text-stone-100 shadow-2xl backdrop:bg-black/70"
      >
        {itemToDelete && (
          <div className="space-y-5 p-5">
            <div className="space-y-2">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-rose-300">
                Delete story
              </p>
              <h2 id="delete-dialog-title" className="text-lg font-semibold">
                Delete “{itemToDelete.title}”?
              </h2>
              <p className="text-sm text-stone-400">
                This action cannot be undone.
              </p>
            </div>

            {deleteMutation.isError && (
              <p className="text-sm text-rose-300" role="alert">
                Could not delete this story. Please try again.
              </p>
            )}

            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setItemToDelete(null)}
                disabled={deleteMutation.isPending}
                autoFocus
                className="rounded border border-white/15 px-3 py-2 text-sm text-stone-200 hover:bg-white/5 disabled:opacity-60"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => void handleDelete()}
                disabled={deleteMutation.isPending}
                className="rounded bg-rose-400 px-3 py-2 text-sm font-semibold text-rose-950 disabled:opacity-60"
              >
                {deleteMutation.isPending ? "Deleting..." : "Delete story"}
              </button>
            </div>
          </div>
        )}
      </dialog>
    </section>
  );
}
