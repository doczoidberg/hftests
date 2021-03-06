import "core-js/modules/es.array.concat";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 * @license
 * Copyright (c) 2020 Handsoncode. All rights reserved.
 */
import { absoluteSheetReference, simpleRowAddress } from '../Cell';
import { ReferenceType } from './ColumnAddress';
export var RowAddress = /*#__PURE__*/function () {
  function RowAddress(sheet, row, type) {
    _classCallCheck(this, RowAddress);

    this.sheet = sheet;
    this.row = row;
    this.type = type;
  }

  _createClass(RowAddress, [{
    key: "isRowAbsolute",
    value: function isRowAbsolute() {
      return this.type === ReferenceType.ABSOLUTE;
    }
  }, {
    key: "isRowRelative",
    value: function isRowRelative() {
      return this.type === ReferenceType.RELATIVE;
    }
  }, {
    key: "isAbsolute",
    value: function isAbsolute() {
      return this.type === ReferenceType.ABSOLUTE && this.sheet !== null;
    }
  }, {
    key: "moved",
    value: function moved(toSheet, toRight, toBottom) {
      var newSheet = this.sheet === null ? null : toSheet;
      return new RowAddress(newSheet, this.row + toBottom, this.type);
    }
  }, {
    key: "shiftedByRows",
    value: function shiftedByRows(numberOfColumns) {
      return new RowAddress(this.sheet, this.row + numberOfColumns, this.type);
    }
  }, {
    key: "toSimpleRowAddress",
    value: function toSimpleRowAddress(baseAddress) {
      var sheet = absoluteSheetReference(this, baseAddress);
      var row = this.row;

      if (this.isRowRelative()) {
        row = baseAddress.row + this.row;
      }

      return simpleRowAddress(sheet, row);
    }
  }, {
    key: "shiftRelativeDimensions",
    value: function shiftRelativeDimensions(toRight, toBottom) {
      var row = this.isRowRelative() ? this.row + toBottom : this.row;
      return new RowAddress(this.sheet, row, this.type);
    }
  }, {
    key: "shiftAbsoluteDimensions",
    value: function shiftAbsoluteDimensions(toRight, toBottom) {
      var row = this.isRowAbsolute() ? this.row + toBottom : this.row;
      return new RowAddress(this.sheet, row, this.type);
    }
  }, {
    key: "withAbsoluteSheet",
    value: function withAbsoluteSheet(sheet) {
      return new RowAddress(sheet, this.row, this.type);
    }
  }, {
    key: "hash",
    value: function hash(withSheet) {
      var sheetPart = withSheet && this.sheet !== null ? "#".concat(this.sheet) : '';

      switch (this.type) {
        case ReferenceType.RELATIVE:
          {
            return "".concat(sheetPart, "#ROWR").concat(this.row);
          }

        case ReferenceType.ABSOLUTE:
          {
            return "".concat(sheetPart, "#ROWA").concat(this.row);
          }
      }
    }
  }, {
    key: "unparse",
    value: function unparse(baseAddress) {
      var simpleAddress = this.toSimpleRowAddress(baseAddress);
      var dollar = this.type === ReferenceType.ABSOLUTE ? '$' : '';
      return "".concat(dollar).concat(simpleAddress.row + 1);
    }
  }, {
    key: "exceedsSheetSizeLimits",
    value: function exceedsSheetSizeLimits(maxRows) {
      return this.row >= maxRows;
    }
  }], [{
    key: "absolute",
    value: function absolute(sheet, row) {
      return new RowAddress(sheet, row, ReferenceType.ABSOLUTE);
    }
  }, {
    key: "relative",
    value: function relative(sheet, row) {
      return new RowAddress(sheet, row, ReferenceType.RELATIVE);
    }
  }]);

  return RowAddress;
}();