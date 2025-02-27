import { useSuspenseQuery } from '@tanstack/react-query';
import { request } from './config';

interface VoteDetailType {
  id: number;
  author: {
    id: number;
    nickname: string;
    profileUrl: string;
  };
  description: string;
  images: {
    id: number;
    imageName: string;
    imageUrl: string;
    voted: boolean;
  }[];
  shareUrl: string;
  createdAt: string;
}

export default function useGetVoteDetail(postId: number) {
  return useSuspenseQuery<VoteDetailType>({
    queryKey: ['voteDetail', postId],
    queryFn: () =>
      request({
        method: 'GET',
        url: `/posts/${postId}`,
      }),
  });
}
