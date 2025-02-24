import { request } from './config';
import { useSuspenseQuery } from '@tanstack/react-query';

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
    queryFn: () =>
      request({
        method: 'GET',
        url: `/posts/${shareUrl}`,
      }),
    queryKey: [],
  });
}
