import "core-js/modules/es.symbol";
import "core-js/modules/es.symbol.description";
import "core-js/modules/es.symbol.iterator";
import "core-js/modules/es.array.every";
import "core-js/modules/es.array.for-each";
import "core-js/modules/es.array.from";
import "core-js/modules/es.array.iterator";
import "core-js/modules/es.array.join";
import "core-js/modules/es.array.map";
import "core-js/modules/es.array.slice";
import "core-js/modules/es.function.name";
import "core-js/modules/es.map";
import "core-js/modules/es.object.to-string";
import "core-js/modules/es.regexp.to-string";
import "core-js/modules/es.string.iterator";
import "core-js/modules/web.dom-collections.for-each";
import "core-js/modules/web.dom-collections.iterator";
import "regenerator-runtime/runtime";

var _marked = /*#__PURE__*/regeneratorRuntime.mark(getRangeValues),
    _marked2 = /*#__PURE__*/regeneratorRuntime.mark(ifFilter);

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
import { CellError, ErrorType, simpleCellAddress } from '../Cell';
import { split } from '../generatorUtils';

var findSmallerRangeForMany = function findSmallerRangeForMany(dependencyGraph, conditionRanges, valuesRange) {
  if (valuesRange.end.row > valuesRange.start.row) {
    var valuesRangeEndRowLess = simpleCellAddress(valuesRange.end.sheet, valuesRange.end.col, valuesRange.end.row - 1);
    var rowLessVertex = dependencyGraph.getRange(valuesRange.start, valuesRangeEndRowLess);

    if (rowLessVertex !== undefined) {
      return {
        smallerRangeVertex: rowLessVertex,
        restValuesRange: valuesRange.withStart(simpleCellAddress(valuesRange.start.sheet, valuesRange.start.col, valuesRange.end.row)),
        restConditionRanges: conditionRanges.map(function (conditionRange) {
          return conditionRange.withStart(simpleCellAddress(conditionRange.start.sheet, conditionRange.start.col, conditionRange.end.row));
        })
      };
    }
  }

  return {
    smallerRangeVertex: null,
    restValuesRange: valuesRange,
    restConditionRanges: conditionRanges
  };
};

export var CriterionFunctionCompute = /*#__PURE__*/function () {
  function CriterionFunctionCompute(interpreter, cacheKey, reduceInitialValue, composeFunction, mapFunction) {
    _classCallCheck(this, CriterionFunctionCompute);

    this.interpreter = interpreter;
    this.cacheKey = cacheKey;
    this.reduceInitialValue = reduceInitialValue;
    this.composeFunction = composeFunction;
    this.mapFunction = mapFunction;
    this.dependencyGraph = this.interpreter.dependencyGraph;
  }

  _createClass(CriterionFunctionCompute, [{
    key: "compute",
    value: function compute(simpleValuesRange, conditions) {
      var _this = this;

      var _iterator = _createForOfIteratorHelper(conditions),
          _step;

      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var condition = _step.value;

          if (!condition.conditionRange.sameDimensionsAs(simpleValuesRange)) {
            return new CellError(ErrorType.VALUE);
          }
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }

      var valuesRangeVertex = this.tryToGetRangeVertexForRangeValue(simpleValuesRange);
      var conditionsVertices = conditions.map(function (c) {
        return _this.tryToGetRangeVertexForRangeValue(c.conditionRange);
      });

      if (valuesRangeVertex && conditionsVertices.every(function (e) {
        return e !== undefined;
      })) {
        var fullCriterionString = conditions.map(function (c) {
          return c.criterionPackage.raw;
        }).join(',');
        var cachedResult = this.findAlreadyComputedValueInCache(valuesRangeVertex, this.cacheKey(conditions), fullCriterionString);

        if (cachedResult) {
          this.interpreter.stats.incrementCriterionFunctionFullCacheUsed();
          return cachedResult;
        }

        var cache = this.buildNewCriterionCache(this.cacheKey(conditions), conditions.map(function (c) {
          return c.conditionRange.range();
        }), simpleValuesRange.range());

        if (!cache.has(fullCriterionString)) {
          cache.set(fullCriterionString, [this.evaluateRangeValue(simpleValuesRange, conditions), conditions.map(function (condition) {
            return condition.criterionPackage.lambda;
          })]);
        }

        valuesRangeVertex.setCriterionFunctionValues(this.cacheKey(conditions), cache);
        conditionsVertices.forEach(function (range) {
          if (range !== undefined) {
            range.addDependentCacheRange(valuesRangeVertex);
          }
        });
        return cache.get(fullCriterionString)[0];
      } else {
        return this.evaluateRangeValue(simpleValuesRange, conditions);
      }
    }
  }, {
    key: "tryToGetRangeVertexForRangeValue",
    value: function tryToGetRangeVertexForRangeValue(rangeValue) {
      var maybeRange = rangeValue.range();

      if (maybeRange === undefined) {
        return undefined;
      } else {
        return this.dependencyGraph.getRange(maybeRange.start, maybeRange.end);
      }
    }
  }, {
    key: "reduceFunction",
    value: function reduceFunction(iterable) {
      var acc = this.reduceInitialValue;

      var _iterator2 = _createForOfIteratorHelper(iterable),
          _step2;

      try {
        for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
          var val = _step2.value;
          acc = this.composeFunction(acc, val);
        }
      } catch (err) {
        _iterator2.e(err);
      } finally {
        _iterator2.f();
      }

      return acc;
    }
  }, {
    key: "findAlreadyComputedValueInCache",
    value: function findAlreadyComputedValueInCache(rangeVertex, cacheKey, criterionString) {
      return rangeVertex.getCriterionFunctionValue(cacheKey, criterionString);
    }
  }, {
    key: "evaluateRangeValue",
    value: function evaluateRangeValue(simpleValuesRange, conditions) {
      var criterionLambdas = conditions.map(function (condition) {
        return condition.criterionPackage.lambda;
      });
      var values = Array.from(simpleValuesRange.valuesFromTopLeftCorner()).map(this.mapFunction)[Symbol.iterator]();
      var conditionsIterators = conditions.map(function (condition) {
        return condition.conditionRange.iterateValuesFromTopLeftCorner();
      });
      var filteredValues = ifFilter(criterionLambdas, conditionsIterators, values);
      return this.reduceFunction(filteredValues);
    }
  }, {
    key: "buildNewCriterionCache",
    value: function buildNewCriterionCache(cacheKey, simpleConditionRanges, simpleValuesRange) {
      var _this2 = this;

      var currentRangeVertex = this.dependencyGraph.getRange(simpleValuesRange.start, simpleValuesRange.end);

      var _findSmallerRangeForM = findSmallerRangeForMany(this.dependencyGraph, simpleConditionRanges, simpleValuesRange),
          smallerRangeVertex = _findSmallerRangeForM.smallerRangeVertex,
          restConditionRanges = _findSmallerRangeForM.restConditionRanges,
          restValuesRange = _findSmallerRangeForM.restValuesRange;

      var smallerCache;

      if (smallerRangeVertex && this.dependencyGraph.existsEdge(smallerRangeVertex, currentRangeVertex)) {
        smallerCache = smallerRangeVertex.getCriterionFunctionValues(cacheKey);
      } else {
        smallerCache = new Map();
      }

      var newCache = new Map();
      smallerCache.forEach(function (_ref, key) {
        var _ref2 = _slicedToArray(_ref, 2),
            value = _ref2[0],
            criterionLambdas = _ref2[1];

        var filteredValues = ifFilter(criterionLambdas, restConditionRanges.map(function (rcr) {
          return getRangeValues(_this2.dependencyGraph, rcr);
        }), Array.from(getRangeValues(_this2.dependencyGraph, restValuesRange)).map(_this2.mapFunction)[Symbol.iterator]());

        var newCacheValue = _this2.composeFunction(value, _this2.reduceFunction(filteredValues));

        _this2.interpreter.stats.incrementCriterionFunctionPartialCacheUsed();

        newCache.set(key, [newCacheValue, criterionLambdas]);
      });
      return newCache;
    }
  }]);

  return CriterionFunctionCompute;
}();
export var Condition = function Condition(conditionRange, criterionPackage) {
  _classCallCheck(this, Condition);

  this.conditionRange = conditionRange;
  this.criterionPackage = criterionPackage;
};

