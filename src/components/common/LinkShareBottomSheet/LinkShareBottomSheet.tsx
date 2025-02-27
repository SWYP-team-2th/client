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
      <div className="flex flex-col gap-5 text-title-medium">
        <button
          onClick={handleClickKakaoShareButton}
          className="flex gap-4 items-center"
        >
          <p>카카오로 공유하기</p>
        </button>
        <button
          onClick={handleClickUrlShareButton}
          className="flex gap-4 items-center"
        >
          <Icon name="Link" size="medium" />
          <p>URL로 공유하기</p>
        </button>
      </div>
    </BottomSheet>
  );
}
