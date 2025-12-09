import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import axios from 'axios';

export type ModerationResult = {
  isAllowed: boolean;
  category:
    | 'ok'
    | 'profanity'
    | 'hate'
    | 'sexual'
    | 'violence'
    | 'self_harm'
    | 'etc';
  detectedWords?: string[];
};

const MODERATION_API_URL = import.meta.env.VITE_MODERATION_API_URL;

export async function requestModeration(
  content: string,
): Promise<ModerationResult> {
  if (!MODERATION_API_URL) {
    throw new Error(
      'VITE_MODERATION_API_URL 환경 변수가 설정되지 않았습니다. .env 파일에 VITE_MODERATION_API_URL을 추가해주세요..',
    );
  }

  const { data: result } = await axios.post<ModerationResult>(
    MODERATION_API_URL,
    { content },
    {
      headers: {
        'Content-Type': 'application/json',
      },
      withCredentials: false,
    },
  );

  // detectedWords가 배열이 아니면 배열로 변환
  let detectedWords = result.detectedWords;
  if (!Array.isArray(detectedWords)) {
    if (detectedWords && typeof detectedWords === 'string') {
      detectedWords = [detectedWords];
    } else {
      detectedWords = [];
    }
  }

  // detectedWords가 없으면 빈 배열로 설정
  return {
    ...result,
    detectedWords: detectedWords || [],
  };
}

// React Query 훅
export function useModerateText(
  options?: UseMutationOptions<ModerationResult, Error, string>,
) {
  return useMutation<ModerationResult, Error, string>({
    mutationFn: (text: string) => requestModeration(text),
    ...options,
  });
}
