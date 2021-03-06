import "core-js/modules/es.symbol";
import "core-js/modules/es.symbol.description";
import "core-js/modules/es.symbol.iterator";
import "core-js/modules/es.array.concat";
import "core-js/modules/es.array.find";
import "core-js/modules/es.array.from";
import "core-js/modules/es.array.iterator";
import "core-js/modules/es.array.slice";
import "core-js/modules/es.array.splice";
import "core-js/modules/es.function.name";
import "core-js/modules/es.map";
import "core-js/modules/es.object.to-string";
import "core-js/modules/es.regexp.to-string";
import "core-js/modules/es.string.iterator";
import "core-js/modules/web.dom-collections.iterator";

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

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
import { CellError, movedSimpleCellAddress } from '../Cell';
import { Matrix } from '../Matrix';
import { StatType } from '../statistics';
import { ColumnBinarySearch } from './ColumnBinarySearch';
import { AddRowsTransformer } from '../dependencyTransformers/AddRowsTransformer';
import { RemoveRowsTransformer } from '../dependencyTransformers/RemoveRowsTransformer';
import { SimpleRangeValue } from '../interpreter/InterpreterValue';
export var ColumnIndex = /*#__PURE__*/function () {
  function ColumnIndex(dependencyGraph, config, stats) {
    _classCallCheck(this, ColumnIndex);

    this.dependencyGraph = dependencyGraph;
    this.config = config;
    this.stats = stats;
    this.index = new Map();
    this.transformingService = this.dependencyGraph.lazilyTransformingAstService;
    this.binarySearchStrategy = new ColumnBinarySearch(dependencyGraph, config);
  }

  _createClass(ColumnIndex, [{
    key: "add",
    value: function add(value, address) {
      if (value instanceof Matrix) {
        var _iterator = _createForOfIteratorHelper(value.generateValues(address)),
            _step;

        try {
          for (_iterator.s(); !(_step = _iterator.n()).done;) {
            var _step$value = _slicedToArray(_step.value, 2),
                matrixValue = _step$value[0],
                cellAddress = _step$value[1];

            this.addSingleCellValue(matrixValue, cellAddress);
          }
        } catch (err) {
          _iterator.e(err);
        } finally {
          _iterator.f();
        }
      } else if (!(value instanceof CellError || value instanceof SimpleRangeValue)) {
        this.addSingleCellValue(value, address);
      }
    }
  }, {
    key: "remove",
    value: function remove(value, address) {
      if (!value) {
        return;
      }

      if (value instanceof Matrix) {
        var _iterator2 = _createForOfIteratorHelper(value.generateValues(address)),
            _step2;

        try {
          for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
            var _step2$value = _slicedToArray(_step2.value, 2),
                matrixValue = _step2$value[0],
                cellAddress = _step2$value[1];

            this.removeSingleValue(matrixValue, cellAddress);
          }
        } catch (err) {
          _iterator2.e(err);
        } finally {
          _iterator2.f();
        }
      } else {
        this.removeSingleValue(value, address);
      }
    }
  }, {
    key: "change",
    value: function change(oldValue, newValue, address) {
      if (oldValue === newValue) {
        return;
      }

      this.remove(oldValue, address);
      this.add(newValue, address);
    }
  }, {
    key: "moveValues",
    value: function moveValues(sourceRange, toRight, toBottom, toSheet) {
      var _iterator3 = _createForOfIteratorHelper(sourceRange),
          _step3;

      try {
        for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
          var _step3$value = _slicedToArray(_step3.value, 2),
              value = _step3$value[0],
              address = _step3$value[1];

          var targetAddress = movedSimpleCellAddress(address, toSheet, toRight, toBottom);
          this.remove(value, address);
          this.add(value, targetAddress);
        }
      } catch (err) {
        _iterator3.e(err);
      } finally {
        _iterator3.f();
      }
    }
  }, {
    key: "removeValues",
    value: function removeValues(range) {
      var _iterator4 = _createForOfIteratorHelper(range),
          _step4;

      try {
        for (_iterator4.s(); !(_step4 = _iterator4.n()).done;) {
          var _step4$value = _slicedToArray(_step4.value, 2),
              value = _step4$value[0],
              address = _step4$value[1];

          this.remove(value, address);
        }
      } catch (err) {
        _iterator4.e(err);
      } finally {
        _iterator4.f();
      }
    }
  }, {
    key: "find",
    value: function find(key, range, sorted) {
      this.ensureRecentData(range.sheet, range.start.col, key);
      var columnMap = this.getColumnMap(range.sheet, range.start.col);

      if (!columnMap) {
        return -1;
      }

      var valueIndex = columnMap.get(key);

      if (!valueIndex) {
        return this.binarySearchStrategy.find(key, range, sorted);
      }

      var index = upperBound(valueIndex.index, range.start.row);
      var rowNumber = valueIndex.index[index];
      return rowNumber <= range.end.row ? rowNumber : this.binarySearchStrategy.find(key, range, sorted);
    }
  }, {
    key: "advancedFind",
    value: function advancedFind(keyMatcher, range) {
      return this.binarySearchStrategy.advancedFind(keyMatcher, range);
    }
  }, {
    key: "addColumns",
    value: function addColumns(columnsSpan) {
      var sheetIndex = this.index.get(columnsSpan.sheet);

      if (!sheetIndex) {
        return;
      }

      sheetIndex.splice.apply(sheetIndex, [columnsSpan.columnStart, 0].concat(_toConsumableArray(Array(columnsSpan.numberOfColumns))));
    }
  }, {
    key: "removeColumns",
    value: function removeColumns(columnsSpan) {
      var sheetIndex = this.index.get(columnsSpan.sheet);

      if (!sheetIndex) {
        return;
      }

      sheetIndex.splice(columnsSpan.columnStart, columnsSpan.numberOfColumns);
    }
  }, {
    key: "removeSheet",
    value: function removeSheet(sheetId) {
      this.index.delete(sheetId);
    }
  }, {
    key: "getColumnMap",
    value: function getColumnMap(sheet, col) {
      if (!this.index.has(sheet)) {
        this.index.set(sheet, []);
      }

      var sheetMap = this.index.get(sheet); // eslint-disable-line @typescript-eslint/no-non-null-assertion

      var columnMap = sheetMap[col];

      if (!columnMap) {
        columnMap = new Map();
        sheetMap[col] = columnMap;
      }

      return columnMap;
    }
  }, {
    key: "getValueIndex",
    value: function getValueIndex(sheet, col, value) {
      var columnMap = this.getColumnMap(sheet, col);
      var index = this.getColumnMap(sheet, col).get(value);

      if (!index) {
        index = {
          version: this.transformingService.version(),
          index: []
        };
        columnMap.set(value, index);
      }

      return index;
    }
  }, {
    key: "ensureRecentData",
    value: function ensureRecentData(sheet, col, value) {
      var valueIndex = this.getValueIndex(sheet, col, value);
      var actualVersion = this.transformingService.version();

      if (valueIndex.version === actualVersion) {
        return;
      }

      var relevantTransformations = this.transformingService.getTransformationsFrom(valueIndex.version, function (transformation) {
        return transformation.sheet === sheet && (transformation instanceof AddRowsTransformer || transformation instanceof RemoveRowsTransformer);
      });

      var _iterator5 = _createForOfIteratorHelper(relevantTransformations),
          _step5;

      try {
        for (_iterator5.s(); !(_step5 = _iterator5.n()).done;) {
          var transformation = _step5.value;

          if (transformation instanceof AddRowsTransformer) {
            this.addRows(col, transformation.rowsSpan, value);
          } else if (transformation instanceof RemoveRowsTransformer) {
            this.removeRows(col, transformation.rowsSpan, value);
          }
        }
      } catch (err) {
        _iterator5.e(err);
      } finally {
        _iterator5.f();
      }

      valueIndex.version = actualVersion;
    }
  }, {
    key: "destroy",
    value: function destroy() {
      this.index.clear();
    }
  }, {
    key: "addSingleCellValue",
    value: function addSingleCellValue(value, address) {
      var _this = this;

      this.stats.measure(StatType.BUILD_COLUMN_INDEX, function () {
        _this.ensureRecentData(address.sheet, address.col, value);

        var valueIndex = _this.getValueIndex(address.sheet, address.col, value);

        _this.addValue(valueIndex, address.row);
      });
    }
  }, {
    key: "removeSingleValue",
    value: function removeSingleValue(value, address) {
      var _this2 = this;

      this.stats.measure(StatType.BUILD_COLUMN_INDEX, function () {
        _this2.ensureRecentData(address.sheet, address.col, value);

        var columnMap = _this2.getColumnMap(address.sheet, address.col);

        var valueIndex = columnMap.get(value);

        if (!valueIndex) {
          return;
        }

        var index = upperBound(valueIndex.index, address.row);
        valueIndex.index.splice(index, 1);

        if (valueIndex.index.length === 0) {
          columnMap.delete(value);
        }

        if (columnMap.size === 0) {
          delete _this2.index.get(address.sheet)[address.col]; // eslint-disable-line @typescript-eslint/no-non-null-assertion
        }
      });
    }
  }, {
    key: "addRows",
    value: function addRows(col, rowsSpan, value) {
      var valueIndex = this.getValueIndex(rowsSpan.sheet, col, value);
      this.shiftRows(valueIndex, rowsSpan.rowStart, rowsSpan.numberOfRows);
    }
  }, {
    key: "removeRows",
    value: function removeRows(col, rowsSpan, value) {
      var valueIndex = this.getValueIndex(rowsSpan.sheet, col, value);
      this.removeRowsFromValues(valueIndex, rowsSpan);
      this.shiftRows(valueIndex, rowsSpan.rowEnd + 1, -rowsSpan.numberOfRows);
    }
  }, {
    key: "addValue",
    value: function addValue(valueIndex, rowNumber) {
      var rowIndex = lowerBound(valueIndex.index, rowNumber);
      var value = valueIndex.index[rowIndex];

      if (value === rowNumber) {
        /* do not add same row twice */
        return;
      }

      if (rowIndex === valueIndex.index.length - 1) {
        valueIndex.index.push(rowNumber);
      } else {
        valueIndex.index.splice(rowIndex + 1, 0, rowNumber);
      }
    }
  }, {
    key: "removeRowsFromValues",
    value: function removeRowsFromValues(rows, rowsSpan) {
      var start = upperBound(rows.index, rowsSpan.rowStart);
      var end = lowerBound(rows.index, rowsSpan.rowEnd);

      if (rows.index[start] <= rowsSpan.rowEnd) {
        rows.index.splice(start, end - start + 1);
      }
    }
  }, {
    key: "shiftRows",
    value: function shiftRows(rows, afterRow, numberOfRows) {
      var index = upperBound(rows.index, afterRow);

      for (var i = index; i < rows.index.length; ++i) {
        rows.index[i] += numberOfRows;
      }
    }
  }]);

  return ColumnIndex;
}();
/*
* If key exists returns index of key
* Otherwise returns index of smallest element greater than key
* assuming sorted array and no repetitions
* */

export function upperBound(values, key) {
  var start = 0;
  var end = values.length - 1;

  while (start <= end) {
    var center = Math.floor((start + end) / 2);

    if (key > values[center]) {
      start = center + 1;
    } else if (key < values[center]) {
      end = center - 1;
    } else {
      return center;
    }
  }

  return start;
}
/*
* If key exists returns index of key
* Otherwise returns index of greatest element smaller than key
* assuming sorted array and no repetitions
* */

export function lowerBound(values, key) {
  var start = 0;
  var end = values.length - 1;

  while (start <= end) {
    var center = Math.floor((start + end) / 2);

    if (key > values[center]) {
      start = center + 1;
    } else if (key < values[center]) {
      end = center - 1;
    } else {
      return center;
    }
  }

  return end;
}