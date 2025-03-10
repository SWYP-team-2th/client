import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { request } from '@/api/config';
import { getAccessToken } from '@/components/login/Auth/token';

interface MyInfoResponse {
  id: number;
  nickname: string;
  profileUrl: string;
}

export default function useGetMyInfo(
  options?: Omit<UseQueryOptions<MyInfoResponse>, 'queryKey' | 'queryFn'>,
) {
  const accessToken = getAccessToken();
  return useQuery<MyInfoResponse>({
    queryKey: ['my-info'],
    queryFn: async () => {
      return request<MyInfoResponse>({
        method: 'GET',
        url: '/users/me',
      });
    },
    ...options,
    enabled: accessToken ? options?.enabled !== false : false,
  });
}
