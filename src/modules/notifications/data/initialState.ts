import {NotificationsState} from './notificationsSlice';
import {
  ACTION_FRIEND_REQUEST,
  ACTION_FRIEND_REQUEST_ACCEPTED,
  ACTION_FRIEND_REQUEST_DECLINED,
  ACTION_MENTION,
} from './constants';

export const initialState: NotificationsState = {
  newNotifications: {},
  newNotificationsCount: 0,
  notifications: {
    n0: {
      id: 'n0',
      action: ACTION_MENTION,
      createdAt: 1699873010725,
      channel: {
        name: 'Client',
        id: 'ch123',
      },
      community: {
        name: 'Root',
        id: 'c123',
      },
      isRead: false,
      user: {
        name: 'Vinny',
        id: 'u123',
      },
    },
    n1: {
      id: 'n1',
      action: ACTION_MENTION,
      createdAt: 1699873227983,
      channel: {
        name: 'General',
        id: 'ch123',
      },
      community: {
        name: 'Root',
        id: 'c123',
      },
      isRead: false,
      user: {
        name: 'Jesse',
        id: 'u123',
      },
    },
    n2: {
      id: 'n2',
      action: ACTION_MENTION,
      createdAt: 1699860432773,
      channel: {
        name: 'Infrastructure',
        id: 'ch123',
      },
      community: {
        name: 'Root',
        id: 'c123',
      },
      isRead: false,
      user: {
        name: 'Vinny',
        id: 'u123',
      },
    },
    n3: {
      id: 'n3',
      action: ACTION_FRIEND_REQUEST_DECLINED,
      createdAt: 1699860432773,
      isRead: false,
      user: {
        name: 'Mark',
        id: 'u123',
      },
    },
    n4: {
      id: 'n4',
      action: ACTION_FRIEND_REQUEST_ACCEPTED,
      createdAt: 1699860432773,
      isRead: false,
      user: {
        name: 'Jesse',
        id: 'u123',
      },
    },
    n5: {
      id: 'n5',
      action: ACTION_FRIEND_REQUEST,
      createdAt: 1699801790151,
      isRead: false,
      user: {
        name: 'Vinny',
        id: 'u123',
      },
    },
    n6: {
      id: 'n6',
      action: ACTION_FRIEND_REQUEST,
      createdAt: 1699951353176,
      isRead: false,
      user: {
        name: 'Matt',
        id: 'u123',
      },
    },
  },
};
