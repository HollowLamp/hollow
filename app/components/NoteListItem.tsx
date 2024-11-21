import { Link } from "@remix-run/react";
import { Note } from "~/api/note/type";

interface NoteListItemProps {
  note: Note;
}

export default function NoteListItem({ note }: NoteListItemProps) {
  return (
    <li className="hover:bg-gray-100 transition duration-200">
      <Link
        to={`/note/${note.id}/comments`}
        className="flex justify-between items-center py-2 px-4 border-b w-full"
      >
        <span className="text-gray-500 text-sm">
          {new Date(note.createdAt).toISOString().split("T")[0]}
        </span>
        <span className="text-lg font-medium text-gray-800">{note.title}</span>
      </Link>
    </li>
  );
}
