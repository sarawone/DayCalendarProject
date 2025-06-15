import { calendar, monthDisplay, monthSelector, yearSelector } from './domElements.js';

const months = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];


export function initSelectors(currentMonth, currentYear) {
  for (let m = 0; m < 12; m++) {
    const option = document.createElement('option');
    option.value = m;
    option.text = months[m];
    monthSelector.appendChild(option);
  }

  const thisYear = new Date().getFullYear();
  for (let y = thisYear - 100; y <= thisYear + 50; y++) {
    const option = document.createElement('option');
    option.value = y;
    option.text = y;
    yearSelector.appendChild(option);
  }

  monthSelector.value = currentMonth;
  yearSelector.value = currentYear;
}

export function renderCalendar(month, year) {
  calendar.innerHTML = '';
  monthDisplay.textContent = `${months[month]} ${year}`;

  const firstDay = new Date(year, month, 1);
  const startDay = (firstDay.getDay() + 6) % 7; // converting to monday
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  for (let i = 0; i < startDay; i++) {
    const emptyCell = document.createElement('div');
    emptyCell.classList.add('empty');
    calendar.appendChild(emptyCell);
  }

  for (let day = 1; day <= daysInMonth; day++) {
    const dayCell = document.createElement('div');
    dayCell.classList.add('day');
    dayCell.textContent = day;

    const today = new Date();
    if (
      day === today.getDate() &&
      month === today.getMonth() &&
      year === today.getFullYear()
    ) {
      dayCell.classList.add('todays');
    }

    calendar.appendChild(dayCell);
  }

  monthSelector.value = month;
  yearSelector.value = year;
}
