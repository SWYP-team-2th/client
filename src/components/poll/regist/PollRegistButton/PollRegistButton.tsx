import { useNavigate } from 'react-router-dom';
import usePollForm from '../../Provider/hooks';
import useGetMyInfo from '@/api/useGetMyInfo';
import usePostRegistVote from '@/api/usePostRegistVote';
import useUpdateOnboarding from '@/api/useUpdateOnboarding';
import { Button } from '@/components/common/Button/Button';
import Loading from '@/components/common/Loading';
import useToast from '@/components/common/Toast/hooks';

export default function PollRegistButton() {
  const navigate = useNavigate();
  const toast = useToast();
  const { isValid, data: pollData } = usePollForm();
  const { data: myInfo } = useGetMyInfo();
  const { mutate: updateOnboarding } = useUpdateOnboarding();
  const { mutate: registVote, isPending: isRegistVotePending } =
    usePostRegistVote({
      onSuccess: (data) => {
        if (myInfo?.onboardingStep) {
          updateOnboarding({
            onboardingStep: { ...myInfo.onboardingStep, FIRST_VOTE: false },
          });
        }
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
    <div className="bg-white w-full py-4 px-6 flex items-center justify-center fixed bottom-0 left-0 right-0">
      <Button
        type="submit"
        size="large"
        buttonType={isValid ? 'primary' : 'disabled'}
        variant="solid"
        disabled={isRegistVotePending || !isValid}
        onClick={handleClickSubmitButton}
      >
        {isRegistVotePending ? <Loading /> : '투표 올리기'}
      </Button>
    </div>
  );
}
