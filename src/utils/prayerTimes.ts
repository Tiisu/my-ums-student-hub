
import { format, addMinutes } from 'date-fns';

export type Prayer = {
  name: string;
  time: string;
  timeObj: Date;
  displayName: string;
};

export type PrayerTimesType = {
  fajr: string;
  dhuhr: string;
  asr: string;
  maghrib: string;
  isha: string;
};

// Nyankpala Campus coordinates
const NYANKPALA_LAT = 9.4021;
const NYANKPALA_LONG = -0.9836;

// Simulated prayer times API response
const MOCK_PRAYER_TIMES: PrayerTimesType = {
  fajr: '04:30',
  dhuhr: '12:15',
  asr: '15:30',
  maghrib: '18:10',
  isha: '19:30',
};

export const fetchPrayerTimes = async (): Promise<PrayerTimesType> => {
  // This would normally be an API call, but we're using mock data for now
  // In a production app, you would fetch from an API like:
  // const response = await fetch(
  //   `https://api.aladhan.com/v1/timingsByCity?city=Nyankpala&country=Ghana&method=2`
  // );
  // const data = await response.json();
  
  // Simulate API call delay
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(MOCK_PRAYER_TIMES);
    }, 500);
  });
};

export const formatPrayerTimes = (prayerTimes: PrayerTimesType): Prayer[] => {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth();
  const day = now.getDate();

  const createTimeObj = (timeStr: string): Date => {
    const [hours, minutes] = timeStr.split(':').map(Number);
    return new Date(year, month, day, hours, minutes);
  };

  return [
    {
      name: 'fajr',
      displayName: 'Fajr',
      time: prayerTimes.fajr,
      timeObj: createTimeObj(prayerTimes.fajr),
    },
    {
      name: 'dhuhr',
      displayName: 'Dhuhr',
      time: prayerTimes.dhuhr,
      timeObj: createTimeObj(prayerTimes.dhuhr),
    },
    {
      name: 'asr',
      displayName: 'Asr',
      time: prayerTimes.asr,
      timeObj: createTimeObj(prayerTimes.asr),
    },
    {
      name: 'maghrib',
      displayName: 'Maghrib',
      time: prayerTimes.maghrib,
      timeObj: createTimeObj(prayerTimes.maghrib),
    },
    {
      name: 'isha',
      displayName: 'Isha',
      time: prayerTimes.isha,
      timeObj: createTimeObj(prayerTimes.isha),
    },
  ];
};

export const getNextPrayer = (prayers: Prayer[]): Prayer | null => {
  const now = new Date();
  // Find the next prayer
  const upcomingPrayers = prayers.filter((prayer) => prayer.timeObj > now);
  
  if (upcomingPrayers.length === 0) {
    // If no upcoming prayers today, return the first prayer for tomorrow
    const tomorrowFajr = { ...prayers[0] };
    const fajrTime = tomorrowFajr.timeObj;
    // Set to tomorrow
    fajrTime.setDate(fajrTime.getDate() + 1);
    tomorrowFajr.timeObj = fajrTime;
    tomorrowFajr.time = format(fajrTime, 'HH:mm');
    return tomorrowFajr;
  }
  
  return upcomingPrayers[0];
};

export const formatTimeToAmPm = (timeStr: string): string => {
  const [hours, minutes] = timeStr.split(':').map(Number);
  const date = new Date();
  date.setHours(hours);
  date.setMinutes(minutes);
  
  return format(date, 'h:mm a');
};

export const getTimeDifference = (timeStr: string): string => {
  const now = new Date();
  const [hours, minutes] = timeStr.split(':').map(Number);
  
  const prayerTime = new Date();
  prayerTime.setHours(hours);
  prayerTime.setMinutes(minutes);
  prayerTime.setSeconds(0);
  
  // If prayer time is earlier today, set it to tomorrow
  if (prayerTime < now) {
    prayerTime.setDate(prayerTime.getDate() + 1);
  }
  
  const diffMs = prayerTime.getTime() - now.getTime();
  const diffHrs = Math.floor(diffMs / (1000 * 60 * 60));
  const diffMins = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
  
  if (diffHrs === 0) {
    return `${diffMins} minute${diffMins !== 1 ? 's' : ''}`;
  }
  
  return `${diffHrs} hour${diffHrs !== 1 ? 's' : ''} ${diffMins} minute${diffMins !== 1 ? 's' : ''}`;
};
