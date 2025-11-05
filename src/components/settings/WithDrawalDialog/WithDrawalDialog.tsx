import useDeleteWithDraw from '@/api/useDeleteWithDraw';
import Dialog from '@/components/common/Dialog';

export default function WithDrawalDialog() {
  const { mutate: deleteWithDraw } = useDeleteWithDraw();

  return (
    <Dialog
      title="정말 탈퇴하시겠어요?"
      description="계정과 작성한 투표, 댓글이 모두 삭제되며 복구할 수 없어요."
      cancelButtonProps={{
        text: '취소',
      }}
      confirmButtonProps={{
        text: '탈퇴하기',
        onClick: deleteWithDraw,
      }}
      showLaterButton={false}
    />
  );
}
