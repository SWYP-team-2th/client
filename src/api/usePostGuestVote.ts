import { useMutation } from '@tanstack/react-query';
import { request } from '@/api/config';

interface GuestVoteRequest {
  imageId: number;
}

interface GuestVoteResponse {
  success: boolean;
  message?: string;
}

export default function usePostGuestVote(postId: number) {
  return useMutation<GuestVoteResponse, Error, GuestVoteRequest>({
    mutationFn: async (data) => {
      return request<GuestVoteResponse>({
        method: 'POST',
        url: `/posts/${postId}/votes/guest`,
        data,
        headers: {
          'Content-Type': 'application/json;charset=UTF-8',
        },
      });
    },
    onSuccess: (data) => {
      console.log('게스트 투표 성공:', data);
    },
    onError: (err) => {
      console.error('게스트 투표 실패:', err);
    },
  });
}
