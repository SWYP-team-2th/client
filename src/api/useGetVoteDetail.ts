import { useSuspenseQuery } from '@tanstack/react-query';
import { request } from './config';

export interface Image {
  id: number;
  imageName: string;
  imageUrl: string;
  thumbnailUrl: string;
  voted: boolean;
}

interface VoteDetailType {
  id: number;
  author: {
    id: number;
    nickname: string;
    profileUrl: string;
  };
  description: string;
  images: Image[];
  shareUrl: string;
  createdAt: string;
  status: 'PROGRESS' | 'CLOSED';
  isAuthor: boolean;
}

export default function useGetVoteDetail(shareUrl: string) {
  const guestToken = localStorage.getItem('guestToken');

  return useSuspenseQuery<VoteDetailType>({
    queryKey: ['voteDetail', shareUrl],
    queryFn: () => {
      return request({
        method: 'GET',
        url: `/posts/shareUrl/${shareUrl}`,
      });
    },
  });
}
