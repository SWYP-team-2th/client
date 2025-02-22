import { Header } from '@/components/common/Header/Header';
import CommentSection from '@/components/vote-detail/Comment/CommentSection';
import CommentInput from '@/components/vote-detail/Input/CommentInput';
import VoteTopSection from '@/components/vote-detail/Top/VoteTopSection';
import VoteSection from '@/components/vote-detail/Vote/VoteSection';

export default function VotePage() {
  return (
    <div className="bg-gray-200 w-full h-screen flex itmes-center flex-col pt-[95px]">
      <Header
        leftNode={<div>좌측이요</div>}
        centerNode={<div>중간이요</div>}
        rightNode={<div>우측이요</div>}
      />
      <div className="mx-[15px] px-[10px] pt-[18px] pb-lg bg-gray-100">
        <VoteTopSection />
        <VoteSection />
        <CommentSection />
      </div>

      <CommentInput />
    </div>
  );
}
