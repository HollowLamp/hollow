import { MetaFunction, LoaderFunctionArgs } from "@remix-run/node";
import { Link, Outlet, useLoaderData } from "@remix-run/react";
import { getPublishedArticleBySlug } from "~/api/article/articleApi";
import { Article } from "~/api/article/type";
import ContentDisplay from "~/components/ContentDisplay";

export const meta: MetaFunction = ({ data }) => {
  const article = data as Article | undefined;

  return [
    {
      title: article
        ? `${article.title} - 空心灯的星空`
        : "文章未找到 - 空心灯的星空",
    },
    {
      name: "description",
      content: article
        ? `${article.title} 的文章内容`
        : "该文章不存在或已被删除",
    },
  ];
};

export async function loader({ params }: LoaderFunctionArgs) {
  const { slug } = params;

  if (!slug) {
    throw new Error("文章 slug 缺失");
  }

  const article = await getPublishedArticleBySlug(slug);
  return article;
}

export default function ArticleDetail() {
  const article = useLoaderData<Article>();

  return (
    <div className="container mx-auto px-4 py-8">
      <ContentDisplay
        title={article.title}
        content={article.content}
        createdAt={article.createdAt}
        updateAt={article.updatedAt}
        views={article.views}
        link={
          <Link to={`/category/${article.category?.slug}`}>
            {article.category?.name}
          </Link>
        }
      />
      <div className="mt-8">
        <Outlet />
      </div>
    </div>
  );
}
