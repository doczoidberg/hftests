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

function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 * @license
 * Copyright (c) 2020 Handsoncode. All rights reserved.
 */
import { AbsoluteCellRange } from './AbsoluteCellRange';
import { simpleCellAddress } from './Cell';
import { CellContent } from './CellContentParser';
import { MatrixVertex } from './DependencyGraph';
import { Matrix, MatrixSize } from './Matrix';
export var Array2d = /*#__PURE__*/function () {
  function Array2d(size) {
    _classCallCheck(this, Array2d);

    this._size = size;
    this.array = new Array(size.height);

    for (var y = 0; y < size.height; ++y) {
      this.array[y] = new Array(size.width);
    }
  }

  _createClass(Array2d, [{
    key: "set",
    value: function set(x, y, value) {
      this.array[y][x] = value;
    }
  }, {
    key: "get",
    value: function get(x, y) {
      var row = this.array[y];

      if (!row) {
        return null;
      }

      return row[x] || null;
    }
  }, {
    key: "size",
    value: function size() {
      return this._size;
    }
  }], [{
    key: "fromArray",
    value: function fromArray(input) {
      var size = new MatrixSize(input[0].length, input.length);
      var array = new Array2d(size);

      for (var i = 0; i < size.height; ++i) {
        for (var j = 0; j < size.width; ++j) {
          array.set(j, i, input[i][j]);
        }
      }

      return array;
    }
  }]);

  return Array2d;
}();
export var GraphBuilderMatrixHeuristic = /*#__PURE__*/function () {
  function GraphBuilderMatrixHeuristic(dependencyGraph, columnSearch, threshold, cellContentParser) {
    _classCallCheck(this, GraphBuilderMatrixHeuristic);

    this.dependencyGraph = dependencyGraph;
    this.columnSearch = columnSearch;
    this.threshold = threshold;
    this.cellContentParser = cellContentParser;
    this.mapping = new Map();
  }

  _createClass(GraphBuilderMatrixHeuristic, [{
    key: "addSheet",
    value: function addSheet(id, size) {
      this.mapping.set(id, new Array2d(size));
    }
  }, {
    key: "add",
    value: function add(cellAddress) {
      if (!this.mapping.has(cellAddress.sheet)) {
        throw Error("Sheet with id: ".concat(cellAddress.sheet, " does not exists"));
      } // eslint-disable-next-line @typescript-eslint/no-non-null-assertion


      this.mapping.get(cellAddress.sheet).set(cellAddress.col, cellAddress.row, true);
    }
  }, {
    key: "run",
    value: function run(sheets) {
      var _this = this;

      var notMatrices = [];
      var scanResult = this.findMatrices();
      scanResult.forEach(function (elem) {
        if (!elem.isMatrix || elem.range.size() < _this.threshold) {
          notMatrices.push(elem);
          return;
        }

        var possibleMatrix = elem.range;
        var matrixVertex = MatrixVertex.fromRange(possibleMatrix);

        var sheet = sheets[_this.dependencyGraph.getSheetName(possibleMatrix.start.sheet)];

        var matrix = _this.matrixFromPlainValues(possibleMatrix, sheet);

        matrixVertex.setCellValue(matrix);

        _this.dependencyGraph.addMatrixVertex(matrixVertex.getAddress(), matrixVertex);

        _this.columnSearch.add(matrix, matrixVertex.getAddress());
      });
      this.mapping.clear();
      return notMatrices;
    }
  }, {
    key: "matrixFromPlainValues",
    value: function matrixFromPlainValues(range, sheet) {
      var values = new Array(range.height());

      for (var i = 0; i < range.height(); ++i) {
        values[i] = new Array(range.width());
      }

      var _iterator = _createForOfIteratorHelper(range.addresses(this.dependencyGraph)),
          _step;

      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var address = _step.value;
          var cellContent = sheet[address.row][address.col];
          var parsedCellContent = this.cellContentParser.parse(cellContent);

          if (parsedCellContent instanceof CellContent.Number) {
            values[address.row - range.start.row][address.col - range.start.col] = parsedCellContent.value;
          } else {
            throw new Error('Range contains not numeric values');
          }
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }

      return new Matrix(values);
    }
  }, {
    key: "findMatrices",
    value: function findMatrices() {
      var result = [];
      this.mapping.forEach(function (m, sheet) {
        var _iterator2 = _createForOfIteratorHelper(_findMatrices(sheet, m)),
            _step2;

        try {
          for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
            var _possibleMatrix = _step2.value;
            result.push(_possibleMatrix);
          }
        } catch (err) {
          _iterator2.e(err);
        } finally {
          _iterator2.f();
        }
      });
      return result;
    }
  }]);

  return GraphBuilderMatrixHeuristic;
}();

