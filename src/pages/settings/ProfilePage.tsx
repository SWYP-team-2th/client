import { useNavigate } from 'react-router-dom';
import { useGetNotificationPresent } from '@/api/useGetNotificationPresent';
import { Header } from '@/components/common/Header/Header';
import Icon from '@/components/common/Icon';
import ProfileEditForm from '@/components/settings/ProfileEditForm';

export default function ProfilePage() {
  const navigate = useNavigate();
  const { data: notificationPresent } = useGetNotificationPresent();

  const handleClickBackButton = () => {
    navigate(-1);
  };

  return (
    <div>
      <Header
        leftNode={
          <Icon name="ArrowLeft" size="large" onClick={handleClickBackButton} />
        }
        centerNode={<h1 className="text-heading-1">내 정보</h1>}
        rightNode={
          <Icon
            name={
              notificationPresent?.present ? 'BellOutlinePoint' : 'BellOutline'
            }
            size="large"
            onClick={() => navigate('/notifications')}
            className="cursor-pointer"
          />
        }
      />
      <div className="pt-[55px]">
        <ProfileEditForm />
      </div>
    </div>
  );
}
