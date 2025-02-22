import CommentSection from '@/components/vote-detail/Comment/CommentSection';
import CommentInput from '@/components/vote-detail/Input/CommentInput';
import VoteTopSection from '@/components/vote-detail/Top/VoteTopSection';
import VoteSection from '@/components/vote-detail/Vote/VoteSection';

export default function VotePage() {
  return (
    <div className="bg-gray-200 w-full h-screen flex itmes-center flex-col pt-[85px] relative">
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
  );
}
