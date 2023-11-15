import React from 'react';
import {test, expect} from '@jest/globals';
import {renderWithProviders} from '../../../../common/utils/test-utils';
import NotificationsScreen from './NotificationsScreen';
import {screen} from '@testing-library/react-native';

test('renders correctly', async () => {
  renderWithProviders(<NotificationsScreen />);

  expect(screen.toJSON()).toMatchSnapshot();
});
