import CommentItem from '@/components/vote-detail/Comment/CommentItem';

export default function CommentList() {
  return (
    <div>
      <div className="text-title-large mt-lg pl-sm pb-[9px]">한마디 (3)</div>
      <hr className="text-gray-300 mb-[20px]" />
      <CommentItem />
    </div>
  );
}
