export type News = {
  id: string | number;
  title: string;
  summary?: string;
  content?: string;
  image_url?: string;
  author?: string;
  description?: string;
};

export type NewNews = Pick<
  News,
  "title" | "summary" | "image_url" | "description"
>;