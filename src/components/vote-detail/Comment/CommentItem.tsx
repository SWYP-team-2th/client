import Icon from '@/components/common/Icon';

export default function CommentItem() {
  return (
    <div className="flex flex-col mb-md ml-sm">
      <div className="flex">
        <div>
          <Icon name="HeartOutline" size="small" />
        </div>
        <span className="ml-sm text-title-small">닉네임</span>
      </div>
      <div className="px-10 mt-1 break-words text-body-1-normal">
        asdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasda
      </div>
    </div>
  );
}
