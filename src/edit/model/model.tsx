
import { itemsApi, type NewNews } from "../../entity/items";
import { type FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";

export function AddModel() {
  const [name, setName] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [description, setDescription] = useState("");
  const navigate = useNavigate();

  async function handleCreateSample(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const sample: NewNews = {
      title: name.trim(),
      summary: description.trim(),
      image_url: imageUrl.trim() || undefined,
    };

    if (!sample.title ) {
      window.alert("Please add a title .");
      return;
    }
    if (!sample.image_url) {
      window.alert("Please add an image URL.");
      return;
    }
    if (!sample.summary) {
      window.alert("Please add a summary.");
      return;
    }

    await itemsApi.create(sample);
    setName("");
    setImageUrl("");
    setDescription("");
    navigate("/");
    
  }

  return (
    <div className="space-y-5" aria-label="News">
      <form onSubmit={handleCreateSample} className="space-y-3 rounded-xl border border-white/10 bg-[#111518] p-4">
        <div className="space-y-2">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
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
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Story summary"
            className="w-full rounded border border-stone-500/70 bg-[#171a1d] p-2 text-stone-100"
          />
        </div>

        <button type="submit" className="rounded bg-emerald-300 px-3 py-2 font-semibold text-emerald-950">
          Add story
        </button>
      </form>
    </div>
  );
}

