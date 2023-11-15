import React from 'react';
import {jest, expect, test} from '@jest/globals';
import {fireEvent, screen} from '@testing-library/react-native';
import {renderWithProviders} from '../../../../common/utils/test-utils';
import ViewMoreOverlay from './ViewMoreOverlay';
import {NotificationsState} from '../../data/notificationsSlice';

test('renders correctly', async () => {
  renderWithProviders(<ViewMoreOverlay />, {
    preloadedState: {
      notifications: {newNotificationsCount: 10} as NotificationsState,
    },
  });

  expect(await screen.findByText('10 New Notifications')).toHaveTextContent(
    '10 New Notifications',
  );

  expect(screen.toJSON()).toMatchSnapshot();
});

test('calls onViewMorePress', async () => {
  const onPressMock = jest.fn();
  renderWithProviders(<ViewMoreOverlay onViewMorePress={onPressMock} />, {
    preloadedState: {
      notifications: {newNotificationsCount: 10} as NotificationsState,
    },
  });

  fireEvent.press(screen.getByText('10 New Notifications'));

  expect(onPressMock).toHaveBeenCalled();
});