function getRangeValues(dependencyGraph, cellRange) {
  var _iterator3, _step3, cellFromRange;

  return regeneratorRuntime.wrap(function getRangeValues$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _iterator3 = _createForOfIteratorHelper(cellRange.addresses(dependencyGraph));
          _context.prev = 1;

          _iterator3.s();

        case 3:
          if ((_step3 = _iterator3.n()).done) {
            _context.next = 9;
            break;
          }

          cellFromRange = _step3.value;
          _context.next = 7;
          return dependencyGraph.getScalarValue(cellFromRange);

        case 7:
          _context.next = 3;
          break;

        case 9:
          _context.next = 14;
          break;

        case 11:
          _context.prev = 11;
          _context.t0 = _context["catch"](1);

          _iterator3.e(_context.t0);

        case 14:
          _context.prev = 14;

          _iterator3.f();

          return _context.finish(14);

        case 17:
        case "end":
          return _context.stop();
      }
    }
  }, _marked, null, [[1, 11, 14, 17]]);
}

function ifFilter(criterionLambdas, conditionalIterables, computableIterable) {
  var _iterator4, _step4, computable, conditionalSplits, conditionalFirsts;

  return regeneratorRuntime.wrap(function ifFilter$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _iterator4 = _createForOfIteratorHelper(computableIterable);
          _context2.prev = 1;

          _iterator4.s();

        case 3:
          if ((_step4 = _iterator4.n()).done) {
            _context2.next = 15;
            break;
          }

          computable = _step4.value;
          conditionalSplits = conditionalIterables.map(function (conditionalIterable) {
            return split(conditionalIterable);
          });

          if (conditionalSplits.every(function (cs) {
            return Object.prototype.hasOwnProperty.call(cs, 'value');
          })) {
            _context2.next = 8;
            break;
          }

          return _context2.abrupt("return");

        case 8:
          conditionalFirsts = conditionalSplits.map(function (cs) {
            return cs.value;
          });

          if (!zip(conditionalFirsts, criterionLambdas).every(function (_ref3) {
            var _ref4 = _slicedToArray(_ref3, 2),
                conditionalFirst = _ref4[0],
                criterionLambda = _ref4[1];

            return criterionLambda(conditionalFirst);
          })) {
            _context2.next = 12;
            break;
          }

          _context2.next = 12;
          return computable;

        case 12:
          conditionalIterables = conditionalSplits.map(function (cs) {
            return cs.rest;
          });

        case 13:
          _context2.next = 3;
          break;

        case 15:
          _context2.next = 20;
          break;

        case 17:
          _context2.prev = 17;
          _context2.t0 = _context2["catch"](1);

          _iterator4.e(_context2.t0);

        case 20:
          _context2.prev = 20;

          _iterator4.f();

          return _context2.finish(20);

        case 23:
        case "end":
          return _context2.stop();
      }
    }
  }, _marked2, null, [[1, 17, 20, 23]]);
}

function zip(arr1, arr2) {
  var result = [];

  for (var i = 0; i < Math.min(arr1.length, arr2.length); i++) {
    result.push([arr1[i], arr2[i]]);
  }

  return result;
}