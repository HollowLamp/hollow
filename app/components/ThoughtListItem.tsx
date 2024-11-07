import { Thought } from "~/api/thought/type";

interface ThoughtListItemProps {
  thought: Thought;
}

export default function ThoughtListItem({ thought }: ThoughtListItemProps) {
  return (
    <div className="flex items-start space-x-4 py-4 border-b">
      <img
        src="/avatar.jpg"
        alt="User Avatar"
        className="w-10 h-10 rounded-full"
      />
      <div className="flex-1">
        <div className="text-gray-500 text-sm mb-1">
          {new Date(thought.createdAt).toLocaleDateString("zh-CN", {
            year: "numeric",
            month: "long",
            day: "numeric",
            weekday: "long",
          })}
        </div>
        <div className="bg-gray-100 p-3 rounded-lg">
          <div
            className="text-gray-800"
            dangerouslySetInnerHTML={{ __html: thought.content }}
          />
        </div>
      </div>
    </div>
  );
}
