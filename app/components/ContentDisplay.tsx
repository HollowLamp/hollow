import { useEffect } from "react";
import hljs from "highlight.js";
import "highlight.js/styles/androidstudio.css";

interface ContentDisplayProps {
  title: string;
  content: string;
  createdAt: string;
  updateAt: string;
}

export default function ContentDisplay({
  title,
  content,
  createdAt,
  updateAt,
}: ContentDisplayProps) {
  useEffect(() => {
    document.querySelectorAll("pre code").forEach((block) => {
      hljs.highlightElement(block as HTMLElement);
    });
  }, [content]);

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">{title}</h1>
      <p className="text-gray-500 mb-6 text-sm">
        发布于 {new Date(createdAt).toLocaleDateString()}
      </p>
      {createdAt !== updateAt && (
        <p className="text-gray-500 mb-6 text-sm">
          更新于 {new Date(updateAt).toLocaleDateString()}
        </p>
      )}
      <div
        className="prose mx-auto"
        dangerouslySetInnerHTML={{ __html: content }}
      />
    </div>
  );
}
