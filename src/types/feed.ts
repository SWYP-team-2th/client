export interface ImageType {
  id: number;
  imageName: string;
  imageUrl: string;
  thumbnailUrl?: string;
  voteId?: number | null;
}

export interface AuthorType {
  id: number;
  nickname: string;
  profileUrl: string;
}

export interface FeedType {
  id: number;
  author: AuthorType;
  images: ImageType[];
  status: 'PROGRESS' | 'CLOSED';
  description: string;
  shareUrl: string;
  isAuthor: boolean;
  participantCount: number;
  commentCount: number;
}
