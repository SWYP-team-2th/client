import { useNavigate } from 'react-router-dom';
import useGetMyInfo from '@/api/useGetMyInfo';
import Logo from '@/assets/icons/logo.svg?react';
import { useDialog } from '@/components/common/Dialog/hooks';
import GuestConfirmDialog from '@/components/common/GuestConfirmDialog/GuestConfirmDialog';
import { Header } from '@/components/common/Header/Header';
import Icon from '@/components/common/Icon';
import LoginDialog from '@/components/common/LoginDialog';
import { getRole } from '@/components/login/Auth/token';
import CommentList from '@/components/vote-detail/Comment/CommentList';
import CommentInput from '@/components/vote-detail/Input/CommentInput';
import VoteTopSection from '@/components/vote-detail/Top/VoteTopSection/VoteTopSection';
import VoteSection from '@/components/vote-detail/Vote/VoteSection';

export default function VotePage() {
  const navigate = useNavigate();
  const { openDialog } = useDialog();
  const { data: myInfo } = useGetMyInfo();

  const handleClickUserButton = () => {
    if (!myInfo) {
      openDialog(<LoginDialog />);
      return;
    }

    if (myInfo && getRole() === 'GUEST') {
      openDialog(
        <GuestConfirmDialog title="게스트 계정은 뽀또본부로 이동할 수 없어요 😢" />,
      );
      return;
    }

    navigate(`/user/${myInfo?.id}`);
  };

  return (
    <div className="bg-gray-200 w-full h-screen flex itmes-center flex-col pt-[85px] relative">
      <Header
        leftNode={
          <Icon
            className="cursor-pointer"
            onClick={() => navigate(-1)}
            name="ArrowLeft"
            size="large"
          />
        }
        centerNode={
          <Logo
            style={{
              width: '70px',
            }}
          />
        }
        rightNode={
          <Icon
            className="cursor-pointer"
            onClick={handleClickUserButton}
            name="UserFill"
            size="large"
          />
        }
      />
      <div
        className="h-[calc(100dvh-180px)] overflow-y-auto mx-[15px] px-[10px] pt-[18px] pb-3 bg-gray-100 rounded-2xl shadow-[0px_2px_20px_0px_rgba(0,0,0,0.03),0px_20px_15px_0px_rgba(0,0,0,0.02),0px_8px_25px_0px_rgba(0,0,0,0.04)] 
        "
      >
        <VoteTopSection />
        <VoteSection />
        <CommentList />
      </div>
      <CommentInput />
    </div>
  );
}
