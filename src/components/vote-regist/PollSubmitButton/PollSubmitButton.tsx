import { useNavigate } from 'react-router-dom';
import usePollRegist from '../Provider/hooks';
import usePostRegistVote from '@/api/usePostRegistVote';
import usePostUploadImage from '@/api/usePostUploadImage';
import { Button } from '@/components/common/Button/Button';
import Loading from '@/components/common/Loading';
import useToast from '@/components/common/Toast/hooks';

export default function PollSubmitButton() {
  const navigate = useNavigate();
  const toast = useToast();
  const { isValid, data: pollData } = usePollRegist();
  const { mutate: registVote, isPending: isRegistVotePending } =
    usePostRegistVote({
      onSuccess: (data) => {
        navigate(`/vote/${data.shareUrl}`);
      },
      onError: () => {
        toast.error({
          title: '투표 올리기에 실패했습니다.',
          description: '다시 시도해주세요.',
        });
      },
    });

  const { mutate: uploadImage, isPending: isImageUploadPending } =
    usePostUploadImage({
      onSuccess: (data) => {
        const imageIds = Array.isArray(data.imageFileId)
          ? data.imageFileId
          : [data.imageFileId];
        const formattedImageIds = imageIds.map((id) => ({ imageFileId: id }));

        registVote({
          title: pollData.title,
          description: pollData.description,
          pollChoices: pollData.pollChoices.map((choice, index) => ({
            id: choice.id,
            title: choice.title,
            imageUrl: choice.imageUrl,
            order: choice.order,
            imageFileId: formattedImageIds[index]?.imageFileId,
          })),
          pollOptions: pollData.pollOptions,
          closeOptions: pollData.closeOptions,
        });
      },
    });

  const isPending = isImageUploadPending || isRegistVotePending;

  const handleClickSubmitButton = () => {
    if (isValid) {
      const files = pollData.pollChoices
        .map((choice) => choice.file)
        .filter((file): file is File => file !== undefined);

      // FormData 생성
      const formData = new FormData();
      files.forEach((file, index) => {
        formData.append('images', file, `image-${index}.jpg`);
      });

      uploadImage(formData);
    }
  };

  return (
    <Button
      type="submit"
      size="large"
      className="fixed bottom-8 left-[50%] translate-x-[-50%] w-[calc(100%-48px)]"
      buttonType={isValid ? 'primary' : 'disabled'}
      variant="solid"
      disabled={isPending || !isValid}
      onClick={handleClickSubmitButton}
    >
      {isPending ? <Loading /> : '투표 올리기'}
    </Button>
  );
}
