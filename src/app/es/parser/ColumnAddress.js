import "core-js/modules/es.array.concat";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 * @license
 * Copyright (c) 2020 Handsoncode. All rights reserved.
 */
import { absoluteSheetReference, simpleColumnAddress } from '../Cell';
import { columnIndexToLabel } from './addressRepresentationConverters';
export var ReferenceType;

(function (ReferenceType) {
  ReferenceType["RELATIVE"] = "RELATIVE";
  ReferenceType["ABSOLUTE"] = "ABSOLUTE";
})(ReferenceType || (ReferenceType = {}));

export var ColumnAddress = /*#__PURE__*/function () {
  function ColumnAddress(sheet, col, type) {
    _classCallCheck(this, ColumnAddress);

    this.sheet = sheet;
    this.col = col;
    this.type = type;
  }

  _createClass(ColumnAddress, [{
    key: "isColumnAbsolute",
    value: function isColumnAbsolute() {
      return this.type === ReferenceType.ABSOLUTE;
    }
  }, {
    key: "isColumnRelative",
    value: function isColumnRelative() {
      return this.type === ReferenceType.RELATIVE;
    }
  }, {
    key: "isAbsolute",
    value: function isAbsolute() {
      return this.type === ReferenceType.ABSOLUTE && this.sheet !== null;
    }
  }, {
    key: "moved",
    value: function moved(toSheet, toRight, _toBottom) {
      var newSheet = this.sheet === null ? null : toSheet;
      return new ColumnAddress(newSheet, this.col + toRight, this.type);
    }
  }, {
    key: "shiftedByColumns",
    value: function shiftedByColumns(numberOfColumns) {
      return new ColumnAddress(this.sheet, this.col + numberOfColumns, this.type);
    }
  }, {
    key: "toSimpleColumnAddress",
    value: function toSimpleColumnAddress(baseAddress) {
      var sheet = absoluteSheetReference(this, baseAddress);
      var column = this.col;

      if (this.isColumnRelative()) {
        column = baseAddress.col + this.col;
      }

      return simpleColumnAddress(sheet, column);
    }
  }, {
    key: "shiftRelativeDimensions",
    value: function shiftRelativeDimensions(toRight, _toBottom) {
      var col = this.isColumnRelative() ? this.col + toRight : this.col;
      return new ColumnAddress(this.sheet, col, this.type);
    }
  }, {
    key: "shiftAbsoluteDimensions",
    value: function shiftAbsoluteDimensions(toRight, _toBottom) {
      var col = this.isColumnAbsolute() ? this.col + toRight : this.col;
      return new ColumnAddress(this.sheet, col, this.type);
    }
  }, {
    key: "withAbsoluteSheet",
    value: function withAbsoluteSheet(sheet) {
      return new ColumnAddress(sheet, this.col, this.type);
    }
  }, {
    key: "hash",
    value: function hash(withSheet) {
      var sheetPart = withSheet && this.sheet !== null ? "#".concat(this.sheet) : '';

      switch (this.type) {
        case ReferenceType.RELATIVE:
          {
            return "".concat(sheetPart, "#COLR").concat(this.col);
          }

        case ReferenceType.ABSOLUTE:
          {
            return "".concat(sheetPart, "#COLA").concat(this.col);
          }
      }
    }
  }, {
    key: "unparse",
    value: function unparse(baseAddress) {
      var simpleAddress = this.toSimpleColumnAddress(baseAddress);
      var column = columnIndexToLabel(simpleAddress.col);
      var dollar = this.type === ReferenceType.ABSOLUTE ? '$' : '';
      return "".concat(dollar).concat(column);
    }
  }, {
    key: "exceedsSheetSizeLimits",
    value: function exceedsSheetSizeLimits(maxColumns) {
      return this.col >= maxColumns;
    }
  }], [{
    key: "absolute",
    value: function absolute(sheet, column) {
      return new ColumnAddress(sheet, column, ReferenceType.ABSOLUTE);
    }
  }, {
    key: "relative",
    value: function relative(sheet, column) {
      return new ColumnAddress(sheet, column, ReferenceType.RELATIVE);
    }
  }]);

  return ColumnAddress;
}();