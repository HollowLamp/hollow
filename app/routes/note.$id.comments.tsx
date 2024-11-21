import { json } from "@remix-run/node";
import {
  useFetcher,
  useLoaderData,
  FetcherWithComponents,
} from "@remix-run/react";
import { useEffect, useState } from "react";
import { createComment, getCommentsByNoteId } from "~/api/comment/commentApi";
import { Comment } from "~/api/comment/type";
import CommentList from "~/components/CommentList";

type FetcherData = {
  success?: boolean;
  error?: string;
};

type LoaderData = {
  data: Comment[];
  total: number;
};

export async function loader({ params }: { params: { id: string } }) {
  const comments = await getCommentsByNoteId(parseInt(params.id));
  console.log(comments);
  return comments;
}

export async function action({
  request,
  params,
}: {
  request: Request;
  params: { id: string };
}) {
  const formData = await request.formData();
  const content = formData.get("content") as string;
  const nickname = formData.get("nickname") as string;
  const email = formData.get("email") as string;
  const website = formData.get("website") as string;
  const avatarUrl = formData.get("avatarUrl") as string;

  if (!content) {
    return json({ error: "评论内容不能为空" }, { status: 400 });
  }

  try {
    await createComment({
      content,
      nickname: nickname || undefined,
      email: email || undefined,
      website: website || undefined,
      avatarUrl: avatarUrl || undefined,
      noteId: parseInt(params.id),
    });
    return json({ success: true });
  } catch (error) {
    console.error(error);
    return json({ error: "提交评论失败" }, { status: 500 });
  }
}

export default function ArticleComments() {
  const comments = useLoaderData<LoaderData>();
  const fetcher: FetcherWithComponents<FetcherData> = useFetcher();
  const isSubmitting = fetcher.state === "submitting";

  const [formData, setFormData] = useState({
    nickname: "",
    email: "",
    website: "",
    avatarUrl: "",
  });

  useEffect(() => {
    setFormData({
      nickname: localStorage.getItem("comment_nickname") || "",
      email: localStorage.getItem("comment_email") || "",
      website: localStorage.getItem("comment_website") || "",
      avatarUrl: localStorage.getItem("comment_avatarUrl") || "",
    });
  }, []);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: string
  ) => {
    const value = e.target.value;
    setFormData((prev) => ({ ...prev, [field]: value }));
    localStorage.setItem(`comment_${field}`, value);
  };

  return (
    <div className="max-w-2xl mx-auto">
      <fetcher.Form method="post" className="p-4 border rounded bg-gray-50">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
          <div>
            <label
              htmlFor="nickname"
              className="block text-sm text-gray-600 mb-1"
            >
              昵称 (可选)
            </label>
            <input
              id="nickname"
              type="text"
              name="nickname"
              placeholder="昵称"
              className="border p-2 rounded w-full"
              value={formData.nickname}
              onChange={(e) => handleInputChange(e, "nickname")}
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm text-gray-600 mb-1">
              邮箱 (可选)
            </label>
            <input
              id="email"
              type="email"
              name="email"
              placeholder="邮箱"
              className="border p-2 rounded w-full"
              value={formData.email}
              onChange={(e) => handleInputChange(e, "email")}
            />
          </div>
          <div>
            <label
              htmlFor="website"
              className="block text-sm text-gray-600 mb-1"
            >
              网址 (可选)
            </label>
            <input
              id="website"
              type="url"
              name="website"
              placeholder="网址"
              className="border p-2 rounded w-full"
              value={formData.website}
              onChange={(e) => handleInputChange(e, "website")}
            />
          </div>
          <div>
            <label
              htmlFor="avatarUrl"
              className="block text-sm text-gray-600 mb-1"
            >
              头像 URL (可选)
            </label>
            <input
              id="avatarUrl"
              type="url"
              name="avatarUrl"
              placeholder="头像 URL"
              className="border p-2 rounded w-full"
              value={formData.avatarUrl}
              onChange={(e) => handleInputChange(e, "avatarUrl")}
            />
          </div>
        </div>
        <div className="mb-4">
          <label htmlFor="content" className="block text-sm text-gray-600 mb-1">
            评论内容 (必填)
          </label>
          <textarea
            id="content"
            name="content"
            placeholder="写下你的评论"
            className="border p-2 rounded w-full"
            rows={4}
            required
          ></textarea>
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:bg-gray-300 text-sm"
          disabled={isSubmitting}
        >
          {isSubmitting ? "提交中..." : "提交评论"}
        </button>
        {fetcher.data?.success && (
          <p className="text-green-500 mt-4">评论提交成功！</p>
        )}
        {fetcher.data?.error && (
          <p className="text-red-500 mt-4">提交评论失败，请稍后重试！</p>
        )}
      </fetcher.Form>

      <CommentList comments={comments.data} />
    </div>
  );
}
