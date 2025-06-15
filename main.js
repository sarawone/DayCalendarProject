import { initSelectors, renderCalendar } from './modules/calendarUtils.js';
import { setupEventHandlers } from './modules/eventHandlers.js';

const currentDate = new Date();
const dateState = {
  currentMonth: currentDate.getMonth(),
  currentYear: currentDate.getFullYear()
};

initSelectors(dateState.currentMonth, dateState.currentYear);
renderCalendar(dateState.currentMonth, dateState.currentYear);
setupEventHandlers(dateState);
