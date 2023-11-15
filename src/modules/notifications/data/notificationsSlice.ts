import {PayloadAction, createSlice} from '@reduxjs/toolkit';
import {INotification} from '../types';
import {initialState} from './initialState';

export interface NotificationsState {
  notifications: Record<string, INotification>;
  newNotifications: Record<string, INotification>;
  newNotificationsCount: number;
}

export const notificationsSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    // NOTE: Redux Toolkit allows us to write "mutating" logic in reducers. It
    // doesn't actually mutate the state because it uses the Immer library,
    // which detects changes to a "draft state" and produces a brand new
    // immutable state based off those changes
    markAsRead: (state, action: PayloadAction<{id: string}>) => {
      state.notifications[action.payload.id].isRead = true;
    },
    addNotification: (
      state,
      action: PayloadAction<{notification: INotification}>,
    ) => {
      state.newNotifications[action.payload.notification.id] =
        action.payload.notification;
      state.newNotificationsCount += 1;
    },
    showNewNotifications: state => {
      state.notifications = {...state.notifications, ...state.newNotifications};
      state.newNotifications = {};
      state.newNotificationsCount = 0;
    },
  },
});

// NOTE: Action creators are generated for each case reducer function
export const {markAsRead, addNotification, showNewNotifications} =
  notificationsSlice.actions;

export default notificationsSlice.reducer;
