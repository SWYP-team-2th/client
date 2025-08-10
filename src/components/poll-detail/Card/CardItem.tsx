import CheckBox from '@/components/common/CheckBox';
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
        <Icon name="FullPhoto" size="small" className="cursor-pointer" />
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
          <div className="absolute top-2 left-2">
            <Label variant="solid" colorVarient="progress" size="medium">
              MY CHOOZ
            </Label>
          </div>
        )}
      </div>
    </div>
  );
}
