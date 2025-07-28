import { useBottomSheet } from '@/components/common/BottomSheet/hooks';
import Icon from '@/components/common/Icon';
import LinkShareBottomSheet from '@/components/common/LinkShareBottomSheet';

interface ShareButtonProps {
  shareUrl: string;
}

export default function ShareButton({ shareUrl }: ShareButtonProps) {
  const { openBottomSheet } = useBottomSheet();

  const handleClickShareButton = () => {
    openBottomSheet(<LinkShareBottomSheet shareUrl={shareUrl} />);
  };

  return (
    <button
      onClick={handleClickShareButton}
      className={`flex items-center justify-center gap-1`}
    >
      <span className="text-headline-3 text-gray-600">링크 공유하기</span>
      <Icon name="UpLoad" size="small" />
    </button>
  );
}
