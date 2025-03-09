import Icon from '@/components/common/Icon';

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
    <div key={comment.commentId} className="flex mb-3">
      <img
        src={comment.author.profileUrl}
        className="w-7 h-7 rounded-full mt-[2px]"
        alt="프로필 이미지"
      />

      <div className="flex flex-col ml-[6px] flex-grow">
        <span className="text-label-medium">{comment.author.nickname}</span>
        <span className="break-words text-body-2-long">{comment.content}</span>
      </div>

      <div className="space-x-2">
        <button className="cursor-pointer">
          <Icon name="PencilGray" size="extra-small" />
        </button>
        <button className="cursor-pointer">
          <Icon name="TrashCanGray" size="extra-small" />
        </button>
      </div>
    </div>
  );
}
