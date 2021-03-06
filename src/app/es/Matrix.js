import "core-js/modules/es.symbol";
import "core-js/modules/es.symbol.description";
import "core-js/modules/es.symbol.iterator";
import "core-js/modules/es.array.concat";
import "core-js/modules/es.array.fill";
import "core-js/modules/es.array.from";
import "core-js/modules/es.array.iterator";
import "core-js/modules/es.array.slice";
import "core-js/modules/es.array.some";
import "core-js/modules/es.array.splice";
import "core-js/modules/es.function.name";
import "core-js/modules/es.object.to-string";
import "core-js/modules/es.regexp.to-string";
import "core-js/modules/es.string.iterator";
import "core-js/modules/web.dom-collections.iterator";
import "regenerator-runtime/runtime";

function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * @license
 * Copyright (c) 2020 Handsoncode. All rights reserved.
 */
import { AbsoluteCellRange } from './AbsoluteCellRange';
import { CellError, ErrorType, simpleCellAddress } from './Cell';
import { AstNodeType } from './parser';
export var MatrixSize = function MatrixSize(width, height) {
  _classCallCheck(this, MatrixSize);

  this.width = width;
  this.height = height;

  if (width <= 0 || height <= 0) {
    throw Error('Incorrect matrix size');
  }
};
export function matrixSizeForTranspose(inputSize) {
  return new MatrixSize(inputSize.height, inputSize.width);
}
export function matrixSizeForMultiplication(leftMatrixSize, rightMatrixSize) {
  return new MatrixSize(rightMatrixSize.width, leftMatrixSize.height);
}
export function matrixSizeForPoolFunction(inputMatrix, windowSize, stride) {
  return new MatrixSize(1 + (inputMatrix.width - windowSize) / stride, 1 + (inputMatrix.height - windowSize) / stride);
}
export function checkMatrixSize(ast, formulaAddress) {
  if (ast.type === AstNodeType.FUNCTION_CALL) {
    switch (ast.procedureName) {
      case 'MMULT':
        {
          if (ast.args.length !== 2) {
            return new CellError(ErrorType.NA);
          }

          if (ast.args.some(function (ast) {
            return ast.type === AstNodeType.EMPTY;
          })) {
            return new CellError(ErrorType.NUM);
          }

          var left = checkMatrixSize(ast.args[0], formulaAddress);
          var right = checkMatrixSize(ast.args[1], formulaAddress);

          if (left instanceof CellError) {
            return left;
          } else if (right instanceof CellError) {
            return right;
          } else if (left.width !== right.height) {
            return new CellError(ErrorType.VALUE);
          } else {
            return matrixSizeForMultiplication(left, right);
          }
        }

      case 'MEDIANPOOL':
      case 'MAXPOOL':
        {
          if (ast.args.length < 2 || ast.args.length > 3) {
            return new CellError(ErrorType.NA);
          }

          if (ast.args.some(function (ast) {
            return ast.type === AstNodeType.EMPTY;
          })) {
            return new CellError(ErrorType.NUM);
          }

          var matrix = checkMatrixSize(ast.args[0], formulaAddress);
          var windowArg = ast.args[1];

          if (matrix instanceof CellError) {
            return matrix;
          } else if (windowArg.type !== AstNodeType.NUMBER) {
            return new CellError(ErrorType.VALUE);
          }

          var window = windowArg.value;
          var stride = windowArg.value;

          if (ast.args.length === 3) {
            var strideArg = ast.args[2];

            if (strideArg.type === AstNodeType.NUMBER) {
              stride = strideArg.value;
            } else {
              return new CellError(ErrorType.VALUE);
            }
          }

          if (window > matrix.width || window > matrix.height || stride > window || (matrix.width - window) % stride !== 0 || (matrix.height - window) % stride !== 0) {
            return new CellError(ErrorType.VALUE);
          }

          return matrixSizeForPoolFunction(matrix, window, stride);
        }

      case 'TRANSPOSE':
        {
          if (ast.args.length !== 1) {
            return new CellError(ErrorType.NA);
          }

          if (ast.args[0].type === AstNodeType.EMPTY) {
            return new CellError(ErrorType.NUM);
          }

          var size = checkMatrixSize(ast.args[0], formulaAddress);
          return size instanceof CellError ? size : matrixSizeForTranspose(size);
        }

      default:
        {
          return new CellError(ErrorType.VALUE);
        }
    }
  } else if (ast.type === AstNodeType.CELL_RANGE) {
    var range = AbsoluteCellRange.fromCellRange(ast, formulaAddress);
    return {
      width: range.width(),
      height: range.height()
    };
  } else if (ast.type === AstNodeType.NUMBER || ast.type === AstNodeType.CELL_REFERENCE) {
    return {
      width: 1,
      height: 1
    };
  } else {
    return new CellError(ErrorType.VALUE);
  }
}
export var NotComputedMatrix = /*#__PURE__*/function () {
  function NotComputedMatrix(size) {
    _classCallCheck(this, NotComputedMatrix);

    this.size = size;
  }

  _createClass(NotComputedMatrix, [{
    key: "width",
    value: function width() {
      return this.size.width;
    }
  }, {
    key: "height",
    value: function height() {
      return this.size.height;
    } // eslint-disable-next-line @typescript-eslint/no-unused-vars

  }, {
    key: "get",
    value: function get(col, row) {
      throw Error('Matrix not computed yet.');
    }
  }]);

  return NotComputedMatrix;
}();
export var Matrix = /*#__PURE__*/function () {
  function Matrix(matrix) {
    _classCallCheck(this, Matrix);

    this.size = new MatrixSize(matrix.length > 0 ? matrix[0].length : 0, matrix.length);
    this.matrix = matrix;
  }

  _createClass(Matrix, [{
    key: "addRows",
    value: function addRows(aboveRow, numberOfRows) {
      var _this$matrix;

      (_this$matrix = this.matrix).splice.apply(_this$matrix, [aboveRow, 0].concat(_toConsumableArray(this.zeroArrays(numberOfRows, this.width()))));

      this.size.height += numberOfRows;
    }
  }, {
    key: "addColumns",
    value: function addColumns(aboveColumn, numberOfColumns) {
      for (var i = 0; i < this.height(); i++) {
        var _this$matrix$i;

        (_this$matrix$i = this.matrix[i]).splice.apply(_this$matrix$i, [aboveColumn, 0].concat(_toConsumableArray(new Array(numberOfColumns).fill(0))));
      }

      this.size.width += numberOfColumns;
    }
  }, {
    key: "removeRows",
    value: function removeRows(startRow, endRow) {
      if (this.outOfBound(0, startRow) || this.outOfBound(0, endRow)) {
        throw Error('Matrix index out of bound');
      }

      var numberOfRows = endRow - startRow + 1;
      this.matrix.splice(startRow, numberOfRows);
      this.size.height -= numberOfRows;
    }
  }, {
    key: "removeColumns",
    value: function removeColumns(leftmostColumn, rightmostColumn) {
      if (this.outOfBound(leftmostColumn, 0) || this.outOfBound(rightmostColumn, 0)) {
        throw Error('Matrix index out of bound');
      }

      var numberOfColumns = rightmostColumn - leftmostColumn + 1;

      var _iterator = _createForOfIteratorHelper(this.matrix),
          _step;

      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var row = _step.value;
          row.splice(leftmostColumn, numberOfColumns);
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }

      this.size.width -= numberOfColumns;
    }
  }, {
    key: "zeroArrays",
    value: function zeroArrays(count, size) {
      var result = [];

      for (var i = 0; i < count; ++i) {
        result.push(new Array(size).fill(0));
      }

      return result;
    }
  }, {
    key: "get",
    value: function get(col, row) {
      if (this.outOfBound(col, row)) {
        throw Error('Matrix index out of bound');
      }

      return this.matrix[row][col];
    }
  }, {
    key: "set",
    value: function set(col, row, value) {
      if (this.outOfBound(col, row)) {
        throw Error('Matrix index out of bound');
      }

      this.matrix[row][col] = value;
    }
  }, {
    key: "width",
    value: function width() {
      return this.size.width;
    }
  }, {
    key: "height",
    value: function height() {
      return this.size.height;
    }
  }, {
    key: "raw",
    value: function raw() {
      return this.matrix;
    }
  }, {
    key: "generateValues",
    value: /*#__PURE__*/regeneratorRuntime.mark(function generateValues(leftCorner) {
      var row, col;
      return regeneratorRuntime.wrap(function generateValues$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              row = 0;

            case 1:
              if (!(row < this.size.height)) {
                _context.next = 12;
                break;
              }

              col = 0;

            case 3:
              if (!(col < this.size.width)) {
                _context.next = 9;
                break;
              }

              _context.next = 6;
              return [this.matrix[row][col], simpleCellAddress(leftCorner.sheet, leftCorner.col + col, leftCorner.row + row)];

            case 6:
              ++col;
              _context.next = 3;
              break;

            case 9:
              ++row;
              _context.next = 1;
              break;

            case 12:
            case "end":
              return _context.stop();
          }
        }
      }, generateValues, this);
    })
  }, {
    key: "outOfBound",
    value: function outOfBound(col, row) {
      return col < 0 || row < 0 || row > this.size.height - 1 || col > this.size.width - 1;
    }
  }]);

  return Matrix;
}();
export var ErroredMatrix = /*#__PURE__*/function () {
  function ErroredMatrix(error, size) {
    _classCallCheck(this, ErroredMatrix);

    this.error = error;
    this.size = size;
  } // eslint-disable-next-line @typescript-eslint/no-unused-vars


  _createClass(ErroredMatrix, [{
    key: "get",
    value: function get(col, row) {
      return this.error;
    }
  }, {
    key: "width",
    value: function width() {
      return this.size.width;
    }
  }, {
    key: "height",
    value: function height() {
      return this.size.height;
    }
  }]);

  return ErroredMatrix;
}();