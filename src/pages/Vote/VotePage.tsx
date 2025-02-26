import { useNavigate } from 'react-router-dom';
import Logo from '@/assets/icons/logo.svg?react';
import { Header } from '@/components/common/Header/Header';
import Icon from '@/components/common/Icon';
import CommentSection from '@/components/vote-detail/Comment/CommentSection/CommentSection';
import CommentInput from '@/components/vote-detail/Input/CommentInput';
import VoteTopSection from '@/components/vote-detail/Top/VoteTopSection/VoteTopSection';
import VoteSection from '@/components/vote-detail/Vote/VoteSection';

export default function VotePage() {
  const navigate = useNavigate();

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
          <Icon className="cursor-pointer" name="UserFill" size="large" />
        }
      />
      <div
        className="mx-[15px] px-[10px] pt-[18px] pb-3 bg-gray-100 rounded-2xl shadow-[0px_2px_20px_0px_rgba(0,0,0,0.03),0px_20px_15px_0px_rgba(0,0,0,0.02),0px_8px_25px_0px_rgba(0,0,0,0.04)] 
        "
      >
        <VoteTopSection />
        <VoteSection />
        <CommentSection />
      </div>
      <CommentInput />
    </div>
  );
}
