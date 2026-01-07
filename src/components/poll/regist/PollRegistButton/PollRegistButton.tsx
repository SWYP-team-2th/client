import ReactGA from 'react-ga4';
import { useNavigate } from 'react-router-dom';
import usePollForm from '../../Provider/hooks';
import useGetMyInfo from '@/api/useGetMyInfo';
import usePostRegistVote from '@/api/usePostRegistVote';
import useUpdateOnboarding from '@/api/useUpdateOnboarding';
import { useBottomSheet } from '@/components/common/BottomSheet/hooks';
import { Button } from '@/components/common/Button/Button';
import Loading from '@/components/common/Loading';
import PollCreatedShareBottomSheet from '@/components/common/PollCreatedShareBottomSheet';
import { useModerationCheck } from '@/hooks/useModerationCheck';

export default function PollRegistButton() {
  const navigate = useNavigate();
  const { isValid, data: pollData } = usePollForm();
  const { data: myInfo } = useGetMyInfo();
  const { openBottomSheet } = useBottomSheet();
  const { mutate: updateOnboarding } = useUpdateOnboarding();
  const { mutate: registVote, isPending: isRegistVotePending } =
    usePostRegistVote({
      onSuccess: (data) => {
        if (myInfo?.onboardingStep) {
          ReactGA.event('poll_created', {
            post_id: data.postId,
          });

          updateOnboarding({
            onboardingStep: { ...myInfo.onboardingStep, FIRST_VOTE: false },
          });
        }

        ReactGA.event('every_poll_created', {
          post_id: data.postId,
        });

        const shareUrl = `${window.location.origin}/posts/${data.postId}?shareUrl=${data.shareUrl}`;
        navigate(`/posts/${data.postId}`);
        openBottomSheet(<PollCreatedShareBottomSheet shareUrl={shareUrl} />);
      },
    });
  const { mutate: checkModeration } = useModerationCheck();

  const handleClickSubmitButton = () => {
    if (isValid) {
      checkModeration({
        pollData,
        onConfirm: () => {
          registVote({
            ...pollData,
            pollChoices: pollData.pollChoices.map((choice) => ({
              title: choice.title,
              imageUrl: choice.imageUrl,
            })),
          });
        },
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
