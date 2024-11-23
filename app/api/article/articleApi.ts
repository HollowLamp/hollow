import { API_BASE_URL } from "../config";
import { PaginatedArticles, Article } from "./type";

export async function getPublishedArticles(
  page: number = 1,
  limit: number = 10
): Promise<PaginatedArticles> {
  const response = await fetch(
    `${API_BASE_URL}/articles?page=${page}&limit=${limit}`
  );
  if (!response.ok) {
    throw new Error("获取文章失败");
  }
  const data = await response.json();
  return data.data;
}

export async function getPublishedArticleBySlug(
  slug: string,
  clientIp: string
): Promise<Article> {
  const response = await fetch(`${API_BASE_URL}/articles/${slug}`, {
    headers: {
      ...(clientIp ? { "X-Client-IP": clientIp } : {}),
    },
  });
  if (!response.ok) {
    throw new Error(`获取文章失败 slug ${slug}`);
  }
  const data = await response.json();
  return data.data;
}
