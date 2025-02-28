import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { request } from './config';

interface Image {
  imageFileId: number;
}

interface RegistVoteRequest {
  description: string;
  images: Image[];
}

interface RegistVoteResponse {
  postId: number;
  shareUrl: string;
}

export default function usePostRegistVote(
  options?: Omit<
    UseMutationOptions<RegistVoteResponse, Error, RegistVoteRequest>,
    'mutationFn'
  >,
) {
  return useMutation<RegistVoteResponse, Error, RegistVoteRequest>({
    mutationFn: (data: RegistVoteRequest) =>
      request({
        method: 'POST',
        url: '/posts',
        data,
      }),
    ...options,
  });
}
