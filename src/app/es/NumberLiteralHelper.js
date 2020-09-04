import "core-js/modules/es.array.concat";
import "core-js/modules/es.number.constructor";
import "core-js/modules/es.regexp.constructor";
import "core-js/modules/es.regexp.exec";
import "core-js/modules/es.regexp.to-string";
import "core-js/modules/es.string.replace";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 * @license
 * Copyright (c) 2020 Handsoncode. All rights reserved.
 */
export var NumberLiteralHelper = /*#__PURE__*/function () {
  function NumberLiteralHelper(config) {
    _classCallCheck(this, NumberLiteralHelper);

    this.config = config;
    var thousandSeparator = this.config.thousandSeparator === '.' ? "\\".concat(this.config.thousandSeparator) : this.config.thousandSeparator;
    var decimalSeparator = this.config.decimalSeparator === '.' ? "\\".concat(this.config.decimalSeparator) : this.config.decimalSeparator;
    this.numberPattern = new RegExp("^([+-]?((".concat(decimalSeparator, "\\d+)|(\\d+(").concat(thousandSeparator, "\\d{3,})*(").concat(decimalSeparator, "\\d+)?)))$"));
    this.allThousandSeparatorsRegex = new RegExp("".concat(thousandSeparator), 'g');
  }

  _createClass(NumberLiteralHelper, [{
    key: "isNumber",
    value: function isNumber(input) {
      var match = this.numberPattern.test(input);
      return match;
    }
  }, {
    key: "numericStringToNumber",
    value: function numericStringToNumber(input) {
      var normalized = input.replace(this.allThousandSeparatorsRegex, '').replace(this.config.decimalSeparator, '.');
      return Number(normalized);
    }
  }]);

  return NumberLiteralHelper;
}();