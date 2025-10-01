import { useNavigate } from 'react-router-dom';
import usePatchNotification from '@/api/usePatchNotification';
import useToast from '@/components/common/Toast/hooks';
import { NotificationType } from '@/types/notification';
import { getRemainedTimeText } from '@/utils/date/date';

interface NotificationItemProps {
  notification: NotificationType;
  onRefetch?: () => void;
}

export default function NotificationItem({
  notification,
  onRefetch,
}: NotificationItemProps) {
  const navigate = useNavigate();
  const toast = useToast();
  const patchNotification = usePatchNotification();

  const handleNotificationClick = () => {
    // 삭제된 게시물/댓글인 경우 토스트 띄우고 재조회시키기
    if (!notification.isValid) {
      toast.error({
        title: '알림대상을 찾을 수 없어요!',
      });
      onRefetch?.();
      return;
    }

    // 읽지 않은 알림인 경우 읽은 걸로 처리하고 patch 요청
    if (!notification.isRead) {
      patchNotification.mutate(
        { notificationId: notification.id },
        {
          onSuccess: () => {
            navigate(`/posts/${notification.targets[0].id}`);
          },
          onError: () => {
            toast.error({
              title: '알림 읽기 처리에 실패했어요!',
            });
          },
        },
      );
    } else {
      navigate(`/posts/${notification.targets[0].id}`);
    }
  };

  return (
    <div
      className="bg-gray-100 border-b border-gray-200 py-6 cursor-pointer"
      onClick={handleNotificationClick}
    >
      <div className="flex items-start space-x-3">
        <div className="relative">
          <img
            src={notification.profileUrl}
            alt="프로필"
            className="w-7 h-7 rounded-full"
          />
          {!notification.isRead && (
            <div className="absolute -top-1 -left-1 w-[7px] h-[7px] bg-[#FF5A5A] rounded-full"></div>
          )}
        </div>
        <div className="flex-1">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <p className="text-gray-900 text-body-1-long">
                {notification.title}
              </p>
              <p className="text-gray-700 text-sm mt-1">
                {notification.content}
              </p>
              <p className="text-gray-600 text-body-2-long mt-3">
                {getRemainedTimeText({
                  dateString: notification.eventAt,
                  suffix: '전',
                })}
              </p>
            </div>

            <img
              src={notification.imageUrl}
              alt="해당 게시글 이미지"
              className="w-13 h-13 rounded-lg object-cover ml-3 flex-shrink-0"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
