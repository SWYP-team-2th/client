import { useRef } from 'react';
import useVoteRegist from '../../Provider/hooks';
import usePostUploadImage from '@/api/usePostUploadImage';

export default function useImageUploader() {
  const imageUploadButtonRef = useRef<HTMLInputElement | null>(null);
  const { state, handleImageSelect, setImageFileId } = useVoteRegist();
  const { mutate: postUploadImage } = usePostUploadImage({
    onSuccess: (data) => {
      setImageFileId(data.imageFileId);
    },
  });

  const files = state.images.value;

  const handleClickImageUploadButton = () => {
    imageUploadButtonRef.current?.click();
  };

  const handleChangeImageUploadButton = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const files = Array.from(e.target.files ?? []);
    handleImageSelect(files);

    if (files.length === 0) return;

    const formData = new FormData();
    files.forEach((file) => {
      formData.append('files', file);
    });

    postUploadImage(formData);

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
