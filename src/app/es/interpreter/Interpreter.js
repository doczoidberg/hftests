import "core-js/modules/es.symbol";
import "core-js/modules/es.symbol.description";
import "core-js/modules/es.symbol.iterator";
import "core-js/modules/es.array.concat";
import "core-js/modules/es.array.from";
import "core-js/modules/es.array.iterator";
import "core-js/modules/es.array.slice";
import "core-js/modules/es.function.name";
import "core-js/modules/es.object.to-string";
import "core-js/modules/es.regexp.to-string";
import "core-js/modules/es.string.iterator";
import "core-js/modules/web.dom-collections.iterator";

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 * @license
 * Copyright (c) 2020 Handsoncode. All rights reserved.
 */
import GPU from 'gpu.js';
import { AbsoluteCellRange, AbsoluteColumnRange, AbsoluteRowRange } from '../AbsoluteCellRange';
import { CellError, EmptyValue, ErrorType, invalidSimpleCellAddress } from '../Cell';
import { Matrix, NotComputedMatrix } from '../Matrix'; // noinspection TypeScriptPreferShortImport

import { AstNodeType } from '../parser/Ast';
import { ArithmeticHelper, coerceScalarToString, divide } from './ArithmeticHelper';
import { CriterionBuilder } from './Criterion';
import { SimpleRangeValue } from './InterpreterValue';
export var Interpreter = /*#__PURE__*/function () {
  function Interpreter(dependencyGraph, columnSearch, config, stats, dateHelper, numberLiteralsHelper, functionRegistry, namedExpressions, serialization) {
    _classCallCheck(this, Interpreter);

    this.dependencyGraph = dependencyGraph;
    this.columnSearch = columnSearch;
    this.config = config;
    this.stats = stats;
    this.dateHelper = dateHelper;
    this.numberLiteralsHelper = numberLiteralsHelper;
    this.functionRegistry = functionRegistry;
    this.namedExpressions = namedExpressions;
    this.serialization = serialization;
    this.functionRegistry.initializePlugins(this);
    this.arithmeticHelper = new ArithmeticHelper(config, dateHelper, numberLiteralsHelper);
    this.criterionBuilder = new CriterionBuilder(config);
  }
  /**
   * Calculates cell value from formula abstract syntax tree
   *
   * @param formula - abstract syntax tree of formula
   * @param formulaAddress - address of the cell in which formula is located
   */


  _createClass(Interpreter, [{
    key: "evaluateAst",
    value: function evaluateAst(ast, formulaAddress) {
      var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m;

      switch (ast.type) {
        case AstNodeType.EMPTY:
          {
            return EmptyValue;
          }

        case AstNodeType.CELL_REFERENCE:
          {
            var address = ast.reference.toSimpleCellAddress(formulaAddress);

            if (invalidSimpleCellAddress(address)) {
              return new CellError(ErrorType.REF);
            }

            return this.dependencyGraph.getCellValue(address);
          }

        case AstNodeType.NUMBER:
        case AstNodeType.STRING:
          {
            return ast.value;
          }

        case AstNodeType.CONCATENATE_OP:
          {
            var leftResult = this.evaluateAst(ast.left, formulaAddress);
            var rightResult = this.evaluateAst(ast.right, formulaAddress);
            return (_a = passErrors(leftResult, rightResult)) !== null && _a !== void 0 ? _a : wrapperBinary(function (a, b) {
              return a.concat(b);
            }, coerceScalarToString(leftResult), coerceScalarToString(rightResult));
          }

        case AstNodeType.EQUALS_OP:
          {
            var _leftResult = this.evaluateAst(ast.left, formulaAddress);

            var _rightResult = this.evaluateAst(ast.right, formulaAddress);

            return (_b = passErrors(_leftResult, _rightResult)) !== null && _b !== void 0 ? _b : this.arithmeticHelper.compare(_leftResult, _rightResult) === 0;
          }

        case AstNodeType.NOT_EQUAL_OP:
          {
            var _leftResult2 = this.evaluateAst(ast.left, formulaAddress);

            var _rightResult2 = this.evaluateAst(ast.right, formulaAddress);

            return (_c = passErrors(_leftResult2, _rightResult2)) !== null && _c !== void 0 ? _c : this.arithmeticHelper.compare(_leftResult2, _rightResult2) !== 0;
          }

        case AstNodeType.GREATER_THAN_OP:
          {
            var _leftResult3 = this.evaluateAst(ast.left, formulaAddress);

            var _rightResult3 = this.evaluateAst(ast.right, formulaAddress);

            return (_d = passErrors(_leftResult3, _rightResult3)) !== null && _d !== void 0 ? _d : this.arithmeticHelper.compare(_leftResult3, _rightResult3) > 0;
          }

        case AstNodeType.LESS_THAN_OP:
          {
            var _leftResult4 = this.evaluateAst(ast.left, formulaAddress);

            var _rightResult4 = this.evaluateAst(ast.right, formulaAddress);

            return (_e = passErrors(_leftResult4, _rightResult4)) !== null && _e !== void 0 ? _e : this.arithmeticHelper.compare(_leftResult4, _rightResult4) < 0;
          }

        case AstNodeType.GREATER_THAN_OR_EQUAL_OP:
          {
            var _leftResult5 = this.evaluateAst(ast.left, formulaAddress);

            var _rightResult5 = this.evaluateAst(ast.right, formulaAddress);

            return (_f = passErrors(_leftResult5, _rightResult5)) !== null && _f !== void 0 ? _f : this.arithmeticHelper.compare(_leftResult5, _rightResult5) >= 0;
          }

        case AstNodeType.LESS_THAN_OR_EQUAL_OP:
          {
            var _leftResult6 = this.evaluateAst(ast.left, formulaAddress);

            var _rightResult6 = this.evaluateAst(ast.right, formulaAddress);

            return (_g = passErrors(_leftResult6, _rightResult6)) !== null && _g !== void 0 ? _g : this.arithmeticHelper.compare(_leftResult6, _rightResult6) <= 0;
          }

        case AstNodeType.PLUS_OP:
          {
            var _leftResult7 = this.evaluateAst(ast.left, formulaAddress);

            var _rightResult7 = this.evaluateAst(ast.right, formulaAddress);

            return (_h = passErrors(_leftResult7, _rightResult7)) !== null && _h !== void 0 ? _h : wrapperBinary(this.arithmeticHelper.addWithEpsilon, this.arithmeticHelper.coerceScalarToNumberOrError(_leftResult7), this.arithmeticHelper.coerceScalarToNumberOrError(_rightResult7));
          }

        case AstNodeType.MINUS_OP:
          {
            var _leftResult8 = this.evaluateAst(ast.left, formulaAddress);

            var _rightResult8 = this.evaluateAst(ast.right, formulaAddress);

            return (_j = passErrors(_leftResult8, _rightResult8)) !== null && _j !== void 0 ? _j : wrapperBinary(this.arithmeticHelper.subtract, this.arithmeticHelper.coerceScalarToNumberOrError(_leftResult8), this.arithmeticHelper.coerceScalarToNumberOrError(_rightResult8));
          }

        case AstNodeType.TIMES_OP:
          {
            var _leftResult9 = this.evaluateAst(ast.left, formulaAddress);

            var _rightResult9 = this.evaluateAst(ast.right, formulaAddress);

            return (_k = passErrors(_leftResult9, _rightResult9)) !== null && _k !== void 0 ? _k : wrapperBinary(function (a, b) {
              return a * b;
            }, this.arithmeticHelper.coerceScalarToNumberOrError(_leftResult9), this.arithmeticHelper.coerceScalarToNumberOrError(_rightResult9));
          }

        case AstNodeType.POWER_OP:
          {
            var _leftResult10 = this.evaluateAst(ast.left, formulaAddress);

            var _rightResult10 = this.evaluateAst(ast.right, formulaAddress);

            return (_l = passErrors(_leftResult10, _rightResult10)) !== null && _l !== void 0 ? _l : wrapperBinary(Math.pow, this.arithmeticHelper.coerceScalarToNumberOrError(_leftResult10), this.arithmeticHelper.coerceScalarToNumberOrError(_rightResult10));
          }

        case AstNodeType.DIV_OP:
          {
            var _leftResult11 = this.evaluateAst(ast.left, formulaAddress);

            var _rightResult11 = this.evaluateAst(ast.right, formulaAddress);

            return (_m = passErrors(_leftResult11, _rightResult11)) !== null && _m !== void 0 ? _m : wrapperBinary(divide, this.arithmeticHelper.coerceScalarToNumberOrError(_leftResult11), this.arithmeticHelper.coerceScalarToNumberOrError(_rightResult11));
          }

        case AstNodeType.PLUS_UNARY_OP:
          {
            var result = this.evaluateAst(ast.value, formulaAddress);

            if (result instanceof SimpleRangeValue) {
              return new CellError(ErrorType.VALUE);
            } else {
              return result;
            }
          }

        case AstNodeType.MINUS_UNARY_OP:
          {
            var _result = this.evaluateAst(ast.value, formulaAddress);

            if (_result instanceof SimpleRangeValue) {
              return new CellError(ErrorType.VALUE);
            } else {
              return wrapperUnary(function (a) {
                return -a;
              }, this.arithmeticHelper.coerceScalarToNumberOrError(_result));
            }
          }

        case AstNodeType.PERCENT_OP:
          {
            var _result2 = this.evaluateAst(ast.value, formulaAddress);

            if (_result2 instanceof SimpleRangeValue) {
              return new CellError(ErrorType.VALUE);
            } else {
              return wrapperUnary(function (a) {
                return a / 100;
              }, this.arithmeticHelper.coerceScalarToNumberOrError(_result2));
            }
          }

        case AstNodeType.FUNCTION_CALL:
          {
            var pluginEntry = this.functionRegistry.getFunction(ast.procedureName);

            if (pluginEntry && this.config.translationPackage.isFunctionTranslated(ast.procedureName)) {
              var _pluginEntry = _slicedToArray(pluginEntry, 2),
                  pluginFunction = _pluginEntry[0],
                  pluginInstance = _pluginEntry[1];

              return pluginInstance[pluginFunction](ast, formulaAddress);
            } else {
              return new CellError(ErrorType.NAME);
            }
          }

        case AstNodeType.NAMED_EXPRESSION:
          {
            var namedExpression = this.namedExpressions.nearestNamedExpression(ast.expressionName, formulaAddress.sheet);

            if (namedExpression) {
              return this.dependencyGraph.getCellValue(namedExpression.address);
            } else {
              return new CellError(ErrorType.NAME);
            }
          }

        case AstNodeType.CELL_RANGE:
          {
            if (!this.rangeSpansOneSheet(ast)) {
              return new CellError(ErrorType.REF);
            }

            var range = AbsoluteCellRange.fromCellRange(ast, formulaAddress);
            var matrixVertex = this.dependencyGraph.getMatrix(range);

            if (matrixVertex) {
              var matrix = matrixVertex.matrix;

              if (matrix instanceof NotComputedMatrix) {
                throw new Error('Matrix should be already computed');
              } else if (matrix instanceof CellError) {
                return matrix;
              } else if (matrix instanceof Matrix) {
                return SimpleRangeValue.onlyNumbersDataWithRange(matrix.raw(), matrix.size, range);
              } else {
                throw new Error('Unknown matrix');
              }
            } else {
              return SimpleRangeValue.onlyRange(range, this.dependencyGraph);
            }
          }

        case AstNodeType.COLUMN_RANGE:
          {
            if (!this.rangeSpansOneSheet(ast)) {
              return new CellError(ErrorType.REF);
            }

            var _range = AbsoluteColumnRange.fromColumnRange(ast, formulaAddress);

            return SimpleRangeValue.onlyRange(_range, this.dependencyGraph);
          }

        case AstNodeType.ROW_RANGE:
          {
            if (!this.rangeSpansOneSheet(ast)) {
              return new CellError(ErrorType.REF);
            }

            var _range2 = AbsoluteRowRange.fromRowRange(ast, formulaAddress);

            return SimpleRangeValue.onlyRange(_range2, this.dependencyGraph);
          }

        case AstNodeType.PARENTHESIS:
          {
            return this.evaluateAst(ast.expression, formulaAddress);
          }

        case AstNodeType.ERROR_WITH_RAW_INPUT:
        case AstNodeType.ERROR:
          {
            return ast.error;
          }
      }
    }
  }, {
    key: "getGpuInstance",
    value: function getGpuInstance() {
      if (!this.gpu) {
        var GPUConstructor = GPU.GPU || GPU;
        this.gpu = new GPUConstructor({
          mode: this.config.gpuMode
        });
      }

      return this.gpu;
    }
  }, {
    key: "destroy",
    value: function destroy() {
      if (this.gpu) {
        this.gpu.destroy();
      }
    }
  }, {
    key: "rangeSpansOneSheet",
    value: function rangeSpansOneSheet(ast) {
      return ast.start.sheet === ast.end.sheet;
    }
  }]);

  return Interpreter;
}();

function passErrors(left, right) {
  if (left instanceof CellError) {
    return left;
  } else if (left instanceof SimpleRangeValue) {
    return new CellError(ErrorType.VALUE);
  } else if (right instanceof CellError) {
    return right;
  } else if (right instanceof SimpleRangeValue) {
    return new CellError(ErrorType.VALUE);
  } else {
    return undefined;
  }
}

function wrapperUnary(op, a) {
  if (a instanceof CellError) {
    return a;
  } else {
    return op(a);
  }
}

function wrapperBinary(op, a, b) {
  if (a instanceof CellError) {
    return a;
  } else if (b instanceof CellError) {
    return b;
  } else {
    return op(a, b);
  }
}