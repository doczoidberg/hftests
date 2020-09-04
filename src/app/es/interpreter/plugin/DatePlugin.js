import "core-js/modules/es.symbol";
import "core-js/modules/es.symbol.description";
import "core-js/modules/es.symbol.iterator";
import "core-js/modules/es.array.from";
import "core-js/modules/es.array.iterator";
import "core-js/modules/es.array.slice";
import "core-js/modules/es.function.name";
import "core-js/modules/es.map";
import "core-js/modules/es.math.trunc";
import "core-js/modules/es.object.get-prototype-of";
import "core-js/modules/es.object.to-string";
import "core-js/modules/es.reflect.construct";
import "core-js/modules/es.regexp.to-string";
import "core-js/modules/es.string.iterator";
import "core-js/modules/web.dom-collections.iterator";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

/**
 * @license
 * Copyright (c) 2020 Handsoncode. All rights reserved.
 */
import { CellError, ErrorType } from '../../Cell';
import { instanceOfSimpleDate, instanceOfSimpleTime, numberToSimpleTime, offsetMonth, roundToNearestSecond, timeToNumber, toBasisEU, truncateDayInMonth } from '../../DateTimeHelper';
import { format } from '../../format/format';
import { ArgumentTypes, FunctionPlugin } from './FunctionPlugin';
/**
 * Interpreter plugin containing date-specific functions
 */

