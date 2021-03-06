import "core-js/modules/es.symbol";
import "core-js/modules/es.symbol.description";
import "core-js/modules/es.symbol.iterator";
import "core-js/modules/es.array.iterator";
import "core-js/modules/es.math.log10";
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
import { ArgumentTypes, FunctionPlugin } from './FunctionPlugin';
export var LogarithmPlugin = /*#__PURE__*/function (_FunctionPlugin) {
  _inherits(LogarithmPlugin, _FunctionPlugin);

  var _super = _createSuper(LogarithmPlugin);

  function LogarithmPlugin() {
    _classCallCheck(this, LogarithmPlugin);

    return _super.apply(this, arguments);
  }

  _createClass(LogarithmPlugin, [{
    key: "log10",
    value: function log10(ast, formulaAddress) {
      return this.runFunction(ast.args, formulaAddress, this.metadata('LOG10'), Math.log10);
    }
  }, {
    key: "log",
    value: function log(ast, formulaAddress) {
      return this.runFunction(ast.args, formulaAddress, this.metadata('LOG'), function (arg, base) {
        return Math.log(arg) / Math.log(base);
      });
    }
  }, {
    key: "ln",
    value: function ln(ast, formulaAddress) {
      return this.runFunction(ast.args, formulaAddress, this.metadata('LN'), Math.log);
    }
  }]);

  return LogarithmPlugin;
}(FunctionPlugin);
LogarithmPlugin.implementedFunctions = {
  'LOG10': {
    method: 'log10',
    parameters: [{
      argumentType: ArgumentTypes.NUMBER
    }]
  },
  'LOG': {
    method: 'log',
    parameters: [{
      argumentType: ArgumentTypes.NUMBER,
      greaterThan: 0
    }, {
      argumentType: ArgumentTypes.NUMBER,
      defaultValue: 10,
      greaterThan: 0
    }]
  },
  'LN': {
    method: 'ln',
    parameters: [{
      argumentType: ArgumentTypes.NUMBER
    }]
  }
};