export interface UserPost {
  id: number;
  title: string;
  thumbnailImageUrl: string;
  status: 'PROGRESS' | 'CLOSED';
  closeOptionDto: {
    closeType: 'SELF' | 'DATE' | 'VOTER';
    closedAt: string | null;
    maxVoterCount: number | null;
  };
  postVoteInfo: PostVoteInfo;
  createdAt: string;
}

export interface PostVoteInfo {
  totalVoterCount: number;
  mostVotedPollChoice: MostVotedPollChoice;
}

export interface MostVotedPollChoice {
  id: number;
  title: string;
  voterCount: number;
  voteRatio: string;
}
