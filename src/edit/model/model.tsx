
import { itemsApi, type NewNews } from "../../entity/items";
import { useState } from "react";

export function EditModel() {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");

    async function handleCreateSample() {
    const sample: NewNews = {
      title: name.trim(),
      summary: description.trim(),
    };

    if (!sample.title) {
      window.alert("Please add a title.");
      return;
    }

    await itemsApi.create(sample);
    setName("");
    setDescription("");
    }
    

return (
    <div className="space-y-5" aria-label="News">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <input
          type="text"
          value = {name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Story title"
          className="rounded border border-stone-500/70 bg-[#171a1d] p-2 text-stone-100"

        />
        <input
            type="text"
            value = {description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Story summary"
            className="rounded border border-stone-500/70 bg-[#171a1d] p-2 text-stone-100"
        />
        <button onClick={() => void handleCreateSample()}>Add story</button>
        </div>
      </div>

    
  );
}

