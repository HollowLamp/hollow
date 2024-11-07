import { API_BASE_URL } from "../config";
import { Category } from "./type";
import { PaginatedArticles } from "../article/type";

export async function getAllCategories(): Promise<Category[]> {
  const response = await fetch(`${API_BASE_URL}/categories`);
  if (!response.ok) {
    throw new Error("获取分类失败");
  }
  const data = await response.json();
  return data.data;
}

export async function getPublishedArticlesByCategorySlug(
  slug: string,
  page: number = 1,
  limit: number = 10
): Promise<PaginatedArticles> {
  const response = await fetch(
    `${API_BASE_URL}/categories/${slug}?page=${page}&limit=${limit}`
  );
  if (!response.ok) {
    throw new Error(`获取分类失败 ${slug}`);
  }
  const data = await response.json();
  return data.data;
}
