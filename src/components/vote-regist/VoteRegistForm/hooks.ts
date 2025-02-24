import useVoteRegist from '../Provider/hooks';

export default function useVoteRegistForm() {
  const { isFormValid } = useVoteRegist();

  const handleClickVoteRegistButton = () => {};

  return {
    isFormValid,
    handleClickVoteRegistButton,
  };
}
