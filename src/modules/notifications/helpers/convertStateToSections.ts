import {isToday, isYesterday} from 'date-fns';
import {INotification} from '../types';

interface ISection {
  title: string;
  data: INotification[];
}

function sortDescending(a: INotification, b: INotification) {
  return b.createdAt - a.createdAt;
}

export default function convertStateToSections(
  notifications: Record<string, INotification>,
): ISection[] {
  const bucketed = Object.values(notifications)
    .sort(sortDescending)
    .reduce((buckets, notification) => {
      // Set the UTC time
      const date = new Date();
      date.setTime(notification.createdAt);

      // Get the bucketed ISO time string to use as the key
      const dateStr = date.toISOString().split('T')[0] + 'T00:00:00Z';
      // Create new bucket if not exists
      if (!buckets[dateStr]) {
        buckets[dateStr] = [];
      }

      // Push the notification into the bucket
      buckets[dateStr].push(notification);

      // Return accumulator
      return buckets;
    }, {} as Record<string, INotification[]>);

  // Map and return decorated buckets
  return Object.keys(bucketed).map(key => {
    let title = key;

    // Parse and adjust for locale time
    const parsedDate = Date.parse(key);
    const timeDiff = new Date().getTimezoneOffset() * 60000;
    const adjustedDate = new Date(parsedDate.valueOf() + timeDiff);

    if (isToday(adjustedDate)) {
      title = 'today';
    } else if (isYesterday(adjustedDate)) {
      title = 'yesterday';
    } else {
      title = adjustedDate.toLocaleDateString('en-US');
    }
    return {
      title,
      data: bucketed[key],
    };
  });
}
