import React from 'react';
import {expect, test} from '@jest/globals';
import {screen} from '@testing-library/react-native';
import NotificationItem from './NotificationItem';
import {renderWithProviders} from '../../../../common/utils/test-utils';

test('renders correctly', async () => {
  renderWithProviders(
    <NotificationItem
      id="n0"
      action="mention"
      createdAt={Date.UTC(2023, 0, 1, 0).valueOf()}
      channel={{
        name: 'Client',
        id: 'ch123',
      }}
      community={{
        name: 'Root',
        id: 'c123',
      }}
      isRead={false}
      timeago="about 1 minute ago"
      user={{
        name: 'Vinny',
        id: 'u123',
      }}
    />,
  );

  expect(screen.toJSON()).toMatchSnapshot();
});

test('does not render button if already read', async () => {
  renderWithProviders(
    <NotificationItem
      id="n0"
      action="mention"
      createdAt={Date.UTC(2023, 0, 1, 0).valueOf()}
      channel={{
        name: 'Client',
        id: 'ch123',
      }}
      community={{
        name: 'Root',
        id: 'c123',
      }}
      isRead={true}
      timeago="about 1 minute ago"
      user={{
        name: 'Vinny',
        id: 'u123',
      }}
    />,
  );

  expect(screen.toJSON()).toMatchSnapshot();
});
