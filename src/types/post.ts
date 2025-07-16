export interface Author {
  id: number;
  nickname: string;
  profileUrl: string;
}

export interface PollChoice {
  id: number;
  title: string;
  imageUrl: string;
  voteId: number | null;
}

export interface PollOptions {
  pollType: 'SINGLE' | 'MULTIPLE';
  scope: 'PUBLIC' | 'PRIVATE';
  commentActive: 'OPEN' | 'CLOSED';
}

export interface CloseOptions {
  closeType: 'SELF' | 'DATE' | 'VOTER';
  closedAt: string | null;
  maxVoterCount: number | null;
}

export interface Post {
  id: number;
  title: string;
  description: string;
  author: Author;
  pollChoices: PollChoice[];
  shareUrl: string;
  isAuthor: boolean;
  status: 'PROGRESS' | 'CLOSED';
  pollOptions: PollOptions;
  closeOptions: CloseOptions;
  commentCount: number;
  voterCount: number;
  createdAt: string;
}
