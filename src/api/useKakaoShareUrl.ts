import { useEffect } from 'react';
import { useBottomSheet } from '@/components/common/BottomSheet/hooks';
interface KakaoShareUrlProps {
  author: string;
  shareUrl: string;
}

export function useKakaoShareUrl({ author, shareUrl }: KakaoShareUrlProps) {
  const { closeBottomSheet } = useBottomSheet();

  useEffect(() => {
    if (window.Kakao && !window.Kakao.isInitialized()) {
      window.Kakao.init(import.meta.env.VITE_KAKAO_JAVASCRIPT_APP_KEY);
    }
  }, []);

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
