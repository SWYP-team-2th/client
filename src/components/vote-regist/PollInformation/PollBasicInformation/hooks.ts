import usePollRegist from '../../Provider/hooks';

export default function usePollBasicInformation() {
  const { data, setTitle, setDescription } = usePollRegist();

  return {
    title: data.title,
    description: data.description,
    setTitle,
    setDescription,
  };
}
