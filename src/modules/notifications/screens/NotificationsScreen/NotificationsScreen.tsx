import React, {useRef} from 'react';
import {SectionList, StyleSheet, Text, View} from 'react-native';
import {useSelector} from 'react-redux';
import {NotificationItem} from '../../ui';
import {RootState} from '../../../../app/data/store';
import convertStateToSections from '../../helpers/convertStateToSections';
import ViewMoreOverlay from '../../ui/ViewMoreOverlay/ViewMoreOverlay';

export default function NotificationsScreen() {
  const scrollRef: React.RefObject<SectionList> = useRef(null);
  const notifications = useSelector(
    (state: RootState) => state.notifications.notifications,
  );

  // Convert the state to sections data using the helper
  const sections = convertStateToSections(notifications);

  return (
    <View style={styles.container}>
      <SectionList
        initialNumToRender={10}
        sections={sections}
        keyExtractor={item => item.id}
        renderItem={({item}) => <NotificationItem {...item} />}
        renderSectionHeader={({section: {title}}) => (
          <Text style={styles.header}>{title}</Text>
        )}
        stickySectionHeadersEnabled={false}
        ref={scrollRef}
      />
      <ViewMoreOverlay
        onViewMorePress={() => {
          scrollRef.current?.scrollToLocation({
            sectionIndex: 0,
            itemIndex: 0,
          });
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {flex: 1},
  header: {
    fontSize: 16,
    paddingVertical: 4,
    paddingLeft: 8,
    textTransform: 'capitalize',
    color: 'white',
  },
});
