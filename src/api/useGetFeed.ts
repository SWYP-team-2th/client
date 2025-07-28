import { useQuery } from '@tanstack/react-query';
import { request } from '@/api/config';
import { getAccessToken } from '@/components/login/Auth/token';
import { FeedType } from '@/types/feed';

export default function useGetFeed(size: number) {
  const accessToken = getAccessToken();

  return useQuery({
    queryKey: ['feed', size],
    queryFn: () =>
      request<{ data: FeedType[] }>({
        method: 'GET',
        url: '/posts/feed',
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        params: {
          size,
        },
      }),
    enabled: !!accessToken,
  });
}
