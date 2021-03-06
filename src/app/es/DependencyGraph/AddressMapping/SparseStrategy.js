import "core-js/modules/es.symbol";
import "core-js/modules/es.symbol.description";
import "core-js/modules/es.symbol.iterator";
import "core-js/modules/es.array.for-each";
import "core-js/modules/es.array.from";
import "core-js/modules/es.array.iterator";
import "core-js/modules/es.array.slice";
import "core-js/modules/es.function.name";
import "core-js/modules/es.map";
import "core-js/modules/es.object.to-string";
import "core-js/modules/es.regexp.to-string";
import "core-js/modules/es.string.iterator";
import "core-js/modules/web.dom-collections.for-each";
import "core-js/modules/web.dom-collections.iterator";
import "regenerator-runtime/runtime";

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e2) { throw _e2; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e3) { didErr = true; err = _e3; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

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
 * Uses Map to store addresses, having minimal memory usage for sparse sheets but not necessarily constant set/lookup.
 */

export var SparseStrategy = /*#__PURE__*/function () {
  function SparseStrategy(width, height) {
    _classCallCheck(this, SparseStrategy);

    this.width = width;
    this.height = height;
    /**
     * Map of Maps in which actual data is stored.
     *
     * Key of map in first level is column number.
     * Key of map in second level is row number.
     */

    this.mapping = new Map();
  }
  /** @inheritDoc */


  _createClass(SparseStrategy, [{
    key: "getCell",
    value: function getCell(address) {
      var colMapping = this.mapping.get(address.col);

      if (!colMapping) {
        return null;
      }

      return colMapping.get(address.row) || null;
    }
    /** @inheritDoc */

  }, {
    key: "setCell",
    value: function setCell(address, newVertex) {
      this.width = Math.max(this.width, address.col + 1);
      this.height = Math.max(this.height, address.row + 1);
      var colMapping = this.mapping.get(address.col);

      if (!colMapping) {
        colMapping = new Map();
        this.mapping.set(address.col, colMapping);
      }

      colMapping.set(address.row, newVertex);
    }
    /** @inheritDoc */

  }, {
    key: "has",
    value: function has(address) {
      var colMapping = this.mapping.get(address.col);

      if (!colMapping) {
        return false;
      }

      return !!colMapping.get(address.row);
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
      var colMapping = this.mapping.get(address.col);

      if (colMapping) {
        colMapping.delete(address.row);
      }
    }
  }, {
    key: "addRows",
    value: function addRows(row, numberOfRows) {
      this.mapping.forEach(function (rowMapping) {
        var tmpMapping = new Map();
        rowMapping.forEach(function (vertex, rowNumber) {
          if (rowNumber >= row) {
            tmpMapping.set(rowNumber + numberOfRows, vertex);
            rowMapping.delete(rowNumber);
          }
        });
        tmpMapping.forEach(function (vertex, rowNumber) {
          rowMapping.set(rowNumber, vertex);
        });
      });
      this.height += numberOfRows;
    }
  }, {
    key: "addColumns",
    value: function addColumns(column, numberOfColumns) {
      var _this = this;

      var tmpMapping = new Map();
      this.mapping.forEach(function (rowMapping, colNumber) {
        if (colNumber >= column) {
          tmpMapping.set(colNumber + numberOfColumns, rowMapping);

          _this.mapping.delete(colNumber);
        }
      });
      tmpMapping.forEach(function (rowMapping, colNumber) {
        _this.mapping.set(colNumber, rowMapping);
      });
      this.width += numberOfColumns;
    }
  }, {
    key: "removeRows",
    value: function removeRows(removedRows) {
      this.mapping.forEach(function (rowMapping) {
        var tmpMapping = new Map();
        rowMapping.forEach(function (vertex, rowNumber) {
          if (rowNumber >= removedRows.rowStart) {
            rowMapping.delete(rowNumber);

            if (rowNumber > removedRows.rowEnd) {
              tmpMapping.set(rowNumber - removedRows.numberOfRows, vertex);
            }
          }
        });
        tmpMapping.forEach(function (vertex, rowNumber) {
          rowMapping.set(rowNumber, vertex);
        });
      });
      var rightmostRowRemoved = Math.min(this.height - 1, removedRows.rowEnd);
      var numberOfRowsRemoved = Math.max(0, rightmostRowRemoved - removedRows.rowStart + 1);
      this.height = Math.max(0, this.height - numberOfRowsRemoved);
    }
  }, {
    key: "removeColumns",
    value: function removeColumns(removedColumns) {
      var _this2 = this;

      var tmpMapping = new Map();
      this.mapping.forEach(function (rowMapping, colNumber) {
        if (colNumber >= removedColumns.columnStart) {
          _this2.mapping.delete(colNumber);

          if (colNumber > removedColumns.columnEnd) {
            tmpMapping.set(colNumber - removedColumns.numberOfColumns, rowMapping);
          }
        }
      });
      tmpMapping.forEach(function (rowMapping, colNumber) {
        _this2.mapping.set(colNumber, rowMapping);
      });
      var rightmostColumnRemoved = Math.min(this.width - 1, removedColumns.columnEnd);
      var numberOfColumnsRemoved = Math.max(0, rightmostColumnRemoved - removedColumns.columnStart + 1);
      this.width = Math.max(0, this.width - numberOfColumnsRemoved);
    }
  }, {
    key: "getEntries",
    value: /*#__PURE__*/regeneratorRuntime.mark(function getEntries(sheet) {
      var _iterator, _step, _step$value, colNumber, col, _iterator2, _step2, _step2$value, rowNumber, value;

      return regeneratorRuntime.wrap(function getEntries$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _iterator = _createForOfIteratorHelper(this.mapping);
              _context.prev = 1;

              _iterator.s();

            case 3:
              if ((_step = _iterator.n()).done) {
                _context.next = 24;
                break;
              }

              _step$value = _slicedToArray(_step.value, 2), colNumber = _step$value[0], col = _step$value[1];
              _iterator2 = _createForOfIteratorHelper(col);
              _context.prev = 6;

              _iterator2.s();

            case 8:
              if ((_step2 = _iterator2.n()).done) {
                _context.next = 14;
                break;
              }

              _step2$value = _slicedToArray(_step2.value, 2), rowNumber = _step2$value[0], value = _step2$value[1];
              _context.next = 12;
              return [simpleCellAddress(sheet, colNumber, rowNumber), value];

            case 12:
              _context.next = 8;
              break;

            case 14:
              _context.next = 19;
              break;

            case 16:
              _context.prev = 16;
              _context.t0 = _context["catch"](6);

              _iterator2.e(_context.t0);

            case 19:
              _context.prev = 19;

              _iterator2.f();

              return _context.finish(19);

            case 22:
              _context.next = 3;
              break;

            case 24:
              _context.next = 29;
              break;

            case 26:
              _context.prev = 26;
              _context.t1 = _context["catch"](1);

              _iterator.e(_context.t1);

            case 29:
              _context.prev = 29;

              _iterator.f();

              return _context.finish(29);

            case 32:
            case "end":
              return _context.stop();
          }
        }
      }, getEntries, this, [[1, 26, 29, 32], [6, 16, 19, 22]]);
    })
  }, {
    key: "verticesFromColumn",
    value: /*#__PURE__*/regeneratorRuntime.mark(function verticesFromColumn(column) {
      var colMapping, _iterator3, _step3, _step3$value, _, vertex;

      return regeneratorRuntime.wrap(function verticesFromColumn$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              colMapping = this.mapping.get(column);

              if (colMapping) {
                _context2.next = 3;
                break;
              }

              return _context2.abrupt("return");

            case 3:
              _iterator3 = _createForOfIteratorHelper(colMapping);
              _context2.prev = 4;

              _iterator3.s();

            case 6:
              if ((_step3 = _iterator3.n()).done) {
                _context2.next = 12;
                break;
              }

              _step3$value = _slicedToArray(_step3.value, 2), _ = _step3$value[0], vertex = _step3$value[1];
              _context2.next = 10;
              return vertex;

            case 10:
              _context2.next = 6;
              break;

            case 12:
              _context2.next = 17;
              break;

            case 14:
              _context2.prev = 14;
              _context2.t0 = _context2["catch"](4);

              _iterator3.e(_context2.t0);

            case 17:
              _context2.prev = 17;

              _iterator3.f();

              return _context2.finish(17);

            case 20:
            case "end":
              return _context2.stop();
          }
        }
      }, verticesFromColumn, this, [[4, 14, 17, 20]]);
    })
  }, {
    key: "verticesFromRow",
    value: /*#__PURE__*/regeneratorRuntime.mark(function verticesFromRow(row) {
      var _iterator4, _step4, colMapping, rowVertex;

      return regeneratorRuntime.wrap(function verticesFromRow$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _iterator4 = _createForOfIteratorHelper(this.mapping.values());
              _context3.prev = 1;

              _iterator4.s();

            case 3:
              if ((_step4 = _iterator4.n()).done) {
                _context3.next = 11;
                break;
              }

              colMapping = _step4.value;
              rowVertex = colMapping.get(row);

              if (!rowVertex) {
                _context3.next = 9;
                break;
              }

              _context3.next = 9;
              return rowVertex;

            case 9:
              _context3.next = 3;
              break;

            case 11:
              _context3.next = 16;
              break;

            case 13:
              _context3.prev = 13;
              _context3.t0 = _context3["catch"](1);

              _iterator4.e(_context3.t0);

            case 16:
              _context3.prev = 16;

              _iterator4.f();

              return _context3.finish(16);

            case 19:
            case "end":
              return _context3.stop();
          }
        }
      }, verticesFromRow, this, [[1, 13, 16, 19]]);
    })
  }, {
    key: "verticesFromColumnsSpan",
    value: /*#__PURE__*/regeneratorRuntime.mark(function verticesFromColumnsSpan(columnsSpan) {
      var _iterator5, _step5, column, colMapping, _iterator6, _step6, _step6$value, _, vertex;

      return regeneratorRuntime.wrap(function verticesFromColumnsSpan$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              _iterator5 = _createForOfIteratorHelper(columnsSpan.columns());
              _context4.prev = 1;

              _iterator5.s();

            case 3:
              if ((_step5 = _iterator5.n()).done) {
                _context4.next = 27;
                break;
              }

              column = _step5.value;
              colMapping = this.mapping.get(column);

              if (colMapping) {
                _context4.next = 8;
                break;
              }

              return _context4.abrupt("continue", 25);

            case 8:
              _iterator6 = _createForOfIteratorHelper(colMapping);
              _context4.prev = 9;

              _iterator6.s();

            case 11:
              if ((_step6 = _iterator6.n()).done) {
                _context4.next = 17;
                break;
              }

              _step6$value = _slicedToArray(_step6.value, 2), _ = _step6$value[0], vertex = _step6$value[1];
              _context4.next = 15;
              return vertex;

            case 15:
              _context4.next = 11;
              break;

            case 17:
              _context4.next = 22;
              break;

            case 19:
              _context4.prev = 19;
              _context4.t0 = _context4["catch"](9);

              _iterator6.e(_context4.t0);

            case 22:
              _context4.prev = 22;

              _iterator6.f();

              return _context4.finish(22);

            case 25:
              _context4.next = 3;
              break;

            case 27:
              _context4.next = 32;
              break;

            case 29:
              _context4.prev = 29;
              _context4.t1 = _context4["catch"](1);

              _iterator5.e(_context4.t1);

            case 32:
              _context4.prev = 32;

              _iterator5.f();

              return _context4.finish(32);

            case 35:
            case "end":
              return _context4.stop();
          }
        }
      }, verticesFromColumnsSpan, this, [[1, 29, 32, 35], [9, 19, 22, 25]]);
    })
  }, {
    key: "verticesFromRowsSpan",
    value: /*#__PURE__*/regeneratorRuntime.mark(function verticesFromRowsSpan(rowsSpan) {
      var _iterator7, _step7, colMapping, _iterator8, _step8, row, rowVertex;

      return regeneratorRuntime.wrap(function verticesFromRowsSpan$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              _iterator7 = _createForOfIteratorHelper(this.mapping.values());
              _context5.prev = 1;

              _iterator7.s();

            case 3:
              if ((_step7 = _iterator7.n()).done) {
                _context5.next = 26;
                break;
              }

              colMapping = _step7.value;
              _iterator8 = _createForOfIteratorHelper(rowsSpan.rows());
              _context5.prev = 6;

              _iterator8.s();

            case 8:
              if ((_step8 = _iterator8.n()).done) {
                _context5.next = 16;
                break;
              }

              row = _step8.value;
              rowVertex = colMapping.get(row);

              if (!rowVertex) {
                _context5.next = 14;
                break;
              }

              _context5.next = 14;
              return rowVertex;

            case 14:
              _context5.next = 8;
              break;

            case 16:
              _context5.next = 21;
              break;

            case 18:
              _context5.prev = 18;
              _context5.t0 = _context5["catch"](6);

              _iterator8.e(_context5.t0);

            case 21:
              _context5.prev = 21;

              _iterator8.f();

              return _context5.finish(21);

            case 24:
              _context5.next = 3;
              break;

            case 26:
              _context5.next = 31;
              break;

            case 28:
              _context5.prev = 28;
              _context5.t1 = _context5["catch"](1);

              _iterator7.e(_context5.t1);

            case 31:
              _context5.prev = 31;

              _iterator7.f();

              return _context5.finish(31);

            case 34:
            case "end":
              return _context5.stop();
          }
        }
      }, verticesFromRowsSpan, this, [[1, 28, 31, 34], [6, 18, 21, 24]]);
    })
  }, {
    key: "entriesFromRowsSpan",
    value: /*#__PURE__*/regeneratorRuntime.mark(function entriesFromRowsSpan(rowsSpan) {
      var _iterator9, _step9, _step9$value, col, colMapping, _iterator10, _step10, row, rowVertex;

      return regeneratorRuntime.wrap(function entriesFromRowsSpan$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              _iterator9 = _createForOfIteratorHelper(this.mapping.entries());
              _context6.prev = 1;

              _iterator9.s();

            case 3:
              if ((_step9 = _iterator9.n()).done) {
                _context6.next = 26;
                break;
              }

              _step9$value = _slicedToArray(_step9.value, 2), col = _step9$value[0], colMapping = _step9$value[1];
              _iterator10 = _createForOfIteratorHelper(rowsSpan.rows());
              _context6.prev = 6;

              _iterator10.s();

            case 8:
              if ((_step10 = _iterator10.n()).done) {
                _context6.next = 16;
                break;
              }

              row = _step10.value;
              rowVertex = colMapping.get(row);

              if (!rowVertex) {
                _context6.next = 14;
                break;
              }

              _context6.next = 14;
              return [simpleCellAddress(rowsSpan.sheet, col, row), rowVertex];

            case 14:
              _context6.next = 8;
              break;

            case 16:
              _context6.next = 21;
              break;

            case 18:
              _context6.prev = 18;
              _context6.t0 = _context6["catch"](6);

              _iterator10.e(_context6.t0);

            case 21:
              _context6.prev = 21;

              _iterator10.f();

              return _context6.finish(21);

            case 24:
              _context6.next = 3;
              break;

            case 26:
              _context6.next = 31;
              break;

            case 28:
              _context6.prev = 28;
              _context6.t1 = _context6["catch"](1);

              _iterator9.e(_context6.t1);

            case 31:
              _context6.prev = 31;

              _iterator9.f();

              return _context6.finish(31);

            case 34:
            case "end":
              return _context6.stop();
          }
        }
      }, entriesFromRowsSpan, this, [[1, 28, 31, 34], [6, 18, 21, 24]]);
    })
  }, {
    key: "entriesFromColumnsSpan",
    value: /*#__PURE__*/regeneratorRuntime.mark(function entriesFromColumnsSpan(columnsSpan) {
      var _iterator11, _step11, col, colMapping, _iterator12, _step12, _step12$value, row, vertex;

      return regeneratorRuntime.wrap(function entriesFromColumnsSpan$(_context7) {
        while (1) {
          switch (_context7.prev = _context7.next) {
            case 0:
              _iterator11 = _createForOfIteratorHelper(columnsSpan.columns());
              _context7.prev = 1;

              _iterator11.s();

            case 3:
              if ((_step11 = _iterator11.n()).done) {
                _context7.next = 26;
                break;
              }

              col = _step11.value;
              colMapping = this.mapping.get(col);

              if (!colMapping) {
                _context7.next = 24;
                break;
              }

              _iterator12 = _createForOfIteratorHelper(colMapping.entries());
              _context7.prev = 8;

              _iterator12.s();

            case 10:
              if ((_step12 = _iterator12.n()).done) {
                _context7.next = 16;
                break;
              }

              _step12$value = _slicedToArray(_step12.value, 2), row = _step12$value[0], vertex = _step12$value[1];
              _context7.next = 14;
              return [simpleCellAddress(columnsSpan.sheet, col, row), vertex];

            case 14:
              _context7.next = 10;
              break;

            case 16:
              _context7.next = 21;
              break;

            case 18:
              _context7.prev = 18;
              _context7.t0 = _context7["catch"](8);

              _iterator12.e(_context7.t0);

            case 21:
              _context7.prev = 21;

              _iterator12.f();

              return _context7.finish(21);

            case 24:
              _context7.next = 3;
              break;

            case 26:
              _context7.next = 31;
              break;

            case 28:
              _context7.prev = 28;
              _context7.t1 = _context7["catch"](1);

              _iterator11.e(_context7.t1);

            case 31:
              _context7.prev = 31;

              _iterator11.f();

              return _context7.finish(31);

            case 34:
            case "end":
              return _context7.stop();
          }
        }
      }, entriesFromColumnsSpan, this, [[1, 28, 31, 34], [8, 18, 21, 24]]);
    })
  }, {
    key: "vertices",
    value: /*#__PURE__*/regeneratorRuntime.mark(function vertices() {
      var _iterator13, _step13, _step13$value, _, col, _iterator14, _step14, _step14$value, _2, value;

      return regeneratorRuntime.wrap(function vertices$(_context8) {
        while (1) {
          switch (_context8.prev = _context8.next) {
            case 0:
              _iterator13 = _createForOfIteratorHelper(this.mapping);
              _context8.prev = 1;

              _iterator13.s();

            case 3:
              if ((_step13 = _iterator13.n()).done) {
                _context8.next = 25;
                break;
              }

              _step13$value = _slicedToArray(_step13.value, 2), _ = _step13$value[0], col = _step13$value[1];
              _iterator14 = _createForOfIteratorHelper(col);
              _context8.prev = 6;

              _iterator14.s();

            case 8:
              if ((_step14 = _iterator14.n()).done) {
                _context8.next = 15;
                break;
              }

              _step14$value = _slicedToArray(_step14.value, 2), _2 = _step14$value[0], value = _step14$value[1];

              if (!value) {
                _context8.next = 13;
                break;
              }

              _context8.next = 13;
              return value;

            case 13:
              _context8.next = 8;
              break;

            case 15:
              _context8.next = 20;
              break;

            case 17:
              _context8.prev = 17;
              _context8.t0 = _context8["catch"](6);

              _iterator14.e(_context8.t0);

            case 20:
              _context8.prev = 20;

              _iterator14.f();

              return _context8.finish(20);

            case 23:
              _context8.next = 3;
              break;

            case 25:
              _context8.next = 30;
              break;

            case 27:
              _context8.prev = 27;
              _context8.t1 = _context8["catch"](1);

              _iterator13.e(_context8.t1);

            case 30:
              _context8.prev = 30;

              _iterator13.f();

              return _context8.finish(30);

            case 33:
            case "end":
              return _context8.stop();
          }
        }
      }, vertices, this, [[1, 27, 30, 33], [6, 17, 20, 23]]);
    })
  }]);

  return SparseStrategy;
}();