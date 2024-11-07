import { Category } from "../category/type";

export interface Article {
  id: number;
  createdAt: string;
  updatedAt: string;
  title: string;
  content: string;
  status: "published" | "hidden";
  likesCount: number;
  views: number;
  slug: string;
  categoryId: number;
  category: Category;
}

export interface PaginatedArticles {
  data: Article[];
  total: number;
  page: number;
  limit: number;
}
