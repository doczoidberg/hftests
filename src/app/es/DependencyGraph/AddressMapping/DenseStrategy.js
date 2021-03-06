import "core-js/modules/es.symbol";
import "core-js/modules/es.symbol.description";
import "core-js/modules/es.symbol.iterator";
import "core-js/modules/es.array.concat";
import "core-js/modules/es.array.from";
import "core-js/modules/es.array.iterator";
import "core-js/modules/es.array.slice";
import "core-js/modules/es.array.splice";
import "core-js/modules/es.function.name";
import "core-js/modules/es.object.to-string";
import "core-js/modules/es.regexp.to-string";
import "core-js/modules/es.string.iterator";
import "core-js/modules/web.dom-collections.iterator";
import "regenerator-runtime/runtime";

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 * @license
 * Copyright (c) 2020 Handsoncode. All rights reserved.
 */
import { simpleCellAddress } from '../../Cell';
/**
 * Mapping from cell addresses to vertices
 *
 * Uses Array to store addresses, having minimal memory usage for dense sheets and constant set/lookup.
 */

export var DenseStrategy = /*#__PURE__*/function () {
  /**
   * @param width - width of the stored sheet
   * @param height - height of the stored sheet
   */
  function DenseStrategy(width, height) {
    _classCallCheck(this, DenseStrategy);

    this.width = width;
    this.height = height;
    this.mapping = new Array(height);

    for (var i = 0; i < height; i++) {
      this.mapping[i] = new Array(width);
    }
  }
  /** @inheritDoc */


  _createClass(DenseStrategy, [{
    key: "getCell",
    value: function getCell(address) {
      return this.getCellVertex(address.col, address.row);
    }
    /** @inheritDoc */

  }, {
    key: "setCell",
    value: function setCell(address, newVertex) {
      this.width = Math.max(this.width, address.col + 1);
      this.height = Math.max(this.height, address.row + 1);
      var rowMapping = this.mapping[address.row];

      if (!rowMapping) {
        this.mapping[address.row] = new Array(this.width);
      }

      this.mapping[address.row][address.col] = newVertex;
    }
    /** @inheritDoc */

  }, {
    key: "has",
    value: function has(address) {
      var row = this.mapping[address.row];

      if (!row) {
        return false;
      }

      return !!row[address.col];
    }
    /** @inheritDoc */

  }, {
    key: "getHeight",
    value: function getHeight() {
      return this.height;
    }
    /** @inheritDoc */

  }, {
    key: "getWidth",
    value: function getWidth() {
      return this.width;
    }
  }, {
    key: "removeCell",
    value: function removeCell(address) {
      if (this.mapping[address.row] !== undefined) {
        delete this.mapping[address.row][address.col];
      }
    }
  }, {
    key: "addRows",
    value: function addRows(row, numberOfRows) {
      var _this$mapping;

      var newRows = [];

      for (var i = 0; i < numberOfRows; i++) {
        newRows.push(new Array(this.width));
      }

      (_this$mapping = this.mapping).splice.apply(_this$mapping, [row, 0].concat(newRows));

      this.height += numberOfRows;
    }
  }, {
    key: "addColumns",
    value: function addColumns(column, numberOfColumns) {
      for (var i = 0; i < this.height; i++) {
        var _this$mapping$i;

        (_this$mapping$i = this.mapping[i]).splice.apply(_this$mapping$i, [column, 0].concat(_toConsumableArray(new Array(numberOfColumns))));
      }

      this.width += numberOfColumns;
    }
  }, {
    key: "removeRows",
    value: function removeRows(removedRows) {
      this.mapping.splice(removedRows.rowStart, removedRows.numberOfRows);
      var rightmostRowRemoved = Math.min(this.height - 1, removedRows.rowEnd);
      var numberOfRowsRemoved = Math.max(0, rightmostRowRemoved - removedRows.rowStart + 1);
      this.height = Math.max(0, this.height - numberOfRowsRemoved);
    }
  }, {
    key: "removeColumns",
    value: function removeColumns(removedColumns) {
      for (var i = 0; i < this.height; i++) {
        this.mapping[i].splice(removedColumns.columnStart, removedColumns.numberOfColumns);
      }

      var rightmostColumnRemoved = Math.min(this.width - 1, removedColumns.columnEnd);
      var numberOfColumnsRemoved = Math.max(0, rightmostColumnRemoved - removedColumns.columnStart + 1);
      this.width = Math.max(0, this.width - numberOfColumnsRemoved);
    }
  }, {
    key: "getEntries",
    value: /*#__PURE__*/regeneratorRuntime.mark(function getEntries(sheet) {
      var y, x, vertex;
      return regeneratorRuntime.wrap(function getEntries$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              y = 0;

            case 1:
              if (!(y < this.height)) {
                _context.next = 14;
                break;
              }

              x = 0;

            case 3:
              if (!(x < this.width)) {
                _context.next = 11;
                break;
              }

              vertex = this.getCellVertex(x, y);

              if (!vertex) {
                _context.next = 8;
                break;
              }

              _context.next = 8;
              return [simpleCellAddress(sheet, x, y), vertex];

            case 8:
              ++x;
              _context.next = 3;
              break;

            case 11:
              ++y;
              _context.next = 1;
              break;

            case 14:
            case "end":
              return _context.stop();
          }
        }
      }, getEntries, this);
    })
  }, {
    key: "verticesFromColumn",
    value: /*#__PURE__*/regeneratorRuntime.mark(function verticesFromColumn(column) {
      var y, vertex;
      return regeneratorRuntime.wrap(function verticesFromColumn$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              y = 0;

            case 1:
              if (!(y < this.height)) {
                _context2.next = 9;
                break;
              }

              vertex = this.getCellVertex(column, y);

              if (!vertex) {
                _context2.next = 6;
                break;
              }

              _context2.next = 6;
              return vertex;

            case 6:
              ++y;
              _context2.next = 1;
              break;

            case 9:
            case "end":
              return _context2.stop();
          }
        }
      }, verticesFromColumn, this);
    })
  }, {
    key: "verticesFromRow",
    value: /*#__PURE__*/regeneratorRuntime.mark(function verticesFromRow(row) {
      var x, vertex;
      return regeneratorRuntime.wrap(function verticesFromRow$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              x = 0;

            case 1:
              if (!(x < this.width)) {
                _context3.next = 9;
                break;
              }

              vertex = this.getCellVertex(x, row);

              if (!vertex) {
                _context3.next = 6;
                break;
              }

              _context3.next = 6;
              return vertex;

            case 6:
              ++x;
              _context3.next = 1;
              break;

            case 9:
            case "end":
              return _context3.stop();
          }
        }
      }, verticesFromRow, this);
    })
  }, {
    key: "verticesFromColumnsSpan",
    value: /*#__PURE__*/regeneratorRuntime.mark(function verticesFromColumnsSpan(columnsSpan) {
      var x, y, vertex;
      return regeneratorRuntime.wrap(function verticesFromColumnsSpan$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              x = columnsSpan.columnStart;

            case 1:
              if (!(x <= columnsSpan.columnEnd)) {
                _context4.next = 14;
                break;
              }

              y = 0;

            case 3:
              if (!(y < this.height)) {
                _context4.next = 11;
                break;
              }

              vertex = this.getCellVertex(x, y);

              if (!vertex) {
                _context4.next = 8;
                break;
              }

              _context4.next = 8;
              return vertex;

            case 8:
              ++y;
              _context4.next = 3;
              break;

            case 11:
              ++x;
              _context4.next = 1;
              break;

            case 14:
            case "end":
              return _context4.stop();
          }
        }
      }, verticesFromColumnsSpan, this);
    })
  }, {
    key: "verticesFromRowsSpan",
    value: /*#__PURE__*/regeneratorRuntime.mark(function verticesFromRowsSpan(rowsSpan) {
      var x, y, vertex;
      return regeneratorRuntime.wrap(function verticesFromRowsSpan$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              x = 0;

            case 1:
              if (!(x < this.width)) {
                _context5.next = 14;
                break;
              }

              y = rowsSpan.rowStart;

            case 3:
              if (!(y <= rowsSpan.rowEnd)) {
                _context5.next = 11;
                break;
              }

              vertex = this.getCellVertex(x, y);

              if (!vertex) {
                _context5.next = 8;
                break;
              }

              _context5.next = 8;
              return vertex;

            case 8:
              ++y;
              _context5.next = 3;
              break;

            case 11:
              ++x;
              _context5.next = 1;
              break;

            case 14:
            case "end":
              return _context5.stop();
          }
        }
      }, verticesFromRowsSpan, this);
    })
  }, {
    key: "entriesFromRowsSpan",
    value: /*#__PURE__*/regeneratorRuntime.mark(function entriesFromRowsSpan(rowsSpan) {
      var x, y, vertex;
      return regeneratorRuntime.wrap(function entriesFromRowsSpan$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              x = 0;

            case 1:
              if (!(x < this.width)) {
                _context6.next = 14;
                break;
              }

              y = rowsSpan.rowStart;

            case 3:
              if (!(y <= rowsSpan.rowEnd)) {
                _context6.next = 11;
                break;
              }

              vertex = this.getCellVertex(x, y);

              if (!vertex) {
                _context6.next = 8;
                break;
              }

              _context6.next = 8;
              return [simpleCellAddress(rowsSpan.sheet, x, y), vertex];

            case 8:
              ++y;
              _context6.next = 3;
              break;

            case 11:
              ++x;
              _context6.next = 1;
              break;

            case 14:
            case "end":
              return _context6.stop();
          }
        }
      }, entriesFromRowsSpan, this);
    })
  }, {
    key: "entriesFromColumnsSpan",
    value: /*#__PURE__*/regeneratorRuntime.mark(function entriesFromColumnsSpan(columnsSpan) {
      var y, x, vertex;
      return regeneratorRuntime.wrap(function entriesFromColumnsSpan$(_context7) {
        while (1) {
          switch (_context7.prev = _context7.next) {
            case 0:
              y = 0;

            case 1:
              if (!(y < this.height)) {
                _context7.next = 14;
                break;
              }

              x = columnsSpan.columnStart;

            case 3:
              if (!(x <= columnsSpan.columnEnd)) {
                _context7.next = 11;
                break;
              }

              vertex = this.getCellVertex(x, y);

              if (!vertex) {
                _context7.next = 8;
                break;
              }

              _context7.next = 8;
              return [simpleCellAddress(columnsSpan.sheet, x, y), vertex];

            case 8:
              ++x;
              _context7.next = 3;
              break;

            case 11:
              ++y;
              _context7.next = 1;
              break;

            case 14:
            case "end":
              return _context7.stop();
          }
        }
      }, entriesFromColumnsSpan, this);
    })
  }, {
    key: "vertices",
    value: /*#__PURE__*/regeneratorRuntime.mark(function vertices() {
      var y, x, vertex;
      return regeneratorRuntime.wrap(function vertices$(_context8) {
        while (1) {
          switch (_context8.prev = _context8.next) {
            case 0:
              y = 0;

            case 1:
              if (!(y < this.height)) {
                _context8.next = 14;
                break;
              }

              x = 0;

            case 3:
              if (!(x < this.width)) {
                _context8.next = 11;
                break;
              }

              vertex = this.getCellVertex(x, y);

              if (!vertex) {
                _context8.next = 8;
                break;
              }

              _context8.next = 8;
              return vertex;

            case 8:
              ++x;
              _context8.next = 3;
              break;

            case 11:
              ++y;
              _context8.next = 1;
              break;

            case 14:
            case "end":
              return _context8.stop();
          }
        }
      }, vertices, this);
    })
  }, {
    key: "getCellVertex",
    value: function getCellVertex(x, y) {
      var row = this.mapping[y];

      if (row) {
        return this.mapping[y][x] || null;
      }

      return null;
    }
  }]);

  return DenseStrategy;
}();