import "core-js/modules/es.regexp.exec";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 * @license
 * Copyright (c) 2020 Handsoncode. All rights reserved.
 */
import { EmptyValue } from '../Cell';
export var CriterionType;

(function (CriterionType) {
  CriterionType["GREATER_THAN"] = "GREATER_THAN";
  CriterionType["GREATER_THAN_OR_EQUAL"] = "GREATER_THAN_OR_EQUAL";
  CriterionType["LESS_THAN"] = "LESS_THAN";
  CriterionType["LESS_THAN_OR_EQUAL"] = "LESS_THAN_OR_EQUAL";
  CriterionType["NOT_EQUAL"] = "NOT_EQUAL";
  CriterionType["EQUAL"] = "EQUAL";
})(CriterionType || (CriterionType = {}));

export var buildCriterion = function buildCriterion(operator, value) {
  return {
    operator: operator,
    value: value
  };
};
export var CriterionBuilder = /*#__PURE__*/function () {
  function CriterionBuilder(config) {
    _classCallCheck(this, CriterionBuilder);

    var _a, _b, _c, _d;

    this.trueString = (_b = (_a = config.translationPackage.getMaybeFunctionTranslation('TRUE')) === null || _a === void 0 ? void 0 : _a.toLowerCase()) !== null && _b !== void 0 ? _b : 'true';
    this.falseString = (_d = (_c = config.translationPackage.getMaybeFunctionTranslation('FALSE')) === null || _c === void 0 ? void 0 : _c.toLowerCase()) !== null && _d !== void 0 ? _d : 'false';
  }

  _createClass(CriterionBuilder, [{
    key: "fromCellValue",
    value: function fromCellValue(raw, arithmeticHelper) {
      if (typeof raw !== 'string' && typeof raw !== 'boolean' && typeof raw !== 'number') {
        return undefined;
      }

      var criterion = this.parseCriterion(raw, arithmeticHelper);

      if (criterion === undefined) {
        return undefined;
      }

      return {
        raw: raw,
        lambda: buildCriterionLambda(criterion, arithmeticHelper)
      };
    }
  }, {
    key: "parseCriterion",
    value: function parseCriterion(criterion, arithmeticHelper) {
      if (typeof criterion === 'number' || typeof criterion === 'boolean') {
        return buildCriterion(CriterionType.EQUAL, criterion);
      } else if (typeof criterion === 'string') {
        var regexResult = ANY_CRITERION_REGEX.exec(criterion);
        var criterionValue;
        var criterionType;

        if (regexResult) {
          criterionType = StrToCriterionType(regexResult[1]);
          criterionValue = regexResult[2];
        } else {
          criterionType = CriterionType.EQUAL;
          criterionValue = criterion;
        }

        var value = arithmeticHelper.coerceToMaybeNumber(criterionValue);
        var boolvalue = criterionValue.toLowerCase() === this.trueString ? true : criterionValue.toLowerCase() === this.falseString ? false : undefined;

        if (criterionType === undefined) {
          return undefined;
        }

        if (criterionValue === '') {
          return buildCriterion(criterionType, null);
        } else if (value === undefined) {
          if (criterionType === CriterionType.EQUAL || criterionType === CriterionType.NOT_EQUAL) {
            return buildCriterion(criterionType, boolvalue !== null && boolvalue !== void 0 ? boolvalue : criterionValue);
          }
        } else {
          return buildCriterion(criterionType, value);
        }
      }

      return undefined;
    }
  }]);

  return CriterionBuilder;
}();
var ANY_CRITERION_REGEX = /([<>=]+)(.*)/;

function StrToCriterionType(str) {
  switch (str) {
    case '>':
      return CriterionType.GREATER_THAN;

    case '>=':
      return CriterionType.GREATER_THAN_OR_EQUAL;

    case '<':
      return CriterionType.LESS_THAN;

    case '<=':
      return CriterionType.LESS_THAN_OR_EQUAL;

    case '<>':
      return CriterionType.NOT_EQUAL;

    case '=':
      return CriterionType.EQUAL;

    default:
      return undefined;
  }
}

export var buildCriterionLambda = function buildCriterionLambda(criterion, arithmeticHelper) {
  switch (criterion.operator) {
    case CriterionType.GREATER_THAN:
      {
        if (typeof criterion.value === 'number') {
          return function (cellValue) {
            return typeof cellValue === 'number' && arithmeticHelper.floatCmp(cellValue, criterion.value) > 0;
          };
        } else {
          return function (_cellValue) {
            return false;
          };
        }
      }

    case CriterionType.GREATER_THAN_OR_EQUAL:
      {
        if (typeof criterion.value === 'number') {
          return function (cellValue) {
            return typeof cellValue === 'number' && arithmeticHelper.floatCmp(cellValue, criterion.value) >= 0;
          };
        } else {
          return function (_cellValue) {
            return false;
          };
        }
      }

    case CriterionType.LESS_THAN:
      {
        if (typeof criterion.value === 'number') {
          return function (cellValue) {
            return typeof cellValue === 'number' && arithmeticHelper.floatCmp(cellValue, criterion.value) < 0;
          };
        } else {
          return function (_cellValue) {
            return false;
          };
        }
      }

    case CriterionType.LESS_THAN_OR_EQUAL:
      {
        if (typeof criterion.value === 'number') {
          return function (cellValue) {
            return typeof cellValue === 'number' && arithmeticHelper.floatCmp(cellValue, criterion.value) <= 0;
          };
        } else {
          return function (_cellValue) {
            return false;
          };
        }
      }

    case CriterionType.EQUAL:
      {
        if (typeof criterion.value === 'number') {
          return function (cellValue) {
            if (typeof cellValue === 'number') {
              return arithmeticHelper.floatCmp(cellValue, criterion.value) === 0;
            } else if (typeof cellValue === 'string') {
              if (cellValue === '') {
                return false;
              }

              var val = arithmeticHelper.coerceToMaybeNumber(cellValue);

              if (val === undefined) {
                return false;
              }

              return arithmeticHelper.floatCmp(val, criterion.value) === 0;
            } else {
              return false;
            }
          };
        } else if (typeof criterion.value === 'string') {
          return arithmeticHelper.eqMatcherFunction(criterion.value);
        } else if (typeof criterion.value === 'boolean') {
          return function (cellValue) {
            return typeof cellValue === 'boolean' && cellValue === criterion.value;
          };
        } else {
          return function (cellValue) {
            return cellValue === EmptyValue;
          };
        }
      }

    case CriterionType.NOT_EQUAL:
      {
        if (typeof criterion.value === 'number') {
          return function (cellValue) {
            if (typeof cellValue === 'number') {
              return arithmeticHelper.floatCmp(cellValue, criterion.value) !== 0;
            } else if (typeof cellValue === 'string') {
              if (cellValue === '') {
                return true;
              }

              var val = arithmeticHelper.coerceToMaybeNumber(cellValue);

              if (val === undefined) {
                return true;
              }

              return arithmeticHelper.floatCmp(val, criterion.value) !== 0;
            } else {
              return true;
            }
          };
        } else if (typeof criterion.value === 'string') {
          return arithmeticHelper.neqMatcherFunction(criterion.value);
        } else if (typeof criterion.value === 'boolean') {
          return function (cellValue) {
            return typeof cellValue !== 'boolean' || cellValue !== criterion.value;
          };
        } else {
          return function (cellValue) {
            return cellValue !== EmptyValue;
          };
        }
      }
  }
};