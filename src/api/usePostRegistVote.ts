import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { request } from './config';

interface Image {
  imageFileId: number;
}

interface RegistVoteRequest {
  description: string;
  images: Image[];
}

export default function usePostRegistVote(
  options?: Omit<
    UseMutationOptions<void, Error, RegistVoteRequest>,
    'mutationFn'
  >,
) {
  return useMutation<void, Error, RegistVoteRequest>({
    mutationFn: (data: RegistVoteRequest) =>
      request({
        method: 'POST',
        url: '/posts',
        headers: {
          Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJpZCI6IjEiLCJpYXQiOjE3NDAyOTQyMzEsImlzcyI6InN3eXA4dGVhbTIiLCJleHAiOjMzMjc2Mjk0MjMxfQ.gqA245tRiBQB9owKRWIpX1we1T362R-xDTt4YT9AhRY`,
        },
        data,
      }),
    ...options,
  });
}
