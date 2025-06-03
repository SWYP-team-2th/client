import usePollRegist from '../Provider/hooks';
import { PollOption } from '../Provider/types';

export default function usePollOptionSection() {
  const { data, setPollType, setCommentActive } = usePollRegist();

  // TODO: 서버에서 공개 투표 추가하면 반영
  const POLL_OPTIONS: {
    label: string;
    value: PollOption[keyof PollOption];
    checked: boolean;
    onChange: (checked: boolean) => void;
  }[] = [
    {
      label: '복수 선택',
      value: data.pollOptions.pollType,
      checked: data.pollOptions.pollType === 'MULTIPLE',
      onChange: (checked) => setPollType(checked ? 'MULTIPLE' : 'SINGLE'),
    },
    {
      label: '댓글 비활성화',
      value: data.pollOptions.commentActive,
      checked: data.pollOptions.commentActive === 'CLOSED',
      onChange: (checked) => setCommentActive(checked ? 'CLOSED' : 'OPEN'),
    },
  ];

  return {
    POLL_OPTIONS,
  };
}
