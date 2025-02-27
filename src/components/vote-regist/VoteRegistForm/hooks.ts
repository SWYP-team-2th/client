import useVoteRegist from '../Provider/hooks';
import usePostRegistVote from '@/api/usePostRegistVote';

export default function useVoteRegistForm() {
  const { isFormValid, state } = useVoteRegist();
  // TODO: 요청 성공 시 투표 상세로 보내는 로직 추가
  const { mutate: postRegistVote, isPending: isPostRegistVotePending } =
    usePostRegistVote();

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
