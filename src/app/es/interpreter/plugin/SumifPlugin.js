import "core-js/modules/es.symbol";
import "core-js/modules/es.symbol.description";
import "core-js/modules/es.symbol.iterator";
import "core-js/modules/es.array.concat";
import "core-js/modules/es.array.from";
import "core-js/modules/es.array.iterator";
import "core-js/modules/es.array.join";
import "core-js/modules/es.array.map";
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

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

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
import { CellError, ErrorType } from '../../Cell';
import { AstNodeType } from '../../parser';
import { coerceToRange } from '../ArithmeticHelper';
import { Condition, CriterionFunctionCompute } from '../CriterionFunctionCompute';
import { SimpleRangeValue } from '../InterpreterValue';
import { FunctionPlugin } from './FunctionPlugin';

var AverageResult = /*#__PURE__*/function () {
  function AverageResult(sum, count) {
    _classCallCheck(this, AverageResult);

    this.sum = sum;
    this.count = count;
  }

  _createClass(AverageResult, [{
    key: "compose",
    value: function compose(other) {
      return new AverageResult(this.sum + other.sum, this.count + other.count);
    }
  }, {
    key: "averageValue",
    value: function averageValue() {
      if (this.count > 0) {
        return this.sum / this.count;
      } else {
        return undefined;
      }
    }
  }], [{
    key: "single",
    value: function single(arg) {
      return new AverageResult(arg, 1);
    }
  }]);

  return AverageResult;
}();

AverageResult.empty = new AverageResult(0, 0);
/** Computes key for criterion function cache */

function sumifCacheKey(conditions) {
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  var conditionsStrings = conditions.map(function (c) {
    return "".concat(c.conditionRange.range().sheet, ",").concat(c.conditionRange.range().start.col, ",").concat(c.conditionRange.range().start.row);
  });
  return ['SUMIF'].concat(_toConsumableArray(conditionsStrings)).join(',');
}

function averageifCacheKey(conditions) {
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  var conditionsStrings = conditions.map(function (c) {
    return "".concat(c.conditionRange.range().sheet, ",").concat(c.conditionRange.range().start.col, ",").concat(c.conditionRange.range().start.row);
  });
  return ['AVERAGEIF'].concat(_toConsumableArray(conditionsStrings)).join(',');
}

function countifsCacheKey(conditions) {
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  var conditionsStrings = conditions.map(function (c) {
    return "".concat(c.conditionRange.range().sheet, ",").concat(c.conditionRange.range().start.col, ",").concat(c.conditionRange.range().start.row);
  });
  return ['COUNTIFS'].concat(_toConsumableArray(conditionsStrings)).join(',');
}

