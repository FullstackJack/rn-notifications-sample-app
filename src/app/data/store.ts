import {
  PreloadedState,
  combineReducers,
  configureStore,
} from '@reduxjs/toolkit';
import {notificationsReducer} from '../../modules/notifications/data/notificationsSlice';

// Create the root reducer independently to obtain the RootState type
const rootReducer = combineReducers({
  notifications: notificationsReducer,
});

export const store = configureStore({
  reducer: rootReducer,
});

export function setupStore(preloadedState?: PreloadedState<RootState>) {
  return configureStore({
    reducer: {notifications: notificationsReducer},
    preloadedState,
  });
}

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
// Inferred type: {notifications: NotificationsState, ...}
export type AppDispatch = typeof store.dispatch;
