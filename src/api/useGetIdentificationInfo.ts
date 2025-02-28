import { useQuery } from '@tanstack/react-query';
import { request } from '@/api/config';
import { getAccessToken } from '@/components/login/Auth/token';

interface IdentificationInfoResponse {
  id: number;
  nickname: string;
  profileUrl: string;
}

export default function useGetIdentificationInfo() {
  return useQuery<IdentificationInfoResponse>({
    queryKey: ['identificationInfo'],
    queryFn: async () => {
      const token = getAccessToken();
      return request<IdentificationInfoResponse>({
        method: 'GET',
        url: '/users/me',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    },
    // 토큰이 저장되도 여기 쿼리문이 실행되지 않기 때문에 토큰이 들어오면 현재 쿼리문 실행되도록 설정
    enabled: !!getAccessToken(),
  });
}
