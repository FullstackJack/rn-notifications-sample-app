import React from 'react';

import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../../../app/data/store';
import {StyleSheet, View} from 'react-native';
import {FlatButton} from '../../../../common/ui/FlatButton';
import {showNewNotifications} from '../../data/notificationsSlice';

interface IViewMoreOverlay {
  onViewMorePress?: () => void;
}

export default function ViewMoreButton({onViewMorePress}: IViewMoreOverlay) {
  const dispatch = useDispatch();
  const newNotificationsCount = useSelector(
    (state: RootState) => state.notifications.newNotificationsCount,
  );

  return newNotificationsCount ? (
    <View style={styles.container}>
      <FlatButton
        text={`${newNotificationsCount} New Notifications`}
        style={styles.button}
        textStyle={styles.buttonText}
        onPress={() => {
          dispatch(showNewNotifications());
          onViewMorePress?.();
        }}
      />
    </View>
  ) : null;
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    height: 50,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    bottom: 0,
    left: 0,
    right: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {alignSelf: 'center', backgroundColor: '#993333'},
  buttonText: {color: 'white'},
});
