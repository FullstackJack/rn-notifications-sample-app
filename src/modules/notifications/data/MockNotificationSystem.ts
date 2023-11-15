import {useEffect, useRef} from 'react';
import {useDispatch} from 'react-redux';
import {addNotification} from './notificationsSlice';
import {faker} from '@faker-js/faker';
import {v4 as uuidv4} from 'uuid';
import {
  ACTION_COMMUNITY_INVITE,
  ACTION_FRIEND_REQUEST,
  ACTION_FRIEND_REQUEST_ACCEPTED,
  ACTION_FRIEND_REQUEST_DECLINED,
  ACTION_MENTION,
  NOTIFICAION_INTERVAL,
} from './constants';

export default function MockNotificationSystem() {
  const dispatch = useDispatch();
  const intervalRef = useRef<NodeJS.Timeout | undefined>();

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      dispatch(
        addNotification({
          notification: {
            id: uuidv4(),
            user: {
              name: faker.person.firstName(),
              id: uuidv4(),
            },
            createdAt: Date.now() - new Date().getTimezoneOffset() * 60000,
            isRead: false,
            action: faker.helpers.arrayElement([
              ACTION_COMMUNITY_INVITE,
              ACTION_MENTION,
              ACTION_FRIEND_REQUEST,
              ACTION_FRIEND_REQUEST_ACCEPTED,
              ACTION_FRIEND_REQUEST_DECLINED,
            ]),
            community: {
              id: '0d568bc4-057c-4bea-9746-dcc64e6f1a7d',
              name: 'Root',
            },
            channel: faker.helpers.arrayElement([
              {
                id: '0d568bc4-057c-4bea-9746-dcc64e6f1a7d',
                name: 'Infrustruture',
              },
              {
                id: '4b17ca83-4e1d-4efe-ab81-85ae1e3526cc',
                name: 'General',
              },
              {
                id: '763a9f14-30b4-4435-b4d2-20f4e824f963',
                name: 'Client',
              },
              {
                id: '6f6a7df0-2c61-4663-ac3c-73cda5ca6d2a',
                name: 'Pinball',
              },
            ]),
          },
        }),
      );
    }, NOTIFICAION_INTERVAL);
    return function cleanup() {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [dispatch]);
  return null;
}
