import "core-js/modules/es.symbol";
import "core-js/modules/es.symbol.description";
import "core-js/modules/es.symbol.iterator";
import "core-js/modules/es.array.from";
import "core-js/modules/es.array.iterator";
import "core-js/modules/es.array.slice";
import "core-js/modules/es.array.some";
import "core-js/modules/es.function.name";
import "core-js/modules/es.number.constructor";
import "core-js/modules/es.number.to-fixed";
import "core-js/modules/es.object.to-string";
import "core-js/modules/es.regexp.exec";
import "core-js/modules/es.regexp.to-string";
import "core-js/modules/es.string.iterator";
import "core-js/modules/es.string.split";
import "core-js/modules/es.string.starts-with";
import "core-js/modules/web.dom-collections.iterator";

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e2) { throw _e2; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e3) { didErr = true; err = _e3; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

/**
 * @license
 * Copyright (c) 2020 Handsoncode. All rights reserved.
 */
import { secondsExtendedRegexp } from '../DateTimeDefault';
import { numberToSimpleTime } from '../DateTimeHelper';
import { parseForDateTimeFormat, parseForNumberFormat, TokenType } from './parser';
export function format(value, formatArg, config, dateHelper) {
  var tryDateTime = config.stringifyDateTime(dateHelper.numberToSimpleDateTime(value), formatArg); // default points to defaultStringifyDateTime()

  if (tryDateTime !== undefined) {
    return tryDateTime;
  }

  var tryDuration = config.stringifyDuration(numberToSimpleTime(value), formatArg);

  if (tryDuration !== undefined) {
    return tryDuration;
  }

  var expression = parseForNumberFormat(formatArg);

  if (expression !== undefined) {
    return numberFormat(expression.tokens, value);
  }

  return formatArg;
}
export function padLeft(number, size) {
  var result = number + '';

  while (result.length < size) {
    result = '0' + result;
  }

  return result;
}
export function padRight(number, size) {
  var result = number + '';

  while (result.length < size) {
    result = result + '0';
  }

  return result;
}

function countChars(text, char) {
  return text.split(char).length - 1;
}

function numberFormat(tokens, value) {
  var result = '';

  for (var i = 0; i < tokens.length; ++i) {
    var token = tokens[i];

    if (token.type === TokenType.FREE_TEXT) {
      result += token.value;
      continue;
    }

    var tokenParts = token.value.split('.');
    var integerFormat = tokenParts[0];
    var decimalFormat = tokenParts[1] || '';
    var separator = tokenParts[1] ? '.' : '';
    /* get fixed-point number without trailing zeros */

    var valueParts = Number(value.toFixed(decimalFormat.length)).toString().split('.');
    var integerPart = valueParts[0] || '';
    var decimalPart = valueParts[1] || '';

    if (integerFormat.length > integerPart.length) {
      var _padSize = countChars(integerFormat.substr(0, integerFormat.length - integerPart.length), '0');

      integerPart = padLeft(integerPart, _padSize + integerPart.length);
    }

    var padSize = countChars(decimalFormat.substr(decimalPart.length, decimalFormat.length - decimalPart.length), '0');
    decimalPart = padRight(decimalPart, padSize + decimalPart.length);
    result += integerPart + separator + decimalPart;
  }

  return result;
}

export function defaultStringifyDuration(time, formatArg) {
  var expression = parseForDateTimeFormat(formatArg);

  if (expression === undefined) {
    return undefined;
  }

  var tokens = expression.tokens;
  var result = '';

  var _iterator = _createForOfIteratorHelper(tokens),
      _step;

  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var token = _step.value;

      if (token.type === TokenType.FREE_TEXT) {
        result += token.value;
        continue;
      }

      if (secondsExtendedRegexp.test(token.value)) {
        var fractionOfSecondPrecision = token.value.length - 3;
        result += (time.seconds < 10 ? '0' : '') + Math.round(time.seconds * Math.pow(10, fractionOfSecondPrecision)) / Math.pow(10, fractionOfSecondPrecision);
        continue;
      }

      switch (token.value.toLowerCase()) {
        case 'h':
        case 'hh':
          {
            result += padLeft(time.hours, token.value.length);
            time.hours = 0;
            break;
          }

        case '[hh]':
          {
            result += padLeft(time.hours, token.value.length - 2);
            time.hours = 0;
            break;
          }

        case 'm':
        case 'mm':
          {
            result += padLeft(time.minutes, token.value.length);
            time.minutes = 0;
            break;
          }

        case '[mm]':
          {
            result += padLeft(time.minutes + 60 * time.hours, token.value.length - 2);
            time.minutes = 0;
            time.hours = 0;
            break;
          }

        /* seconds */

        case 's':
        case 'ss':
          {
            result += padLeft(time.seconds, token.value.length);
            break;
          }

        default:
          {
            return undefined;
          }
      }
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }

  return result;
}
export function defaultStringifyDateTime(dateTime, formatArg) {
  var expression = parseForDateTimeFormat(formatArg);

  if (expression === undefined) {
    return undefined;
  }

  var tokens = expression.tokens;
  var result = '';
  var minutes = false;
  var ampm = tokens.some(function (token) {
    return token.type === TokenType.FORMAT && (token.value === 'a/p' || token.value === 'A/P' || token.value === 'am/pm' || token.value === 'AM/PM');
  });

  for (var i = 0; i < tokens.length; i++) {
    var token = tokens[i];

    if (token.type === TokenType.FREE_TEXT) {
      result += token.value;
      continue;
    }

    if (secondsExtendedRegexp.test(token.value)) {
      var fractionOfSecondPrecision = token.value.length - 3;
      result += (dateTime.seconds < 10 ? '0' : '') + Math.round(dateTime.seconds * Math.pow(10, fractionOfSecondPrecision)) / Math.pow(10, fractionOfSecondPrecision);
      continue;
    }

    switch (token.value.toLowerCase()) {
      /* hours*/
      case 'h':
      case 'hh':
        {
          minutes = true;
          result += padLeft(ampm ? (dateTime.hours + 11) % 12 + 1 : dateTime.hours, token.value.length);
          break;
        }

      /* days */

      case 'd':
      case 'dd':
        {
          result += padLeft(dateTime.day, token.value.length);
          break;
        }

      /* seconds */

      case 's':
      case 'ss':
        {
          result += padLeft(Math.round(dateTime.seconds), token.value.length);
          break;
        }

      /* minutes / months */

      case 'm':
      case 'mm':
        {
          if (i + 1 < tokens.length && tokens[i + 1].value.startsWith(':')) {
            minutes = true;
          }

          if (minutes) {
            result += padLeft(dateTime.minutes, token.value.length);
          } else {
            result += padLeft(dateTime.month, token.value.length);
          }

          minutes = true;
          break;
        }

      /* years */

      case 'yy':
        {
          result += padLeft(dateTime.year % 100, token.value.length);
          break;
        }

      case 'yyyy':
        {
          result += dateTime.year;
          break;
        }

      /* AM / PM */

      case 'am/pm':
      case 'a/p':
        {
          var _token$value$split = token.value.split('/'),
              _token$value$split2 = _slicedToArray(_token$value$split, 2),
              am = _token$value$split2[0],
              pm = _token$value$split2[1];

          result += dateTime.hours < 12 ? am : pm;
          break;
        }

      default:
        {
          return undefined;
        }
    }
  }

  return result;
}