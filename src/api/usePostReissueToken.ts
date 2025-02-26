import { request } from '@/api/config';
import { setAccessToken } from '@/components/login/Auth/token';

interface ReissueTokenResponseType {
  accessToken: string;
}

export async function usePostReissueToken(): Promise<string | null> {
  try {
    const res = await request<ReissueTokenResponseType>({
      method: 'POST',
      url: '/auth/reissue',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      withCredentials: true,
    });

    if (res.accessToken) {
      setAccessToken(res.accessToken);
      return res.accessToken;
    }
    return null;
  } catch (err) {
    console.error('토큰 재발급 실패:', err);
    return null;
  }
}
