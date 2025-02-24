import ImageUploader from './ImageUploader';
import PreviewImage from './PreviewImage';
import useVoteRegist from '../Provider/hooks';

export default function VoteImages() {
  const { state } = useVoteRegist();
  const files = state.images.value;

  return (
    <div className="flex gap-1">
      <ImageUploader />
      {files.map((imageFile) => (
        <PreviewImage
          key={imageFile.file.name}
          previewUrl={imageFile.previewUrl}
          name={imageFile.file.name}
        />
      ))}
    </div>
  );
}
