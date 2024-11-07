import { Note, PaginatedNotes } from "./type";
import { API_BASE_URL } from "../config";

export async function getPublishedNotes(
  page: number = 1,
  limit: number = 10
): Promise<PaginatedNotes> {
  const response = await fetch(
    `${API_BASE_URL}/notes?page=${page}&limit=${limit}`
  );
  if (!response.ok) {
    throw new Error("获取随笔失败");
  }
  const data = await response.json();
  return data.data;
}

export async function getPublishedNoteById(id: number): Promise<Note> {
  const response = await fetch(`${API_BASE_URL}/notes/${id}`);
  if (!response.ok) {
    throw new Error(`获取随笔失败 ${id}`);
  }
  const data = await response.json();
  return data.data;
}
