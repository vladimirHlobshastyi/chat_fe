import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import relativeTime from 'dayjs/plugin/relativeTime';
import 'dayjs/locale/en';

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(relativeTime);

dayjs.locale('en');

export const convertUtcToLocal = (utcDate: string) => {
  const userTimeZone = dayjs.tz.guess();
  return dayjs.utc(utcDate).tz(userTimeZone).format('YYYY-MM-DD HH:mm');
};

export const shouldShowTimestamp = (
  current: Date,
  next?: Date,
  currentSender?: string,
  nextSender?: string,
  thresholdMinutes = 5,
) => {
  if (!next) return true;

  const currentTime = dayjs(current);
  const nextTime = dayjs(next);

  const timeDiff = nextTime.diff(currentTime, 'minute');
  const senderChanged = currentSender !== nextSender;

  return senderChanged || timeDiff >= thresholdMinutes;
};

export type UserStatus = 'online' | 'recently' | 'offline';

export const getUserStatus = (
  isOnline: boolean,
  lastSeen?: string | Date | null,
): UserStatus => {
  if (!lastSeen) return 'offline';

  const diff = dayjs().diff(dayjs.utc(lastSeen).tz(dayjs.tz.guess()), 'minute');

  if (isOnline) return 'online';
  if (diff < 2) return 'recently';
  return 'offline';
};
