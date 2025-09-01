import { useMemo } from 'react';
import { getVoteCloseStatusText } from './utils';
import { UserPost } from '@/types/user-post';

export default function useVote({
  id,
  closeOptionDto,
  postVoteInfo,
}: Pick<UserPost, 'id' | 'closeOptionDto' | 'postVoteInfo'>) {
  // TODO: api 연동 후 제거
  console.log(id);

  const remainedTimeText = useMemo(() => {
    return getVoteCloseStatusText({ closeOptionDto, postVoteInfo });
  }, [closeOptionDto, postVoteInfo]);

  return {
    remainedTimeText,
  };
}
