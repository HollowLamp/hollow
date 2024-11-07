import { Link } from "@remix-run/react";
import { Category } from "~/api/category/type";

interface CategoryListItemProps {
  category: Category;
}

export default function CategoryListItem({ category }: CategoryListItemProps) {
  return (
    <li className="hover:bg-gray-100 transition duration-200">
      <Link
        to={`/category/${category.slug}`}
        className="flex justify-between items-center py-2 px-4 border-b w-full"
      >
        <span className="text-lg font-medium text-gray-800">
          {category.name}
        </span>
        <span className="text-gray-500 text-sm">
          {category.publishedArticleCount} 篇文章
        </span>
      </Link>
    </li>
  );
}
