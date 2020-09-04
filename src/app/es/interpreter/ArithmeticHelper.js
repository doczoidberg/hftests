import "core-js/modules/es.array.includes";
import "core-js/modules/es.number.constructor";
import "core-js/modules/es.object.to-string";
import "core-js/modules/es.regexp.constructor";
import "core-js/modules/es.regexp.exec";
import "core-js/modules/es.regexp.to-string";
import "core-js/modules/es.string.replace";
import "core-js/modules/es.string.trim";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 * @license
 * Copyright (c) 2020 Handsoncode. All rights reserved.
 */
import { CellError, CellValueTypeOrd, EmptyValue, ErrorType, getCellValueType } from '../Cell';
import { collatorFromConfig } from '../StringHelper';
import { SimpleRangeValue } from './InterpreterValue';
export var ArithmeticHelper = /*#__PURE__*/function () {
  function ArithmeticHelper(config, dateTimeHelper, numberLiteralsHelper) {
    var _this = this;

    _classCallCheck(this, ArithmeticHelper);

    this.config = config;
    this.dateTimeHelper = dateTimeHelper;
    this.numberLiteralsHelper = numberLiteralsHelper;

    this.addWithEpsilon = function (left, right) {
      var ret = left + right;

      if (Math.abs(ret) < _this.actualEps * Math.abs(left)) {
        return 0;
      } else {
        return ret;
      }
    };
    /**
     * Adds two numbers
     *
     * Implementation of adding which is used in interpreter.
     *
     * @param left - left operand of addition
     * @param right - right operand of addition
     */


    this.nonstrictadd = function (left, right) {
      if (left instanceof CellError) {
        return left;
      } else if (right instanceof CellError) {
        return right;
      } else if (typeof left === 'number') {
        if (typeof right === 'number') {
          return _this.addWithEpsilon(left, right);
        } else {
          return left;
        }
      } else if (typeof right === 'number') {
        return right;
      } else {
        return 0;
      }
    };
    /**
     * Subtracts two numbers
     *
     * Implementation of subtracting which is used in interpreter.
     *
     * @param left - left operand of subtraction
     * @param right - right operand of subtraction
     * @param eps - precision of comparison
     */


    this.subtract = function (left, right) {
      var ret = left - right;

      if (Math.abs(ret) < _this.actualEps * Math.abs(left)) {
        return 0;
      } else {
        return ret;
      }
    };

    this.collator = collatorFromConfig(config);
    this.actualEps = config.smartRounding ? config.precisionEpsilon : 0;
  }

  _createClass(ArithmeticHelper, [{
    key: "eqMatcherFunction",
    value: function eqMatcherFunction(pattern) {
      var _this2 = this;

      var regexp = this.buildRegex(pattern);
      return function (cellValue) {
        return typeof cellValue === 'string' && regexp.test(_this2.normalizeString(cellValue));
      };
    }
  }, {
    key: "neqMatcherFunction",
    value: function neqMatcherFunction(pattern) {
      var _this3 = this;

      var regexp = this.buildRegex(pattern);
      return function (cellValue) {
        return typeof cellValue !== 'string' || !regexp.test(_this3.normalizeString(cellValue));
      };
    }
  }, {
    key: "searchString",
    value: function searchString(pattern, text) {
      var _a;

      var regexp = this.buildRegex(pattern, false);
      var result = regexp.exec(text);
      return (_a = result === null || result === void 0 ? void 0 : result.index) !== null && _a !== void 0 ? _a : -1;
    }
  }, {
    key: "requiresRegex",
    value: function requiresRegex(pattern) {
      if (!this.config.useRegularExpressions && !this.config.useWildcards) {
        return !this.config.matchWholeCell;
      }

      for (var i = 0; i < pattern.length; i++) {
        var c = pattern.charAt(i);

        if (isWildcard(c) || this.config.useRegularExpressions && needsEscape(c)) {
          return true;
        }
      }

      return false;
    }
  }, {
    key: "buildRegex",
    value: function buildRegex(pattern) {
      var matchWholeCell = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
      pattern = this.normalizeString(pattern);
      var regexpStr;
      var useWildcards = this.config.useWildcards;
      var useRegularExpressions = this.config.useRegularExpressions;

      if (useRegularExpressions) {
        try {
          RegExp(pattern);
        } catch (e) {
          useRegularExpressions = false;
          useWildcards = false;
        }
      }

      if (useRegularExpressions) {
        regexpStr = escapeNoCharacters(pattern, this.config.caseSensitive);
      } else if (useWildcards) {
        regexpStr = escapeNonWildcards(pattern, this.config.caseSensitive);
      } else {
        regexpStr = escapeAllCharacters(pattern, this.config.caseSensitive);
      }

      if (this.config.matchWholeCell && matchWholeCell) {
        return RegExp('^(' + regexpStr + ')$');
      } else {
        return RegExp(regexpStr);
      }
    }
  }, {
    key: "normalizeString",
    value: function normalizeString(str) {
      if (!this.config.caseSensitive) {
        str = str.toLowerCase();
      }

      if (!this.config.accentSensitive) {
        str = str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
      }

      return str;
    }
  }, {
    key: "compare",
    value: function compare(left, right) {
      if (typeof left === 'string' || typeof right === 'string') {
        var leftTmp = typeof left === 'string' ? this.dateTimeHelper.dateStringToDateNumber(left) : left;
        var rightTmp = typeof right === 'string' ? this.dateTimeHelper.dateStringToDateNumber(right) : right;

        if (typeof leftTmp === 'number' && typeof rightTmp === 'number') {
          return this.floatCmp(leftTmp, rightTmp);
        }
      }

      if (left === EmptyValue) {
        left = coerceEmptyToValue(right);
      } else if (right === EmptyValue) {
        right = coerceEmptyToValue(left);
      }

      if (typeof left === 'string' && typeof right === 'string') {
        return this.stringCmp(left, right);
      } else if (typeof left === 'boolean' && typeof right === 'boolean') {
        return numberCmp(coerceBooleanToNumber(left), coerceBooleanToNumber(right));
      } else if (typeof left === 'number' && typeof right === 'number') {
        return this.floatCmp(left, right);
      } else if (left === EmptyValue && right === EmptyValue) {
        return 0;
      } else {
        return numberCmp(CellValueTypeOrd(getCellValueType(left)), CellValueTypeOrd(getCellValueType(right)));
      }
    }
  }, {
    key: "floatCmp",
    value: function floatCmp(left, right) {
      var mod = 1 + this.actualEps;

      if (right >= 0 && left * mod >= right && left <= right * mod) {
        return 0;
      } else if (right <= 0 && left * mod <= right && left >= right * mod) {
        return 0;
      } else if (left > right) {
        return 1;
      } else {
        return -1;
      }
    }
  }, {
    key: "stringCmp",
    value: function stringCmp(left, right) {
      return this.collator.compare(left, right);
    }
  }, {
    key: "coerceScalarToNumberOrError",
    value: function coerceScalarToNumberOrError(arg) {
      var _a;

      if (arg instanceof CellError) {
        return arg;
      }

      return (_a = this.coerceToMaybeNumber(arg)) !== null && _a !== void 0 ? _a : new CellError(ErrorType.VALUE);
    }
  }, {
    key: "coerceToMaybeNumber",
    value: function coerceToMaybeNumber(arg) {
      var _a;

      return (_a = this.coerceNonDateScalarToMaybeNumber(arg)) !== null && _a !== void 0 ? _a : typeof arg === 'string' ? this.dateTimeHelper.dateStringToDateNumber(arg) : undefined;
    }
  }, {
    key: "coerceNonDateScalarToMaybeNumber",
    value: function coerceNonDateScalarToMaybeNumber(arg) {
      if (arg === EmptyValue) {
        return 0;
      } else if (typeof arg === 'string' && this.numberLiteralsHelper.isNumber(arg)) {
        return this.numberLiteralsHelper.numericStringToNumber(arg);
      } else {
        if (typeof arg === 'string' && arg.length > 0 && arg.trim() === '') {
          return undefined;
        }

        var coercedNumber = Number(arg);

        if (isNaN(coercedNumber)) {
          return undefined;
        } else {
          return coercedNumber;
        }
      }
    }
  }]);

  return ArithmeticHelper;
}();
export function coerceToRange(arg) {
  if (arg instanceof SimpleRangeValue) {
    return arg;
  } else {
    return SimpleRangeValue.fromScalar(arg);
  }
}
export function coerceToRangeNumbersOrError(arg) {
  if (arg instanceof SimpleRangeValue && arg.hasOnlyNumbers() || arg instanceof CellError) {
    return arg;
  } else if (typeof arg === 'number') {
    return SimpleRangeValue.fromScalar(arg);
  } else {
    return null;
  }
}
export function coerceBooleanToNumber(arg) {
  return Number(arg);
}
export function coerceEmptyToValue(arg) {
  if (typeof arg === 'string') {
    return '';
  } else if (typeof arg === 'number') {
    return 0;
  } else if (typeof arg === 'boolean') {
    return false;
  } else {
    return EmptyValue;
  }
}
/**
 * Coerce scalar value to boolean if possible, or error if value is an error
 *
 * @param arg
 */

