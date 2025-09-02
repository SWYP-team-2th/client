export interface AuthorType {
  userId: number;
  nickname: string;
  profileUrl: string;
}

export interface LikeType {
  commentLikeId: number | null;
  liked: boolean;
  likeCount: number;
}

export interface CommentType {
  id: number;
  content: string;
  edited: boolean;
  createdAt: string;
  author: AuthorType;
  like: LikeType;
}

export interface CommentsResponse {
  commentCount: number;
  comments: {
    data: CommentType[];
    nextCursor: number | null;
    hasNext: boolean;
  };
}
