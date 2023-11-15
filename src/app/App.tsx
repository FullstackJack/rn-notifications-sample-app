/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {MessagesScreen} from '../modules/messages/screens';
import {NotificationsScreen} from '../modules/notifications/screens';
import {Provider} from 'react-redux';
import {store} from './data/store';
import MockNotificationSystem from '../modules/notifications/data/MockNotificationSystem';
import {CustomTheme} from './data/constants';

const Tab = createBottomTabNavigator();

function App(): JSX.Element {
  return (
    <Provider store={store}>
      <MockNotificationSystem />
      <NavigationContainer theme={CustomTheme}>
        <Tab.Navigator>
          <Tab.Screen name="Messages" component={MessagesScreen} />
          <Tab.Screen
            name="Notifications"
            component={NotificationsScreen}
            options={{unmountOnBlur: true}}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

export default App;
