export interface TargetType {
  type: 'POST' | 'COMMENT';
  id: number;
}

export interface NotificationType {
  id: number;
  notificationType:
    | 'POST_CLOSED'
    | 'MY_POST_CLOSED'
    | 'COMMENT_LIKED'
    | 'POST_VOTED';

  profileUrl: string;
  title: string;
  content: string;
  imageUrl: string;
  targets: TargetType[];
  isValid: boolean;
  isRead: boolean;
  eventAt: string;
}

export interface NotificationResponse {
  nextCursor: number;
  hasNext: boolean;
  data: NotificationType[];
}
