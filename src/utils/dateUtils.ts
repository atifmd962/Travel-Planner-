const KANNADA_DAYS = [
  'ಭಾನುವಾರ',
  'ಸೋಮವಾರ',
  'ಮಂಗಳವಾರ',
  'ಬುಧವಾರ',
  'ಗುರುವಾರ',
  'ಶುಕ್ರವಾರ',
  'ಶನಿವಾರ'
];

const KANNADA_MONTHS = [
  'ಜನವರಿ',
  'ಫೆಬ್ರವರಿ',
  'ಮಾರ್ಚ್',
  'ಏಪ್ರಿಲ್',
  'ಮೇ',
  'ಜೂನ್',
  'ಜುಲೈ',
  'ಆಗಸ್ಟ್',
  'ಸೆಪ್ಟೆಂಬರ್',
  'ಅಕ್ಟೋಬರ್',
  'ನವೆಂಬರ್',
  'ಡಿಸೆಂಬರ್'
];

const ENGLISH_MONTHS_SHORT = [
  'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
  'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
];

const ENGLISH_DAYS_SHORT = [
  'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'
];

export function toKannadaDigits(num: number | string): string {
  const kannadaDigits = ['೦', '೧', '೨', '೩', '೪', '೫', '೬', '೭', '೮', '೯'];
  return String(num).replace(/\d/g, (d) => kannadaDigits[parseInt(d, 10)]);
}

export function getTomorrowDateString(): string {
  const d = new Date();
  d.setDate(d.getDate() + 1);
  return d.toISOString().split('T')[0];
}

export function formatTripDayDate(
  startDateStr: string | undefined,
  dayOffset: number
): { date: string; dateKn: string } {
  let dateObj: Date;
  if (startDateStr) {
    const parts = startDateStr.split('-');
    if (parts.length === 3) {
      dateObj = new Date(parseInt(parts[0], 10), parseInt(parts[1], 10) - 1, parseInt(parts[2], 10));
    } else {
      dateObj = new Date(startDateStr);
    }
  } else {
    dateObj = new Date();
    dateObj.setDate(dateObj.getDate() + 1);
  }

  // Add day offset
  dateObj.setDate(dateObj.getDate() + dayOffset);

  const dayOfWeek = dateObj.getDay();
  const dayOfMonth = dateObj.getDate();
  const month = dateObj.getMonth();
  const year = dateObj.getFullYear();

  const engDay = ENGLISH_DAYS_SHORT[dayOfWeek];
  const engMonth = ENGLISH_MONTHS_SHORT[month];
  const engDate = `${engDay}, ${dayOfMonth} ${engMonth} ${year}`;

  const knDay = KANNADA_DAYS[dayOfWeek];
  const knMonth = KANNADA_MONTHS[month];
  const knDate = `${knDay}, ${toKannadaDigits(dayOfMonth)} ${knMonth} ${toKannadaDigits(year)}`;

  return { date: engDate, dateKn: knDate };
}

export function formatTripDateRange(
  startDateStr: string | undefined,
  durationDays: number
): { range: string; rangeKn: string } {
  const start = formatTripDayDate(startDateStr, 0);
  const end = formatTripDayDate(startDateStr, Math.max(0, durationDays - 1));

  const range = `${start.date} – ${end.date}`;
  const rangeKn = `${start.dateKn} – ${end.dateKn}`;

  return { range, rangeKn };
}
