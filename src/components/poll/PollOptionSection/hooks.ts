import usePollForm from '@/components/poll/Provider/hooks';
import { PollOptions } from '@/types/post';

export default function usePollOptionSection() {
  const { type, data, setPollType, setCommentActive, setScope } = usePollForm();

  // TODO: 서버에서 공개 투표 추가하면 반영
  const POLL_OPTIONS: {
    label: string;
    value: PollOptions[keyof PollOptions];
    checked: boolean;
    onChange: (checked: boolean) => void;
    visible: boolean;
  }[] = [
    {
      label: '복수 선택',
      value: data.pollOption.pollType,
      checked: data.pollOption.pollType === 'MULTIPLE',
      onChange: (checked) => setPollType(checked ? 'MULTIPLE' : 'SINGLE'),
      visible: type === 'REGIST',
    },
    {
      label: '댓글 비활성화',
      value: data.pollOption.commentActive,
      checked: data.pollOption.commentActive === 'CLOSED',
      onChange: (checked) => setCommentActive(checked ? 'CLOSED' : 'OPEN'),
      visible: true,
    },
    {
      label: '공개 투표',
      value: data.pollOption.scope,
      checked: data.pollOption.scope === 'PUBLIC',
      onChange: (checked) => setScope(checked ? 'PUBLIC' : 'PRIVATE'),
      visible: true,
    },
  ];

  return {
    POLL_OPTIONS,
  };
}
