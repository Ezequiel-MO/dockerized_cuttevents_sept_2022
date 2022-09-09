const OTLogic = () => {
  const transformDates = (date1, date2) => {
    //receives 2 dates in the form "yyyy-mm-dd", returns a date in the form "Nov 25-27, 2021"
    const date1Arr = date1.split("-");
    const date2Arr = date2.split("-");
    const date1Obj = {
      month: date1Arr[1],
      day: date1Arr[2],
      year: date1Arr[0],
    };
    const date2Obj = {
      month: date2Arr[1],
      day: date2Arr[2],
      year: date2Arr[0],
    };
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    const month1 = months[date1Obj.month - 1];
    const month2 = months[date2Obj.month - 1];
    const day1 = date1Obj.day;
    const day2 = date2Obj.day;
    const year1 = date1Obj.year;
    const year2 = date2Obj.year;
    if (year1 === year2) {
      if (month1 === month2) {
        return `${month1} ${day1}-${day2}, ${year1}`;
      } else {
        return `${month1} ${day1}, ${month2} ${day2}, ${year1}`;
      }
    } else {
      return `${month1} ${day1}, ${year1} - ${month2} ${day2}, ${year2}`;
    }
  };
  const getDays = (date1, date2) => {
    //get the day of the week for each date
    let day1 = new Date(date1).getUTCDay();
    let day2 = new Date(date2).getUTCDay();
    const daysOfTheWeek = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    return [...daysOfTheWeek.slice(day1, day2 + 1)];
  };

  const getEvents = (schedule, timeOfDay) => {
    const eventsArr = schedule.map((day) =>
      day[timeOfDay].map((event) => {
        return {
          name: event.name,
          id: event._id,
        };
      })
    );
    return eventsArr;
  };

  const renderEvent = (arr) => {
    if (arr.length === 0) {
      return "No events scheduled";
    } else if (arr.length === 1) {
      return arr[0].name;
    } else {
      return arr.map((event) => event.name).join("/");
    }
  };

  return { transformDates, getDays, getEvents, renderEvent };
};

export default OTLogic;
