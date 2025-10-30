import NotificationItem from './NotificationItem';
import { useGetNotifications } from '@/api/useGetNotifications';
import EmptyNotification from '@/assets/images/my/EmptyNotification.png';
import InfiniteScroller from '@/components/common/InfiniteScroller';
import Loading from '@/components/common/Loading';

export default function NotificationList() {
  const {
    data,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    refetch,
  } = useGetNotifications(10);

  if (isLoading) {
    return <Loading />;
  }

  if (data) {
    const validNotifications = data.pages.flatMap((page) =>
      page.data.filter((notification) => notification.isValid),
    );

    if (validNotifications.length === 0) {
      return (
        <div className="fixed inset-0 flex flex-col items-center justify-center">
          <div className="text-center">
            <img
              src={EmptyNotification}
              alt="알림 없구요"
              className="mx-auto mb-4 w-24 h-24"
            />
            <p className="text-gray-900 text-heading-1 mb-2">
              아직 받은 알림이 없어요!
            </p>
            <p className="text-gray-600 text-body-1">
              새로운 소식이 생기면 바로 알려드릴게요.
            </p>
          </div>
        </div>
      );
    }

    return (
      <InfiniteScroller
        data={validNotifications}
        renderItem={(notification) => (
          <NotificationItem notification={notification} onRefetch={refetch} />
        )}
        fetchNextPage={fetchNextPage}
        hasNextPage={hasNextPage}
        isFetchingNextPage={isFetchingNextPage}
        keyExtractor={(notification) => notification.id}
      />
    );
  }

  return null;
}
