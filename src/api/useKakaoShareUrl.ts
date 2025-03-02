import { useEffect } from 'react';
import { useBottomSheet } from '@/components/common/BottomSheet/hooks';
import { getIsDevelopment } from '@/utils/cn/getEnvironment';
interface KakaoShareUrlProps {
  author: string;
  shareUrl: string;
}

export function useKakaoShareUrl({ author, shareUrl }: KakaoShareUrlProps) {
  const { closeBottomSheet } = useBottomSheet();
  const isDevelopment = getIsDevelopment();

  useEffect(() => {
    if (window.Kakao && !window.Kakao.isInitialized()) {
      window.Kakao.init(
        isDevelopment
          ? import.meta.env.VITE_KAKAO_JAVASCRIPT_APP_KEY
          : import.meta.env.VITE_KAKAO_PROD_JAVASCRIPT_APP_KEY,
      );
    }
  }, [isDevelopment]);

  const handleClickKakaoShareButton = () => {
    if (!window.Kakao.isInitialized()) {
      console.error('카카오 SDK가 초기화되지 않았습니다.');
      return;
    }

    try {
      window.Kakao.Share.sendDefault({
        objectType: 'text',
        text: `${author}님이 투표를 공유했어요! 💛`,
        link: {
          mobileWebUrl: shareUrl,
          webUrl: shareUrl,
        },
      });

      closeBottomSheet();
    } catch (error) {
      console.error('카카오 공유 에러:', error);
    }
  };

  return {
    handleClickKakaoShareButton,
  };
}
