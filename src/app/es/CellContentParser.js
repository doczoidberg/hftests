import "core-js/modules/es.array.slice";
import "core-js/modules/es.string.ends-with";
import "core-js/modules/es.string.starts-with";
import "core-js/modules/es.string.trim";

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * @license
 * Copyright (c) 2020 Handsoncode. All rights reserved.
 */
import { CellError, ErrorType } from './Cell';
import { UnableToParseError } from './errors';
import { fixNegativeZero, isNumberOverflow } from './interpreter/ArithmeticHelper';
export var CellContent;

(function (CellContent) {
  var Number = function Number(value) {
    _classCallCheck(this, Number);

    this.value = value;
    this.value = fixNegativeZero(this.value);
  };

  CellContent.Number = Number;

  var String = function String(value) {
    _classCallCheck(this, String);

    this.value = value;
  };

  CellContent.String = String;

  var Boolean = function Boolean(value) {
    _classCallCheck(this, Boolean);

    this.value = value;
  };

  CellContent.Boolean = Boolean;

  var Empty = /*#__PURE__*/function () {
    function Empty() {
      _classCallCheck(this, Empty);
    }

    _createClass(Empty, null, [{
      key: "getSingletonInstance",
      value: function getSingletonInstance() {
        if (!Empty.instance) {
          Empty.instance = new Empty();
        }

        return Empty.instance;
      }
    }]);

    return Empty;
  }();

  CellContent.Empty = Empty;

  var Formula = function Formula(formula) {
    _classCallCheck(this, Formula);

    this.formula = formula;
  };

  CellContent.Formula = Formula;

  var MatrixFormula = /*#__PURE__*/function () {
    function MatrixFormula(formula) {
      _classCallCheck(this, MatrixFormula);

      this.formula = formula;
    }

    _createClass(MatrixFormula, [{
      key: "formulaWithBraces",
      value: function formulaWithBraces() {
        return '{' + this.formula + '}';
      }
    }]);

    return MatrixFormula;
  }();

  CellContent.MatrixFormula = MatrixFormula;

  var Error = function Error(errorType) {
    _classCallCheck(this, Error);

    this.value = new CellError(errorType);
  };

  CellContent.Error = Error;
})(CellContent || (CellContent = {}));
/**
 * Checks whether string looks like formula or not.
 *
 * @param text - formula
 */


export function isFormula(text) {
  return text.startsWith('=');
}
export function isBoolean(text) {
  var tl = text.toLowerCase();
  return tl === 'true' || tl === 'false';
}
export function isMatrix(text) {
  if (typeof text !== 'string') {
    return false;
  }

  return text.length > 1 && text.startsWith('{') && text.endsWith('}');
}
export function isError(text, errorMapping) {
  var upperCased = text.toUpperCase();
  var errorRegex = /#[A-Za-z0-9\/]+[?!]?/;
  return errorRegex.test(upperCased) && Object.prototype.hasOwnProperty.call(errorMapping, upperCased);
}
export var CellContentParser = /*#__PURE__*/function () {
  function CellContentParser(config, dateHelper, numberLiteralsHelper) {
    _classCallCheck(this, CellContentParser);

    this.config = config;
    this.dateHelper = dateHelper;
    this.numberLiteralsHelper = numberLiteralsHelper;
  }

  _createClass(CellContentParser, [{
    key: "parse",
    value: function parse(content) {
      if (content === undefined || content === null) {
        return CellContent.Empty.getSingletonInstance();
      } else if (typeof content === 'number') {
        if (isNumberOverflow(content)) {
          return new CellContent.Error(ErrorType.NUM);
        } else {
          return new CellContent.Number(content);
        }
      } else if (typeof content === 'boolean') {
        return new CellContent.Boolean(content);
      } else if (content instanceof Date) {
        return new CellContent.Number(this.dateHelper.dateToNumber({
          day: content.getDate(),
          month: content.getMonth() + 1,
          year: content.getFullYear()
        }));
      } else if (typeof content === 'string') {
        if (isBoolean(content)) {
          return new CellContent.Boolean(content.toLowerCase() === 'true');
        } else if (isMatrix(content)) {
          return new CellContent.MatrixFormula(content.substr(1, content.length - 2));
        } else if (isFormula(content)) {
          return new CellContent.Formula(content);
        } else if (isError(content, this.config.errorMapping)) {
          return new CellContent.Error(this.config.errorMapping[content.toUpperCase()]);
        } else {
          var trimmedContent = content.trim();

          if (this.numberLiteralsHelper.isNumber(trimmedContent)) {
            return new CellContent.Number(this.numberLiteralsHelper.numericStringToNumber(trimmedContent));
          }

          var parsedDateNumber = this.dateHelper.dateStringToDateNumber(trimmedContent);

          if (parsedDateNumber !== undefined) {
            return new CellContent.Number(parsedDateNumber);
          } else {
            return new CellContent.String(content.startsWith('\'') ? content.slice(1) : content);
          }
        }
      } else {
        throw new UnableToParseError(content);
      }
    }
  }]);

  return CellContentParser;
}();