function SetUTCHoursDemo(nhr, nmin, nsec){   
   var d, s;                        // Declare variables.
   d = new Date();                  // Create Date object.
   d.setUTCHours(nhr, nmin, nsec);  // Set UTC hours, minutes, seconds.
   s = "Current setting is " + d.toUTCString() 
   return(s);                       // Return new setting.
}

function convertWeekDayToNum(weekDay) {
  switch (weekDay){
    case DATE_WEEKLY_MONDAY: return 1;
    case DATE_WEEKLY_TUESDAY: return 2;
    case DATE_WEEKLY_WEDNESDAY: return 3;
    case DATE_WEEKLY_THURSDAY: return 4;
    case DATE_WEEKLY_FRIDAY: return 5;
    case DATE_WEEKLY_SATURDAY: return 6;
    case DATE_WEEKLY_SUNDAY: return 0;
  }
}

function getCommingStartTime(item) {
  // get only date (w/o time), b/c time is from saved item
  nowDate = new Date(); nowDate.setHours(0); nowDate.setMinutes(0); nowDate.setSeconds(0);
  switch(item.repeat){
    case REPEAT_EVERYDAY:
      startDate = new Date(nowDate.getTime() + item.time * 1000);
      break;
    case REPEAT_WEEKLY:
      nowWeekDay = nowDate.getDay();
      intervalDay = (convertWeekDayToNum(item.date_weekly) + 7 - nowWeekDay) % 7;
      startDate = new Date(nowDate.getTime() + intervalDay*24*60*60*1000 + item.time * 1000);
      break;
    case REPEAT_SPECIFIC:
      specificDate = new Date(item.dateSpecific); specificDate.setHours(0); specificDate.setMinutes(0); specificDate.setSeconds(0);
      startDate = new Date(specificDate.getTime() + item.time * 1000);
      break;
    default:
      console.log("[Bug] item.repeat = " + item.repeat);
      break;
  }
  console.log(startDate);
  return startDate;
}