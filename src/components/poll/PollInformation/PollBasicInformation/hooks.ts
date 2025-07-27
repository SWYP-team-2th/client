import usePollForm from '@/components/poll/Provider/hooks';

export default function usePollBasicInformation() {
  const { data, setTitle, setDescription } = usePollForm();

  return {
    title: data.title,
    description: data.description,
    setTitle,
    setDescription,
  };
}
