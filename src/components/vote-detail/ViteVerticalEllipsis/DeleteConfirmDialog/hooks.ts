import { useDeletePost } from '@/api/useDeletePost';
import useGetMyInfo from '@/api/useGetMyInfo';
import { useDialog } from '@/components/common/Dialog/hooks';

export default function useDeleteConfirmDialog() {
  const { closeDialog } = useDialog();
  const { data: myInfo } = useGetMyInfo();

  const { mutate: deletePost, isPending: isDeletePostPending } = useDeletePost({
    onSuccess: () => {
      if (myInfo) {
        closeDialog();
        window.location.href = `/user/${myInfo.id}`;
      }
    },
  });

  return {
    deletePost,
    isDeletePostPending,
  };
}
