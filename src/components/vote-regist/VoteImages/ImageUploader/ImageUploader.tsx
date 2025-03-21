import useImageUploader from './hooks';
import { MAX_IMAGE_COUNT } from '../../constants';
import Icon from '@/components/common/Icon';

export default function ImageUploader() {
  const {
    imageUploadButtonRef,
    files,
    handleClickImageUploadButton,
    handleChangeImageUploadButton,
  } = useImageUploader();

  return (
    <div onClick={handleClickImageUploadButton}>
      <div className="rounded-xl bg-gray-300 w-[104px] h-[104px] flex flex-col items-center justify-center text-gray-600 text-label-x-small-1 gap-1">
        <Icon name="PhotoPlusWhite" size="small" />
        <p>
          {!files.length
            ? `(최대 ${MAX_IMAGE_COUNT}장)`
            : `(${files.length}/${MAX_IMAGE_COUNT})`}
        </p>
      </div>
      <input
        type="file"
        accept="image/*"
        multiple
        className="hidden"
        ref={imageUploadButtonRef}
        onChange={handleChangeImageUploadButton}
      />
    </div>
  );
}
