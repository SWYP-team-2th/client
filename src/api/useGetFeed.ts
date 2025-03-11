import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { request } from '@/api/config';
import { getAccessToken } from '@/components/login/Auth/token';

interface ImageType {
  id: number;
  imageName: string;
  imageUrl: string;
  thumbnailUrl?: string;
  voteId?: number | null;
}

interface AuthorType {
  id: number;
  nickname: string;
  profileUrl: string;
}

interface PostType {
  id: number;
  author: AuthorType;
  images: ImageType[];
  status: 'PROGRESS' | 'CLOSED';
  description: string;
  shareUrl: string;
  isAuthor: boolean;
  participantCount: number;
  commentCount: number;
}

interface FeedType {
  data: PostType[];
}

export default function useGetFeed(
  options?: Omit<UseQueryOptions<FeedType>, 'queryKey' | 'queryFn'>,
) {
  const accessToken = getAccessToken();

  return useQuery<FeedType>({
    queryKey: ['feed'],
    queryFn: async () => {
      return request<FeedType>({
        method: 'GET',
        url: '/posts/feed',
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
    },
    enabled: !!accessToken,
    ...options,
  });
}
