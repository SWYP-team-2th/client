import { PollRegistData } from './types';

export const INITIAL_POLL_REGIST_DATA: PollRegistData = {
  title: '',
  description: '',
  pollChoices: [],
  pollOptions: {
    pollType: 'SINGLE',
    commentActive: 'OPEN',
  },
  closeOptions: {
    closeType: 'SELF',
    closedAt: '',
    maxVoterCount: 0,
  },
};

export const MAX_POLL_TITLE_LENGTH = 50;
export const MAX_POLL_DESCRIPTION_LENGTH = 100;
export const MIN_POLL_CHOICE_COUNT = 2;
export const MAX_POLL_CHOICE_COUNT = 10;
export const MAX_VOTER_COUNT = 999;
