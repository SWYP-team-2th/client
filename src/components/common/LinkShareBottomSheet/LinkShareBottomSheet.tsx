import BottomSheet from '../BottomSheet';
import Icon from '../Icon';
import useLinkShareBottomSheet from './hooks';

interface LinkShareBottomSheetProps {
  shareUrl: string;
}

export default function LinkShareBottomSheet({
  shareUrl,
}: LinkShareBottomSheetProps) {
  const { handleClickKakaoShareButton, handleClickUrlShareButton } =
    useLinkShareBottomSheet({ shareUrl });

  return (
    <BottomSheet title="링크 공유하기" hasCloseButton>
      <div className="flex flex-col gap-4 text-headline-1 text-gray-700">
        <button
          onClick={handleClickKakaoShareButton}
          className="flex gap-3 items-center"
        >
          <Icon name="KakaoLogo" size="xLarge" />
          <p>카카오로 공유하기</p>
        </button>
        <button
          onClick={handleClickUrlShareButton}
          className="flex gap-3 items-center"
        >
          <div className="p-2 bg-gray-600 rounded-full">
            <Icon name="LinkWhite" size="small" />
          </div>
          <p>URL로 공유하기</p>
        </button>
      </div>
    </BottomSheet>
  );
}
