import { useNavigate } from 'react-router-dom';
import usePollRegist from '../Provider/hooks';
import usePostRegistVote from '@/api/usePostRegistVote';
import { Button } from '@/components/common/Button/Button';
import Loading from '@/components/common/Loading';
import useToast from '@/components/common/Toast/hooks';

export default function PollSubmitButton() {
  const navigate = useNavigate();
  const toast = useToast();
  const { isValid, data } = usePollRegist();
  const { mutate: registVote, isPending } = usePostRegistVote({
    onSuccess: (data) => {
      navigate(`/vote/${data.postId}`);
    },
    onError: () => {
      toast.error({
        title: '투표 올리기에 실패했습니다.',
        description: '다시 시도해주세요.',
      });
    },
  });

  return (
    <Button
      type="submit"
      size="large"
      className="fixed bottom-8 left-[50%] translate-x-[-50%] w-[calc(100%-48px)]"
      buttonType={isValid ? 'primary' : 'disabled'}
      variant="solid"
      disabled={isPending || !isValid}
      onClick={() => {
        registVote(data);
      }}
    >
      {isPending ? <Loading /> : '투표 올리기'}
    </Button>
  );
}
