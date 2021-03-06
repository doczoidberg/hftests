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
var MAX_48BIT_INTEGER = 281474976710655;
var SHIFT_MIN_POSITIONS = -53;
var SHIFT_MAX_POSITIONS = 53;
export var BitShiftPlugin = /*#__PURE__*/function (_FunctionPlugin) {
  _inherits(BitShiftPlugin, _FunctionPlugin);

  var _super = _createSuper(BitShiftPlugin);

  function BitShiftPlugin() {
    _classCallCheck(this, BitShiftPlugin);

    return _super.apply(this, arguments);
  }

  _createClass(BitShiftPlugin, [{
    key: "bitlshift",
    value: function bitlshift(ast, formulaAddress) {
      return this.runFunction(ast.args, formulaAddress, this.metadata('BITLSHIFT'), shiftLeft);
    }
  }, {
    key: "bitrshift",
    value: function bitrshift(ast, formulaAddress) {
      return this.runFunction(ast.args, formulaAddress, this.metadata('BITRSHIFT'), shiftRight);
    }
  }]);

  return BitShiftPlugin;
}(FunctionPlugin);
BitShiftPlugin.implementedFunctions = {
  'BITLSHIFT': {
    method: 'bitlshift',
    parameters: [{
      argumentType: ArgumentTypes.INTEGER,
      minValue: 0
    }, {
      argumentType: ArgumentTypes.INTEGER,
      minValue: SHIFT_MIN_POSITIONS,
      maxValue: SHIFT_MAX_POSITIONS
    }]
  },
  'BITRSHIFT': {
    method: 'bitrshift',
    parameters: [{
      argumentType: ArgumentTypes.INTEGER,
      minValue: 0
    }, {
      argumentType: ArgumentTypes.INTEGER,
      minValue: SHIFT_MIN_POSITIONS,
      maxValue: SHIFT_MAX_POSITIONS
    }]
  }
};

function shiftLeft(value, positions) {
  if (positions < 0) {
    return shiftRight(value, -positions);
  } else {
    return validate(value * Math.pow(2, positions));
  }
}

function shiftRight(value, positions) {
  if (positions < 0) {
    return shiftLeft(value, -positions);
  } else {
    return validate(Math.floor(value / Math.pow(2, positions)));
  }
}

function validate(result) {
  if (result > MAX_48BIT_INTEGER) {
    return new CellError(ErrorType.NUM);
  } else {
    return result;
  }
}