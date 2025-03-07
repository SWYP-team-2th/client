import { useNavigate } from 'react-router-dom';
import useVoteRegist from '../Provider/hooks';
import usePostRegistVote from '@/api/usePostRegistVote';
import usePostUploadImage from '@/api/usePostUploadImage';

export default function useVoteRegistForm() {
  const { isFormValid, state } = useVoteRegist();
  const navigate = useNavigate();

  const { mutate: postRegistVote, isPending: isPostRegistVotePending } =
    usePostRegistVote({
      onSuccess: (data) => {
        navigate(`/votes/${data.shareUrl}`);
      },
    });

  const { mutate: postUploadImage, isPending: isImageUploading } =
    usePostUploadImage({
      onSuccess: (data) => {
        const imageIds = Array.isArray(data.imageFileId)
          ? data.imageFileId
          : [data.imageFileId];
        const formattedImageIds = imageIds.map((id) => ({ imageFileId: id }));

        postRegistVote({
          description: state.description.value ?? '',
          images: formattedImageIds,
          voteType: state.voteType.value,
          scope: state.scope.value,
        });
      },
    });

  const handleClickVoteRegistButton = () => {
    const formData = new FormData();
    state.images.value.forEach((imageFile) => {
      formData.append('files', imageFile.file);
    });

    postUploadImage(formData);
  };

  return {
    isFormValid,
    handleClickVoteRegistButton,
    isPostRegistVotePending: isPostRegistVotePending || isImageUploading,
  };
}
