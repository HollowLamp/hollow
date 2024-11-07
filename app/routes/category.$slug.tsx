import { MetaFunction, LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData, Link } from "@remix-run/react";
import { getPublishedArticlesByCategorySlug } from "~/api/category/categoryApi";
import ArticleListItem from "~/components/ArticleListItem";
import { PaginatedArticles } from "~/api/article/type";

export const meta: MetaFunction = ({ params }) => {
  return [
    { title: `${params.slug} 分类 - 空心灯的星空` },
    { name: "description", content: `浏览 ${params.slug} 分类下的所有文章。` },
  ];
};

export async function loader({ params, request }: LoaderFunctionArgs) {
  const { slug } = params;
  const url = new URL(request.url);
  const page = Number(url.searchParams.get("page") || 1);
  const limit = 10;

  if (!slug) throw new Error("分类 slug 缺失");

  const articlesData = await getPublishedArticlesByCategorySlug(
    slug,
    page,
    limit
  );
  return { articles: articlesData, page, slug };
}

export default function CategoryDetail() {
  const { articles, page, slug } = useLoaderData<{
    articles: PaginatedArticles;
    page: number;
    slug: string;
  }>();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">{slug}下的文章</h1>

      <ul>
        {articles.data.map((article) => (
          <ArticleListItem key={article.id} article={article} />
        ))}
      </ul>

      <div className="flex justify-between mt-4">
        {page > 1 && (
          <Link
            to={`/category/${slug}?page=${page - 1}`}
            className="px-4 py-2 bg-gray-200 rounded"
          >
            上一页
          </Link>
        )}
        {page < Math.ceil(articles.total / articles.limit) && (
          <Link
            to={`/category/${slug}?page=${page + 1}`}
            className="px-4 py-2 bg-gray-200 rounded"
          >
            下一页
          </Link>
        )}
      </div>
    </div>
  );
}
