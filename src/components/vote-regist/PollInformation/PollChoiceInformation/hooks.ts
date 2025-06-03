import { MAX_POLL_CHOICE_COUNT } from '@/components/vote-regist/Provider/constants';
import usePollRegist from '@/components/vote-regist/Provider/hooks';

export default function usePollChoiceInformation() {
  const { data, addPollChoice } = usePollRegist();

  const isPollChoiceFull = data.pollChoices.length >= MAX_POLL_CHOICE_COUNT;

  return {
    data,
    addPollChoice,
    isPollChoiceFull,
  };
}
