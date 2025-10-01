import { useNavigate, useParams } from 'react-router-dom';
import useGetMyInfo from '@/api/useGetMyInfo';

export default function useProfile() {
  const { userId } = useParams();
  const navigate = useNavigate();

  const { data: myInfo } = useGetMyInfo();

  const handleClickSettingsButton = () => {
    navigate(`/user/${userId}/settings`);
  };

  const isMyProfile = myInfo?.id === Number(userId);

  return { handleClickSettingsButton, isMyProfile };
}
