import React, {memo} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {useDispatch} from 'react-redux';
import {formatDistance} from 'date-fns';
import {INotification} from '../../types';
import {NotificationText} from '../NotificationText';
import {FlatButton} from '../../../../common/ui/FlatButton';
import {OutlineButton} from '../../../../common/ui/OutlineButton';
import {markAsRead} from '../../data/notificationsSlice';
import {ACTION_FRIEND_REQUEST} from '../../data/constants';

interface INotificationViewProps extends INotification {}

const NotificationItem = memo(function NotificationItem(
  props: INotificationViewProps,
) {
  const {action, isRead, id: notificationId} = props;
  const dispatch = useDispatch();
  const markReadAction = (id: string) => () => dispatch(markAsRead({id}));
  const opacity = isRead ? 0.5 : 1;
  const timeago = formatDistance(
    Date.now() - new Date().getTimezoneOffset() * 60000,
    props.createdAt,
  );

  return (
    <View style={styles.container}>
      <View style={styles.avatar} />
      <View style={{...styles.content, opacity}}>
        <NotificationText {...props} />
        <Text style={styles.timeago}>{timeago}</Text>
        {!isRead &&
          (action === ACTION_FRIEND_REQUEST ? (
            <View style={styles.buttonGroup}>
              <FlatButton
                testID="accept-button"
                text="Accept"
                onPress={markReadAction(notificationId)}
              />
              <OutlineButton
                testID="decline-button"
                text="Decline"
                onPress={markReadAction(notificationId)}
              />
            </View>
          ) : (
            <FlatButton
              text="Mark Read"
              onPress={markReadAction(notificationId)}
            />
          ))}
      </View>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingVertical: 8,
    paddingHorizontal: 8,
    columnGap: 10,
    backgroundColor: '#273246',
  },
  avatar: {
    width: 35,
    height: 35,
    backgroundColor: 'purple',
    borderRadius: 8,
  },
  timeago: {
    color: '#ccc',
  },
  content: {
    rowGap: 4,
  },
  buttonGroup: {flexDirection: 'row', columnGap: 8},
});

export default NotificationItem;
