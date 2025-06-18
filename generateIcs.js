// generateCalendar.js
import { readFile } from 'fs/promises';
import fs from 'fs';
import fetch from 'node-fetch';
import { createEvents } from 'ics';

const daysFile = './days.json';
const OUTPUT_FILE = 'days.ics';
const START_YEAR = 2020;
const END_YEAR = 2030;

const weekdayMap = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const occurrenceMap = { first: 1, second: 2, third: 3, fourth: 4 };

// 🔁 Shared date logic: Get the Nth or Last weekday of a month
function getNthWeekdayOfMonth(year, monthName, weekdayName, occurrence) {
  const monthIndex = new Date(`${monthName} 1, ${year}`).getMonth();
  const weekdayIndex = weekdayMap.indexOf(weekdayName);

  if (occurrence === 'last') {
    const lastDay = new Date(year, monthIndex + 1, 0); // Last day of the month
    while (lastDay.getDay() !== weekdayIndex) {
      lastDay.setDate(lastDay.getDate() - 1);
    }
    return new Date(lastDay); // clone
  }

  const occurrenceNum = occurrenceMap[occurrence];
  if (!occurrenceNum) return null;

  const date = new Date(year, monthIndex, 1);
  let count = 0;

  while (date.getMonth() === monthIndex) {
    if (date.getDay() === weekdayIndex) {
      count++;
      if (count === occurrenceNum) {
        return new Date(date); // clone and return
      }
    }
    date.setDate(date.getDate() + 1);
  }

  return null;
}

async function generateICSFromDays() {
  const rawData = await readFile(daysFile, 'utf-8');
  const days = JSON.parse(rawData);
  const events = [];

  for (let year = START_YEAR; year <= END_YEAR; year++) {
    for (const day of days) {
      const date = getNthWeekdayOfMonth(year, day.monthName, day.dayName, day.occurrence);
      if (!date) continue;

      let description = '';
      try {
        const res = await fetch(day.descriptionURL);
        description = await res.text();
      } catch (err) {
        console.error(`Failed to fetch description for ${day.name}: ${err.message}`);
        description = '';
      }

      events.push({
        start: [
          date.getFullYear(),
          date.getMonth() + 1,
          date.getDate(),
          10, 0 // 10:00 AM
        ],
        duration: { hours: 1 },
        title: `${day.name} (${year})`,
        description: description.trim(),
        status: 'CONFIRMED',
      });
    }
  }

  const { error, value } = createEvents(events);
  if (error) {
    console.error('Error creating events:', error);
    return;
  }

  fs.writeFileSync(OUTPUT_FILE, value);
  console.log(`✅ iCal file created: ${OUTPUT_FILE}`);
}

generateICSFromDays();
