import ReactGA from 'react-ga4';
import useToast from '../Toast/hooks';
import useGetMyInfo from '@/api/useGetMyInfo';
import { useKakaoShareUrl } from '@/api/useKakaoShareUrl';
import { useBottomSheet } from '@/components/common/BottomSheet/hooks';

interface UseLinkShareBottomSheetOptions {
  shareUrl: string;
}

export default function useLinkShareBottomSheet({
  shareUrl,
}: UseLinkShareBottomSheetOptions) {
  const toast = useToast();
  const { closeBottomSheet } = useBottomSheet();
  const { data: myInfo } = useGetMyInfo();
  const { handleClickKakaoShareButton } = useKakaoShareUrl({
    author: myInfo?.nickname ?? '',
    shareUrl,
  });

  const handleClickUrlShareButton = () => {
    navigator.clipboard
      .writeText(shareUrl)
      .then(() => {
        ReactGA.event('poll_shared');
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
