import "core-js/modules/es.symbol";
import "core-js/modules/es.symbol.description";
import "core-js/modules/es.symbol.iterator";
import "core-js/modules/es.array.iterator";
import "core-js/modules/es.object.to-string";
import "core-js/modules/es.string.iterator";
import "core-js/modules/web.dom-collections.iterator";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

/**
 * @license
 * Copyright (c) 2020 Handsoncode. All rights reserved.
 */
import { FormulaCellVertex, MatrixVertex, ParsingErrorVertex, ValueCellVertex } from './DependencyGraph';
import { SimpleRangeValue } from './interpreter/InterpreterValue';
/**
 * Possible errors returned by our interpreter.
 */

export var ErrorType;

(function (ErrorType) {
  /** Division by zero. */
  ErrorType["DIV_BY_ZERO"] = "DIV_BY_ZERO";
  /** Unknown function name. */

  ErrorType["NAME"] = "NAME";
  ErrorType["VALUE"] = "VALUE";
  ErrorType["NUM"] = "NUM";
  ErrorType["NA"] = "NA";
  /** Cyclic dependency. */

  ErrorType["CYCLE"] = "CYCLE";
  /* Wrong address reference. */

  ErrorType["REF"] = "REF";
  /* Generic error */

  ErrorType["ERROR"] = "ERROR";
})(ErrorType || (ErrorType = {}));

export var EmptyValue = Symbol('Empty value');
export var CellType;

(function (CellType) {
  CellType["FORMULA"] = "FORMULA";
  CellType["VALUE"] = "VALUE";
  CellType["MATRIX"] = "MATRIX";
  CellType["EMPTY"] = "EMPTY";
})(CellType || (CellType = {}));

export var getCellType = function getCellType(vertex) {
  if (vertex instanceof FormulaCellVertex || vertex instanceof ParsingErrorVertex) {
    return CellType.FORMULA;
  }

  if (vertex instanceof ValueCellVertex || vertex instanceof MatrixVertex && vertex.isNumeric()) {
    return CellType.VALUE;
  }

  if (vertex instanceof MatrixVertex && vertex.isFormula()) {
    return CellType.MATRIX;
  }

  return CellType.EMPTY;
};
export var CellValueType;

(function (CellValueType) {
  CellValueType["EMPTY"] = "EMPTY";
  CellValueType["NUMBER"] = "NUMBER";
  CellValueType["STRING"] = "STRING";
  CellValueType["BOOLEAN"] = "BOOLEAN";
  CellValueType["ERROR"] = "ERROR";
})(CellValueType || (CellValueType = {}));

export var CellValueTypeOrd = function CellValueTypeOrd(arg) {
  switch (arg) {
    case CellValueType.EMPTY:
      return 0;

    case CellValueType.NUMBER:
      return 1;

    case CellValueType.STRING:
      return 2;

    case CellValueType.BOOLEAN:
      return 3;

    case CellValueType.ERROR:
      return 4;
  }
};
export var getCellValueType = function getCellValueType(cellValue) {
  if (cellValue === EmptyValue) {
    return CellValueType.EMPTY;
  }

  if (cellValue instanceof CellError || cellValue instanceof SimpleRangeValue) {
    return CellValueType.ERROR;
  }

  switch (_typeof(cellValue)) {
    case 'string':
      return CellValueType.STRING;

    case 'number':
      return CellValueType.NUMBER;

    case 'boolean':
      return CellValueType.BOOLEAN;
  }

  throw new Error('Cell value not computed');
};
export var CellError = /*#__PURE__*/function () {
  function CellError(type, message) {
    _classCallCheck(this, CellError);

    this.type = type;
    this.message = message;
  }

  _createClass(CellError, null, [{
    key: "parsingError",
    value: function parsingError() {
      return new CellError(ErrorType.ERROR, 'Parsing error');
    }
  }]);

  return CellError;
}();
export var simpleRowAddress = function simpleRowAddress(sheet, row) {
  return {
    sheet: sheet,
    row: row
  };
};
export var simpleColumnAddress = function simpleColumnAddress(sheet, col) {
  return {
    sheet: sheet,
    col: col
  };
};
export var simpleCellAddress = function simpleCellAddress(sheet, col, row) {
  return {
    sheet: sheet,
    col: col,
    row: row
  };
};
export var invalidSimpleCellAddress = function invalidSimpleCellAddress(address) {
  return address.col < 0 || address.row < 0;
};
export var movedSimpleCellAddress = function movedSimpleCellAddress(address, toSheet, toRight, toBottom) {
  return simpleCellAddress(toSheet, address.col + toRight, address.row + toBottom);
};
export var absoluteSheetReference = function absoluteSheetReference(address, baseAddress) {
  return address.sheet === null ? baseAddress.sheet : address.sheet;
};