export var DatePlugin = /*#__PURE__*/function (_FunctionPlugin) {
  _inherits(DatePlugin, _FunctionPlugin);

  var _super = _createSuper(DatePlugin);

  function DatePlugin() {
    var _this;

    _classCallCheck(this, DatePlugin);

    _this = _super.apply(this, arguments);

    _this.isoweeknumCore = function (day) {
      var absoluteDay = Math.floor(_this.interpreter.dateHelper.relativeNumberToAbsoluteNumber(day));

      var date = _this.interpreter.dateHelper.numberToSimpleDate(day);

      var yearStart = _this.interpreter.dateHelper.dateToNumber({
        year: date.year,
        month: 1,
        day: 1
      });

      var yearStartAbsolute = _this.interpreter.dateHelper.relativeNumberToAbsoluteNumber(yearStart);

      var firstThursdayAbs = yearStartAbsolute + ((4 - yearStartAbsolute) % 7 + 7) % 7;
      var ret = Math.floor((absoluteDay - 1) / 7) - Math.floor((firstThursdayAbs - 1) / 7) + 1;

      if (ret === 0) {
        return _this.isoweeknumCore(day - 7) + 1;
      }

      return ret;
    };

    _this.days360Core = function (startDate, endDate, mode) {
      var start = _this.interpreter.dateHelper.numberToSimpleDate(startDate);

      var end = _this.interpreter.dateHelper.numberToSimpleDate(endDate);

      var nStart, nEnd;

      if (mode) {
        nStart = toBasisEU(start);
        nEnd = toBasisEU(end);
      } else {
        var _this$interpreter$dat = _this.interpreter.dateHelper.toBasisUS(start, end);

        var _this$interpreter$dat2 = _slicedToArray(_this$interpreter$dat, 2);

        nStart = _this$interpreter$dat2[0];
        nEnd = _this$interpreter$dat2[1];
      }

      return 360 * (nEnd.year - nStart.year) + 30 * (nEnd.month - nStart.month) + nEnd.day - nStart.day;
    };

    return _this;
  }
  /**
   * Corresponds to DATE(year, month, day)
   *
   * Converts a provided year, month and day into date
   *
   * @param ast
   * @param formulaAddress
   */


  _createClass(DatePlugin, [{
    key: "date",
    value: function date(ast, formulaAddress) {
      var _this2 = this;

      return this.runFunction(ast.args, formulaAddress, this.metadata('DATE'), function (year, month, day) {
        var _a;

        var d = Math.trunc(day);
        var m = Math.trunc(month);
        var y = Math.trunc(year);

        if (y < _this2.interpreter.dateHelper.getEpochYearZero()) {
          y += _this2.interpreter.dateHelper.getEpochYearZero();
        }

        var delta = Math.floor((m - 1) / 12);
        y += delta;
        m -= delta * 12;
        var date = {
          year: y,
          month: m,
          day: 1
        };

        if (_this2.interpreter.dateHelper.isValidDate(date)) {
          var ret = _this2.interpreter.dateHelper.dateToNumber(date) + (d - 1);
          return (_a = _this2.interpreter.dateHelper.getWithinBounds(ret)) !== null && _a !== void 0 ? _a : new CellError(ErrorType.NUM);
        }

        return new CellError(ErrorType.VALUE);
      });
    }
  }, {
    key: "time",
    value: function time(ast, formulaAddress) {
      return this.runFunction(ast.args, formulaAddress, this.metadata('TIME'), function (h, m, s) {
        var ret = timeToNumber({
          hours: Math.trunc(h),
          minutes: Math.trunc(m),
          seconds: Math.trunc(s)
        });

        if (ret < 0) {
          return new CellError(ErrorType.NUM);
        }

        return ret % 1;
      });
    }
  }, {
    key: "eomonth",
    value: function eomonth(ast, formulaAddress) {
      var _this3 = this;

      return this.runFunction(ast.args, formulaAddress, this.metadata('EOMONTH'), function (dateNumber, numberOfMonthsToShift) {
        var _a;

        var date = _this3.interpreter.dateHelper.numberToSimpleDate(dateNumber);

        var ret = _this3.interpreter.dateHelper.dateToNumber(_this3.interpreter.dateHelper.endOfMonth(offsetMonth(date, numberOfMonthsToShift)));

        return (_a = _this3.interpreter.dateHelper.getWithinBounds(ret)) !== null && _a !== void 0 ? _a : new CellError(ErrorType.NUM);
      });
    }
  }, {
    key: "day",
    value: function day(ast, formulaAddress) {
      var _this4 = this;

      return this.runFunction(ast.args, formulaAddress, this.metadata('DAY'), function (dateNumber) {
        return _this4.interpreter.dateHelper.numberToSimpleDate(dateNumber).day;
      });
    }
  }, {
    key: "days",
    value: function days(ast, formulaAddress) {
      return this.runFunction(ast.args, formulaAddress, this.metadata('DAYS'), function (endDate, startDate) {
        return Math.trunc(endDate) - Math.trunc(startDate);
      });
    }
    /**
     * Corresponds to MONTH(date)
     *
     * Returns the month of the year specified by a given date
     *
     * @param ast
     * @param formulaAddress
     */

  }, {
    key: "month",
    value: function month(ast, formulaAddress) {
      var _this5 = this;

      return this.runFunction(ast.args, formulaAddress, this.metadata('MONTH'), function (dateNumber) {
        return _this5.interpreter.dateHelper.numberToSimpleDate(dateNumber).month;
      });
    }
    /**
     * Corresponds to YEAR(date)
     *
     * Returns the year specified by a given date
     *
     * @param ast
     * @param formulaAddress
     */

  }, {
    key: "year",
    value: function year(ast, formulaAddress) {
      var _this6 = this;

      return this.runFunction(ast.args, formulaAddress, this.metadata('YEAR'), function (dateNumber) {
        return _this6.interpreter.dateHelper.numberToSimpleDate(dateNumber).year;
      });
    }
  }, {
    key: "hour",
    value: function hour(ast, formulaAddress) {
      return this.runFunction(ast.args, formulaAddress, this.metadata('HOUR'), function (timeNumber) {
        return numberToSimpleTime(roundToNearestSecond(timeNumber) % 1).hours;
      });
    }
  }, {
    key: "minute",
    value: function minute(ast, formulaAddress) {
      return this.runFunction(ast.args, formulaAddress, this.metadata('MINUTE'), function (timeNumber) {
        return numberToSimpleTime(roundToNearestSecond(timeNumber) % 1).minutes;
      });
    }
  }, {
    key: "second",
    value: function second(ast, formulaAddress) {
      return this.runFunction(ast.args, formulaAddress, this.metadata('SECOND'), function (timeNumber) {
        return numberToSimpleTime(roundToNearestSecond(timeNumber) % 1).seconds;
      });
    }
    /**
     * Corresponds to TEXT(number, format)
     *
     * Tries to convert number to specified date format.
     *
     * @param ast
     * @param formulaAddress
     */

  }, {
    key: "text",
    value: function text(ast, formulaAddress) {
      var _this7 = this;

      return this.runFunction(ast.args, formulaAddress, this.metadata('TEXT'), function (numberRepresentation, formatArg) {
        return format(numberRepresentation, formatArg, _this7.config, _this7.interpreter.dateHelper);
      });
    }
  }, {
    key: "weekday",
    value: function weekday(ast, formulaAddress) {
      var _this8 = this;

      return this.runFunction(ast.args, formulaAddress, this.metadata('WEEKDAY'), function (day, type) {
        var absoluteDay = Math.floor(_this8.interpreter.dateHelper.relativeNumberToAbsoluteNumber(day));

        if (type === 3) {
          return (absoluteDay - 1) % 7;
        }

        var offset = weekdayOffsets.get(type);

        if (offset === undefined) {
          return new CellError(ErrorType.NUM);
        }

        return (absoluteDay - offset) % 7 + 1;
      });
    }
  }, {
    key: "weeknum",
    value: function weeknum(ast, formulaAddress) {
      var _this9 = this;

      return this.runFunction(ast.args, formulaAddress, this.metadata('WEEKNUM'), function (day, type) {
        var absoluteDay = Math.floor(_this9.interpreter.dateHelper.relativeNumberToAbsoluteNumber(day));

        var date = _this9.interpreter.dateHelper.numberToSimpleDate(day);

        var yearStart = _this9.interpreter.dateHelper.dateToNumber({
          year: date.year,
          month: 1,
          day: 1
        });

        var yearStartAbsolute = _this9.interpreter.dateHelper.relativeNumberToAbsoluteNumber(yearStart);

        if (type === 21) {
          return _this9.isoweeknumCore(day);
        }

        var offset = weekdayOffsets.get(type);

        if (offset === undefined) {
          return new CellError(ErrorType.NUM);
        }

        return Math.floor((absoluteDay - offset) / 7) - Math.floor((yearStartAbsolute - offset) / 7) + 1;
      });
    }
  }, {
    key: "isoweeknum",
    value: function isoweeknum(ast, formulaAddress) {
      return this.runFunction(ast.args, formulaAddress, this.metadata('ISOWEEKNUM'), this.isoweeknumCore);
    }
  }, {
    key: "datevalue",
    value: function datevalue(ast, formulaAddress) {
      var _this10 = this;

      return this.runFunction(ast.args, formulaAddress, this.metadata('DATEVALUE'), function (date) {
        var dateTime = _this10.interpreter.dateHelper.parseDateTimeFromConfigFormats(date);

        if (dateTime === undefined) {
          return new CellError(ErrorType.VALUE);
        }

        if (!instanceOfSimpleDate(dateTime)) {
          return 0;
        }

        return (instanceOfSimpleTime(dateTime) ? Math.trunc(timeToNumber(dateTime)) : 0) + _this10.interpreter.dateHelper.dateToNumber(dateTime);
      });
    }
  }, {
    key: "timevalue",
    value: function timevalue(ast, formulaAddress) {
      var _this11 = this;

      return this.runFunction(ast.args, formulaAddress, this.metadata('TIMEVALUE'), function (date) {
        var dateNumber = _this11.interpreter.dateHelper.dateStringToDateNumber(date);

        if (dateNumber === undefined) {
          return new CellError(ErrorType.VALUE);
        }

        return dateNumber % 1;
      });
    }
  }, {
    key: "now",
    value: function now(ast, formulaAddress) {
      var _this12 = this;

      return this.runFunction(ast.args, formulaAddress, this.metadata('NOW'), function () {
        var now = new Date();
        return timeToNumber({
          hours: now.getHours(),
          minutes: now.getMinutes(),
          seconds: now.getSeconds()
        }) + _this12.interpreter.dateHelper.dateToNumber({
          year: now.getFullYear(),
          month: now.getMonth() + 1,
          day: now.getDay()
        });
      });
    }
  }, {
    key: "today",
    value: function today(ast, formulaAddress) {
      var _this13 = this;

      return this.runFunction(ast.args, formulaAddress, this.metadata('TODAY'), function () {
        var now = new Date();
        return _this13.interpreter.dateHelper.dateToNumber({
          year: now.getFullYear(),
          month: now.getMonth() + 1,
          day: now.getDay()
        });
      });
    }
  }, {
    key: "edate",
    value: function edate(ast, formulaAddress) {
      var _this14 = this;

      return this.runFunction(ast.args, formulaAddress, this.metadata('EDATE'), function (dateNumber, delta) {
        var _a;

        var date = _this14.interpreter.dateHelper.numberToSimpleDate(dateNumber);

        var newDate = truncateDayInMonth(offsetMonth(date, delta));

        var ret = _this14.interpreter.dateHelper.dateToNumber(newDate);

        return (_a = _this14.interpreter.dateHelper.getWithinBounds(ret)) !== null && _a !== void 0 ? _a : new CellError(ErrorType.NUM);
      });
    }
  }, {
    key: "datedif",
    value: function datedif(ast, formulaAddress) {
      var _this15 = this;

      return this.runFunction(ast.args, formulaAddress, this.metadata('DATEDIF'), function (startDate, endDate, unit) {
        if (startDate > endDate) {
          return new CellError(ErrorType.NUM);
        }

        if (unit === 'D') {
          return Math.floor(endDate) - Math.floor(startDate);
        }

        var start = _this15.interpreter.dateHelper.numberToSimpleDate(startDate);

        var end = _this15.interpreter.dateHelper.numberToSimpleDate(endDate);

        switch (unit) {
          case 'M':
            return (end.year - start.year) * 12 + (end.month - start.month) - (end.day < start.day ? 1 : 0);

          case 'YM':
            return (12 + (end.month - start.month) - (end.day < start.day ? 1 : 0)) % 12;

          case 'Y':
            if (end.month > start.month || end.month === start.month && end.day >= start.day) {
              return end.year - start.year;
            } else {
              return end.year - start.year - 1;
            }

          case 'MD':
            if (end.day >= start.day) {
              return end.day - start.day;
            } else {
              var m = end.month === 1 ? 12 : end.month - 1;
              var y = end.month === 1 ? end.year - 1 : end.year;
              return _this15.interpreter.dateHelper.daysInMonth(y, m) + end.day - start.day;
            }

          case 'YD':
            if (end.month > start.month || end.month === start.month && end.day >= start.day) {
              return Math.floor(endDate) - _this15.interpreter.dateHelper.dateToNumber({
                year: end.year,
                month: start.month,
                day: start.day
              });
            } else {
              return Math.floor(endDate) - Math.floor(startDate) - 365 * (end.year - start.year - 1) - _this15.interpreter.dateHelper.leapYearsCount(end.year - 1) + _this15.interpreter.dateHelper.leapYearsCount(start.year);
            }

          default:
            return new CellError(ErrorType.NUM);
        }
      });
    }
  }, {
    key: "days360",
    value: function days360(ast, formulaAddress) {
      return this.runFunction(ast.args, formulaAddress, this.metadata('DAYS360'), this.days360Core);
    }
  }, {
    key: "yearfrac",
    value: function yearfrac(ast, formulaAddress) {
      var _this16 = this;

      return this.runFunction(ast.args, formulaAddress, this.metadata('YEARFRAC'), function (startDate, endDate, mode) {
        startDate = Math.trunc(startDate);
        endDate = Math.trunc(endDate);

        if (startDate > endDate) {
          var _ref = [endDate, startDate];
          startDate = _ref[0];
          endDate = _ref[1];
        }

        switch (mode) {
          case 0:
            return _this16.days360Core(startDate, endDate, false) / 360;

          case 1:
            return (endDate - startDate) / _this16.interpreter.dateHelper.yearLengthForBasis(_this16.interpreter.dateHelper.numberToSimpleDate(startDate), _this16.interpreter.dateHelper.numberToSimpleDate(endDate));

          case 2:
            return (endDate - startDate) / 360;

          case 3:
            return (endDate - startDate) / 365;

          case 4:
            return _this16.days360Core(startDate, endDate, true) / 360;
        }

        throw new Error('Should not be reachable.');
      });
    }
  }]);

  return DatePlugin;
}(FunctionPlugin);
DatePlugin.implementedFunctions = {
  'DATE': {
    method: 'date',
    parameters: [{
      argumentType: ArgumentTypes.NUMBER
    }, {
      argumentType: ArgumentTypes.NUMBER
    }, {
      argumentType: ArgumentTypes.NUMBER
    }]
  },
  'TIME': {
    method: 'time',
    parameters: [{
      argumentType: ArgumentTypes.NUMBER
    }, {
      argumentType: ArgumentTypes.NUMBER
    }, {
      argumentType: ArgumentTypes.NUMBER
    }]
  },
  'MONTH': {
    method: 'month',
    parameters: [{
      argumentType: ArgumentTypes.NUMBER,
      minValue: 0
    }]
  },
  'YEAR': {
    method: 'year',
    parameters: [{
      argumentType: ArgumentTypes.NUMBER,
      minValue: 0
    }]
  },
  'HOUR': {
    method: 'hour',
    parameters: [{
      argumentType: ArgumentTypes.NUMBER,
      minValue: 0
    }]
  },
  'MINUTE': {
    method: 'minute',
    parameters: [{
      argumentType: ArgumentTypes.NUMBER,
      minValue: 0
    }]
  },
  'SECOND': {
    method: 'second',
    parameters: [{
      argumentType: ArgumentTypes.NUMBER,
      minValue: 0
    }]
  },
  'TEXT': {
    method: 'text',
    parameters: [{
      argumentType: ArgumentTypes.NUMBER
    }, {
      argumentType: ArgumentTypes.STRING
    }]
  },
  'EOMONTH': {
    method: 'eomonth',
    parameters: [{
      argumentType: ArgumentTypes.NUMBER,
      minValue: 0
    }, {
      argumentType: ArgumentTypes.NUMBER
    }]
  },
  'DAY': {
    method: 'day',
    parameters: [{
      argumentType: ArgumentTypes.NUMBER,
      minValue: 0
    }]
  },
  'DAYS': {
    method: 'days',
    parameters: [{
      argumentType: ArgumentTypes.NUMBER,
      minValue: 0
    }, {
      argumentType: ArgumentTypes.NUMBER,
      minValue: 0
    }]
  },
  'WEEKDAY': {
    method: 'weekday',
    parameters: [{
      argumentType: ArgumentTypes.NUMBER,
      minValue: 0
    }, {
      argumentType: ArgumentTypes.NUMBER,
      defaultValue: 1
    }]
  },
  'WEEKNUM': {
    method: 'weeknum',
    parameters: [{
      argumentType: ArgumentTypes.NUMBER,
      minValue: 0
    }, {
      argumentType: ArgumentTypes.NUMBER,
      defaultValue: 1
    }]
  },
  'ISOWEEKNUM': {
    method: 'isoweeknum',
    parameters: [{
      argumentType: ArgumentTypes.NUMBER,
      minValue: 0
    }]
  },
  'DATEVALUE': {
    method: 'datevalue',
    parameters: [{
      argumentType: ArgumentTypes.STRING
    }]
  },
  'TIMEVALUE': {
    method: 'timevalue',
    parameters: [{
      argumentType: ArgumentTypes.STRING
    }]
  },
  'NOW': {
    method: 'now',
    parameters: [],
    isVolatile: true
  },
  'TODAY': {
    method: 'today',
    parameters: [],
    isVolatile: true
  },
  'EDATE': {
    method: 'edate',
    parameters: [{
      argumentType: ArgumentTypes.NUMBER,
      minValue: 0
    }, {
      argumentType: ArgumentTypes.NUMBER
    }]
  },
  'DAYS360': {
    method: 'days360',
    parameters: [{
      argumentType: ArgumentTypes.NUMBER,
      minValue: 0
    }, {
      argumentType: ArgumentTypes.NUMBER,
      minValue: 0
    }, {
      argumentType: ArgumentTypes.BOOLEAN,
      defaultValue: false
    }]
  },
  'DATEDIF': {
    method: 'datedif',
    parameters: [{
      argumentType: ArgumentTypes.NUMBER,
      minValue: 0
    }, {
      argumentType: ArgumentTypes.NUMBER,
      minValue: 0
    }, {
      argumentType: ArgumentTypes.STRING
    }]
  },
  'YEARFRAC': {
    method: 'yearfrac',
    parameters: [{
      argumentType: ArgumentTypes.NUMBER,
      minValue: 0
    }, {
      argumentType: ArgumentTypes.NUMBER,
      minValue: 0
    }, {
      argumentType: ArgumentTypes.INTEGER,
      defaultValue: 0,
      minValue: 0,
      maxValue: 4
    }]
  }
};
var weekdayOffsets = new Map([[1, 0], [2, 1], [11, 1], [12, 2], [13, 3], [14, 4], [15, 5], [16, 6], [17, 0]]);