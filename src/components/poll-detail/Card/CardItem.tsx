import { useParams } from 'react-router-dom';
import ImageDetailModal from '../ImageDetailModal';
import CheckBox from '@/components/common/CheckBox';
import { useDialog } from '@/components/common/Dialog/hooks';
import Icon from '@/components/common/Icon';
import { Label } from '@/components/common/Label/Label';
import { PollChoice } from '@/types/post';

export default function CardItem({
  choice,
  checked,
  onChange,
  isVoted,
}: {
  choice: PollChoice;
  checked: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isVoted: boolean;
}) {
  const { postId } = useParams<{ postId: string }>();
  const { openDialog } = useDialog();

  return (
    <div key={choice.id} className="rounded-xl w-50">
      <div className="flex items-center justify-between w-full">
        {!isVoted ? (
          <CheckBox
            id={String(choice.id)}
            checked={checked}
            onChange={onChange}
            size="large"
            label={choice.title}
          />
        ) : (
          <span className="text-body-1">{choice.title}</span>
        )}
        <Icon
          name="FullPhoto"
          size="small"
          className="cursor-pointer text-gray-600"
          onClick={() =>
            openDialog(
              <ImageDetailModal
                postId={postId ?? ''}
                selectedImageId={choice.id}
              />,
            )
          }
        />
      </div>
      <div className="w-50 h-50 relative">
        <img
          src={choice.imageUrl}
          alt={choice.title}
          className="w-full h-full object-cover rounded-lg mt-2"
        />
        {checked && (
          <div className="pointer-events-none absolute top-0 left-0 w-full h-full rounded-lg border-3 border-primary-500"></div>
        )}
        {isVoted && checked && (
          <div className="absolute top-[10px] left-[10px]">
            <Label variant="solid" colorVarient="progress" size="medium">
              MY CHOOZ
            </Label>
          </div>
        )}
      </div>
    </div>
  );
}
