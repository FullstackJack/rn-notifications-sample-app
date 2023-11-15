import {expect, test} from '@jest/globals';
import reducer, {
  NotificationsState,
  addNotification,
  markAsRead,
  showNewNotifications,
} from './notificationsSlice';
import {initialState} from '../initialState';

test('should return the initial state', () => {
  expect(reducer(undefined, {type: undefined})).toEqual(initialState);
});

test('should mark a notification as read', () => {
  const previousState = {
    notifications: {
      n0: {
        id: 'n0',
        action: 'mention',
        createdAt: Date.UTC(2023, 0, 1, 0).valueOf(),
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
        action: 'mention',
        createdAt: Date.UTC(2023, 0, 1, 1).valueOf(),
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
    },
    newNotifications: {},
    newNotificationsCount: 0,
  } as NotificationsState;

  expect(
    reducer(
      previousState,
      markAsRead({
        id: 'n1',
      }),
    ),
  ).toEqual({
    notifications: {
      n0: {
        id: 'n0',
        action: 'mention',
        createdAt: Date.UTC(2023, 0, 1, 0).valueOf(),
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
        action: 'mention',
        createdAt: Date.UTC(2023, 0, 1, 1).valueOf(),
        channel: {
          name: 'Client',
          id: 'ch123',
        },
        community: {
          name: 'Root',
          id: 'c123',
        },
        isRead: true,
        user: {
          name: 'Vinny',
          id: 'u123',
        },
      },
    },
    newNotifications: {},
    newNotificationsCount: 0,
  });
});

test('should add new notifications and count them up', () => {
  const previousState = {
    notifications: {
      n0: {
        id: 'n0',
        action: 'mention',
        createdAt: Date.UTC(2023, 0, 1, 0).valueOf(),
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
    },
    newNotifications: {},
    newNotificationsCount: 0,
  } as NotificationsState;

  expect(
    reducer(
      previousState,
      addNotification({
        notification: {
          id: 'n1',
          action: 'mention',
          createdAt: Date.UTC(2023, 0, 1, 1).valueOf(),
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
      }),
    ),
  ).toEqual({
    notifications: {
      n0: {
        id: 'n0',
        action: 'mention',
        createdAt: Date.UTC(2023, 0, 1, 0).valueOf(),
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
    },
    newNotifications: {
      n1: {
        id: 'n1',
        action: 'mention',
        createdAt: Date.UTC(2023, 0, 1, 1).valueOf(),
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
    },
    newNotificationsCount: 1,
  });
});

test('should merge new notifications with old notifications', () => {
  const previousState = {
    notifications: {
      n0: {
        id: 'n0',
        action: 'mention',
        createdAt: Date.UTC(2023, 0, 1, 0).valueOf(),
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
    },
    newNotifications: {
      n1: {
        id: 'n1',
        action: 'mention',
        createdAt: Date.UTC(2023, 0, 1, 1).valueOf(),
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
    },
    newNotificationsCount: 1,
  } as NotificationsState;

  expect(reducer(previousState, showNewNotifications())).toEqual({
    notifications: {
      n0: {
        id: 'n0',
        action: 'mention',
        createdAt: Date.UTC(2023, 0, 1, 0).valueOf(),
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
        action: 'mention',
        createdAt: Date.UTC(2023, 0, 1, 1).valueOf(),
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
    },
    newNotifications: {},
    newNotificationsCount: 0,
  });
});
