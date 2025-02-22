import User2Outline from '@/assets/icons/user2_outline_24px.svg?react';
export default function CommentItem() {
  return (
    <div className="flex mb-md">
      <div>
        <User2Outline />
      </div>
      <span className="ml-sm">닉네임</span>
    </div>
  );
}
