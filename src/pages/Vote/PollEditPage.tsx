import { useParams, useNavigate } from 'react-router-dom';
import { useGetNotificationPresent } from '@/api/useGetNotificationPresent';
import useGetPostUpdateInfo from '@/api/useGetPostUpdateInfo';
import { Button } from '@/components/common/Button/Button';
import { Header } from '@/components/common/Header/Header';
import Icon from '@/components/common/Icon';
import Loading from '@/components/common/Loading';
import PollEditButton from '@/components/poll/edit/PollEditButton';
import PollEditCloseOptionSection from '@/components/poll/edit/PollEditCloseOptionSection';
import PollInformation from '@/components/poll/PollInformation';
import PollOptionSection from '@/components/poll/PollOptionSection';
import { PollFormProvider } from '@/components/poll/Provider/PollFormProvider';

export default function PollEditPage() {
  const { pollId } = useParams<{ pollId: string }>();
  const navigate = useNavigate();
  const { data: notificationPresent } = useGetNotificationPresent();
  const {
    data: postUpdateInfo,
    isLoading,
    refetch,
  } = useGetPostUpdateInfo(Number(pollId));

  if (isLoading) {
    return (
      <div className="flex flex-col gap-4 items-center justify-center h-screen">
        <Loading />
      </div>
    );
  }

  if (!postUpdateInfo) {
    return (
      <div className="flex flex-col gap-4 items-center justify-center h-screen">
        <p>오류가 발생하였습니다. 다시 시도해주세요.</p>
        <Button
          onClick={() => refetch()}
          buttonType="primary"
          size="small"
          variant="solid"
        >
          다시 시도
        </Button>
      </div>
    );
  }

  return (
    <div>
      <Header
        className="bg-white"
        leftNode={
          <Icon
            name="ThickClose"
            size="large"
            className="cursor-pointer"
            onClick={() => navigate(-1)}
          />
        }
        centerNode={<h1 className="text-heading-1">투표 수정하기</h1>}
        rightNode={
          <Icon
            name={
              notificationPresent?.present ? 'BellOutlinePoint' : 'BellOutline'
            }
            size="large"
            className="cursor-pointer"
            onClick={() => navigate('/notifications')}
          />
        }
      />
      <PollFormProvider type="EDIT" initialData={postUpdateInfo}>
        <PollInformation />
        <PollOptionSection />
        <PollEditCloseOptionSection />
        <PollEditButton />
      </PollFormProvider>
    </div>
  );
}
