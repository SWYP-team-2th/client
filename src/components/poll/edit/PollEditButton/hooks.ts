import { useNavigate, useParams } from 'react-router-dom';
import useUpdatePoll from '@/api/useUpdatePoll';
import usePollForm from '@/components/poll/Provider/hooks';
import { useModerationCheck } from '@/hooks/useModerationCheck';

export default function usePollEditButton() {
  const navigate = useNavigate();
  const { isValid, data } = usePollForm();
  const { pollId } = useParams<{ pollId: string }>();
  const { mutate: checkModeration, isPending: isModerationPending } =
    useModerationCheck();

  const { mutate: updatePoll, isPending: isUpdatePending } = useUpdatePoll({
    id: Number(pollId),
    options: {
      onSuccess: () => {
        navigate(`/posts/${pollId}`);
      },
    },
  });

  const isPending = isModerationPending || isUpdatePending;

  const handleClickPollEditButton = () => {
    if (!isValid) return;
    checkModeration({
      pollData: data,
      onConfirm: () => updatePoll(data),
    });
  };

  return {
    isValid,
    isPending,
    handleClickPollEditButton,
  };
}
