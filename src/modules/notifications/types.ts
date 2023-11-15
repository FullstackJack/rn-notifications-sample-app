export type NotificationActionType =
  | 'community_invite'
  | 'friend_request'
  | 'friend_request_accepted'
  | 'friend_request_declined'
  | 'mention';

export type INotification = {
  action: NotificationActionType;
  channel?: {
    id: string;
    name: string;
  };
  community?: {
    id: string;
    name: string;
  };
  createdAt: number;
  id: string;
  isRead: boolean;
  user: {
    id: string;
    name: string;
  };
};
