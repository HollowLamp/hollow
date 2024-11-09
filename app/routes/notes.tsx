import { LoaderFunction, MetaFunction } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import { getPublishedNotes } from "~/api/note/noteApi";
import { PaginatedNotes } from "~/api/note/type";
import NoteListItem from "~/components/NoteListItem";

export const meta: MetaFunction = () => {
  return [
    { title: "随笔 - 空心灯的星空" },
    { name: "description", content: "浏览随笔。" },
  ];
};

export const loader: LoaderFunction = async ({ request }) => {
  const url = new URL(request.url);
  const page = Number(url.searchParams.get("page") || 1);
  const limit = 10;
  const data = await getPublishedNotes(page, limit);
  return { data, page };
};

export default function NoteList() {
  const { data, page } = useLoaderData<{
    data: PaginatedNotes;
    page: number;
  }>();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">随笔</h1>
      <ul>
        {data.data.map((note) => (
          <NoteListItem key={note.id} note={note} />
        ))}
      </ul>
      <div className="flex justify-between mt-4">
        {page > 1 && (
          <Link
            to={`?page=${page - 1}`}
            className="px-4 py-2 bg-gray-200 rounded"
          >
            上一页
          </Link>
        )}
        {page < Math.ceil(data.total / data.limit) && (
          <Link
            to={`?page=${page + 1}`}
            className="px-4 py-2 bg-gray-200 rounded"
          >
            下一页
          </Link>
        )}
      </div>
    </div>
  );
}
