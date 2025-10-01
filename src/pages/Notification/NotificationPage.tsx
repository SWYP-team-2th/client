import { useNavigate } from 'react-router-dom';
import { Header } from '@/components/common/Header/Header';
import Icon from '@/components/common/Icon';
import NotificationList from '@/components/notification/NotificationList';

export default function NotificationPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen">
      <Header
        className="bg-gray-100"
        leftNode={
          <Icon
            name="ArrowLeft"
            size="medium"
            onClick={() => navigate('/')}
            className="cursor-pointer"
          />
        }
        centerNode="알림"
      />

      <div className="pt-15 px-5">
        <NotificationList />
      </div>
    </div>
  );
}
