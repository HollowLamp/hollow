import { LoaderFunctionArgs } from "@remix-run/node";
import { Outlet, useLoaderData } from "@remix-run/react";
import { getPublishedNoteById } from "~/api/note/noteApi";
import { Note } from "~/api/note/type";
import ContentDisplay from "~/components/ContentDisplay";

export async function loader({ params }: LoaderFunctionArgs) {
  const { id } = params;
  if (!id) {
    throw new Error("随笔 ID 缺失");
  }

  const noteId = parseInt(id, 10);
  const note = await getPublishedNoteById(noteId);

  return note;
}

export default function NoteDetail() {
  const note = useLoaderData<Note>();

  return (
    <>
      <div className="container mx-auto px-4 py-8">
        <ContentDisplay
          title={note.title}
          content={note.content}
          createdAt={note.createdAt}
          updateAt={note.updatedAt}
          views={note.views}
        />
        <div className="mt-8">
          <Outlet />
        </div>
      </div>
    </>
  );
}
