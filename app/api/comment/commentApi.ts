import { API_BASE_URL } from "../config";
import { CreateCommentDto, PaginatedComments } from "./type";

export async function getCommentsByArticleSlug(
  slug: string,
  page: number = 1,
  limit: number = 10
): Promise<PaginatedComments> {
  const response = await fetch(
    `${API_BASE_URL}/comments/article/${slug}?page=${page}&limit=${limit}`
  );
  if (!response.ok) {
    throw new Error("获取文章评论失败");
  }
  const data = await response.json();
  return data.data;
}

export async function getCommentsByNoteId(
  id: number,
  page: number = 1,
  limit: number = 10
): Promise<PaginatedComments> {
  const response = await fetch(
    `${API_BASE_URL}/comments/note/${id}?page=${page}&limit=${limit}`
  );
  if (!response.ok) {
    throw new Error("获取随笔评论失败");
  }
  const data = await response.json();
  return data.data;
}

export async function getCommentsByThoughtId(
  id: number,
  page: number = 1,
  limit: number = 10
): Promise<PaginatedComments> {
  const response = await fetch(
    `${API_BASE_URL}/comments/thought/${id}?page=${page}&limit=${limit}`
  );
  if (!response.ok) {
    throw new Error("获取说说评论失败");
  }
  const data = await response.json();
  return data.data;
}

export async function getIndependentComments(
  page: number = 1,
  limit: number = 10
): Promise<PaginatedComments> {
  const response = await fetch(
    `${API_BASE_URL}/comments/independent?page=${page}&limit=${limit}`
  );
  if (!response.ok) {
    throw new Error("获取独立评论失败");
  }
  const data = await response.json();
  return data.data;
}

export async function createComment(
  createCommentDto: CreateCommentDto
): Promise<void> {
  const response = await fetch(`${API_BASE_URL}/comments`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(createCommentDto),
  });

  if (!response.ok) {
    throw new Error("创建评论失败");
  }

  const data = await response.json();
  return data.data;
}
