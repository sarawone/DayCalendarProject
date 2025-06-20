// This function fetches and finds the real date of each special day
export async function getSpecialDaysForMonth(month, year) {
    const response = await fetch('./days.json'); // fetch the JSON file
    const daysList = await response.json();
  
    const monthNames = [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];
  
    const weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  
    const result = [];
  
    for (const dayInfo of daysList) {
      if (dayInfo.monthName !== monthNames[month]) continue;
  
      const targetWeekday = weekdays.indexOf(dayInfo.dayName);

      const totalDays = new Date(year, month + 1, 0).getDate(); //in a month
  
      let matches = [];
  
      for (let d = 1; d <= totalDays; d++) {
        const date = new Date(year, month, d);
        if (date.getDay() === targetWeekday) {
          matches.push(d);
        }
      }
  
      let dateNum;
      if (dayInfo.occurrence === "last") {
        dateNum = matches[matches.length - 1];
      } else if (dayInfo.occurrence === "first") {
        dateNum = matches[0];
      } else if (dayInfo.occurrence === "second") {
        dateNum = matches[1];
      } else if (dayInfo.occurrence === "third") {
        dateNum = matches[2];
      }
  
      result.push({
        name: dayInfo.name,
        descriptionURL: dayInfo.descriptionURL,
        date: dateNum
      });
    }
  
    return result;
  }
  