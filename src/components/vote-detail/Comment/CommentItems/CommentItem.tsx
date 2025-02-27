interface AuthorType {
  userId: number;
  nickname: string;
  profileUrl: string;
}

interface CommentType {
  commentId: number;
  content: string;
  author: AuthorType;
  voteId: number | null;
  createdAt: string;
}

interface CommentItemProps {
  comment: CommentType;
}

export default function CommentItem({ comment }: CommentItemProps) {
  return (
    <div key={comment.commentId} className="flex flex-col mb-md ml-sm">
      <div className="flex items-center">
        <img
          src={comment.author.profileUrl}
          className="w-10 h-10 rounded-full"
          alt="프로필 이미지"
        />
        <span className="ml-sm text-title-small">
          {comment.author.nickname}
        </span>
      </div>

      <div className="px-10 mt-1 break-words text-body-1-normal">
        {comment.content}
      </div>
    </div>
  );
}
