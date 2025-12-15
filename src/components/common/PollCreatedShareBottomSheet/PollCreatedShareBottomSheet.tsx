import BottomSheet from '../BottomSheet';
import { useBottomSheet } from '../BottomSheet/hooks';
import { Button } from '../Button/Button';
import useLinkShareBottomSheet from '../LinkShareBottomSheet/hooks';
import shareImage from '@/assets/images/Share.png';

interface PollCreatedShareBottomSheetProps {
  shareUrl: string;
}

export default function PollCreatedShareBottomSheet({
  shareUrl,
}: PollCreatedShareBottomSheetProps) {
  const { handleClickKakaoShareButton } = useLinkShareBottomSheet({ shareUrl });
  const { closeBottomSheet } = useBottomSheet();

  return (
    <BottomSheet title="투표가 만들어졌어요!" variant="centered" hasCloseButton>
      <div className="flex flex-col items-center text-center px-6">
        <img src={shareImage} alt="Share" className="w-[90px] h-[90px] mb-4" />
        <p className="text-headline-1 text-gray-500 mb-7">
          투표를 공유하고 다양한 의견을 받아보세요.
        </p>
        <div className="flex flex-col w-full">
          <Button
            type="button"
            variant="solid"
            size="large"
            buttonType="primary"
            onClick={handleClickKakaoShareButton}
            className="flex items-center justify-center"
          >
            카카오로 공유하기
          </Button>
          <button
            onClick={closeBottomSheet}
            className="text-body-1 text-gray-700 underline underline-offset-4 text-center pt-3"
          >
            나중에 하기
          </button>
        </div>
      </div>
    </BottomSheet>
  );
}
