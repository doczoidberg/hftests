import "core-js/modules/es.array.includes";
import "core-js/modules/es.array.index-of";
import "core-js/modules/es.array.slice";
import "core-js/modules/es.number.constructor";
import "core-js/modules/es.object.assign";
import "core-js/modules/es.regexp.exec";
import "core-js/modules/es.string.ends-with";
import "core-js/modules/es.string.includes";
import "core-js/modules/es.string.replace";
import "core-js/modules/es.string.split";
import "core-js/modules/es.string.trim";

/**
 * @license
 * Copyright (c) 2020 Handsoncode. All rights reserved.
 */
export function defaultParseToDateTime(dateTimeString, dateFormat, timeFormat) {
  dateTimeString = dateTimeString.replace(/\s\s+/g, ' ').trim().toLowerCase();
  var ampmtoken = dateTimeString.substring(dateTimeString.length - 2);

  if (ampmtoken === 'am' || ampmtoken === 'pm') {
    dateTimeString = dateTimeString.substring(0, dateTimeString.length - 2).trim();
  } else {
    ampmtoken = dateTimeString.substring(dateTimeString.length - 1);

    if (ampmtoken === 'a' || ampmtoken === 'p') {
      dateTimeString = dateTimeString.substring(0, dateTimeString.length - 1).trim();
    } else {
      ampmtoken = undefined;
    }
  }

  var dateItems = dateTimeString.split(/[ /.-]/g);

  if (dateItems.length >= 2 && dateItems[dateItems.length - 2].includes(':')) {
    dateItems[dateItems.length - 2] = dateItems[dateItems.length - 2] + '.' + dateItems[dateItems.length - 1];
    dateItems.pop();
  }

  var timeItems = dateItems[dateItems.length - 1].split(':');

  if (ampmtoken !== undefined) {
    timeItems.push(ampmtoken);
  }

  if (dateItems.length === 1) {
    return defaultParseToTime(timeItems, timeFormat);
  }

  if (timeItems.length === 1) {
    return defaultParseToDate(dateItems, dateFormat);
  }

  var parsedDate = defaultParseToDate(dateItems.slice(0, dateItems.length - 1), dateFormat);
  var parsedTime = defaultParseToTime(timeItems, timeFormat);

  if (parsedDate === undefined) {
    return undefined;
  } else if (parsedTime === undefined) {
    return undefined;
  } else {
    return Object.assign(Object.assign({}, parsedDate), parsedTime);
  }
}
export var secondsExtendedRegexp = /^ss\.(s+|0+)$/;
export function defaultParseToTime(timeItems, timeFormat) {
  timeFormat = timeFormat.toLowerCase();

  if (timeFormat.endsWith('am/pm')) {
    timeFormat = timeFormat.substring(0, timeFormat.length - 5).trim();
  } else if (timeFormat.endsWith('a/p')) {
    timeFormat = timeFormat.substring(0, timeFormat.length - 3).trim();
  }

  var formatItems = timeFormat.split(':');
  var ampm = undefined;

  if (timeItems[timeItems.length - 1] === 'am' || timeItems[timeItems.length - 1] === 'a') {
    ampm = false;
    timeItems.pop();
  } else if (timeItems[timeItems.length - 1] === 'pm' || timeItems[timeItems.length - 1] === 'p') {
    ampm = true;
    timeItems.pop();
  }

  var fractionOfSecondPrecision = 0;

  if (formatItems.length >= 1 && secondsExtendedRegexp.test(formatItems[formatItems.length - 1])) {
    fractionOfSecondPrecision = formatItems[formatItems.length - 1].length - 3;
    formatItems[formatItems.length - 1] = 'ss';
  }

  if (timeItems.length !== formatItems.length) {
    return undefined;
  }

  var hourIndex = formatItems.indexOf('hh');
  var minuteIndex = formatItems.indexOf('mm');
  var secondIndex = formatItems.indexOf('ss');
  var hourString = hourIndex !== -1 ? timeItems[hourIndex] : '0';

  if (!/^\d+$/.test(hourString)) {
    return undefined;
  }

  var hours = Number(hourString);

  if (ampm !== undefined) {
    if (hours < 0 || hours > 12) {
      return undefined;
    }

    hours = hours % 12;

    if (ampm) {
      hours = hours + 12;
    }
  }

  var minuteString = minuteIndex !== -1 ? timeItems[minuteIndex] : '0';

  if (!/^\d+$/.test(minuteString)) {
    return undefined;
  }

  var minutes = Number(minuteString);
  var secondString = secondIndex !== -1 ? timeItems[secondIndex] : '0';

  if (!/^\d+(\.\d+)?$/.test(secondString)) {
    return undefined;
  }

  var seconds = Number(secondString);
  seconds = Math.round(seconds * Math.pow(10, fractionOfSecondPrecision)) / Math.pow(10, fractionOfSecondPrecision);
  return {
    hours: hours,
    minutes: minutes,
    seconds: seconds
  };
}
export function defaultParseToDate(dateItems, dateFormat) {
  var formatItems = dateFormat.toLowerCase().split(/[ /.-]/g);

  if (dateItems.length !== formatItems.length) {
    return undefined;
  }

  var monthIndex = formatItems.indexOf('mm');
  var dayIndex = formatItems.indexOf('dd');
  var yearIndexLong = formatItems.indexOf('yyyy');
  var yearIndexShort = formatItems.indexOf('yy');

  if (!(monthIndex in dateItems) || !(dayIndex in dateItems) || !(yearIndexLong in dateItems) && !(yearIndexShort in dateItems)) {
    return undefined;
  }

  if (yearIndexLong in dateItems && yearIndexShort in dateItems) {
    return undefined;
  }

  var year;

  if (yearIndexLong in dateItems) {
    var yearString = dateItems[yearIndexLong];

    if (/^\d+$/.test(yearString)) {
      year = Number(yearString);

      if (year < 1000 || year > 9999) {
        return undefined;
      }
    } else {
      return undefined;
    }
  } else {
    var _yearString = dateItems[yearIndexShort];

    if (/^\d+$/.test(_yearString)) {
      year = Number(_yearString);

      if (year < 0 || year > 99) {
        return undefined;
      }
    } else {
      return undefined;
    }
  }

  var monthString = dateItems[monthIndex];

  if (!/^\d+$/.test(monthString)) {
    return undefined;
  }

  var month = Number(monthString);
  var dayString = dateItems[dayIndex];

  if (!/^\d+$/.test(dayString)) {
    return undefined;
  }

  var day = Number(dayString);
  return {
    year: year,
    month: month,
    day: day
  };
}