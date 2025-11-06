import usePostLogout from '@/api/usePostLogout';
import Dialog from '@/components/common/Dialog';

export default function LogoutDialog() {
  const { mutate: postLogout } = usePostLogout();

  return (
    <Dialog
      title="이 계정에서 로그아웃할까요?"
      description="로그아웃 후에도 언제든 다시 돌아올 수 있어요."
      cancelButtonProps={{
        text: '취소',
      }}
      confirmButtonProps={{
        text: '로그아웃',
        onClick: postLogout,
      }}
      showLaterButton={false}
    />
  );
}
