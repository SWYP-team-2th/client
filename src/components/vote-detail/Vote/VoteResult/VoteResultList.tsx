import { useState } from 'react';
import { useParams } from 'react-router-dom';
import useGetMyInfo from '@/api/useGetMyInfo';
import BlurImage from '@/assets/images/vote-detail/voteBlur.png';
import Icon from '@/components/common/Icon';
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
  const [isFullResultShown, setIsFullResultShown] = useState(false);

  // voteStatus 값이 없으면 null로 반환 (undefined 시 대응)
  if (!voteStatus) return null;

  const totalVoted = voteStatus.reduce(
    (sum, status) => sum + status.voteCount,
    0,
  );
  const highestVoted = Math.max(
    ...(voteStatus.map((status) => status.voteCount) ?? []),
  );

  const visibleResult = isFullResultShown ? voteStatus : voteStatus.slice(0, 3);
  return (
    <div className="pt-5 pb-4">
      {!userHasVoted && (
        <div
          className="flex items-center justify-center w-full h-18 text-body-2-normal "
          style={{
            backgroundImage: `url(${BlurImage})`,
          }}
        >
          <p>투표하고, 뽀또들과 함께 결과를 확인해보세요! 🎉</p>
        </div>
      )}
      {userHasVoted && myInfo && getRole() === 'GUEST' && (
        <div
          className="flex items-center justify-center w-full h-18 text-body-2-normal "
          style={{
            backgroundImage: `url(${BlurImage})`,
          }}
        >
          <p>👀 투표 결과는 로그인 후 확인할 수 있어요!</p>
        </div>
      )}
      {userHasVoted && myInfo && getRole() === 'USER' && voteStatus && (
        <>
          {visibleResult.map((status) => {
            const calculatedVoteRatio = totalVoted
              ? ((status.voteCount / totalVoted) * 100).toFixed(1)
              : '0.0';

            return (
              <VoteResultItem
                key={status.id}
                status={{ ...status, voteRatio: calculatedVoteRatio }}
                isHighest={status.voteCount === highestVoted}
              />
            );
          })}

          {voteStatus.length > 3 && (
            <button
              onClick={() => setIsFullResultShown(!isFullResultShown)}
              className="flex justify-center items-center pt-1 w-full text-center text-label-x-small-1 text-secondary-800 gap-1"
            >
              {isFullResultShown ? (
                <>
                  접기
                  <Icon name="ArrowRightPurple" size="extra-small" />
                </>
              ) : (
                <>
                  결과 모두 보기
                  <Icon name="ArrowRightPurple" size="extra-small" />
                </>
              )}
            </button>
          )}
        </>
      )}
    </div>
  );
}
