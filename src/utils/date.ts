import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';

dayjs.extend(utc);
dayjs.extend(timezone);

export const convertUtcToLocal = (utcDate: string) => {
  const userTimeZone = dayjs.tz.guess();
  return dayjs.utc(utcDate).tz(userTimeZone).format('YYYY-MM-DD HH:mm');
};
