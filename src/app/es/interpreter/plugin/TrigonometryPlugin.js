import "core-js/modules/es.symbol";
import "core-js/modules/es.symbol.description";
import "core-js/modules/es.symbol.iterator";
import "core-js/modules/es.array.iterator";
import "core-js/modules/es.math.acosh";
import "core-js/modules/es.math.asinh";
import "core-js/modules/es.math.atanh";
import "core-js/modules/es.math.cosh";
import "core-js/modules/es.math.sinh";
import "core-js/modules/es.math.tanh";
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
import { PI } from './MathConstantsPlugin';
/**
 * Interpreter plugin containing trigonometric functions
 */

export var TrigonometryPlugin = /*#__PURE__*/function (_FunctionPlugin) {
  _inherits(TrigonometryPlugin, _FunctionPlugin);

  var _super = _createSuper(TrigonometryPlugin);

  function TrigonometryPlugin() {
    _classCallCheck(this, TrigonometryPlugin);

    return _super.apply(this, arguments);
  }

  _createClass(TrigonometryPlugin, [{
    key: "acos",

    /**
     * Corresponds to ACOS(value)
     *
     * Returns the arc cosine (or inverse cosine) of a number.
     *
     * @param ast
     * @param formulaAddress
     */
    value: function acos(ast, formulaAddress) {
      return this.runFunction(ast.args, formulaAddress, this.metadata('ACOS'), Math.acos);
    }
  }, {
    key: "asin",
    value: function asin(ast, formulaAddress) {
      return this.runFunction(ast.args, formulaAddress, this.metadata('ASIN'), Math.asin);
    }
  }, {
    key: "cos",
    value: function cos(ast, formulaAddress) {
      return this.runFunction(ast.args, formulaAddress, this.metadata('COS'), Math.cos);
    }
  }, {
    key: "sin",
    value: function sin(ast, formulaAddress) {
      return this.runFunction(ast.args, formulaAddress, this.metadata('SIN'), Math.sin);
    }
  }, {
    key: "tan",
    value: function tan(ast, formulaAddress) {
      return this.runFunction(ast.args, formulaAddress, this.metadata('TAN'), Math.tan);
    }
  }, {
    key: "atan",
    value: function atan(ast, formulaAddress) {
      return this.runFunction(ast.args, formulaAddress, this.metadata('ATAN'), Math.atan);
    }
  }, {
    key: "atan2",
    value: function atan2(ast, formulaAddress) {
      return this.runFunction(ast.args, formulaAddress, this.metadata('ATAN2'), Math.atan2);
    }
  }, {
    key: "cot",
    value: function cot(ast, formulaAddress) {
      return this.runFunction(ast.args, formulaAddress, this.metadata('COT'), function (arg) {
        return arg === 0 ? new CellError(ErrorType.DIV_BY_ZERO) : 1 / Math.tan(arg);
      });
    }
  }, {
    key: "acot",
    value: function acot(ast, formulaAddress) {
      return this.runFunction(ast.args, formulaAddress, this.metadata('ACOT'), function (arg) {
        return arg === 0 ? PI / 2 : Math.atan(1 / arg);
      });
    }
  }, {
    key: "sec",
    value: function sec(ast, formulaAddress) {
      return this.runFunction(ast.args, formulaAddress, this.metadata('SEC'), function (arg) {
        return 1 / Math.cos(arg);
      });
    }
  }, {
    key: "csc",
    value: function csc(ast, formulaAddress) {
      return this.runFunction(ast.args, formulaAddress, this.metadata('CSC'), function (arg) {
        return arg === 0 ? new CellError(ErrorType.DIV_BY_ZERO) : 1 / Math.sin(arg);
      });
    }
  }, {
    key: "sinh",
    value: function sinh(ast, formulaAddress) {
      return this.runFunction(ast.args, formulaAddress, this.metadata('SINH'), Math.sinh);
    }
  }, {
    key: "asinh",
    value: function asinh(ast, formulaAddress) {
      return this.runFunction(ast.args, formulaAddress, this.metadata('ASINH'), Math.asinh);
    }
  }, {
    key: "cosh",
    value: function cosh(ast, formulaAddress) {
      return this.runFunction(ast.args, formulaAddress, this.metadata('COSH'), Math.cosh);
    }
  }, {
    key: "acosh",
    value: function acosh(ast, formulaAddress) {
      return this.runFunction(ast.args, formulaAddress, this.metadata('ACOSH'), Math.acosh);
    }
  }, {
    key: "tanh",
    value: function tanh(ast, formulaAddress) {
      return this.runFunction(ast.args, formulaAddress, this.metadata('TANH'), Math.tanh);
    }
  }, {
    key: "atanh",
    value: function atanh(ast, formulaAddress) {
      return this.runFunction(ast.args, formulaAddress, this.metadata('ATANH'), Math.atanh);
    }
  }, {
    key: "coth",
    value: function coth(ast, formulaAddress) {
      return this.runFunction(ast.args, formulaAddress, this.metadata('COTH'), function (arg) {
        return arg === 0 ? new CellError(ErrorType.DIV_BY_ZERO) : 1 / Math.tanh(arg);
      });
    }
  }, {
    key: "acoth",
    value: function acoth(ast, formulaAddress) {
      return this.runFunction(ast.args, formulaAddress, this.metadata('ACOTH'), function (arg) {
        return arg === 0 ? new CellError(ErrorType.NUM) : Math.atanh(1 / arg);
      });
    }
  }, {
    key: "sech",
    value: function sech(ast, formulaAddress) {
      return this.runFunction(ast.args, formulaAddress, this.metadata('SECH'), function (arg) {
        return 1 / Math.cosh(arg);
      });
    }
  }, {
    key: "csch",
    value: function csch(ast, formulaAddress) {
      return this.runFunction(ast.args, formulaAddress, this.metadata('CSCH'), function (arg) {
        return arg === 0 ? new CellError(ErrorType.DIV_BY_ZERO) : 1 / Math.sinh(arg);
      });
    }
  }]);

  return TrigonometryPlugin;
}(FunctionPlugin);
TrigonometryPlugin.implementedFunctions = {
  'ACOS': {
    method: 'acos',
    parameters: [{
      argumentType: ArgumentTypes.NUMBER
    }]
  },
  'ASIN': {
    method: 'asin',
    parameters: [{
      argumentType: ArgumentTypes.NUMBER
    }]
  },
  'COS': {
    method: 'cos',
    parameters: [{
      argumentType: ArgumentTypes.NUMBER
    }]
  },
  'SIN': {
    method: 'sin',
    parameters: [{
      argumentType: ArgumentTypes.NUMBER
    }]
  },
  'TAN': {
    method: 'tan',
    parameters: [{
      argumentType: ArgumentTypes.NUMBER
    }]
  },
  'ATAN': {
    method: 'atan',
    parameters: [{
      argumentType: ArgumentTypes.NUMBER
    }]
  },
  'ATAN2': {
    method: 'atan2',
    parameters: [{
      argumentType: ArgumentTypes.NUMBER
    }, {
      argumentType: ArgumentTypes.NUMBER
    }]
  },
  'COT': {
    method: 'cot',
    parameters: [{
      argumentType: ArgumentTypes.NUMBER
    }]
  },
  'SEC': {
    method: 'sec',
    parameters: [{
      argumentType: ArgumentTypes.NUMBER
    }]
  },
  'CSC': {
    method: 'csc',
    parameters: [{
      argumentType: ArgumentTypes.NUMBER
    }]
  },
  'SINH': {
    method: 'sinh',
    parameters: [{
      argumentType: ArgumentTypes.NUMBER
    }]
  },
  'COSH': {
    method: 'cosh',
    parameters: [{
      argumentType: ArgumentTypes.NUMBER
    }]
  },
  'TANH': {
    method: 'tanh',
    parameters: [{
      argumentType: ArgumentTypes.NUMBER
    }]
  },
  'COTH': {
    method: 'coth',
    parameters: [{
      argumentType: ArgumentTypes.NUMBER
    }]
  },
  'SECH': {
    method: 'sech',
    parameters: [{
      argumentType: ArgumentTypes.NUMBER
    }]
  },
  'CSCH': {
    method: 'csch',
    parameters: [{
      argumentType: ArgumentTypes.NUMBER
    }]
  },
  'ACOT': {
    method: 'acot',
    parameters: [{
      argumentType: ArgumentTypes.NUMBER
    }]
  },
  'ASINH': {
    method: 'asinh',
    parameters: [{
      argumentType: ArgumentTypes.NUMBER
    }]
  },
  'ACOSH': {
    method: 'acosh',
    parameters: [{
      argumentType: ArgumentTypes.NUMBER
    }]
  },
  'ATANH': {
    method: 'atanh',
    parameters: [{
      argumentType: ArgumentTypes.NUMBER
    }]
  },
  'ACOTH': {
    method: 'acoth',
    parameters: [{
      argumentType: ArgumentTypes.NUMBER
    }]
  }
};