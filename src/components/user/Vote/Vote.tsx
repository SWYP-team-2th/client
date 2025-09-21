import { useNavigate } from 'react-router-dom';
import useVote from './hooks';
import { Label } from '@/components/common/Label/Label';
import { UserPost } from '@/types/user-post';

export default function Vote({
  id,
  title,
  thumbnailImageUrl,
  status,
  closeOptionDto,
  postVoteInfo,
}: Omit<UserPost, 'createdAt'>) {
  const navigate = useNavigate();
  const { remainedTimeText } = useVote({ id, closeOptionDto, postVoteInfo });

  const handleVoteClick = () => {
    navigate(`/posts/${id}`);
  };

  return (
    <div
      className="flex items-center gap-4 cursor-pointer hover:bg-gray-50 p-2 rounded-lg transition-colors"
      onClick={handleVoteClick}
    >
      <img
        className="w-25 h-25 rounded-xl overflow-hidden"
        src={thumbnailImageUrl}
        alt="1위 이미지"
      />
      <div className="flex flex-col gap-[6px]">
        <div className="flex items-center gap-2">
          <Label
            variant="solid"
            colorVarient={status === 'PROGRESS' ? 'progress' : 'ended'}
            size="medium"
          >
            {status === 'PROGRESS' ? '진행중' : '투표종료'}
          </Label>
          {status === 'PROGRESS' && (
            <span className="text-body-1 text-primary-500">
              {remainedTimeText}
            </span>
          )}
        </div>
        <p className="text-gray-800 text-headline-3">{title}</p>
        <div className="text-gray-800 text-body-2">
          {status === 'PROGRESS' && (
            <p>🗳️ {postVoteInfo.totalVoterCount}명 참여중</p>
          )}
          {status === 'CLOSED' && (
            <p className="flex items-center gap-2">
              <span>🥇1위</span>
              <div className="w-px h-4 bg-gray-300"></div>
              <p>
                {postVoteInfo.mostVotedPollChoice.title}{' '}
                {postVoteInfo.mostVotedPollChoice.voterCount}표 (득표율{' '}
                <span className="text-gray-700">
                  {postVoteInfo.mostVotedPollChoice.voteRatio}
                </span>
                )
              </p>
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
