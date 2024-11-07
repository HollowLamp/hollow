import { Link } from "@remix-run/react";
import { Article } from "~/api/article/type";

interface ArticleListItemProps {
  article: Article;
}

export default function ArticleListItem({ article }: ArticleListItemProps) {
  return (
    <li className="hover:bg-gray-100 transition duration-200">
      <Link
        to={`/article/${article.slug}`}
        className="flex justify-between items-center py-2 px-4 border-b w-full"
      >
        <span className="text-gray-500 text-sm">
          {new Date(article.createdAt).toISOString().split("T")[0]}
        </span>
        <span className="text-lg font-medium text-gray-800">
          {article.title}
        </span>
      </Link>
    </li>
  );
}
