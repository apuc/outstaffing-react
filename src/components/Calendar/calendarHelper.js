export default function calendarHelper(value) {
  const startDay = value.clone().startOf('month').startOf('week').startOf('day');
  const endDay = value.clone().endOf('month').endOf('week');

  const day = startDay.clone().subtract(1, 'day');

  const calendar = [];

  console.log('calendar', calendar);

  while (day.isBefore(endDay, 'day')) {
    calendar.push(
      Array(7)
        .fill(0)
        .map(() => day.add(1, 'day').clone())
    );
  }

  return calendar;
}
