/**
 * @jest-environment jsdom
 */

import { initSelectors } from '../modules/calendarUtils.js';  // Adjust the path to your actual file

const months = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

describe('initSelectors', () => {
  let monthSelector;
  let yearSelector;

  beforeEach(() => {
    // Create fresh <select> elements before each test
    monthSelector = document.createElement('select');
    yearSelector = document.createElement('select');
  });

  test('populates month selector with 12 months and sets the current month', () => {
    const currentMonth = 9; // October (0-based)
    const currentYear = 2024;

    initSelectors(currentMonth, currentYear, monthSelector, yearSelector);

    // Check month selector options count and values
    expect(monthSelector.options.length).toBe(12);
    for (let i = 0; i < 12; i++) {
      expect(monthSelector.options[i].value).toBe(i.toString());
      expect(monthSelector.options[i].text).toBe(months[i]);
    }

    // Check that the month selector's value is set correctly
    expect(monthSelector.value).toBe(currentMonth.toString());

    // Check year selector options count and values
    const thisYear = new Date().getFullYear();
    const expectedYearCount = thisYear + 300 - (thisYear - 300) + 1;
    expect(yearSelector.options.length).toBe(expectedYearCount);

    // Check first and last year option values and text
    expect(yearSelector.options[0].value).toBe((thisYear - 300).toString());
    expect(yearSelector.options[yearSelector.options.length - 1].value).toBe((thisYear + 300).toString());

    // Check that the year selector's value is set correctly
    expect(yearSelector.value).toBe(currentYear.toString());
  });
});
