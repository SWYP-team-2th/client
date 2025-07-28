import { useContext } from 'react';
import { PollFormContext } from './PollFormProvider';

export default function usePollForm() {
  const context = useContext(PollFormContext);
  if (!context) {
    throw new Error(
      'usePollForm는 PollFormProvider 내부에서만 사용 가능합니다.',
    );
  }

  return context;
}
