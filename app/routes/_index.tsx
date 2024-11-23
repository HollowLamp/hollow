import { MetaFunction, LoaderFunctionArgs } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import { getPublishedArticles } from "~/api/article/articleApi";
import { PaginatedArticles } from "~/api/article/type";
import ArticleListItem from "~/components/ArticleListItem";

export const meta: MetaFunction = () => {
  return [
    { title: "空心灯的星空" },
    { name: "description", content: "空心灯写东西的地方" },
  ];
};

export async function loader({ request }: LoaderFunctionArgs) {
  const url = new URL(request.url);
  const page = Number(url.searchParams.get("page") || 1);
  const limit = 10;

  const data = await getPublishedArticles(page, limit);
  console.log(data);
  return { data, page };
}

export default function Index() {
  const { data, page } = useLoaderData<{
    data: PaginatedArticles;
    page: number;
  }>();
  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      <h1 className="text-3xl font-bold mb-4">文章</h1>
      <ul className="mt-8">
        {data.data.map((article) => (
          <ArticleListItem key={article.id} article={article} />
        ))}
      </ul>

      <div className="flex justify-between mt-4">
        {page > 1 && (
          <Link
            to={`/?page=${page - 1}`}
            className="px-4 py-2 bg-gray-200 rounded"
          >
            上一页
          </Link>
        )}
        {page < Math.ceil(data.total / data.limit) && (
          <Link
            to={`/?page=${page + 1}`}
            className="px-4 py-2 bg-gray-200 rounded"
          >
            下一页
          </Link>
        )}
      </div>
    </div>
  );
}
