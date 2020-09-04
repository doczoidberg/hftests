import "core-js/modules/es.symbol";
import "core-js/modules/es.symbol.description";
import "core-js/modules/es.symbol.iterator";
import "core-js/modules/es.array.concat";
import "core-js/modules/es.array.for-each";
import "core-js/modules/es.array.from";
import "core-js/modules/es.array.iterator";
import "core-js/modules/es.array.slice";
import "core-js/modules/es.array.sort";
import "core-js/modules/es.function.name";
import "core-js/modules/es.map";
import "core-js/modules/es.number.constructor";
import "core-js/modules/es.number.is-finite";
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
import { AbsoluteCellRange } from '../AbsoluteCellRange';
import { simpleCellAddress } from '../Cell';
/**
 * Mapping from address ranges to range vertices
 */

export var RangeMapping = /*#__PURE__*/function () {
  function RangeMapping() {
    _classCallCheck(this, RangeMapping);

    /** Map in which actual data is stored. */
    this.rangeMapping = new Map();
  }

  _createClass(RangeMapping, [{
    key: "getMappingSize",
    value: function getMappingSize(sheet) {
      var _a, _b;

      return (_b = (_a = this.rangeMapping.get(sheet)) === null || _a === void 0 ? void 0 : _a.size) !== null && _b !== void 0 ? _b : 0;
    }
    /**
     * Saves range vertex
     *
     * @param vertex - vertex to save
     */

  }, {
    key: "setRange",
    value: function setRange(vertex) {
      var sheetMap = this.rangeMapping.get(vertex.getStart().sheet);

      if (sheetMap === undefined) {
        sheetMap = new Map();
        this.rangeMapping.set(vertex.getStart().sheet, sheetMap);
      }

      var key = keyFromAddresses(vertex.getStart(), vertex.getEnd());
      sheetMap.set(key, vertex);
    }
  }, {
    key: "removeRange",
    value: function removeRange(vertex) {
      var sheet = vertex.getStart().sheet;
      var sheetMap = this.rangeMapping.get(sheet);

      if (sheetMap === undefined) {
        return;
      }

      var key = keyFromAddresses(vertex.getStart(), vertex.getEnd());
      sheetMap.delete(key);

      if (sheetMap.size === 0) {
        this.rangeMapping.delete(sheet);
      }
    }
    /**
     * Returns associated vertex for given range
     *
     * @param start - top-left corner of the range
     * @param end - bottom-right corner of the range
     */

  }, {
    key: "getRange",
    value: function getRange(start, end) {
      var sheetMap = this.rangeMapping.get(start.sheet);
      var key = keyFromAddresses(start, end);
      return sheetMap === null || sheetMap === void 0 ? void 0 : sheetMap.get(key);
    }
  }, {
    key: "fetchRange",
    value: function fetchRange(start, end) {
      var maybeRange = this.getRange(start, end);

      if (!maybeRange) {
        throw Error('Range does not exist');
      }

      return maybeRange;
    }
  }, {
    key: "truncateRanges",
    value: function truncateRanges(span, coordinate) {
      var verticesToRemove = Array();
      var updated = Array();
      var sheet = span.sheet;

      var _iterator = _createForOfIteratorHelper(this.entriesFromSheet(span.sheet)),
          _step;

      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var _step$value = _slicedToArray(_step.value, 2),
              key = _step$value[0],
              vertex = _step$value[1];

          var range = vertex.range;

          if (span.start <= coordinate(vertex.range.end)) {
            range.removeSpan(span);

            if (range.shouldBeRemoved()) {
              this.removeByKey(sheet, key);
              verticesToRemove.push(vertex);
            } else {
              updated.push([key, vertex]);
            }
          }
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }

      var verticesToMerge = [];

      var _iterator2 = _createForOfIteratorHelper(updated.sort(function (left, right) {
        return compareBy(left[1], right[1], coordinate);
      })),
          _step2;

      try {
        for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
          var _step2$value = _slicedToArray(_step2.value, 2),
              oldKey = _step2$value[0],
              _vertex = _step2$value[1];

          var newKey = keyFromRange(_vertex.range);

          if (newKey === oldKey) {
            continue;
          }

          var existingVertex = this.getByKey(sheet, newKey);
          this.removeByKey(sheet, oldKey);

          if (existingVertex !== undefined && _vertex != existingVertex) {
            verticesToMerge.push([existingVertex, _vertex]);
          } else {
            this.setRange(_vertex);
          }
        }
      } catch (err) {
        _iterator2.e(err);
      } finally {
        _iterator2.f();
      }

      return {
        verticesToRemove: verticesToRemove,
        verticesToMerge: verticesToMerge
      };
    }
  }, {
    key: "moveAllRangesInSheetAfterRowByRows",
    value: function moveAllRangesInSheetAfterRowByRows(sheet, row, numberOfRows) {
      this.updateVerticesFromSheet(sheet, function (key, vertex) {
        if (row <= vertex.start.row) {
          vertex.range.shiftByRows(numberOfRows);
          return vertex;
        } else if (row > vertex.start.row && row <= vertex.end.row) {
          vertex.range.expandByRows(numberOfRows);
          return vertex;
        } else {
          return undefined;
        }
      });
    }
  }, {
    key: "moveAllRangesInSheetAfterColumnByColumns",
    value: function moveAllRangesInSheetAfterColumnByColumns(sheet, column, numberOfColumns) {
      this.updateVerticesFromSheet(sheet, function (key, vertex) {
        if (column <= vertex.start.col) {
          vertex.range.shiftByColumns(numberOfColumns);
          return vertex;
        } else if (column > vertex.start.col && column <= vertex.end.col) {
          vertex.range.expandByColumns(numberOfColumns);
          return vertex;
        } else {
          return undefined;
        }
      });
    }
  }, {
    key: "moveRangesInsideSourceRange",
    value: function moveRangesInsideSourceRange(sourceRange, toRight, toBottom, toSheet) {
      this.updateVerticesFromSheet(sourceRange.sheet, function (key, vertex) {
        if (sourceRange.containsRange(vertex.range)) {
          vertex.range.shiftByColumns(toRight);
          vertex.range.shiftByRows(toBottom);
          vertex.range.moveToSheet(toSheet);
          return vertex;
        } else {
          return undefined;
        }
      });
    }
  }, {
    key: "removeRangesInSheet",
    value: function removeRangesInSheet(sheet) {
      if (this.rangeMapping.has(sheet)) {
        var ranges = this.rangeMapping.get(sheet).values();
        this.rangeMapping.delete(sheet);
        return ranges;
      }

      return [][Symbol.iterator]();
    }
  }, {
    key: "rangesInSheet",
    value: /*#__PURE__*/regeneratorRuntime.mark(function rangesInSheet(sheet) {
      var sheetMap;
      return regeneratorRuntime.wrap(function rangesInSheet$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              sheetMap = this.rangeMapping.get(sheet);

              if (sheetMap) {
                _context.next = 3;
                break;
              }

              return _context.abrupt("return");

            case 3:
              return _context.delegateYield(sheetMap.values(), "t0", 4);

            case 4:
            case "end":
              return _context.stop();
          }
        }
      }, rangesInSheet, this);
    })
  }, {
    key: "rangeVerticesContainedInRange",
    value: /*#__PURE__*/regeneratorRuntime.mark(function rangeVerticesContainedInRange(sourceRange) {
      var _iterator3, _step3, rangeVertex;

      return regeneratorRuntime.wrap(function rangeVerticesContainedInRange$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _iterator3 = _createForOfIteratorHelper(this.rangesInSheet(sourceRange.sheet));
              _context2.prev = 1;

              _iterator3.s();

            case 3:
              if ((_step3 = _iterator3.n()).done) {
                _context2.next = 10;
                break;
              }

              rangeVertex = _step3.value;

              if (!sourceRange.containsRange(rangeVertex.range)) {
                _context2.next = 8;
                break;
              }

              _context2.next = 8;
              return rangeVertex;

            case 8:
              _context2.next = 3;
              break;

            case 10:
              _context2.next = 15;
              break;

            case 12:
              _context2.prev = 12;
              _context2.t0 = _context2["catch"](1);

              _iterator3.e(_context2.t0);

            case 15:
              _context2.prev = 15;

              _iterator3.f();

              return _context2.finish(15);

            case 18:
            case "end":
              return _context2.stop();
          }
        }
      }, rangeVerticesContainedInRange, this, [[1, 12, 15, 18]]);
    })
    /**
     * Finds smaller range does have own vertex.
     *
     * @param rangeMapping - range mapping dependency
     * @param ranges - ranges to find smaller range in
     */

  }, {
    key: "findSmallerRange",
    value: function findSmallerRange(range) {
      if (range.height() > 1 && Number.isFinite(range.height())) {
        var valuesRangeEndRowLess = simpleCellAddress(range.end.sheet, range.end.col, range.end.row - 1);
        var rowLessVertex = this.getRange(range.start, valuesRangeEndRowLess);

        if (rowLessVertex !== undefined) {
          var restRange = new AbsoluteCellRange(simpleCellAddress(range.start.sheet, range.start.col, range.end.row), range.end);
          return {
            smallerRangeVertex: rowLessVertex,
            restRange: restRange
          };
        }
      }

      return {
        smallerRangeVertex: null,
        restRange: range
      };
    }
  }, {
    key: "destroy",
    value: function destroy() {
      this.rangeMapping.clear();
    }
  }, {
    key: "entriesFromSheet",
    value: /*#__PURE__*/regeneratorRuntime.mark(function entriesFromSheet(sheet) {
      var sheetMap;
      return regeneratorRuntime.wrap(function entriesFromSheet$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              sheetMap = this.rangeMapping.get(sheet);

              if (sheetMap) {
                _context3.next = 3;
                break;
              }

              return _context3.abrupt("return");

            case 3:
              return _context3.delegateYield(sheetMap.entries(), "t0", 4);

            case 4:
            case "end":
              return _context3.stop();
          }
        }
      }, entriesFromSheet, this);
    })
  }, {
    key: "removeByKey",
    value: function removeByKey(sheet, key) {
      this.rangeMapping.get(sheet).delete(key);
    }
  }, {
    key: "getByKey",
    value: function getByKey(sheet, key) {
      var _a;

      return (_a = this.rangeMapping.get(sheet)) === null || _a === void 0 ? void 0 : _a.get(key);
    }
  }, {
    key: "updateVerticesFromSheet",
    value: function updateVerticesFromSheet(sheet, fn) {
      var _this = this;

      var updated = Array();

      var _iterator4 = _createForOfIteratorHelper(this.entriesFromSheet(sheet)),
          _step4;

      try {
        for (_iterator4.s(); !(_step4 = _iterator4.n()).done;) {
          var _step4$value = _slicedToArray(_step4.value, 2),
              key = _step4$value[0],
              vertex = _step4$value[1];

          var result = fn(key, vertex);

          if (result !== undefined) {
            this.removeByKey(sheet, key);
            updated.push(result);
          }
        }
      } catch (err) {
        _iterator4.e(err);
      } finally {
        _iterator4.f();
      }

      updated.forEach(function (range) {
        _this.setRange(range);
      });
    }
  }]);

  return RangeMapping;
}();

function keyFromAddresses(start, end) {
  return "".concat(start.col, ",").concat(start.row, ",").concat(end.col, ",").concat(end.row);
}

function keyFromRange(range) {
  return keyFromAddresses(range.start, range.end);
}

var compareBy = function compareBy(left, right, coordinate) {
  var leftStart = coordinate(left.range.start);
  var rightStart = coordinate(left.range.start);

  if (leftStart === rightStart) {
    var leftEnd = coordinate(left.range.end);
    var rightEnd = coordinate(right.range.end);
    return leftEnd - rightEnd;
  } else {
    return leftStart - rightStart;
  }
};