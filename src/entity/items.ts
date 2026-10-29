import axios from "axios";

// This file is the main product API for the app.
// It hides the HTTP details from the UI, so components only call methods like
// getAll(), create(), patch(), and remove().

export type Product = {
  id: string;
  name: string;
  price: number;
  description?: string;
};

export type NewProduct = Omit<Product, "id">;

type JsonPlaceholderPost = {
  id: number;
  userId: number;
  title: string;
  body: string;
};

const MockProducts: Product[] = [
  {
    id: "nimbus-runner",
    name: "Nimbus Runner",
    price: 129.99,
    description: "Responsive everyday sneaker with breathable knit support.",
  },
  {
    id: "summit-hike",
    name: "Summit Hike",
    price: 149.5,
    description: "Trail-ready comfort built for long walks and uneven ground.",
  },
  {
    id: "echo-lounge",
    name: "Echo Lounge",
    price: 89.0,
    description: "Soft slip-on for relaxed days and easy movement.",
  },
  {
    id: "vector-peak",
    name: "Vector Peak",
    price: 174.25,
    description:
      "Cushioned performance design for city miles and weekend climbs.",
  },
  {
    id: "amber-city",
    name: "Amber City",
    price: 99.99,
    description: "A clean streetwear staple with a lightweight, durable sole.",
  },
  {
    id: "harbor-foam",
    name: "Harbor Foam",
    price: 119.75,
    description: "Fresh cushioning and a flexible fit for everyday comfort.",
  },
];

let localProducts: Product[] = MockProducts.map((product) => ({ ...product }));

const api = axios.create({
  baseURL: "https://jsonplaceholder.typicode.co",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

function mapPostToProduct(post: JsonPlaceholderPost): Product {
  return {
    id: String(post.id),
    name: post.title,
    price: Number((4.99 + (post.id % 25) * 1.5).toFixed(2)),
    description: post.body,
  };
}

export const itemsApi = {
  // GET /posts -> read all products.
  // The remote API may fail, so we fall back to the local in-memory catalog.
  async getAll(): Promise<Product[]> {
    try {
      const { data } = await api.get<JsonPlaceholderPost[]>("/posts", {
        params: { _limit: 6 },
      });

      return data.map(mapPostToProduct);
    } catch {
      return localProducts.map((product) => ({ ...product }));
    }
  },

  // GET /posts/:id -> read one product.
  async getById(id: string): Promise<Product> {
    try {
      const { data } = await api.get<JsonPlaceholderPost>(`/posts/${id}`);
      return mapPostToProduct(data);
    } catch {
      const cached = localProducts.find((product) => product.id === id);
      if (cached) return { ...cached };
      return { ...localProducts[0] };
    }
  },

  // POST /posts -> create a product.
  // The payload is the body sent with the request.
  async create(product: NewProduct): Promise<Product> {
    const created: Product = {
      id: `local-${Date.now()}`,
      name: product.name,
      price: product.price,
      description: product.description,
    };

    localProducts = [created, ...localProducts];

    try {
      const payload = {
        title: product.name,
        body: product.description ?? "",
        userId: 1,
      };

      const { data } = await api.post<JsonPlaceholderPost>("/posts", payload);
      return mapPostToProduct(data);
    } catch {
      return { ...created };
    }
  },

  // PUT /posts/:id -> full replace.
  async replace(id: string, product: Partial<Product>): Promise<Product> {
    const updated: Product = {
      id,
      name: product.name ?? "Updated product",
      price: product.price ?? 0,
      description: product.description ?? "Updated description",
    };

    localProducts = localProducts.map((item) =>
      item.id === id ? updated : item,
    );

    try {
      const payload = {
        id: Number(id),
        title: updated.name,
        body: updated.description ?? "",
        userId: 1,
      };

      const { data } = await api.put<JsonPlaceholderPost>(
        `/posts/${id}`,
        payload,
      );
      return mapPostToProduct(data);
    } catch {
      return { ...updated };
    }
  },

  // PATCH /posts/:id -> partial update.
  async patch(id: string, changes: Partial<Product>): Promise<Product> {
    const current =
      localProducts.find((product) => product.id === id) ?? localProducts[0];
    const patched: Product = {
      ...current,
      ...changes,
      id,
    };

    localProducts = localProducts.map((product) =>
      product.id === id ? patched : product,
    );

    try {
      const payload: Record<string, string | number> = {};

      if (changes.name) payload.title = changes.name;
      if (changes.description) payload.body = changes.description;
      if (changes.price !== undefined) payload.price = Number(changes.price);

      const { data } = await api.patch<JsonPlaceholderPost>(
        `/posts/${id}`,
        payload,
      );
      return mapPostToProduct(data);
    } catch {
      return { ...patched };
    }
  },

  // DELETE /posts/:id -> remove a product.
  async remove(id: string): Promise<void> {
    localProducts = localProducts.filter((product) => product.id !== id);

    try {
      await api.delete(`/posts/${id}`);
    } catch {
      // Remote failure is ignored because the local store already reflects the action.
    }
  },
};
