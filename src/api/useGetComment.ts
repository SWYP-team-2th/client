import { useSuspenseQuery } from '@tanstack/react-query';
import { request } from './config';

interface AuthorType {
  userId: number;
  nickname: string;
  profileUrl: string;
}

interface CommentType {
  commentId: number;
  content: string;
  author: AuthorType;
  voteId: number | null;
  createdAt: string;
}

interface CommentsResponse {
  nextCursor: number;
  hasNext: boolean;
  data: CommentType[];
}

export default function useGetComment(postId: number, cursor: number = 0) {
  return useSuspenseQuery<CommentsResponse>({
    queryFn: () =>
      request({
        method: 'GET',
        url: `/posts/${postId}/comments`,
        params: { cursor },
      }),
    queryKey: ['comments', postId, cursor],
  });
}
