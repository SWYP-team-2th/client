import { useQueryClient } from '@tanstack/react-query';
import { useEffect, useRef, useState } from 'react';
import useGetMyInfo from '@/api/useGetMyInfo';
import { useUploadImage } from '@/api/usePostUploadImageV2';
import usePutMyInfo, { PutMyInfoRequest } from '@/api/usePutMyInfo';
import useToast from '@/components/common/Toast/hooks';

export default function useProfileEditForm() {
  const toast = useToast();
  const queryClient = useQueryClient();

  const { data: myInfo } = useGetMyInfo();
  const { mutate: putMyInfo, isPending: isPendingMyInfo } = usePutMyInfo({
    onSuccess: () => {
      toast.success({
        title: '프로필 수정에 성공하였습니다.',
      });
      queryClient.invalidateQueries({ queryKey: ['my-info'] });
    },
  });
  const { uploadImage, isUploading } = useUploadImage();

  const fileInputRef = useRef<HTMLInputElement>(null);

  const [profile, setProfile] = useState<PutMyInfoRequest>({
    nickname: '',
    profileImageUrl: '',
  });

  useEffect(() => {
    setProfile({
      nickname: myInfo?.nickname ?? '',
      profileImageUrl: myInfo?.profileImageUrl ?? '',
    });
  }, [myInfo]);

  const handleUploadImage = async (file: File) => {
    try {
      const assetUrl = await uploadImage(file);
      setProfile({ ...profile, profileImageUrl: assetUrl });
    } catch {
      toast.error({
        title: '이미지 업로드에 실패했습니다.',
        description: '다시 시도해주세요.',
      });
    }
  };

  const getIsButtonDisabled = () => {
    if (isPendingMyInfo) {
      return true;
    }

    if (
      profile.nickname === myInfo?.nickname &&
      profile.profileImageUrl === myInfo?.profileImageUrl
    ) {
      return true;
    }

    if (profile.nickname === '') {
      return true;
    }

    return false;
  };

  return {
    profile,
    setProfile,
    fileInputRef,
    isUploading,
    handleUploadImage,
    putMyInfo,
    isPendingMyInfo,
    isButtonDisabled: getIsButtonDisabled(),
  };
}
