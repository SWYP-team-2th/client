import useGetMyInfo from '@/api/useGetMyInfo';
import { MAX_POLL_CHOICE_COUNT } from '@/components/poll/Provider/constants';
import usePollForm from '@/components/poll/Provider/hooks';

export default function usePollChoiceInformation() {
  const { data, addPollChoice, setPollChoicesOrder } = usePollForm();

  const isPollChoiceFull = data.pollChoices.length >= MAX_POLL_CHOICE_COUNT;

  const { data: myInfo } = useGetMyInfo();
  const isFirstVote = myInfo?.onboardingStep.FIRST_VOTE;

  return {
    pollChoices: data.pollChoices,
    addPollChoice,
    setPollChoicesOrder,
    isPollChoiceFull,
    isFirstVote,
  };
}
