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

export function currentMonth() {
  const currentMonth = moment().format('MMMM');

  return currentMonth.charAt(0).toUpperCase() + currentMonth.slice(1);
}

export function currentMonthAndDay(day) {
  return day.format('D MMMM');
}

export function currentMonthAndDayReportPage() {
  return moment().format('D MMMM');
}
