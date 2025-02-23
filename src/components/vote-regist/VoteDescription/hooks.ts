import useVoteRegist from '../Provider/hooks';

export default function useVoteDescription() {
  const { state, setDescription } = useVoteRegist();

  console.log(state);

  const description = state.description.value;

  return {
    description,
    setDescription,
  };
}
