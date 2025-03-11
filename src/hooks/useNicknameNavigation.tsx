import { useNavigate, useParams } from 'react-router-dom';
import useGetUserInfo from '@/api/useGetUserInfo';
import { useDialog } from '@/components/common/Dialog/hooks';
import GuestConfirmDialog from '@/components/common/GuestConfirmDialog';
import { getRole } from '@/components/login/Auth/token';

export default function useNavigateToProfile() {
  const navigate = useNavigate();
  const { userId } = useParams<{ userId: string }>();
  const { data: userInfo } = useGetUserInfo(Number(userId));
  const { openDialog } = useDialog();

  const handleNavigateToProfile = (targetUserId: number) => {
    const userId = userInfo?.id;
    if (!userId && getRole() === 'GUEST') {
      openDialog(
        <GuestConfirmDialog title="다른 유저의 마이페이지는 로그인을 해야 열람할 수 있어요!" />,
      );
    }

    navigate(`/user/${targetUserId}`);
  };

  return handleNavigateToProfile;
}
