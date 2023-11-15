import {beforeAll, jest, expect, test} from '@jest/globals';
import convertStateToSections from './convertStateToSections';
import {INotification} from '../types';

const mockNotifications = {
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
    action: 'mention',
    createdAt: Date.UTC(2023, 0, 2, 0).valueOf(),
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
    action: 'friend_request_declined',
    createdAt: Date.UTC(2023, 0, 2, 1).valueOf(),
    isRead: false,
    user: {
      name: 'Mark',
      id: 'u123',
    },
  },
  n4: {
    id: 'n4',
    action: 'friend_request_accepted',
    createdAt: Date.UTC(2023, 0, 3, 1).valueOf(),
    isRead: false,
    user: {
      name: 'Jesse',
      id: 'u123',
    },
  },
  n5: {
    id: 'n5',
    action: 'friend_request',
    createdAt: Date.UTC(2023, 0, 3, 2).valueOf(),
    isRead: false,
    user: {
      name: 'Vinny',
      id: 'u123',
    },
  },
  n6: {
    id: 'n6',
    action: 'friend_request',
    createdAt: Date.UTC(2023, 0, 3, 3).valueOf(),
    isRead: false,
    user: {
      name: 'Vinny',
      id: 'u123',
    },
  },
} as Record<string, INotification>;

beforeAll(() => {
  Date.now = jest.fn(() => new Date(2023, 0, 3).valueOf());
});

test('converts notifications state to notification sections by date', () => {
  const result = convertStateToSections(mockNotifications);
  expect(result).toEqual([
    {
      title: 'today',
      data: [mockNotifications.n6, mockNotifications.n5, mockNotifications.n4],
    },
    {
      title: 'yesterday',
      data: [mockNotifications.n3, mockNotifications.n2],
    },
    {
      title: '1/1/2023',
      data: [mockNotifications.n1, mockNotifications.n0],
    },
  ]);
});
