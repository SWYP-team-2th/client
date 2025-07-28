import { v4 as uuidv4 } from 'uuid';
import { PollFormData } from './types';

export const IMAGE_TITLE_PLACEHOLDER = {
  0: '츄즈 A',
  1: '츄즈 B',
  2: '츄즈 C',
  3: '츄즈 D',
  4: '츄즈 E',
  5: '츄즈 F',
  6: '츄즈 G',
  7: '츄즈 H',
  8: '츄즈 I',
  9: '츄즈 J',
};

export const INITIAL_POLL_REGIST_DATA: PollFormData = {
  title: '',
  description: '',
  pollChoices: [
    {
      id: uuidv4(),
      title: IMAGE_TITLE_PLACEHOLDER[0],
      imageUrl: '',
      order: 0,
    },
    {
      id: uuidv4(),
      title: IMAGE_TITLE_PLACEHOLDER[1],
      imageUrl: '',
      order: 1,
    },
  ],
  pollOption: {
    scope: 'PUBLIC',
    pollType: 'SINGLE',
    commentActive: 'OPEN',
  },
  closeOption: {
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
