import { useNavigate, useParams } from 'react-router-dom';

export default function useProfile() {
  const { userId } = useParams();
  const navigate = useNavigate();

  const handleClickSettingsButton = () => {
    navigate(`/user/${userId}/settings`);
  };

  return { handleClickSettingsButton };
}
