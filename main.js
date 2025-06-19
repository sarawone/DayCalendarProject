import { initSelectors, renderCalendar } from './modules/calendarUtils.js';
import { setupEventHandlers } from './modules/eventHandlers.js';

const currentDate = new Date();
const dateState = {
  currentMonth: currentDate.getMonth(),
  currentYear: currentDate.getFullYear()
};

// Pass the actual select elements from the DOM
const monthSelector = document.getElementById('monthSelector');
const yearSelector = document.getElementById('yearSelector');

initSelectors(dateState.currentMonth, dateState.currentYear, monthSelector, yearSelector);
renderCalendar(dateState.currentMonth, dateState.currentYear);
setupEventHandlers(dateState);
