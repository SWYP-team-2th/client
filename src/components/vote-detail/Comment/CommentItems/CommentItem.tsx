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
    <div key={comment.commentId} className="flex mb-3 ">
      <div className="flex ">
        <img
          src={comment.author.profileUrl}
          className="w-[20px] h-[20px] rounded-full"
          alt="프로필 이미지"
        />
      </div>
      <div className="flex flex-col ml-[6px]">
        <span className="text-label-medium">{comment.author.nickname}</span>
        <span className="break-words text-body-2-long">{comment.content}</span>
      </div>
    </div>
  );
}
