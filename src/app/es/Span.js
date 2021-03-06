import "regenerator-runtime/runtime";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 * @license
 * Copyright (c) 2020 Handsoncode. All rights reserved.
 */

/*
 * A class representing a set of rows in specific sheet
 */
export var RowsSpan = /*#__PURE__*/function () {
  function RowsSpan(sheet, rowStart, rowEnd) {
    _classCallCheck(this, RowsSpan);

    this.sheet = sheet;
    this.rowStart = rowStart;
    this.rowEnd = rowEnd;

    if (rowStart < 0) {
      throw Error('Starting row cant be less than 0');
    }

    if (rowEnd < rowStart) {
      throw Error('Row span cant end before start');
    }
  }

  _createClass(RowsSpan, [{
    key: "rows",
    value: /*#__PURE__*/regeneratorRuntime.mark(function rows() {
      var col;
      return regeneratorRuntime.wrap(function rows$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              col = this.rowStart;

            case 1:
              if (!(col <= this.rowEnd)) {
                _context.next = 7;
                break;
              }

              _context.next = 4;
              return col;

            case 4:
              ++col;
              _context.next = 1;
              break;

            case 7:
            case "end":
              return _context.stop();
          }
        }
      }, rows, this);
    })
  }, {
    key: "intersect",
    value: function intersect(otherSpan) {
      if (this.sheet !== otherSpan.sheet) {
        throw Error('Can\'t intersect spans from different sheets');
      }

      var start = Math.max(this.rowStart, otherSpan.rowStart);
      var end = Math.min(this.rowEnd, otherSpan.rowEnd);

      if (start > end) {
        return null;
      }

      return new RowsSpan(this.sheet, start, end);
    }
  }, {
    key: "firstRow",
    value: function firstRow() {
      return new RowsSpan(this.sheet, this.rowStart, this.rowStart);
    }
  }, {
    key: "numberOfRows",
    get: function get() {
      return this.rowEnd - this.rowStart + 1;
    }
  }, {
    key: "start",
    get: function get() {
      return this.rowStart;
    }
  }, {
    key: "end",
    get: function get() {
      return this.rowEnd;
    }
  }], [{
    key: "fromNumberOfRows",
    value: function fromNumberOfRows(sheet, rowStart, numberOfRows) {
      return new RowsSpan(sheet, rowStart, rowStart + numberOfRows - 1);
    }
  }, {
    key: "fromRowStartAndEnd",
    value: function fromRowStartAndEnd(sheet, rowStart, rowEnd) {
      return new RowsSpan(sheet, rowStart, rowEnd);
    }
  }]);

  return RowsSpan;
}();
/*
 * A class representing a set of columns in specific sheet
 */

export var ColumnsSpan = /*#__PURE__*/function () {
  function ColumnsSpan(sheet, columnStart, columnEnd) {
    _classCallCheck(this, ColumnsSpan);

    this.sheet = sheet;
    this.columnStart = columnStart;
    this.columnEnd = columnEnd;

    if (columnStart < 0) {
      throw Error('Starting column cant be less than 0');
    }

    if (columnEnd < columnStart) {
      throw Error('Column span cant end before start');
    }
  }

  _createClass(ColumnsSpan, [{
    key: "columns",
    value: /*#__PURE__*/regeneratorRuntime.mark(function columns() {
      var col;
      return regeneratorRuntime.wrap(function columns$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              col = this.columnStart;

            case 1:
              if (!(col <= this.columnEnd)) {
                _context2.next = 7;
                break;
              }

              _context2.next = 4;
              return col;

            case 4:
              ++col;
              _context2.next = 1;
              break;

            case 7:
            case "end":
              return _context2.stop();
          }
        }
      }, columns, this);
    })
  }, {
    key: "intersect",
    value: function intersect(otherSpan) {
      if (this.sheet !== otherSpan.sheet) {
        throw Error('Can\'t intersect spans from different sheets');
      }

      var start = Math.max(this.columnStart, otherSpan.columnStart);
      var end = Math.min(this.columnEnd, otherSpan.columnEnd);

      if (start > end) {
        return null;
      }

      return new ColumnsSpan(this.sheet, start, end);
    }
  }, {
    key: "firstColumn",
    value: function firstColumn() {
      return new ColumnsSpan(this.sheet, this.columnStart, this.columnStart);
    }
  }, {
    key: "numberOfColumns",
    get: function get() {
      return this.columnEnd - this.columnStart + 1;
    }
  }, {
    key: "start",
    get: function get() {
      return this.columnStart;
    }
  }, {
    key: "end",
    get: function get() {
      return this.columnEnd;
    }
  }], [{
    key: "fromNumberOfColumns",
    value: function fromNumberOfColumns(sheet, columnStart, numberOfColumns) {
      return new ColumnsSpan(sheet, columnStart, columnStart + numberOfColumns - 1);
    }
  }, {
    key: "fromColumnStartAndEnd",
    value: function fromColumnStartAndEnd(sheet, columnStart, columnEnd) {
      return new ColumnsSpan(sheet, columnStart, columnEnd);
    }
  }]);

  return ColumnsSpan;
}();