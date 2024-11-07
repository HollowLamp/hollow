import { PaginatedThoughts } from "./type";
import { API_BASE_URL } from "../config";

export async function getPublishedThoughts(
  page: number = 1,
  limit: number = 10
): Promise<PaginatedThoughts> {
  const response = await fetch(
    `${API_BASE_URL}/thoughts?page=${page}&limit=${limit}`
  );
  if (!response.ok) {
    throw new Error("Failed to fetch thoughts");
  }
  const data = await response.json();
  return data.data;
}