export function coerceScalarToBoolean(arg) {
  if (arg instanceof CellError || typeof arg === 'boolean') {
    return arg;
  } else if (arg === EmptyValue) {
    return false;
  } else if (typeof arg === 'number') {
    return arg !== 0;
  } else {
    var argUppered = arg.toUpperCase();

    if (argUppered === 'TRUE') {
      return true;
    } else if (argUppered === 'FALSE') {
      return false;
    } else if (argUppered === '') {
      return false;
    } else {
      return undefined;
    }
  }
}
export function coerceScalarToString(arg) {
  if (arg instanceof CellError || typeof arg === 'string') {
    return arg;
  } else if (arg === EmptyValue) {
    return '';
  } else if (typeof arg === 'number') {
    return arg.toString();
  } else {
    return arg ? 'TRUE' : 'FALSE';
  }
}
export function divide(left, right) {
  if (right === 0) {
    return new CellError(ErrorType.DIV_BY_ZERO);
  } else {
    return left / right;
  }
}
/**
 * Returns max from two numbers
 *
 * Implementation of max function which is used in interpreter.
 *
 * Errors are propagated, non-numerical values are neutral.
 *
 * @param left - left operand of addition
 * @param right - right operand of addition
 */

export function max(left, right) {
  if (left instanceof CellError) {
    return left;
  }

  if (right instanceof CellError) {
    return right;
  }

  if (typeof left === 'number') {
    if (typeof right === 'number') {
      return Math.max(left, right);
    } else {
      return left;
    }
  } else if (typeof right === 'number') {
    return right;
  } else {
    return Number.NEGATIVE_INFINITY;
  }
}
export function maxa(left, right) {
  if (left instanceof CellError) {
    return left;
  }

  if (right instanceof CellError) {
    return right;
  }

  if (typeof left === 'boolean') {
    left = coerceBooleanToNumber(left);
  }

  if (typeof right === 'boolean') {
    right = coerceBooleanToNumber(right);
  }

  if (typeof left === 'number') {
    if (typeof right === 'number') {
      return Math.max(left, right);
    } else {
      return left;
    }
  } else if (typeof right === 'number') {
    return right;
  } else {
    return Number.NEGATIVE_INFINITY;
  }
}
/**
 * Returns min from two numbers
 *
 * Implementation of min function which is used in interpreter.
 *
 * Errors are propagated, non-numerical values are neutral.
 *
 * @param left - left operand of addition
 * @param right - right operand of addition
 */

