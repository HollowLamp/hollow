import { LoaderFunction, MetaFunction } from "@remix-run/node";
import { useLoaderData, useFetcher } from "@remix-run/react";
import { useEffect, useState, useRef, useCallback } from "react";
import { getPublishedThoughts } from "~/api/thought/thoughtApi";
import { PaginatedThoughts, Thought } from "~/api/thought/type";
import ThoughtListItem from "~/components/ThoughtListItem";

export const meta: MetaFunction = () => [
  {
    title: "说说 - 空心灯的星空",
    description: "查看所有发布的说说内容",
  },
];

export const loader: LoaderFunction = async ({ request }) => {
  const url = new URL(request.url);
  const page = Number(url.searchParams.get("page") || 1);
  const limit = 10;

  const data: PaginatedThoughts = await getPublishedThoughts(page, limit);
  return { data, page };
};

export default function ThoughtList() {
  const { data: initialData } = useLoaderData<{ data: PaginatedThoughts }>();
  const [thoughts, setThoughts] = useState<Thought[]>(initialData.data);
  const [page, setPage] = useState(2);
  const [hasMore, setHasMore] = useState(
    initialData.data.length === initialData.limit
  );
  const loaderRef = useRef<HTMLDivElement | null>(null);
  const [isClient, setIsClient] = useState(false);

  const fetcher = useFetcher();

  useEffect(() => {
    setIsClient(true);
  }, []);

  const loadMoreThoughts = useCallback(() => {
    if (fetcher.state === "loading" || !hasMore) return;
    fetcher.load(`/thoughts?page=${page}`);
  }, [fetcher, hasMore, page]);

  useEffect(() => {
    if (fetcher.data) {
      const nextData = fetcher.data as PaginatedThoughts;
      if (nextData.data.length > 0) {
        setThoughts((prevThoughts) => [...prevThoughts, ...nextData.data]);
        setPage((prevPage) => prevPage + 1);
        setHasMore(nextData.data.length === initialData.limit);
      } else {
        setHasMore(false);
      }
    }
  }, [fetcher.data, initialData.limit]);

  useEffect(() => {
    if (!isClient) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore) {
          loadMoreThoughts();
        }
      },
      { threshold: 1.0 }
    );

    const currentLoaderRef = loaderRef.current;
    if (currentLoaderRef) {
      observer.observe(currentLoaderRef);
    }

    return () => {
      if (currentLoaderRef) {
        observer.unobserve(currentLoaderRef);
      }
    };
  }, [hasMore, loadMoreThoughts, isClient]);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">说说</h1>
      <ul className="space-y-4">
        {thoughts.map((thought) => (
          <ThoughtListItem key={thought.id} thought={thought} />
        ))}
      </ul>

      {fetcher.state === "loading" && (
        <p className="text-center text-gray-500 animate-pulse">加载中...</p>
      )}

      {!hasMore && <p className="text-center text-gray-500">没有更多内容了</p>}

      <div ref={loaderRef} className="h-8" />
    </div>
  );
}
