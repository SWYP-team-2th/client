import ImageUploader from './ImageUploader';
import PreviewImage from './PreviewImage';
import useVoteRegist from '../Provider/hooks';

export default function VoteImages() {
  const { state } = useVoteRegist();
  const files = state.images.value;

  return (
    <div className="flex gap-1 overflow-x-auto">
      <ImageUploader />
      {files.map((imageFile) => (
        <div key={imageFile.file.name} className="flex-shrink-0">
          <PreviewImage
            previewUrl={imageFile.previewUrl}
            name={imageFile.file.name}
          />
        </div>
      ))}
    </div>
  );
}
