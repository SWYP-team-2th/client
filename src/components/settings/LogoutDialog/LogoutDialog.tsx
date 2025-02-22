import Dialog from '@/components/common/Dialog';

export default function LogoutDialog() {
  return (
    <Dialog
      title="잠깐! 뽀또들을 두고 떠나시려구요?😢"
      description="뽀또본부로 다시 돌아오실거죠?"
      cancelButtonProps={{
        text: '취소',
      }}
      confirmButtonProps={{
        text: '로그아웃',
        // TODO: 로그아웃 기능 구현
        onClick: () => {},
      }}
      showLaterButton={false}
    />
  );
}
