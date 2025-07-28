export interface AuthorType {
  id: number;
  nickname: string;
  profileUrl: string;
}

export interface FeedType {
  id: number;
  author: AuthorType;
  status: 'PROGRESS' | 'CLOSED';
  title: string;
  thumbnailUrl: string;

  voterCount: number;

  createdAt: string;
  isAuthor: boolean;
  commentCount: number;
}
