import { Comment } from "~/api/comment/type";

const CommentList = ({ comments }: { comments: Comment[] }) => {
  return (
    <div className="mt-6">
      {comments.length > 0 ? (
        comments.map((comment) => (
          <div
            key={comment.id}
            className="flex items-start border-b border-gray-300 pb-4 mb-4"
          >
            <div className="mr-4 mt-2">
              {comment.website ? (
                <a
                  href={
                    comment.website.startsWith("http") ||
                    comment.website.startsWith("https")
                      ? comment.website
                      : `https://${comment.website}`
                  }
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block"
                >
                  <img
                    src={comment.avatarUrl || "/default-avatar.jpg"}
                    alt={comment.nickname || "用户头像"}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                </a>
              ) : (
                <img
                  src={comment.avatarUrl || "/default-avatar.jpg"}
                  alt={comment.nickname || "用户头像"}
                  className="w-10 h-10 rounded-full object-cover"
                />
              )}
            </div>
            <div>
              <small className="block text-gray-600 text-sm">
                {comment.nickname || "匿名"} -{" "}
                {new Date(comment.createdAt).toLocaleString()}
              </small>
              <p className="text-gray-800 mt-2">{comment.content}</p>
            </div>
          </div>
        ))
      ) : (
        <p className="text-center text-gray-500">暂无评论</p>
      )}
    </div>
  );
};

export default CommentList;
