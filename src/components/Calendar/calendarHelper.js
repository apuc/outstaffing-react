import moment from 'moment';
import 'moment/locale/ru';

export function calendarHelper(value) {
  const startDay = value.clone().startOf('month').startOf('week').startOf('day');
  const endDay = value.clone().endOf('month').endOf('week');

  const day = startDay.clone().subtract(1, 'day');

  const calendar = [];

  while (day.isBefore(endDay, 'day')) {
    calendar.push(
      Array(1)
        .fill(0)
        .map(() => day.add(1, 'day').clone())
    );
  }

  return calendar;
}

export function getReports(value) {
  const startDay = value.clone().startOf('month').startOf('week').startOf('day');
  const reportsStart = `${new Date(startDay).getFullYear()}-${new Date(startDay).getMonth() + 1}-${new Date(startDay).getDate()}`
  const endDay = value.clone().endOf('month').endOf('week');
  const reportsEnd = `${new Date(endDay).getFullYear()}-${new Date(endDay).getMonth() + 1}-${new Date(endDay).getDate()}`
  const getReports = `fromDate=${reportsStart}&toDate=${reportsEnd}`

  return getReports;
}

export function getCreatedDate(day) {
  if (day) {
    return `${new Date(day).getFullYear()}-${new Date(day).getMonth() + 1}-${new Date(day).getDate()}`
  } else {
    const date = new Date();
    const dd = String(date.getDate()).padStart(2, '0');
    const mm = String(date.getMonth() + 1).padStart(2, '0');
    const yyyy = date.getFullYear();
    return `${yyyy}-${mm}-${dd}`
  }
}

export function currentMonth() {
  const currentMonth = moment().format('MMMM');

  return currentMonth.charAt(0).toUpperCase() + currentMonth.slice(1);
}

export function currentMonthAndDay(day) {
  return day.format('D MMMM');
}

export function getCorrectDate(day) {
  const months = ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря']
  return `${new Date(day).getDate()} ${months[new Date(day).getMonth()]} ${new Date(day).getFullYear()} года`
};

export function currentMonthAndDayReportPage() {
  return moment().format('D MMMM');
}

export function hourOfNum(number) {
  const hours = [' час', ' часа', ' часов'];
  const cases = [2, 0, 1, 1, 1, 2];
  return hours[(number % 100 > 4 && number % 100 < 20) ? 2 : cases[(number % 10 < 5) ? number % 10 : 5]];
}
