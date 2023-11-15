import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {INotification} from '../../types';
import {
  ACTION_COMMUNITY_INVITE,
  ACTION_FRIEND_REQUEST,
  ACTION_FRIEND_REQUEST_ACCEPTED,
  ACTION_FRIEND_REQUEST_DECLINED,
  ACTION_MENTION,
} from '../../data/constants';

interface INotificationTextProps
  extends Pick<INotification, 'action' | 'channel' | 'community' | 'user'> {}

export default function NotificationText({
  action,
  channel,
  community,
  user,
}: INotificationTextProps) {
  switch (action) {
    case ACTION_MENTION:
      return (
        <View style={styles.container}>
          <Text style={styles.user}>@{user.name}</Text>
          <Text style={styles.text}> mentioned you in</Text>
          <Text style={styles.text}>
            #{channel?.name}.{community?.name}
          </Text>
        </View>
      );
    case ACTION_COMMUNITY_INVITE:
      return (
        <View style={styles.container}>
          <Text style={styles.user}>@{user.name}</Text>
          <Text style={styles.text}> invited you to </Text>
          <Text style={styles.text}>{community?.name}</Text>
        </View>
      );
    case ACTION_FRIEND_REQUEST:
      return (
        <View style={styles.container}>
          <Text style={styles.user}>@{user.name}</Text>
          <Text style={styles.text}> sent you a friend request</Text>
        </View>
      );
    case ACTION_FRIEND_REQUEST_ACCEPTED:
      return (
        <View style={styles.container}>
          <Text style={styles.user}>@{user.name}</Text>
          <Text style={styles.text}>
            {' '}
            <Text style={styles.accepted}>accepted</Text> your friend request
          </Text>
        </View>
      );
    case ACTION_FRIEND_REQUEST_DECLINED:
      return (
        <Text>
          <Text style={styles.user}>@{user.name}</Text>{' '}
          <Text style={styles.text}>
            {' '}
            <Text style={styles.declined}>declined</Text> your friend request
          </Text>
        </Text>
      );
    default:
      return '';
  }
}

const styles = StyleSheet.create({
  container: {flexDirection: 'row', flexWrap: 'wrap'},
  text: {
    color: '#eee',
    padding: 2,
  },
  declined: {
    color: 'red',
  },
  accepted: {
    color: 'green',
  },
  user: {
    backgroundColor: '#39465a',
    padding: 2,
    color: 'white',
  },
});
