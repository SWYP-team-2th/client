import { useNavigate } from 'react-router-dom';
import usePollForm from '../../Provider/hooks';
import usePostRegistVote from '@/api/usePostRegistVote';
import { Button } from '@/components/common/Button/Button';
import Loading from '@/components/common/Loading';
import useToast from '@/components/common/Toast/hooks';

export default function PollRegistButton() {
  const navigate = useNavigate();
  const toast = useToast();
  const { isValid, data: pollData } = usePollForm();
  const { mutate: registVote, isPending: isRegistVotePending } =
    usePostRegistVote({
      onSuccess: (data) => {
        navigate(`/posts/${data.postId}`);
      },
      onError: () => {
        toast.error({
          title: '투표 올리기에 실패했습니다.',
          description: '다시 시도해주세요.',
        });
      },
    });

  const handleClickSubmitButton = () => {
    if (isValid) {
      registVote({
        ...pollData,
        pollChoices: pollData.pollChoices.map((choice) => ({
          title: choice.title,
          imageUrl: choice.imageUrl,
        })),
      });
    }
  };

  return (
    <Button
      type="submit"
      size="large"
      className="fixed bottom-8 left-[50%] translate-x-[-50%] w-[calc(100%-48px)]"
      buttonType={isValid ? 'primary' : 'disabled'}
      variant="solid"
      disabled={isRegistVotePending || !isValid}
      onClick={handleClickSubmitButton}
    >
      {isRegistVotePending ? <Loading /> : '투표 올리기'}
    </Button>
  );
}
