import { backButton, nextButton, monthSelector, yearSelector } from './domElements.js';
import { renderCalendar } from './calendarUtils.js';

export function setupEventHandlers(dateState) {
  backButton.addEventListener('click', () => {
    dateState.currentMonth--;
    if (dateState.currentMonth < 0) {
      dateState.currentMonth = 11;
      dateState.currentYear--;
    }
    renderCalendar(dateState.currentMonth, dateState.currentYear);
  });

  nextButton.addEventListener('click', () => {
    dateState.currentMonth++;
    if (dateState.currentMonth > 11) {
      dateState.currentMonth = 0;
      dateState.currentYear++;
    }
    renderCalendar(dateState.currentMonth, dateState.currentYear);
  });

  monthSelector.addEventListener('change', () => {
    dateState.currentMonth = parseInt(monthSelector.value, 10);
    renderCalendar(dateState.currentMonth, dateState.currentYear);
  });

  yearSelector.addEventListener('change', () => {
    dateState.currentYear = parseInt(yearSelector.value, 10);
    renderCalendar(dateState.currentMonth, dateState.currentYear);
  });
}