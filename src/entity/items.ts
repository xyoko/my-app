import axios from "axios";

export type News = {
  id: string | number;
  title: string;
  summary?: string;
  content?: string;
  image_url?: string;
  author?: string;
};

export type NewNews = Pick<News, "title" | "summary">;

type NewsListResponse = {
  data: News[];
  meta: { page: number; limit: number; total: number; pages: number };
};

type NewsCreatePayload = {
  title: string;
  summary?: string;
  content: string;
  image_url: string;
  author: string;
};

const defaultSamples = {
  content: "This is a sample news story.",
  image_url: "https://picsum.photos/800/400",
  author: "Admin",
};

const api = axios.create({
  baseURL: "https://news-api-omega-jade.vercel.app",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

export const itemsApi = {
  // GET /api/news -> read news; the API wraps its array in a `data` property.
  async getAll(): Promise<News[]> {
    try {
      const { data } = await api.get<NewsListResponse>("/api/news", {
        params: { page: 1, limit: 10 },
      });
      return data.data;
    } catch {
      return [];
    }
  },

  // GET /api/news/:id -> read one news item.
  async getById(id: string): Promise<News> {
    const { data } = await api.get<News>(`/api/news/${id}`);
    return data;
  },

  // POST /api/news -> create news using title and summary from the form.
  // The other required/optional fields come from the sample defaults above.
  async create(input: NewNews): Promise<News> {
    const payload: NewsCreatePayload = {
      ...defaultSamples,
      title: input.title,
      summary: input.summary ?? "No summary provided.",
    };
    try {
      const { data } = await api.post<News>("/api/news", payload);
      return data;
    } catch (error) {
      window.alert("Failed to create news item. Please try again later.");
      throw error;
    }
  },

  // PUT /api/news/:id -> replace a news item. The API requires title and content.
  async replace(id: string | number, changes: Partial<News>): Promise<News> {
    const updated: News = {
      id,
      title: changes.title ?? "Updated news",
      summary: changes.summary ?? "Updated summary",
      content: changes.content ?? defaultSamples.content,
    };

    try {
      const payload: NewsCreatePayload = {
        ...defaultSamples,
        title: updated.title,
        summary: updated.summary,
        content: updated.content ?? defaultSamples.content,
      };

      const { data } = await api.put<News>(`/api/news/${id}`, payload);
      return data;
    } catch (error) {
      window.alert("Failed to update news item. Please try again later.");
      throw error;
    }
  },

  // PATCH /api/news/:id -> update only supplied fields.
  async patch(id: string | number, changes: Partial<News>): Promise<News> {
    try {
      const payload: Partial<NewsCreatePayload> = {};

      if (changes.title) payload.title = changes.title;
      if (changes.summary) payload.summary = changes.summary;
      if (changes.content) payload.content = changes.content;

      const { data } = await api.patch<News>(`/api/news/${id}`, payload);
      return data;
    } catch (error) {
      window.alert("Failed to update news item. Please try again later.");
      throw error;
    }
  },

  // DELETE /api/news/:id -> remove a news item.
  async remove(id: string | number): Promise<void> {
    try {
      await api.delete(`/api/news/${id}`);
    } catch {
      // Remote failure is ignored for the simple demo API.
    }
  },
};
