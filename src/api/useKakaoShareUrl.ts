import { useEffect } from 'react';
import { useBottomSheet } from '@/components/common/BottomSheet/hooks';

export function useKakaoShareUrl(shareUrl: string) {
  const { closeBottomSheet } = useBottomSheet();

  useEffect(() => {
    if (window.Kakao && !window.Kakao.isInitialized()) {
      window.Kakao.init(import.meta.env.VITE_KAKAO_CLIENT_ID);
    }
  }, []);

  const handleClickKakaoShareButton = () => {
    if (!window.Kakao?.isInitialized()) {
      console.error('카카오 SDK가 초기화되지 않았습니다.');
      return;
    }

    try {
      window.Kakao.Share.sendDefault({
        objectType: 'text',
        text: '기본 템플릿으로 제공하는 텍스트 템플릿입니다.',
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
