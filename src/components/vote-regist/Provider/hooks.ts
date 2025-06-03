import { useContext } from 'react';
import { PollContext } from './PollRegistProvider';

export default function usePollRegist() {
  const context = useContext(PollContext);
  if (!context) {
    throw new Error(
      'usePollRegist는 PollRegistProvider 내부에서만 사용 가능합니다.',
    );
  }

  return context;
}
