
import {itemsApi, type Product} from "../../entity/items";
import { useState } from "react";

export function EditModel() {
    const [name, setName] = useState("");
    const [price, setPrice] = useState(0);
    const [description, setDescription] = useState("");

    async function handleCreateSample() {
    const sample: Product = {
      id: "",
      name: `${name} `,
      price: price,
      description: `${description}`
    };
    await itemsApi.create(sample);}
    

return (
    <div className="space-y-5" aria-label="Products">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <input
          type="text"
          value = {name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Product Name"
          className="rounded border border-stone-500/70 bg-[#171a1d] p-2 text-stone-100"

        />
        <input
            type="number"
            value = {price}
            onChange={(e) => setPrice(Number(e.target.value))}
            placeholder="Product Price"
            className="rounded border border-stone-500/70 bg-[#171a1d] p-2 text-stone-100"
        />
        <input
            type="text"
            value = {description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Product Description"
            className="rounded border border-stone-500/70 bg-[#171a1d] p-2 text-stone-100"
        />
        <button onClick={() => void handleCreateSample()}>Add Product</button>
        </div>
      </div>

    
  );
}

