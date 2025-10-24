import usePostLogout from '@/api/usePostLogout';
import Dialog from '@/components/common/Dialog';

export default function LogoutDialog() {
  const { mutate: postLogout } = usePostLogout();

  return (
    <Dialog
      title="잠깐! 츄즈들을 두고 떠나시려구요?😢"
      description="츄즈본부로 다시 돌아오실거죠?"
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
