import "core-js/modules/es.function.name";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 * @license
 * Copyright (c) 2020 Handsoncode. All rights reserved.
 */
import { AbsoluteCellRange, AbsoluteColumnRange, AbsoluteRowRange } from '../AbsoluteCellRange';
export var AddressDependency = /*#__PURE__*/function () {
  function AddressDependency(dependency) {
    _classCallCheck(this, AddressDependency);

    this.dependency = dependency;
  }

  _createClass(AddressDependency, [{
    key: "absolutize",
    value: function absolutize(baseAddress) {
      return this.dependency.toSimpleCellAddress(baseAddress);
    }
  }]);

  return AddressDependency;
}();
export var CellRangeDependency = /*#__PURE__*/function () {
  function CellRangeDependency(start, end) {
    _classCallCheck(this, CellRangeDependency);

    this.start = start;
    this.end = end;
  }

  _createClass(CellRangeDependency, [{
    key: "absolutize",
    value: function absolutize(baseAddress) {
      return new AbsoluteCellRange(this.start.toSimpleCellAddress(baseAddress), this.end.toSimpleCellAddress(baseAddress));
    }
  }]);

  return CellRangeDependency;
}();
export var ColumnRangeDependency = /*#__PURE__*/function () {
  function ColumnRangeDependency(start, end) {
    _classCallCheck(this, ColumnRangeDependency);

    this.start = start;
    this.end = end;
  }

  _createClass(ColumnRangeDependency, [{
    key: "absolutize",
    value: function absolutize(baseAddress) {
      var start = this.start.toSimpleColumnAddress(baseAddress);
      var end = this.end.toSimpleColumnAddress(baseAddress);
      return new AbsoluteColumnRange(start.sheet, start.col, end.col);
    }
  }]);

  return ColumnRangeDependency;
}();
export var RowRangeDependency = /*#__PURE__*/function () {
  function RowRangeDependency(start, end) {
    _classCallCheck(this, RowRangeDependency);

    this.start = start;
    this.end = end;
  }

  _createClass(RowRangeDependency, [{
    key: "absolutize",
    value: function absolutize(baseAddress) {
      var start = this.start.toSimpleRowAddress(baseAddress);
      var end = this.end.toSimpleRowAddress(baseAddress);
      return new AbsoluteRowRange(start.sheet, start.row, end.row);
    }
  }]);

  return RowRangeDependency;
}();
export var NamedExpressionDependency = /*#__PURE__*/function () {
  function NamedExpressionDependency(name) {
    _classCallCheck(this, NamedExpressionDependency);

    this.name = name;
  }

  _createClass(NamedExpressionDependency, [{
    key: "absolutize",
    value: function absolutize(_baseAddress) {
      return this;
    }
  }]);

  return NamedExpressionDependency;
}();