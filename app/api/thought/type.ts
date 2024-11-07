export interface Thought {
  id: number;
  createdAt: string;
  status: "published" | "hidden";
  content: string;
  likesCount: number;
}

export interface PaginatedThoughts {
  data: Thought[];
  total: number;
  page: number;
  limit: number;
}
