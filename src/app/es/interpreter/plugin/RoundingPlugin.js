import "core-js/modules/es.symbol";
import "core-js/modules/es.symbol.description";
import "core-js/modules/es.symbol.iterator";
import "core-js/modules/es.array.iterator";
import "core-js/modules/es.object.get-prototype-of";
import "core-js/modules/es.object.to-string";
import "core-js/modules/es.reflect.construct";
import "core-js/modules/es.regexp.to-string";
import "core-js/modules/es.string.iterator";
import "core-js/modules/web.dom-collections.iterator";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

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
import { ArgumentTypes, FunctionPlugin } from './FunctionPlugin';
export function findNextOddNumber(arg) {
  var ceiled = Math.ceil(arg);
  return ceiled % 2 === 1 ? ceiled : ceiled + 1;
}
export function findNextEvenNumber(arg) {
  var ceiled = Math.ceil(arg);
  return ceiled % 2 === 0 ? ceiled : ceiled + 1;
}
export var RoundingPlugin = /*#__PURE__*/function (_FunctionPlugin) {
  _inherits(RoundingPlugin, _FunctionPlugin);

  var _super = _createSuper(RoundingPlugin);

  function RoundingPlugin() {
    _classCallCheck(this, RoundingPlugin);

    return _super.apply(this, arguments);
  }

  _createClass(RoundingPlugin, [{
    key: "roundup",
    value: function roundup(ast, formulaAddress) {
      return this.runFunction(ast.args, formulaAddress, this.metadata('ROUNDDOWN'), function (numberToRound, places) {
        var placesMultiplier = Math.pow(10, places);

        if (numberToRound < 0) {
          return -Math.ceil(-numberToRound * placesMultiplier) / placesMultiplier;
        } else {
          return Math.ceil(numberToRound * placesMultiplier) / placesMultiplier;
        }
      });
    }
  }, {
    key: "rounddown",
    value: function rounddown(ast, formulaAddress) {
      return this.runFunction(ast.args, formulaAddress, this.metadata('ROUNDDOWN'), function (numberToRound, places) {
        var placesMultiplier = Math.pow(10, places);

        if (numberToRound < 0) {
          return -Math.floor(-numberToRound * placesMultiplier) / placesMultiplier;
        } else {
          return Math.floor(numberToRound * placesMultiplier) / placesMultiplier;
        }
      });
    }
  }, {
    key: "round",
    value: function round(ast, formulaAddress) {
      return this.runFunction(ast.args, formulaAddress, this.metadata('ROUND'), function (numberToRound, places) {
        var placesMultiplier = Math.pow(10, places);

        if (numberToRound < 0) {
          return -Math.round(-numberToRound * placesMultiplier) / placesMultiplier;
        } else {
          return Math.round(numberToRound * placesMultiplier) / placesMultiplier;
        }
      });
    }
  }, {
    key: "trunc",
    value: function trunc(ast, formulaAddress) {
      return this.rounddown(ast, formulaAddress);
    }
  }, {
    key: "intFunc",
    value: function intFunc(ast, formulaAddress) {
      return this.runFunction(ast.args, formulaAddress, this.metadata('INT'), function (coercedNumberToRound) {
        if (coercedNumberToRound < 0) {
          return -Math.floor(-coercedNumberToRound);
        } else {
          return Math.floor(coercedNumberToRound);
        }
      });
    }
  }, {
    key: "even",
    value: function even(ast, formulaAddress) {
      return this.runFunction(ast.args, formulaAddress, this.metadata('EVEN'), function (coercedNumberToRound) {
        if (coercedNumberToRound < 0) {
          return -findNextEvenNumber(-coercedNumberToRound);
        } else {
          return findNextEvenNumber(coercedNumberToRound);
        }
      });
    }
  }, {
    key: "odd",
    value: function odd(ast, formulaAddress) {
      return this.runFunction(ast.args, formulaAddress, this.metadata('ODD'), function (coercedNumberToRound) {
        if (coercedNumberToRound < 0) {
          return -findNextOddNumber(-coercedNumberToRound);
        } else {
          return findNextOddNumber(coercedNumberToRound);
        }
      });
    }
  }, {
    key: "ceiling",
    value: function ceiling(ast, formulaAddress) {
      return this.runFunction(ast.args, formulaAddress, this.metadata('CEILING'), function (value, significance, mode) {
        if (significance === 0 || value === 0) {
          return 0;
        }

        if (value > 0 !== significance > 0 && ast.args.length > 1) {
          return new CellError(ErrorType.NUM);
        }

        if (mode === 0) {
          significance = Math.abs(significance);
        }

        return Math.ceil(value / significance) * significance;
      });
    }
  }]);

  return RoundingPlugin;
}(FunctionPlugin);
RoundingPlugin.implementedFunctions = {
  'ROUNDUP': {
    method: 'roundup',
    parameters: [{
      argumentType: ArgumentTypes.NUMBER
    }, {
      argumentType: ArgumentTypes.NUMBER,
      defaultValue: 0
    }]
  },
  'ROUNDDOWN': {
    method: 'rounddown',
    parameters: [{
      argumentType: ArgumentTypes.NUMBER
    }, {
      argumentType: ArgumentTypes.NUMBER,
      defaultValue: 0
    }]
  },
  'ROUND': {
    method: 'round',
    parameters: [{
      argumentType: ArgumentTypes.NUMBER
    }, {
      argumentType: ArgumentTypes.NUMBER,
      defaultValue: 0
    }]
  },
  'TRUNC': {
    method: 'trunc',
    parameters: [{
      argumentType: ArgumentTypes.NUMBER
    }, {
      argumentType: ArgumentTypes.NUMBER,
      defaultValue: 0
    }]
  },
  'INT': {
    method: 'intFunc',
    parameters: [{
      argumentType: ArgumentTypes.NUMBER
    }]
  },
  'EVEN': {
    method: 'even',
    parameters: [{
      argumentType: ArgumentTypes.NUMBER
    }]
  },
  'ODD': {
    method: 'odd',
    parameters: [{
      argumentType: ArgumentTypes.NUMBER
    }]
  },
  'CEILING': {
    method: 'ceiling',
    parameters: [{
      argumentType: ArgumentTypes.NUMBER
    }, {
      argumentType: ArgumentTypes.NUMBER,
      defaultValue: 1
    }, {
      argumentType: ArgumentTypes.NUMBER,
      defaultValue: 0
    }]
  }
};