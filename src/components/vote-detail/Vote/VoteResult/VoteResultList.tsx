import { useParams } from 'react-router-dom';
import useGetMyInfo from '@/api/useGetMyInfo';
import BlurImage from '@/assets/images/vote-detail/voteBlur.png';
import { getRole } from '@/components/login/Auth/token';
import useVoteStatus from '@/components/vote-detail/Vote/VoteResult/hooks';
import VoteResultItem from '@/components/vote-detail/Vote/VoteResult/VoteResultItem';

export default function VoteResultList() {
  const { shareUrl } = useParams<{ shareUrl: string }>();
  const { voteStatus, userHasVoted } = useVoteStatus({
    postId: Number(shareUrl),
    shareUrl: shareUrl ?? '',
  });
  const { data: myInfo } = useGetMyInfo();

  const totalVoted = voteStatus?.reduce(
    (sum, status) => sum + status.voteCount,
    0,
  );

  const highestVoted = Math.max(
    ...(voteStatus?.map((status) => status.voteCount) ?? []),
  );

  return (
    <div className="px-1">
      {!userHasVoted && (
        <div
          className="flex items-center justify-center w-full h-18 text-body-1-normal "
          style={{
            backgroundImage: `url(${BlurImage})`,
          }}
        >
          <p>투표하고, 뽀또들과 함께 결과를 실시간으로 확인해보세요! 🎉</p>
        </div>
      )}
      {userHasVoted && myInfo && getRole() === 'GUEST' && (
        <div
          className="flex items-center justify-center w-full h-18 text-body-1-normal "
          style={{
            backgroundImage: `url(${BlurImage})`,
          }}
        >
          <p>👀 투표 결과는 로그인 후 확인할 수 있어요!</p>
        </div>
      )}
      {userHasVoted &&
        myInfo &&
        getRole() === 'USER' &&
        voteStatus?.map((status, index) => {
          const calculatedVoteRatio = totalVoted
            ? ((status.voteCount / totalVoted) * 100).toFixed(1)
            : '0.0';

          return (
            <VoteResultItem
              key={index}
              status={{ ...status, voteRatio: calculatedVoteRatio }}
              isHighest={status.voteCount === highestVoted}
            />
          );
        })}
    </div>
  );
}
