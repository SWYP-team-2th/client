import { useNavigate } from 'react-router-dom';
import useVoteRegist from '../Provider/hooks';
import usePostRegistVote from '@/api/usePostRegistVote';

export default function useVoteRegistForm() {
  const { isFormValid, state } = useVoteRegist();
  const navigate = useNavigate();

  const { mutate: postRegistVote, isPending: isPostRegistVotePending } =
    usePostRegistVote({
      onSuccess: (data) => {
        navigate(`/votes/${data.shareUrl}`);
      },
    });

  const handleClickVoteRegistButton = () => {
    postRegistVote({
      description: state.description.value ?? '',
      images: state.imageFileId.value,
    });
  };

  return {
    isFormValid,
    handleClickVoteRegistButton,
    isPostRegistVotePending,
  };
}
