import { useParams } from 'react-router-dom';
import BlurImage from '@/assets/images/vote-detail/voteBlur.png';
import useVoteStatus from '@/components/vote-detail/Vote/VoteResult/hooks';
import VoteResultItem from '@/components/vote-detail/Vote/VoteResult/VoteResultItem';

export default function VoteResultList() {
  const { shareUrl } = useParams<{ shareUrl: string }>();
  const { voteStatus, userHasVoted } = useVoteStatus({
    postId: Number(shareUrl),
    shareUrl: shareUrl ?? '',
  });

  // 유저가 해당 게시글에 투표 했는지에 대한 유무

  // 전체 투표 수 계산
  const totalVoted = voteStatus.reduce(
    (sum, status) => sum + status.voteCount,
    0,
  );

  // 가장 높은 투표 수 계산
  const highestVoted = Math.max(
    ...voteStatus.map((status) => status.voteCount),
  );

  return (
    <div className="px-1">
      {/* 추후에 로그인 (uerId)에 따른 blur 처리 필요 */}
      {/* 회원, 비회원 투표시에만 결과 보여주기 */}
      {!userHasVoted ? (
        <div
          className="flex items-center justify-center w-full h-18 text-body-1-normal "
          style={{
            backgroundImage: `url(${BlurImage})`,
          }}
        >
          <p>투표하고, 뽀또들과 함께 결과를 실시간으로 확인해보세요! 🎉</p>
        </div>
      ) : (
        voteStatus.map((status, index) => {
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
        })
      )}
    </div>
  );
}
