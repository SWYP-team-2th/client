export interface PollRegistData {
  title: string;
  description: string;
  pollChoices: PollChoice[];
  pollOptions: PollOption;
  closeOptions: CloseOption;
}

export interface PollChoice {
  title: string;
  imageUrl: string;
  order: number;
}

export interface PollOption {
  pollType: 'SINGLE' | 'MULTIPLE';
  commentActive: 'OPEN' | 'CLOSED';
}

export interface CloseOption {
  closeType: 'SELF' | 'TIME' | 'VOTER_COUNT';
  closedAt: string;
  maxVoterCount: number;
}

export interface PollRegistState {
  data: PollRegistData;
  errors: Record<keyof PollRegistData, string | null>;
}
