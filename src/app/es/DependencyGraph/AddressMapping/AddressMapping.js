import "core-js/modules/es.symbol";
import "core-js/modules/es.symbol.description";
import "core-js/modules/es.symbol.iterator";
import "core-js/modules/es.array.fill";
import "core-js/modules/es.array.from";
import "core-js/modules/es.array.iterator";
import "core-js/modules/es.array.slice";
import "core-js/modules/es.function.name";
import "core-js/modules/es.map";
import "core-js/modules/es.object.to-string";
import "core-js/modules/es.regexp.to-string";
import "core-js/modules/es.string.iterator";
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
import { EmptyValue } from '../../Cell';
import { MatrixVertex } from '../index';
import { NoSheetWithIdError } from '../../errors';
export var AddressMapping = /*#__PURE__*/function () {
  function AddressMapping(policy) {
    _classCallCheck(this, AddressMapping);

    this.policy = policy;
    this.mapping = new Map();
  }
  /** @inheritDoc */


  _createClass(AddressMapping, [{
    key: "getCell",
    value: function getCell(address) {
      var sheetMapping = this.mapping.get(address.sheet);

      if (!sheetMapping) {
        throw new NoSheetWithIdError(address.sheet);
      }

      return sheetMapping.getCell(address);
    }
  }, {
    key: "fetchCell",
    value: function fetchCell(address) {
      var sheetMapping = this.mapping.get(address.sheet);

      if (!sheetMapping) {
        throw new NoSheetWithIdError(address.sheet);
      }

      var vertex = sheetMapping.getCell(address);

      if (!vertex) {
        throw Error('Vertex for address missing in AddressMapping');
      }

      return vertex;
    }
  }, {
    key: "strategyFor",
    value: function strategyFor(sheetId) {
      var strategy = this.mapping.get(sheetId);

      if (!strategy) {
        throw new NoSheetWithIdError(sheetId);
      }

      return strategy;
    }
  }, {
    key: "addSheet",
    value: function addSheet(sheetId, strategy) {
      if (this.mapping.has(sheetId)) {
        throw Error('Sheet already added');
      }

      this.mapping.set(sheetId, strategy);
    }
  }, {
    key: "autoAddSheet",
    value: function autoAddSheet(sheetId, sheet, sheetBoundaries) {
      var height = sheetBoundaries.height,
          width = sheetBoundaries.width,
          fill = sheetBoundaries.fill;
      var strategyConstructor = this.policy.call(fill);
      this.addSheet(sheetId, new strategyConstructor(width, height));
    }
  }, {
    key: "getCellValue",
    value: function getCellValue(address) {
      var vertex = this.getCell(address);

      if (vertex === null) {
        return EmptyValue;
      } else if (vertex instanceof MatrixVertex) {
        return vertex.getMatrixCellValue(address);
      } else {
        return vertex.getCellValue();
      }
    }
    /** @inheritDoc */

  }, {
    key: "setCell",
    value: function setCell(address, newVertex) {
      var sheetMapping = this.mapping.get(address.sheet);

      if (!sheetMapping) {
        throw Error('Sheet not initialized');
      }

      sheetMapping.setCell(address, newVertex);
    }
  }, {
    key: "removeCell",
    value: function removeCell(address) {
      var sheetMapping = this.mapping.get(address.sheet);

      if (!sheetMapping) {
        throw Error('Sheet not initialized');
      }

      sheetMapping.removeCell(address);
    }
    /** @inheritDoc */

  }, {
    key: "has",
    value: function has(address) {
      var sheetMapping = this.mapping.get(address.sheet);

      if (!sheetMapping) {
        return false;
      }

      return sheetMapping.has(address);
    }
    /** @inheritDoc */

  }, {
    key: "getHeight",
    value: function getHeight(sheetId) {
      var sheetMapping = this.mapping.get(sheetId);

      if (!sheetMapping) {
        throw new NoSheetWithIdError(sheetId);
      }

      return sheetMapping.getHeight();
    }
    /** @inheritDoc */

  }, {
    key: "getWidth",
    value: function getWidth(sheetId) {
      var sheetMapping = this.mapping.get(sheetId);

      if (!sheetMapping) {
        throw new NoSheetWithIdError(sheetId);
      }

      return sheetMapping.getWidth();
    }
  }, {
    key: "addRows",
    value: function addRows(sheet, row, numberOfRows) {
      var sheetMapping = this.mapping.get(sheet);

      if (!sheetMapping) {
        throw Error('Sheet does not exist');
      }

      sheetMapping.addRows(row, numberOfRows);
    }
  }, {
    key: "removeRows",
    value: function removeRows(removedRows) {
      var sheetMapping = this.mapping.get(removedRows.sheet);

      if (!sheetMapping) {
        throw Error('Sheet does not exist');
      }

      sheetMapping.removeRows(removedRows);
    }
  }, {
    key: "removeSheet",
    value: function removeSheet(sheetId) {
      this.mapping.delete(sheetId);
    }
  }, {
    key: "addColumns",
    value: function addColumns(sheet, column, numberOfColumns) {
      var sheetMapping = this.mapping.get(sheet);

      if (!sheetMapping) {
        throw Error('Sheet does not exist');
      }

      sheetMapping.addColumns(column, numberOfColumns);
    }
  }, {
    key: "removeColumns",
    value: function removeColumns(removedColumns) {
      var sheetMapping = this.mapping.get(removedColumns.sheet);

      if (!sheetMapping) {
        throw Error('Sheet does not exist');
      }

      sheetMapping.removeColumns(removedColumns);
    }
  }, {
    key: "verticesFromRowsSpan",
    value: /*#__PURE__*/regeneratorRuntime.mark(function verticesFromRowsSpan(rowsSpan) {
      return regeneratorRuntime.wrap(function verticesFromRowsSpan$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              return _context.delegateYield(this.mapping.get(rowsSpan.sheet).verticesFromRowsSpan(rowsSpan), "t0", 1);

            case 1:
            case "end":
              return _context.stop();
          }
        }
      }, verticesFromRowsSpan, this);
    })
  }, {
    key: "verticesFromColumnsSpan",
    value: /*#__PURE__*/regeneratorRuntime.mark(function verticesFromColumnsSpan(columnsSpan) {
      return regeneratorRuntime.wrap(function verticesFromColumnsSpan$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              return _context2.delegateYield(this.mapping.get(columnsSpan.sheet).verticesFromColumnsSpan(columnsSpan), "t0", 1);

            case 1:
            case "end":
              return _context2.stop();
          }
        }
      }, verticesFromColumnsSpan, this);
    })
  }, {
    key: "entriesFromRowsSpan",
    value: /*#__PURE__*/regeneratorRuntime.mark(function entriesFromRowsSpan(rowsSpan) {
      return regeneratorRuntime.wrap(function entriesFromRowsSpan$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              return _context3.delegateYield(this.mapping.get(rowsSpan.sheet).entriesFromRowsSpan(rowsSpan), "t0", 1);

            case 1:
            case "end":
              return _context3.stop();
          }
        }
      }, entriesFromRowsSpan, this);
    })
  }, {
    key: "entriesFromColumnsSpan",
    value: /*#__PURE__*/regeneratorRuntime.mark(function entriesFromColumnsSpan(columnsSpan) {
      return regeneratorRuntime.wrap(function entriesFromColumnsSpan$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              return _context4.delegateYield(this.mapping.get(columnsSpan.sheet).entriesFromColumnsSpan(columnsSpan), "t0", 1);

            case 1:
            case "end":
              return _context4.stop();
          }
        }
      }, entriesFromColumnsSpan, this);
    })
  }, {
    key: "entries",
    value: /*#__PURE__*/regeneratorRuntime.mark(function entries() {
      var _iterator, _step, _step$value, sheet, mapping;

      return regeneratorRuntime.wrap(function entries$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              _iterator = _createForOfIteratorHelper(this.mapping.entries());
              _context5.prev = 1;

              _iterator.s();

            case 3:
              if ((_step = _iterator.n()).done) {
                _context5.next = 8;
                break;
              }

              _step$value = _slicedToArray(_step.value, 2), sheet = _step$value[0], mapping = _step$value[1];
              return _context5.delegateYield(mapping.getEntries(sheet), "t0", 6);

            case 6:
              _context5.next = 3;
              break;

            case 8:
              _context5.next = 13;
              break;

            case 10:
              _context5.prev = 10;
              _context5.t1 = _context5["catch"](1);

              _iterator.e(_context5.t1);

            case 13:
              _context5.prev = 13;

              _iterator.f();

              return _context5.finish(13);

            case 16:
            case "end":
              return _context5.stop();
          }
        }
      }, entries, this, [[1, 10, 13, 16]]);
    })
  }, {
    key: "sheetEntries",
    value: /*#__PURE__*/regeneratorRuntime.mark(function sheetEntries(sheet) {
      var sheetMapping;
      return regeneratorRuntime.wrap(function sheetEntries$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              sheetMapping = this.mapping.get(sheet);

              if (!sheetMapping) {
                _context6.next = 5;
                break;
              }

              return _context6.delegateYield(sheetMapping.getEntries(sheet), "t0", 3);

            case 3:
              _context6.next = 6;
              break;

            case 5:
              throw new Error('Sheet does not exists');

            case 6:
            case "end":
              return _context6.stop();
          }
        }
      }, sheetEntries, this);
    })
  }, {
    key: "destroy",
    value: function destroy() {
      this.mapping.clear();
    }
  }]);

  return AddressMapping;
}();