function _findMatrices(sheet, input) {
  var size = input.size();
  var result = new Map();
  var colours = new Array2d(size);
  var colour = 0;

  for (var y = size.height - 1; y >= 0; --y) {
    for (var x = size.width - 1; x >= 0; --x) {
      var value = input.get(x, y); // eslint-disable-next-line @typescript-eslint/no-non-null-assertion

      var _ref = [input.get(x + 1, y), colours.get(x + 1, y)],
          right = _ref[0],
          rightColour = _ref[1]; // eslint-disable-next-line @typescript-eslint/no-non-null-assertion

      var _ref2 = [input.get(x, y + 1), colours.get(x, y + 1)],
          bottom = _ref2[0],
          bottomColour = _ref2[1]; // eslint-disable-next-line @typescript-eslint/no-non-null-assertion

      var _ref3 = [input.get(x + 1, y + 1), colours.get(x + 1, y + 1)],
          diag = _ref3[0],
          diagColour = _ref3[1];

      if (!value) {
        colours.set(x, y, 0);

        if (rightColour === bottomColour) {
          // 0 1
          // 1 *
          if (result.has(rightColour)) {
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            result.get(rightColour).isMatrix = false;
          }
        }
      } else if (value !== right && rightColour === bottomColour) {
        // 1 2
        // 2 *
        colours.set(x, y, ++colour);
        result.set(colour, possibleMatrix(AbsoluteCellRange.fromCoordinates(sheet, x, y, x, y), true, [simpleCellAddress(sheet, x, y)]));

        if (result.has(rightColour)) {
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          result.get(rightColour).isMatrix = false;
        }
      } else if (value !== diag) {
        if (right === value && right === bottom) {
          // 1 1
          // 1 0
          if (result.has(rightColour)) {
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            result.get(rightColour).isMatrix = false;
          }

          if (result.has(bottomColour)) {
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            result.get(bottomColour).isMatrix = false;
          }

          colours.set(x, y, ++colour);
          result.set(colour, possibleMatrix(AbsoluteCellRange.fromCoordinates(sheet, x, y, x, y), true, [simpleCellAddress(sheet, x, y)]));
        } else if (right !== value && bottom === value) {
          // 1 0
          // 1 0
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          if (result.has(bottomColour) && result.get(bottomColour).isMatrix) {
            colours.set(x, y, bottomColour); // eslint-disable-next-line @typescript-eslint/no-non-null-assertion

            var old = result.get(bottomColour);
            old.cells.push(simpleCellAddress(sheet, x, y));
            result.set(bottomColour, possibleMatrix(old.range.withStart(simpleCellAddress(sheet, x, y)), true, old.cells));
          } else {
            colours.set(x, y, ++colour);
            result.set(colour, possibleMatrix(AbsoluteCellRange.fromCoordinates(sheet, x, y, x, y), true, [simpleCellAddress(sheet, x, y)]));
          }
        } else if (right === value && bottom !== value) {
          // 1 1
          // 0 0
          colours.set(x, y, rightColour); // eslint-disable-next-line @typescript-eslint/no-non-null-assertion

          var _old = result.get(rightColour);

          _old.cells.push(simpleCellAddress(sheet, x, y));

          result.set(rightColour, possibleMatrix(_old.range.withStart(simpleCellAddress(sheet, x, y)), true, _old.cells));
        } else {
          colours.set(x, y, ++colour);
          result.set(colour, possibleMatrix(AbsoluteCellRange.fromCoordinates(sheet, x, y, x, y), true, [simpleCellAddress(sheet, x, y)]));
        }
      } else if (value === diag && diagColour === rightColour && diagColour === bottomColour) {
        // 1 1
        // 1 1
        colours.set(x, y, rightColour); // eslint-disable-next-line @typescript-eslint/no-non-null-assertion

        var _old2 = result.get(rightColour);

        _old2.cells.push(simpleCellAddress(sheet, x, y));

        result.set(rightColour, possibleMatrix(_old2.range.withStart(simpleCellAddress(sheet, x, y)), true, _old2.cells));
      } else if (value === diag) {
        colours.set(x, y, ++colour);
        result.set(colour, possibleMatrix(AbsoluteCellRange.fromCoordinates(sheet, x, y, x, y), true, [simpleCellAddress(sheet, x, y)]));
      }
    }
  }

  return result.values();
}

export { _findMatrices as findMatrices };

function possibleMatrix(range, isMatrix, cells) {
  return {
    isMatrix: isMatrix,
    range: range,
    cells: cells
  };
}