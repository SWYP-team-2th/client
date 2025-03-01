import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { request } from '@/api/config';

interface MyInfoResponse {
  id: number;
  nickname: string;
  profileUrl: string;
}

export default function useGetMyInfo(
  options?: Omit<UseQueryOptions<MyInfoResponse>, 'queryKey' | 'queryFn'>,
) {
  return useQuery<MyInfoResponse>({
    queryKey: ['my-info'],
    queryFn: async () => {
      return request<MyInfoResponse>({
        method: 'GET',
        url: '/users/me',
      });
    },
    ...options,
  });
}
