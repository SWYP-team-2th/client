import { useBottomSheet } from '../BottomSheet/hooks';
import useToast from '../Toast/hooks';
import { useKakaoShareUrl } from '@/api/useKakaoShareUrl';

interface UseLinkShareBottomSheetOptions {
  author: string;
  shareUrl: string;
}

export default function useLinkShareBottomSheet({
  author,
  shareUrl,
}: UseLinkShareBottomSheetOptions) {
  const toast = useToast();
  const { closeBottomSheet } = useBottomSheet();
  const { handleClickKakaoShareButton } = useKakaoShareUrl({
    author,
    shareUrl,
  });

  const handleClickUrlShareButton = () => {
    navigator.clipboard
      .writeText(shareUrl)
      .then(() => {
        toast.success({
          title: '투표 주소가 복사됐어요!😉',
        });
        closeBottomSheet();
      })
      .catch(() => {
        toast.error({
          title: '투표 주소 복사에 실패했어요..',
          description: '다시 시도해주세요.',
        });
      });
  };

  return {
    handleClickKakaoShareButton,
    handleClickUrlShareButton,
  };
}
