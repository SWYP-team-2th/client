import { useMotionValue, useAnimation } from 'framer-motion';
import { useDragControls } from 'motion/react';
import { useEffect, useRef, useState } from 'react';
import { useUploadImage } from '@/api/usePostUploadImageV2';
import useToast from '@/components/common/Toast/hooks';
import usePollForm from '@/components/poll/Provider/hooks';

export default function usePollChoice(id: string) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const dragControls = useDragControls();
  const toast = useToast();
  const { setPollChoiceTitle, deletePollChoice, addPollChoiceImages } =
    usePollForm();
  const { uploadImage, isUploading } = useUploadImage();

  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  const handleClickImageButton = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (files: File[]) => {
    if (files.length === 0) return;

    try {
      const uploadPromises = files.map((file) => uploadImage(file));
      const assetUrls = await Promise.all(uploadPromises);
      addPollChoiceImages(id, assetUrls, files);
    } catch {
      toast.error({
        title: '이미지 업로드에 실패했습니다.',
        description: '다시 시도해주세요.',
      });
    }
  };

  const x = useMotionValue(0);
  const controls = useAnimation();

  useEffect(() => {
    const unsubscribe = x.on('change', (latest) => {
      if (latest <= -80) {
        setIsDeleteOpen(true);
      } else {
        setIsDeleteOpen(false);
      }
    });
    return () => unsubscribe();
  }, [x]);

  const handleDelete = () => {
    setIsDeleteOpen(false);
    deletePollChoice(id);
  };

  return {
    dragControls,
    setPollChoiceTitle,
    addPollChoiceImages,
    fileInputRef,
    handleClickImageButton,
    handleFileChange,
    handleDelete,
    x,
    controls,
    isDeleteOpen,
    setIsDeleteOpen,
    isUploading,
  };
}
