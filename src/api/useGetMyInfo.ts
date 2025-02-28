import { useQuery } from '@tanstack/react-query';
import { request } from '@/api/config';

interface MyInfoResponse {
  id: number;
  nickname: string;
  profileUrl: string;
}

export default function useGetMyInfo() {
  return useQuery<MyInfoResponse>({
    queryKey: ['my-info'],
    queryFn: async () => {
      return request<MyInfoResponse>({
        method: 'GET',
        url: '/users/me',
      });
    },
  });
}
