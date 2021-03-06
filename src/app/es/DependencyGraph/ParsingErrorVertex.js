function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 * @license
 * Copyright (c) 2020 Handsoncode. All rights reserved.
 */
import { CellError } from '../Cell';
export var ParsingErrorVertex = /*#__PURE__*/function () {
  function ParsingErrorVertex(errors, rawInput) {
    _classCallCheck(this, ParsingErrorVertex);

    this.errors = errors;
    this.rawInput = rawInput;
  }

  _createClass(ParsingErrorVertex, [{
    key: "getCellValue",
    value: function getCellValue() {
      return CellError.parsingError();
    }
  }, {
    key: "getFormula",
    value: function getFormula() {
      return this.rawInput;
    }
  }]);

  return ParsingErrorVertex;
}();