import Logo from '@/assets/icons/logo.svg?react';
import { Header } from '@/components/common/Header/Header';
import Icon from '@/components/common/Icon';
import CommentSection from '@/components/vote-detail/Comment/CommentSection/CommentSection';

import CommentInput from '@/components/vote-detail/Input/CommentInput';
import { ShareUrlProvider } from '@/components/vote-detail/ShareUrlProvider';
import VoteTopSection from '@/components/vote-detail/Top/VoteTopSection/VoteTopSection';
import VoteSection from '@/components/vote-detail/Vote/VoteSection';
import { useParams } from 'react-router-dom';

export default function VotePage() {
  const { shareUrl } = useParams<{ shareUrl: string }>();

  if (!shareUrl) {
    return <span>404 처리하면 되나</span>;
  }

  return (
    <ShareUrlProvider shareUrl={shareUrl}>
      <div className="bg-gray-200 w-full h-screen flex itmes-center flex-col pt-[85px] relative">
        <Header
          leftNode={<Icon name="ArrowLeft" size="large" />}
          centerNode={
            <Logo
              style={{
                width: '70px',
              }}
            />
          }
          rightNode={<Icon name="UserFill" size="large" />}
        />
        <div
          className="mx-[15px] px-[10px] pt-[18px] pb-1 bg-gray-100 rounded-2xl shadow-[0px_2px_20px_0px_rgba(0,0,0,0.03),0px_20px_15px_0px_rgba(0,0,0,0.02),0px_8px_25px_0px_rgba(0,0,0,0.04)] 
        "
        >
          <VoteTopSection />
          <VoteSection />
          <CommentSection />
        </div>
        <CommentInput />
      </div>
    </ShareUrlProvider>
  );
}
