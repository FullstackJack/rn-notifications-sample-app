import React from 'react';
import {expect, test} from '@jest/globals';
import {screen} from '@testing-library/react-native';
import NotificationItem from './NotificationText';
import {renderWithProviders} from '../../../../common/utils/test-utils';

test('renders correctly', async () => {
  renderWithProviders(
    <NotificationItem
      action="mention"
      channel={{
        name: 'Client',
        id: 'ch123',
      }}
      community={{
        name: 'Root',
        id: 'c123',
      }}
      user={{
        name: 'Vinny',
        id: 'u123',
      }}
    />,
  );

  expect(screen.toJSON()).toMatchSnapshot();
});
