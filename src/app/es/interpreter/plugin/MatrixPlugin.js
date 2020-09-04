import "core-js/modules/es.symbol";
import "core-js/modules/es.symbol.description";
import "core-js/modules/es.symbol.iterator";
import "core-js/modules/es.array.from";
import "core-js/modules/es.array.iterator";
import "core-js/modules/es.array.slice";
import "core-js/modules/es.array.some";
import "core-js/modules/es.function.name";
import "core-js/modules/es.object.get-prototype-of";
import "core-js/modules/es.object.to-string";
import "core-js/modules/es.reflect.construct";
import "core-js/modules/es.regexp.to-string";
import "core-js/modules/es.string.iterator";
import "core-js/modules/web.dom-collections.iterator";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

/**
 * @license
 * Copyright (c) 2020 Handsoncode. All rights reserved.
 */
import { CellError, ErrorType } from '../../Cell';
import { matrixSizeForMultiplication, matrixSizeForPoolFunction, matrixSizeForTranspose } from '../../Matrix';
import { AstNodeType } from '../../parser';
import { coerceToRangeNumbersOrError } from '../ArithmeticHelper';
import { SimpleRangeValue } from '../InterpreterValue';
import { FunctionPlugin } from './FunctionPlugin';
export var MatrixPlugin = /*#__PURE__*/function (_FunctionPlugin) {
  _inherits(MatrixPlugin, _FunctionPlugin);

  var _super = _createSuper(MatrixPlugin);

  function MatrixPlugin() {
    _classCallCheck(this, MatrixPlugin);

    return _super.apply(this, arguments);
  }

  _createClass(MatrixPlugin, [{
    key: "mmult",
    value: function mmult(ast, formulaAddress) {
      if (ast.args.length !== 2) {
        return new CellError(ErrorType.NA);
      }

      if (ast.args.some(function (ast) {
        return ast.type === AstNodeType.EMPTY;
      })) {
        return new CellError(ErrorType.NUM);
      }

      var _ast$args = _slicedToArray(ast.args, 2),
          left = _ast$args[0],
          right = _ast$args[1];

      var leftMatrix = coerceToRangeNumbersOrError(this.evaluateAst(left, formulaAddress));
      var rightMatrix = coerceToRangeNumbersOrError(this.evaluateAst(right, formulaAddress));

      if (leftMatrix instanceof CellError) {
        return leftMatrix;
      } else if (rightMatrix instanceof CellError) {
        return rightMatrix;
      } else if (leftMatrix === null || rightMatrix === null) {
        return new CellError(ErrorType.VALUE);
      }

      var outputSize = matrixSizeForMultiplication(leftMatrix.size, rightMatrix.size);
      var gpu = this.interpreter.getGpuInstance();
      var kernel = gpu.createKernel(function (a, b, width) {
        var sum = 0;

        for (var i = 0; i < width; ++i) {
          sum += a[this.thread.y][i] * b[i][this.thread.x];
        }

        return sum;
      }).setPrecision('unsigned').setOutput([outputSize.width, outputSize.height]);
      return SimpleRangeValue.onlyNumbersDataWithoutRange(kernel(leftMatrix.rawNumbers(), rightMatrix.rawNumbers(), leftMatrix.width()), outputSize);
    }
  }, {
    key: "maxpool",
    value: function maxpool(ast, formulaAddress) {
      var _ast$args2 = _slicedToArray(ast.args, 2),
          rangeArg = _ast$args2[0],
          sizeArg = _ast$args2[1];

      var rangeMatrix = coerceToRangeNumbersOrError(this.evaluateAst(rangeArg, formulaAddress));
      var windowSize = sizeArg.value;
      var stride = windowSize;

      if (ast.args.some(function (ast) {
        return ast.type === AstNodeType.EMPTY;
      })) {
        return new CellError(ErrorType.NUM);
      }

      if (ast.args.length === 3) {
        var strideArg = ast.args[2];

        if (strideArg.type === AstNodeType.NUMBER) {
          stride = strideArg.value;
        } else {
          return new CellError(ErrorType.VALUE);
        }
      }

      if (rangeMatrix instanceof CellError) {
        return rangeMatrix;
      } else if (rangeMatrix === null) {
        return new CellError(ErrorType.VALUE);
      }

      var outputSize = matrixSizeForPoolFunction(rangeMatrix.size, windowSize, stride);
      /* istanbul ignore next: gpu.js */

      var gpu = this.interpreter.getGpuInstance();
      var kernel = gpu.createKernel(function (a, windowSize, stride) {
        var leftCornerX = this.thread.x * stride;
        var leftCornerY = this.thread.y * stride;
        var currentMax = a[leftCornerY][leftCornerX];

        for (var i = 0; i < windowSize; i++) {
          for (var j = 0; j < windowSize; j++) {
            currentMax = Math.max(currentMax, a[leftCornerY + i][leftCornerX + j]);
          }
        }

        return currentMax;
      }).setPrecision('unsigned').setOutput([outputSize.width, outputSize.height]);
      return SimpleRangeValue.onlyNumbersDataWithoutRange(kernel(rangeMatrix.rawNumbers(), windowSize, stride), outputSize);
    }
  }, {
    key: "medianpool",
    value: function medianpool(ast, formulaAddress) {
      var _ast$args3 = _slicedToArray(ast.args, 2),
          rangeArg = _ast$args3[0],
          sizeArg = _ast$args3[1];

      if (ast.args.some(function (ast) {
        return ast.type === AstNodeType.EMPTY;
      })) {
        return new CellError(ErrorType.NUM);
      }

      var rangeMatrix = coerceToRangeNumbersOrError(this.evaluateAst(rangeArg, formulaAddress));
      var windowSize = sizeArg.value;
      var stride = windowSize;

      if (ast.args.length === 3) {
        var strideArg = ast.args[2];

        if (strideArg.type === AstNodeType.NUMBER) {
          stride = strideArg.value;
        } else {
          return new CellError(ErrorType.VALUE);
        }
      }

      if (rangeMatrix instanceof CellError) {
        return rangeMatrix;
      } else if (rangeMatrix === null) {
        return new CellError(ErrorType.VALUE);
      }

      var outputSize = matrixSizeForPoolFunction(rangeMatrix.size, windowSize, stride);
      /* istanbul ignore next: gpu.js */

      var gpu = this.interpreter.getGpuInstance();
      var kernel = gpu.createKernel(function (a, windowSize, stride) {
        var leftCornerX = this.thread.x * stride;
        var leftCornerY = this.thread.y * stride;
        var currentMax = a[leftCornerY][leftCornerX];

        for (var i = 0; i < windowSize; i++) {
          for (var j = 0; j < windowSize; j++) {
            currentMax = Math.max(currentMax, a[leftCornerY + i][leftCornerX + j]);
          }
        }

        var currentMin = a[leftCornerY][leftCornerX];

        for (var i2 = 0; i2 < windowSize; i2++) {
          for (var j2 = 0; j2 < windowSize; j2++) {
            currentMin = Math.min(currentMin, a[leftCornerY + i2][leftCornerX + j2]);
          }
        }

        var numberOfElements = windowSize * windowSize;
        var leftEnd = currentMin;
        var rightEnd = currentMax;
        var result = 42;

        for (var iter = 0; iter < 32; iter++) {
          var medianGuess = (leftEnd + rightEnd) / 2;
          var medianGuessCount = 0;

          for (var i3 = 0; i3 < windowSize; i3++) {
            for (var j3 = 0; j3 < windowSize; j3++) {
              if (a[leftCornerY + i3][leftCornerX + j3] > medianGuess) {
                medianGuessCount++;
              }
            }
          }

          if (windowSize % 2 === 0) {
            if (medianGuessCount === numberOfElements / 2) {
              result = medianGuess;
              break;
            } else if (medianGuessCount > numberOfElements / 2) {
              leftEnd = medianGuess;
            } else {
              rightEnd = medianGuess;
            }
          } else {
            if (medianGuessCount === (numberOfElements - 1) / 2) {
              result = medianGuess;
              break;
            } else if (medianGuessCount > (numberOfElements - 1) / 2) {
              leftEnd = medianGuess;
            } else {
              rightEnd = medianGuess;
            }
          }
        }

        return result;
      }).setPrecision('unsigned').setOutput([outputSize.width, outputSize.height]);
      return SimpleRangeValue.onlyNumbersDataWithoutRange(kernel(rangeMatrix.rawNumbers(), windowSize, stride), outputSize);
    }
  }, {
    key: "transpose",
    value: function transpose(ast, formulaAddress) {
      if (ast.args.length !== 1) {
        return new CellError(ErrorType.NA);
      }

      if (ast.args.some(function (ast) {
        return ast.type === AstNodeType.EMPTY;
      })) {
        return new CellError(ErrorType.NUM);
      }

      var value = coerceToRangeNumbersOrError(this.evaluateAst(ast.args[0], formulaAddress));

      if (value instanceof CellError) {
        return value;
      } else if (value === null) {
        return new CellError(ErrorType.VALUE);
      }

      var input = value.rawNumbers();
      var inputSize = value.size;
      var result = [];

      for (var i = 0; i < inputSize.width; ++i) {
        result[i] = [];

        for (var j = 0; j < inputSize.height; ++j) {
          result[i][j] = input[j][i];
        }
      }

      return SimpleRangeValue.onlyNumbersDataWithoutRange(result, matrixSizeForTranspose(inputSize));
    }
  }]);

  return MatrixPlugin;
}(FunctionPlugin);
MatrixPlugin.implementedFunctions = {
  'MMULT': {
    method: 'mmult'
  },
  'TRANSPOSE': {
    method: 'transpose'
  },
  'MAXPOOL': {
    method: 'maxpool'
  },
  'MEDIANPOOL': {
    method: 'medianpool'
  }
};