export var SumifPlugin = /*#__PURE__*/function (_FunctionPlugin) {
  _inherits(SumifPlugin, _FunctionPlugin);

  var _super = _createSuper(SumifPlugin);

  function SumifPlugin() {
    _classCallCheck(this, SumifPlugin);

    return _super.apply(this, arguments);
  }

  _createClass(SumifPlugin, [{
    key: "sumif",

    /**
     * Corresponds to SUMIF(Range, Criterion, SumRange)
     *
     * Range is the range to which criterion is to be applied.
     * Criterion is the criteria used to choose which cells will be included in sum.
     * SumRange is the range on which adding will be performed.
     *
     * @param ast
     * @param formulaAddress
     */
    value: function sumif(ast, formulaAddress) {
      var _this = this;

      if (ast.args.length < 2 || ast.args.length > 3) {
        return new CellError(ErrorType.NA);
      }

      if (ast.args.some(function (ast) {
        return ast.type === AstNodeType.EMPTY;
      })) {
        return new CellError(ErrorType.NUM);
      }

      var conditionArgValue = this.evaluateAst(ast.args[0], formulaAddress);

      if (conditionArgValue instanceof CellError) {
        return conditionArgValue;
      }

      var conditionArg = coerceToRange(conditionArgValue);
      var criterionValue = this.evaluateAst(ast.args[1], formulaAddress);

      if (criterionValue instanceof SimpleRangeValue) {
        return new CellError(ErrorType.VALUE);
      } else if (criterionValue instanceof CellError) {
        return criterionValue;
      }

      var criterion = this.interpreter.criterionBuilder.fromCellValue(criterionValue, this.interpreter.arithmeticHelper);

      if (criterion === undefined) {
        return new CellError(ErrorType.VALUE);
      }

      var valuesArg;

      if (ast.args.length == 2) {
        valuesArg = conditionArg;
      } else {
        var valuesArgValue = this.evaluateAst(ast.args[2], formulaAddress);

        if (valuesArgValue instanceof CellError) {
          return valuesArgValue;
        }

        valuesArg = coerceToRange(valuesArgValue);
      }

      var result = new CriterionFunctionCompute(this.interpreter, sumifCacheKey, 0, function (left, right) {
        return _this.interpreter.arithmeticHelper.nonstrictadd(left, right);
      }, function (arg) {
        return arg;
      }).compute(valuesArg, [new Condition(conditionArg, criterion)]);
      return result;
    }
  }, {
    key: "sumifs",
    value: function sumifs(ast, formulaAddress) {
      var _this2 = this;

      if (ast.args.length < 3 || ast.args.length % 2 === 0) {
        return new CellError(ErrorType.NA);
      }

      if (ast.args.some(function (ast) {
        return ast.type === AstNodeType.EMPTY;
      })) {
        return new CellError(ErrorType.NUM);
      }

      var valueArgValue = this.evaluateAst(ast.args[0], formulaAddress);

      if (valueArgValue instanceof CellError) {
        return valueArgValue;
      }

      var valuesArg = coerceToRange(valueArgValue);
      var conditions = [];

      for (var i = 1; i < ast.args.length; i += 2) {
        var conditionArgValue = this.evaluateAst(ast.args[i], formulaAddress);

        if (conditionArgValue instanceof CellError) {
          return conditionArgValue;
        }

        var conditionArg = coerceToRange(conditionArgValue);
        var criterionValue = this.evaluateAst(ast.args[i + 1], formulaAddress);

        if (criterionValue instanceof SimpleRangeValue) {
          return new CellError(ErrorType.VALUE);
        } else if (criterionValue instanceof CellError) {
          return criterionValue;
        }

        var criterionPackage = this.interpreter.criterionBuilder.fromCellValue(criterionValue, this.interpreter.arithmeticHelper);

        if (criterionPackage === undefined) {
          return new CellError(ErrorType.VALUE);
        }

        conditions.push(new Condition(conditionArg, criterionPackage));
      }

      var result = new CriterionFunctionCompute(this.interpreter, sumifCacheKey, 0, function (left, right) {
        return _this2.interpreter.arithmeticHelper.nonstrictadd(left, right);
      }, function (arg) {
        return arg;
      }).compute(valuesArg, conditions);
      return result;
    }
  }, {
    key: "averageif",
    value: function averageif(ast, formulaAddress) {
      if (ast.args.length < 2 || ast.args.length > 3) {
        return new CellError(ErrorType.NA);
      }

      if (ast.args.some(function (ast) {
        return ast.type === AstNodeType.EMPTY;
      })) {
        return new CellError(ErrorType.NUM);
      }

      var conditionArgValue = this.evaluateAst(ast.args[0], formulaAddress);

      if (conditionArgValue instanceof CellError) {
        return conditionArgValue;
      }

      var conditionArg = coerceToRange(conditionArgValue);
      var criterionValue = this.evaluateAst(ast.args[1], formulaAddress);

      if (criterionValue instanceof SimpleRangeValue) {
        return new CellError(ErrorType.VALUE);
      } else if (criterionValue instanceof CellError) {
        return criterionValue;
      }

      var criterionPackage = this.interpreter.criterionBuilder.fromCellValue(criterionValue, this.interpreter.arithmeticHelper);

      if (criterionPackage === undefined) {
        return new CellError(ErrorType.VALUE);
      }

      var valuesArg;

      if (ast.args.length == 2) {
        valuesArg = conditionArg;
      } else {
        var valuesArgValue = this.evaluateAst(ast.args[2], formulaAddress);

        if (valuesArgValue instanceof CellError) {
          return valuesArgValue;
        }

        valuesArg = coerceToRange(valuesArgValue);
      }

      var averageResult = new CriterionFunctionCompute(this.interpreter, averageifCacheKey, AverageResult.empty, function (left, right) {
        return left.compose(right);
      }, function (arg) {
        if (typeof arg === 'number') {
          return AverageResult.single(arg);
        } else {
          return AverageResult.empty;
        }
      }).compute(valuesArg, [new Condition(conditionArg, criterionPackage)]);

      if (averageResult instanceof CellError) {
        return averageResult;
      } else {
        return averageResult.averageValue() || new CellError(ErrorType.DIV_BY_ZERO);
      }
    }
    /**
     * Corresponds to COUNTIF(Range, Criterion)
     *
     * Range is the range to which criterion is to be applied.
     * Criterion is the criteria used to choose which cells will be included in sum.
     *
     * Returns number of cells on which criteria evaluates to true.
     *
     * @param ast
     * @param formulaAddress
     */

  }, {
    key: "countif",
    value: function countif(ast, formulaAddress) {
      if (ast.args.length !== 2) {
        return new CellError(ErrorType.NA);
      }

      if (ast.args.some(function (ast) {
        return ast.type === AstNodeType.EMPTY;
      })) {
        return new CellError(ErrorType.NUM);
      }

      var conditionArgValue = this.evaluateAst(ast.args[0], formulaAddress);

      if (conditionArgValue instanceof CellError) {
        return conditionArgValue;
      }

      var conditionArg = coerceToRange(conditionArgValue);
      var criterionValue = this.evaluateAst(ast.args[1], formulaAddress);

      if (criterionValue instanceof SimpleRangeValue) {
        return new CellError(ErrorType.VALUE);
      } else if (criterionValue instanceof CellError) {
        return criterionValue;
      }

      var criterionPackage = this.interpreter.criterionBuilder.fromCellValue(criterionValue, this.interpreter.arithmeticHelper);

      if (criterionPackage === undefined) {
        return new CellError(ErrorType.VALUE);
      }

      var result = new CriterionFunctionCompute(this.interpreter, function () {
        return 'COUNTIF';
      }, 0, function (left, right) {
        return left + right;
      }, function () {
        return 1;
      }).compute(conditionArg, [new Condition(conditionArg, criterionPackage)]);
      return result;
    }
  }, {
    key: "countifs",
    value: function countifs(ast, formulaAddress) {
      if (ast.args.length < 2 || ast.args.length % 2 === 1) {
        return new CellError(ErrorType.NA);
      }

      if (ast.args.some(function (ast) {
        return ast.type === AstNodeType.EMPTY;
      })) {
        return new CellError(ErrorType.NUM);
      }

      var conditions = [];

      for (var i = 0; i < ast.args.length; i += 2) {
        var conditionArgValue = this.evaluateAst(ast.args[i], formulaAddress);

        if (conditionArgValue instanceof CellError) {
          return conditionArgValue;
        }

        var conditionArg = coerceToRange(conditionArgValue);
        var criterionValue = this.evaluateAst(ast.args[i + 1], formulaAddress);

        if (criterionValue instanceof SimpleRangeValue) {
          return new CellError(ErrorType.VALUE);
        } else if (criterionValue instanceof CellError) {
          return criterionValue;
        }

        var criterionPackage = this.interpreter.criterionBuilder.fromCellValue(criterionValue, this.interpreter.arithmeticHelper);

        if (criterionPackage === undefined) {
          return new CellError(ErrorType.VALUE);
        }

        conditions.push(new Condition(conditionArg, criterionPackage));
      }

      var result = new CriterionFunctionCompute(this.interpreter, countifsCacheKey, 0, function (left, right) {
        return left + right;
      }, function () {
        return 1;
      }).compute(conditions[0].conditionRange, conditions);
      return result;
    }
  }]);

  return SumifPlugin;
}(FunctionPlugin);
SumifPlugin.implementedFunctions = {
  'SUMIF': {
    method: 'sumif'
  },
  'COUNTIF': {
    method: 'countif'
  },
  'AVERAGEIF': {
    method: 'averageif'
  },
  'SUMIFS': {
    method: 'sumifs'
  },
  'COUNTIFS': {
    method: 'countifs'
  }
};