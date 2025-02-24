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
  votes: {
    id: number;
    imageUrl: string;
    voteRatio: number;
    voted: boolean;
  }[];
  shareUrl: string;
  createdAt: string;
}

export default function useGetVoteDetail(shareUrl: string) {
  return useSuspenseQuery<VoteDetailType>({
    queryKey: ['voteDetail', shareUrl],
    queryFn: () =>
      request({
        method: 'GET',
        url: `/posts/${shareUrl}`,
      }),
  });
}
