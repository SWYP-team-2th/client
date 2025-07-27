import usePollEditButton from './hooks';
import { Button } from '@/components/common/Button/Button';
import Loading from '@/components/common/Loading';

export default function PollEditButton() {
  const { isValid, isPending, handleClickPollEditButton } = usePollEditButton();

  return (
    <Button
      type="submit"
      size="large"
      className="fixed bottom-8 left-[50%] translate-x-[-50%] w-[calc(100%-48px)]"
      buttonType={isValid ? 'primary' : 'disabled'}
      variant="solid"
      disabled={isPending || !isValid}
      onClick={handleClickPollEditButton}
    >
      {isPending ? <Loading /> : '투표 수정하기'}
    </Button>
  );
}