export function min(left, right) {
  if (left instanceof CellError) {
    return left;
  }

  if (right instanceof CellError) {
    return right;
  }

  if (typeof left === 'number') {
    if (typeof right === 'number') {
      return Math.min(left, right);
    } else {
      return left;
    }
  } else if (typeof right === 'number') {
    return right;
  } else {
    return Number.POSITIVE_INFINITY;
  }
}
export function mina(left, right) {
  if (left instanceof CellError) {
    return left;
  }

  if (right instanceof CellError) {
    return right;
  }

  if (typeof left === 'boolean') {
    left = coerceBooleanToNumber(left);
  }

  if (typeof right === 'boolean') {
    right = coerceBooleanToNumber(right);
  }

  if (typeof left === 'number') {
    if (typeof right === 'number') {
      return Math.min(left, right);
    } else {
      return left;
    }
  } else if (typeof right === 'number') {
    return right;
  } else {
    return Number.POSITIVE_INFINITY;
  }
}
export function numberCmp(left, right) {
  if (left > right) {
    return 1;
  } else if (left < right) {
    return -1;
  } else {
    return 0;
  }
}
export function isNumberOverflow(arg) {
  return isNaN(arg) || arg === Infinity || arg === -Infinity;
}
export function fixNegativeZero(arg) {
  if (arg === 0) {
    return 0;
  } else {
    return arg;
  }
}

function isWildcard(c) {
  return ['*', '?'].includes(c);
}

var escapedCharacters = ['{', '}', '[', ']', '(', ')', '<', '>', '=', '.', '+', '-', ',', '\\', '$', '^', '!'];

function needsEscape(c) {
  return escapedCharacters.includes(c);
}

function escapeNonWildcards(pattern, caseSensitive) {
  var str = '';

  for (var i = 0; i < pattern.length; i++) {
    var c = pattern.charAt(i);

    if (c === '~') {
      if (i == pattern.length - 1) {
        str += '~';
        continue;
      }

      var d = pattern.charAt(i + 1);

      if (isWildcard(d) || needsEscape(d)) {
        str += '\\' + d;
        i++;
      } else {
        str += d;
        i++;
      }
    } else if (isWildcard(c)) {
      str += '.' + c;
    } else if (needsEscape(c)) {
      str += '\\' + c;
    } else if (caseSensitive) {
      str += c;
    } else {
      str += c.toLowerCase();
    }
  }

  return str;
}

function escapeAllCharacters(pattern, caseSensitive) {
  var str = '';

  for (var i = 0; i < pattern.length; i++) {
    var c = pattern.charAt(i);

    if (isWildcard(c) || needsEscape(c)) {
      str += '\\' + c;
    } else if (caseSensitive) {
      str += c;
    } else {
      str += c.toLowerCase();
    }
  }

  return str;
}

function escapeNoCharacters(pattern, caseSensitive) {
  var str = '';

  for (var i = 0; i < pattern.length; i++) {
    var c = pattern.charAt(i);

    if (isWildcard(c) || needsEscape(c)) {
      str += c;
    } else if (caseSensitive) {
      str += c;
    } else {
      str += c.toLowerCase();
    }
  }

  return str;
}