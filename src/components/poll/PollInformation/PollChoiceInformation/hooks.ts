import { MAX_POLL_CHOICE_COUNT } from '@/components/poll/Provider/constants';
import usePollForm from '@/components/poll/Provider/hooks';

export default function usePollChoiceInformation() {
  const { data, addPollChoice, setPollChoicesOrder } = usePollForm();

  const isPollChoiceFull = data.pollChoices.length >= MAX_POLL_CHOICE_COUNT;

  return {
    pollChoices: data.pollChoices,
    addPollChoice,
    setPollChoicesOrder,
    isPollChoiceFull,
  };
}
