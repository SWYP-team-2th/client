import { useRef } from 'react';
import useVoteRegist from '../../Provider/hooks';

export default function useImageUploader() {
  const imageUploadButtonRef = useRef<HTMLInputElement | null>(null);
  const { state, handleImageSelect } = useVoteRegist();

  const files = state.images.value;

  const handleClickImageUploadButton = () => {
    imageUploadButtonRef.current?.click();
  };

  const handleChangeImageUploadButton = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const files = Array.from(e.target.files ?? []);
    handleImageSelect(files);

    if (imageUploadButtonRef.current) {
      imageUploadButtonRef.current.value = '';
    }
  };

  return {
    imageUploadButtonRef,
    files,
    handleClickImageUploadButton,
    handleChangeImageUploadButton,
  };
}
