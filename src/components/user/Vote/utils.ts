import { UserPost } from '@/types/user-post';
import { getRemainedTimeText } from '@/utils/date/date';

export const getVoteCloseStatusText = ({
  closeOptionDto,
  postVoteInfo,
}: Pick<UserPost, 'closeOptionDto' | 'postVoteInfo'>) => {
  const { closeType, closedAt, maxVoterCount } = closeOptionDto;
  const { totalVoterCount } = postVoteInfo;

  if (closeType === 'SELF') return '직접 마감';
  if (closeType === 'VOTER')
    return `${totalVoterCount}/${maxVoterCount}명 참여 중`;
  if (closeType === 'DATE' && closedAt) {
    const remainedTimeText = getRemainedTimeText({
      dateString: closedAt,
      suffix: '남음',
    });
    return remainedTimeText;
  }
};
