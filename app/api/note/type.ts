export interface Note {
  id: number;
  createdAt: string;
  updatedAt: string;
  title: string;
  content: string;
  status: "published" | "hidden";
  views: number;
  likesCount: number;
}

export interface PaginatedNotes {
  data: Note[];
  total: number;
  page: number;
  limit: number;
}
