import { useContext } from 'react';
import { VoteRegistContext } from './VoteRegistProvider';

export default function useVoteRegist() {
  const context = useContext(VoteRegistContext);
  if (!context) {
    throw new Error(
      'useVoteRegist는 VoteRegistProvider 내부에서만 사용 가능합니다.',
    );
  }

  return context;
}
