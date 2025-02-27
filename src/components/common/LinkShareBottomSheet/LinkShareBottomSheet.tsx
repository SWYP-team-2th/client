import BottomSheet from '../BottomSheet';
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
      <div className="flex flex-col gap-5">
        <button onClick={handleClickKakaoShareButton}>카카오로 공유하기</button>
        <button onClick={handleClickUrlShareButton}>URL로 공유하기</button>
      </div>
    </BottomSheet>
  );
}
