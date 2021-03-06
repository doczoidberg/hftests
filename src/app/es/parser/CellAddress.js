import "core-js/modules/es.array.concat";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 * @license
 * Copyright (c) 2020 Handsoncode. All rights reserved.
 */
import { absoluteSheetReference, simpleCellAddress, simpleColumnAddress, simpleRowAddress } from '../Cell';
import { columnIndexToLabel } from './addressRepresentationConverters';
/** Possible kinds of cell references */

export var CellReferenceType;

(function (CellReferenceType) {
  /** Cell reference with both row and column relative. */
  CellReferenceType["CELL_REFERENCE_RELATIVE"] = "CELL_REFERENCE";
  /** Cell reference with both row and column absolute. */

  CellReferenceType["CELL_REFERENCE_ABSOLUTE"] = "CELL_REFERENCE_ABSOLUTE";
  /** Cell reference with absolute column and relative row. */

  CellReferenceType["CELL_REFERENCE_ABSOLUTE_COL"] = "CELL_REFERENCE_ABSOLUTE_COL";
  /** Cell reference with relative column and absolute row. */

  CellReferenceType["CELL_REFERENCE_ABSOLUTE_ROW"] = "CELL_REFERENCE_ABSOLUTE_ROW";
})(CellReferenceType || (CellReferenceType = {}));

