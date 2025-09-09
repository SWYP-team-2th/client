import { useNavigate } from 'react-router-dom';
import { Header } from '@/components/common/Header/Header';
import Icon from '@/components/common/Icon';
import ProfileEditForm from '@/components/settings/ProfileEditForm';

export default function ProfilePage() {
  const navigate = useNavigate();

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
        rightNode={<Icon name="BellOutline" size="large" />}
      />
      <div className="pt-[55px]">
        <ProfileEditForm />
      </div>
    </div>
  );
}
