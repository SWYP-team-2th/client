import useVoteRegist from '../../Provider/hooks';
import Icon from '@/components/common/Icon';

interface PreviewImageProps {
  previewUrl: string;
  name: string;
}

export default function PreviewImage({ previewUrl, name }: PreviewImageProps) {
  const { removeImage } = useVoteRegist();

  return (
    <div className="relative">
      <img
        src={previewUrl}
        alt="preview"
        className="h-[104px] w-[104px] rounded-xl"
      />
      <button
        onClick={() => removeImage(name)}
        className="absolute -top-1 cursor-pointer right-0 rounded-[50%] border-gray-500 border-[0.5px] bg-gray-100 w-[24px] h-[24px] flex items-center justify-center"
      >
        <Icon name="Cross" size="small" />
      </button>
    </div>
  );
}