export var CellAddress = /*#__PURE__*/function () {
  function CellAddress(sheet, col, row, type) {
    _classCallCheck(this, CellAddress);

    this.sheet = sheet;
    this.col = col;
    this.row = row;
    this.type = type;
  }

  _createClass(CellAddress, [{
    key: "toSimpleCellAddress",

    /**
     * Converts R0C0 representation of cell address to simple object representation.
     *
     * @param baseAddress - base address for R0C0 shifts
     */
    value: function toSimpleCellAddress(baseAddress) {
      var sheet = absoluteSheetReference(this, baseAddress);

      if (this.type === CellReferenceType.CELL_REFERENCE_ABSOLUTE) {
        return simpleCellAddress(sheet, this.col, this.row);
      } else if (this.type === CellReferenceType.CELL_REFERENCE_ABSOLUTE_ROW) {
        return simpleCellAddress(sheet, baseAddress.col + this.col, this.row);
      } else if (this.type === CellReferenceType.CELL_REFERENCE_ABSOLUTE_COL) {
        return simpleCellAddress(sheet, this.col, baseAddress.row + this.row);
      } else {
        return simpleCellAddress(sheet, baseAddress.col + this.col, baseAddress.row + this.row);
      }
    }
  }, {
    key: "toSimpleColumnAddress",
    value: function toSimpleColumnAddress(baseAddress) {
      var sheet = absoluteSheetReference(this, baseAddress);
      var column = this.col;

      if (this.isColumnRelative()) {
        column += baseAddress.col;
      }

      return simpleColumnAddress(sheet, column);
    }
  }, {
    key: "toSimpleRowAddress",
    value: function toSimpleRowAddress(baseAddress) {
      var sheet = absoluteSheetReference(this, baseAddress);
      var row = this.row;

      if (this.isRowRelative()) {
        row += baseAddress.row;
      }

      return simpleRowAddress(sheet, row);
    }
  }, {
    key: "isRowAbsolute",
    value: function isRowAbsolute() {
      return this.type === CellReferenceType.CELL_REFERENCE_ABSOLUTE || this.type === CellReferenceType.CELL_REFERENCE_ABSOLUTE_ROW;
    }
  }, {
    key: "isColumnAbsolute",
    value: function isColumnAbsolute() {
      return this.type === CellReferenceType.CELL_REFERENCE_ABSOLUTE || this.type === CellReferenceType.CELL_REFERENCE_ABSOLUTE_COL;
    }
  }, {
    key: "isColumnRelative",
    value: function isColumnRelative() {
      return this.type === CellReferenceType.CELL_REFERENCE_RELATIVE || this.type === CellReferenceType.CELL_REFERENCE_ABSOLUTE_ROW;
    }
  }, {
    key: "isRowRelative",
    value: function isRowRelative() {
      return this.type === CellReferenceType.CELL_REFERENCE_RELATIVE || this.type === CellReferenceType.CELL_REFERENCE_ABSOLUTE_COL;
    }
  }, {
    key: "isAbsolute",
    value: function isAbsolute() {
      return this.type === CellReferenceType.CELL_REFERENCE_ABSOLUTE && this.sheet !== null;
    }
  }, {
    key: "shiftedByRows",
    value: function shiftedByRows(numberOfRows) {
      return new CellAddress(this.sheet, this.col, this.row + numberOfRows, this.type);
    }
  }, {
    key: "shiftedByColumns",
    value: function shiftedByColumns(numberOfColumns) {
      return new CellAddress(this.sheet, this.col + numberOfColumns, this.row, this.type);
    }
  }, {
    key: "moved",
    value: function moved(toSheet, toRight, toBottom) {
      var newSheet = this.sheet === null ? null : toSheet;
      return new CellAddress(newSheet, this.col + toRight, this.row + toBottom, this.type);
    }
  }, {
    key: "withAbsoluteSheet",
    value: function withAbsoluteSheet(sheet) {
      return new CellAddress(sheet, this.col, this.row, this.type);
    }
  }, {
    key: "shiftRelativeDimensions",
    value: function shiftRelativeDimensions(toRight, toBottom) {
      var col = this.isColumnAbsolute() ? this.col : this.col + toRight;
      var row = this.isRowAbsolute() ? this.row : this.row + toBottom;
      return new CellAddress(this.sheet, col, row, this.type);
    }
  }, {
    key: "shiftAbsoluteDimensions",
    value: function shiftAbsoluteDimensions(toRight, toBottom) {
      var col = this.isColumnRelative() ? this.col : this.col + toRight;
      var row = this.isRowRelative() ? this.row : this.row + toBottom;
      return new CellAddress(this.sheet, col, row, this.type);
    }
  }, {
    key: "hash",
    value: function hash(withSheet) {
      var sheetPart = withSheet && this.sheet !== null ? "#".concat(this.sheet) : '';

      switch (this.type) {
        case CellReferenceType.CELL_REFERENCE_RELATIVE:
          {
            return "".concat(sheetPart, "#").concat(this.row, "R").concat(this.col);
          }

        case CellReferenceType.CELL_REFERENCE_ABSOLUTE:
          {
            return "".concat(sheetPart, "#").concat(this.row, "A").concat(this.col);
          }

        case CellReferenceType.CELL_REFERENCE_ABSOLUTE_COL:
          {
            return "".concat(sheetPart, "#").concat(this.row, "AC").concat(this.col);
          }

        case CellReferenceType.CELL_REFERENCE_ABSOLUTE_ROW:
          {
            return "".concat(sheetPart, "#").concat(this.row, "AR").concat(this.col);
          }
      }
    }
  }, {
    key: "unparse",
    value: function unparse(baseAddress) {
      var simpleAddress = this.toSimpleCellAddress(baseAddress);
      var column = columnIndexToLabel(simpleAddress.col);
      var rowDollar = this.type === CellReferenceType.CELL_REFERENCE_ABSOLUTE || this.type === CellReferenceType.CELL_REFERENCE_ABSOLUTE_ROW ? '$' : '';
      var colDollar = this.type === CellReferenceType.CELL_REFERENCE_ABSOLUTE || this.type === CellReferenceType.CELL_REFERENCE_ABSOLUTE_COL ? '$' : '';
      return "".concat(colDollar).concat(column).concat(rowDollar).concat(simpleAddress.row + 1);
    }
  }, {
    key: "exceedsSheetSizeLimits",
    value: function exceedsSheetSizeLimits(maxColumns, maxRows) {
      return this.row >= maxRows || this.col >= maxColumns;
    }
  }], [{
    key: "relative",
    value: function relative(sheet, col, row) {
      return new CellAddress(sheet, col, row, CellReferenceType.CELL_REFERENCE_RELATIVE);
    }
  }, {
    key: "absolute",
    value: function absolute(sheet, col, row) {
      return new CellAddress(sheet, col, row, CellReferenceType.CELL_REFERENCE_ABSOLUTE);
    }
  }, {
    key: "absoluteCol",
    value: function absoluteCol(sheet, col, row) {
      return new CellAddress(sheet, col, row, CellReferenceType.CELL_REFERENCE_ABSOLUTE_COL);
    }
  }, {
    key: "absoluteRow",
    value: function absoluteRow(sheet, col, row) {
      return new CellAddress(sheet, col, row, CellReferenceType.CELL_REFERENCE_ABSOLUTE_ROW);
    }
  }]);

  return CellAddress;
}();