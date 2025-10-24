import { useNavigate, useParams } from 'react-router-dom';
import useUpdatePoll from '@/api/useUpdatePoll';
import usePollForm from '@/components/poll/Provider/hooks';

export default function usePollEditButton() {
  const navigate = useNavigate();
  const { isValid, data } = usePollForm();
  const { pollId } = useParams<{ pollId: string }>();

  const { mutate: updatePoll, isPending } = useUpdatePoll({
    id: Number(pollId),
    options: {
      onSuccess: () => {
        navigate(`/posts/${pollId}`);
      },
    },
  });

  const handleClickPollEditButton = () => {
    updatePoll(data);
  };

  return {
    isValid,
    isPending,
    handleClickPollEditButton,
  };
}
