import "core-js/modules/es.symbol";
import "core-js/modules/es.symbol.description";
import "core-js/modules/es.symbol.iterator";
import "core-js/modules/es.array.from";
import "core-js/modules/es.array.iterator";
import "core-js/modules/es.array.map";
import "core-js/modules/es.array.slice";
import "core-js/modules/es.function.name";
import "core-js/modules/es.number.constructor";
import "core-js/modules/es.number.is-integer";
import "core-js/modules/es.object.to-string";
import "core-js/modules/es.regexp.to-string";
import "core-js/modules/es.string.iterator";
import "core-js/modules/web.dom-collections.iterator";

function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e2) { throw _e2; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e3) { didErr = true; err = _e3; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

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
import { AbsoluteCellRange } from '../../AbsoluteCellRange';
import { CellError, ErrorType } from '../../Cell';
import { AstNodeType } from '../../parser';
import { coerceScalarToBoolean, coerceScalarToString } from '../ArithmeticHelper';
import { SimpleRangeValue } from '../InterpreterValue';
export var ArgumentTypes;

(function (ArgumentTypes) {
  /**
   * String type.
   */
  ArgumentTypes["STRING"] = "STRING";
  /**
   * Floating point type.
   */

  ArgumentTypes["NUMBER"] = "NUMBER";
  /**
   * Boolean type.
   */

  ArgumentTypes["BOOLEAN"] = "BOOLEAN";
  /**
   * Any non-range value.
   */

  ArgumentTypes["SCALAR"] = "SCALAR";
  /**
   * Any non-range, no-error type.
   */

  ArgumentTypes["NOERROR"] = "NOERROR";
  /**
   * Range type.
   */

  ArgumentTypes["RANGE"] = "RANGE";
  /**
   * Integer type.
   */

  ArgumentTypes["INTEGER"] = "INTEGER";
})(ArgumentTypes || (ArgumentTypes = {}));
/**
 * Abstract class representing interpreter function plugin.
 * Plugin may contain multiple functions. Each function should be of type {@link PluginFunctionType} and needs to be
 * included in {@link implementedFunctions}
 */


export var FunctionPlugin = /*#__PURE__*/function () {
  function FunctionPlugin(interpreter) {
    var _this = this;

    _classCallCheck(this, FunctionPlugin);

    this.coerceScalarToNumberOrError = function (arg) {
      return _this.interpreter.arithmeticHelper.coerceScalarToNumberOrError(arg);
    };

    this.runFunction = function (args, formulaAddress, functionDefinition, fn) {
      var _a, _b, _c;

      var argumentDefinitions = functionDefinition.parameters;
      var scalarValues;

      if (functionDefinition.expandRanges) {
        scalarValues = _this.listOfScalarValues(args, formulaAddress);
      } else {
        scalarValues = args.map(function (ast) {
          return [_this.evaluateAst(ast, formulaAddress), false];
        });
      }

      var coercedArguments = [];
      var argCoerceFailure = undefined;

      if (!functionDefinition.repeatLastArg && argumentDefinitions.length < scalarValues.length) {
        return new CellError(ErrorType.NA);
      }

      for (var i = 0; i < Math.max(scalarValues.length, argumentDefinitions.length); i++) {
        // i points to where are we in the scalarValues list,
        // j points to where are we in the argumentDefinitions list
        var j = Math.min(i, argumentDefinitions.length - 1);

        var _ref = (_a = scalarValues[i]) !== null && _a !== void 0 ? _a : [undefined, undefined],
            _ref2 = _slicedToArray(_ref, 2),
            val = _ref2[0],
            ignorable = _ref2[1];

        var arg = val !== null && val !== void 0 ? val : (_b = argumentDefinitions[j]) === null || _b === void 0 ? void 0 : _b.defaultValue;

        if (arg === undefined) {
          if ((_c = argumentDefinitions[j]) === null || _c === void 0 ? void 0 : _c.optionalArg) {
            coercedArguments.push(undefined);
          } else {
            //not enough values passed as arguments, and there was no default value and argument was not optional
            return new CellError(ErrorType.NA);
          }
        } else {
          //we apply coerce only to non-default values
          var coercedArg = val !== undefined ? _this.coerceToType(arg, argumentDefinitions[j]) : arg;

          if (coercedArg !== undefined) {
            if (coercedArg instanceof CellError && argumentDefinitions[j].argumentType !== ArgumentTypes.SCALAR) {
              //if this is first error encountered, store it
              argCoerceFailure = argCoerceFailure !== null && argCoerceFailure !== void 0 ? argCoerceFailure : coercedArg;
            }

            coercedArguments.push(coercedArg);
          } else if (!ignorable) {
            //if this is first error encountered, store it
            argCoerceFailure = argCoerceFailure !== null && argCoerceFailure !== void 0 ? argCoerceFailure : new CellError(ErrorType.VALUE);
          }
        }
      }

      return argCoerceFailure !== null && argCoerceFailure !== void 0 ? argCoerceFailure : fn.apply(void 0, coercedArguments);
    };

    this.runFunctionWithReferenceArgument = function (args, formulaAddress, argumentDefinitions, noArgCallback, referenceCallback, nonReferenceCallback) {
      if (args.length === 0) {
        return noArgCallback();
      } else if (args.length > 1) {
        return new CellError(ErrorType.NA);
      }

      var arg = args[0];
      var cellReference;

      if (arg.type === AstNodeType.CELL_REFERENCE) {
        cellReference = arg.reference.toSimpleCellAddress(formulaAddress);
      } else if (arg.type === AstNodeType.CELL_RANGE || arg.type === AstNodeType.COLUMN_RANGE || arg.type === AstNodeType.ROW_RANGE) {
        try {
          cellReference = AbsoluteCellRange.fromAst(arg, formulaAddress).start;
        } catch (e) {
          return new CellError(ErrorType.REF);
        }
      }

      if (cellReference !== undefined) {
        return referenceCallback(cellReference);
      }

      return _this.runFunction(args, formulaAddress, argumentDefinitions, nonReferenceCallback);
    };

    this.interpreter = interpreter;
    this.dependencyGraph = interpreter.dependencyGraph;
    this.columnSearch = interpreter.columnSearch;
    this.config = interpreter.config;
    this.serialization = interpreter.serialization;
  }

  _createClass(FunctionPlugin, [{
    key: "evaluateAst",
    value: function evaluateAst(ast, formulaAddress) {
      return this.interpreter.evaluateAst(ast, formulaAddress);
    }
  }, {
    key: "listOfScalarValues",
    value: function listOfScalarValues(asts, formulaAddress) {
      var ret = [];

      var _iterator = _createForOfIteratorHelper(asts),
          _step;

      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var argAst = _step.value;
          var value = this.evaluateAst(argAst, formulaAddress);

          if (value instanceof SimpleRangeValue) {
            var _iterator2 = _createForOfIteratorHelper(value.valuesFromTopLeftCorner()),
                _step2;

            try {
              for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
                var scalarValue = _step2.value;
                ret.push([scalarValue, true]);
              }
            } catch (err) {
              _iterator2.e(err);
            } finally {
              _iterator2.f();
            }
          } else {
            ret.push([value, false]);
          }
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }

      return ret;
    }
  }, {
    key: "computeListOfValuesInRange",
    value: function computeListOfValuesInRange(range) {
      var values = [];

      var _iterator3 = _createForOfIteratorHelper(range.addresses(this.dependencyGraph)),
          _step3;

      try {
        for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
          var cellFromRange = _step3.value;
          var value = this.dependencyGraph.getScalarValue(cellFromRange);
          values.push(value);
        }
      } catch (err) {
        _iterator3.e(err);
      } finally {
        _iterator3.f();
      }

      return values;
    }
  }, {
    key: "coerceToType",
    value: function coerceToType(arg, coercedType) {
      if (arg instanceof SimpleRangeValue) {
        if (coercedType.argumentType === ArgumentTypes.RANGE) {
          return arg;
        } else {
          return undefined;
        }
      } else {
        switch (coercedType.argumentType) {
          case ArgumentTypes.INTEGER:
          case ArgumentTypes.NUMBER:
            // eslint-disable-next-line no-case-declarations
            var value = this.coerceScalarToNumberOrError(arg);

            if (typeof value !== 'number') {
              return value;
            }

            if (coercedType.maxValue !== undefined && value > coercedType.maxValue) {
              return new CellError(ErrorType.NUM);
            }

            if (coercedType.minValue !== undefined && value < coercedType.minValue) {
              return new CellError(ErrorType.NUM);
            }

            if (coercedType.lessThan !== undefined && value >= coercedType.lessThan) {
              return new CellError(ErrorType.NUM);
            }

            if (coercedType.greaterThan !== undefined && value <= coercedType.greaterThan) {
              return new CellError(ErrorType.NUM);
            }

            if (coercedType.argumentType === ArgumentTypes.INTEGER && !Number.isInteger(value)) {
              return new CellError(ErrorType.NUM);
            }

            return value;

          case ArgumentTypes.STRING:
            return coerceScalarToString(arg);

          case ArgumentTypes.BOOLEAN:
            return coerceScalarToBoolean(arg);

          case ArgumentTypes.SCALAR:
            return arg;

          case ArgumentTypes.NOERROR:
            return arg;

          case ArgumentTypes.RANGE:
            return undefined;
        }
      }
    }
  }, {
    key: "metadata",
    value: function metadata(name) {
      var params = this.constructor.implementedFunctions[name];

      if (params !== undefined) {
        return params;
      }

      throw new Error('Should not be undefined');
    }
  }]);

  return FunctionPlugin;
}();