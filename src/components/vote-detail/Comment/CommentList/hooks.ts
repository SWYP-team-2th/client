import useGetComment from '@/api/useGetComment';

export default function useComment(postId: number) {
  const { data: commentsData } = useGetComment(postId);

  return {
    commentsData,
  };
}
