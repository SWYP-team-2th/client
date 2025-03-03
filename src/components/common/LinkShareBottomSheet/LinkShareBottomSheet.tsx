import BottomSheet from '../BottomSheet';
import Icon from '../Icon';
import useLinkShareBottomSheet from './hooks';

interface LinkShareBottomSheetProps {
  author: string;
  shareUrl: string;
}

export default function LinkShareBottomSheet({
  author,
  shareUrl,
}: LinkShareBottomSheetProps) {
  const { handleClickKakaoShareButton, handleClickUrlShareButton } =
    useLinkShareBottomSheet({ author, shareUrl });

  return (
    <BottomSheet title="투표 공유하기" hasCloseButton>
      <div className="flex flex-col gap-5 text-title-medium mt-2 mb-2">
        <button
          onClick={handleClickKakaoShareButton}
          className="flex gap-4 items-center"
        >
          <Icon name="KakaoLogo" size="large" />
          <p>카카오로 공유하기</p>
        </button>
        <button
          onClick={handleClickUrlShareButton}
          className="flex gap-4 items-center"
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
