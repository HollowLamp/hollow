import { MetaFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { getAllCategories } from "~/api/category/categoryApi";
import CategoryListItem from "~/components/CategoryListItem";
import { Category } from "~/api/category/type";

export const meta: MetaFunction = () => {
  return [
    { title: "分类列表 - 空心灯的星空" },
    { name: "description", content: "浏览所有文章分类和对应的文章数量。" },
  ];
};

export async function loader() {
  const categories = await getAllCategories();
  return categories;
}

export default function Categories() {
  const categories = useLoaderData<Category[]>();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">分类</h1>
      <ul>
        {categories.map((category) => (
          <CategoryListItem key={category.id} category={category} />
        ))}
      </ul>
    </div>
  );
}
