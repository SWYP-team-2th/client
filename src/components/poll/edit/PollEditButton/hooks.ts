import { useNavigate, useParams } from 'react-router-dom';
import useUpdatePoll from '@/api/useUpdatePoll';
import useToast from '@/components/common/Toast/hooks';
import usePollForm from '@/components/poll/Provider/hooks';

export default function usePollEditButton() {
  const navigate = useNavigate();
  const toast = useToast();
  const { isValid, data } = usePollForm();
  const { pollId } = useParams<{ pollId: string }>();

  const { mutate: updatePoll, isPending } = useUpdatePoll({
    id: Number(pollId),
    options: {
      onSuccess: () => {
        navigate(`/posts/${pollId}`);
      },
      onError: () => {
        toast.error({
          title: '투표 수정에 실패했습니다.',
          description: '다시 시도해주세요.',
        });
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
