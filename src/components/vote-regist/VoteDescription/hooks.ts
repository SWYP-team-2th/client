import useVoteRegist from '../Provider/hooks';

export default function useVoteDescription() {
  const { state, setDescription } = useVoteRegist();

  const description = state.description.value;

  return {
    description,
    setDescription,
  };
}
