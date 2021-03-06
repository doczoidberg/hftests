import "core-js/modules/es.symbol";
import "core-js/modules/es.symbol.description";
import "core-js/modules/es.symbol.iterator";
import "core-js/modules/es.array.for-each";
import "core-js/modules/es.array.iterator";
import "core-js/modules/es.array.some";
import "core-js/modules/es.object.get-prototype-of";
import "core-js/modules/es.object.to-string";
import "core-js/modules/es.reflect.construct";
import "core-js/modules/es.regexp.to-string";
import "core-js/modules/es.string.iterator";
import "core-js/modules/web.dom-collections.for-each";
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
/**
 * Interpreter plugin containing boolean functions
 */

export var BooleanPlugin = /*#__PURE__*/function (_FunctionPlugin) {
  _inherits(BooleanPlugin, _FunctionPlugin);

  var _super = _createSuper(BooleanPlugin);

  function BooleanPlugin() {
    _classCallCheck(this, BooleanPlugin);

    return _super.apply(this, arguments);
  }

  _createClass(BooleanPlugin, [{
    key: "literalTrue",

    /**
     * Corresponds to TRUE()
     *
     * Returns the logical true
     *
     * @param ast
     * @param formulaAddress
     */
    value: function literalTrue(ast, formulaAddress) {
      return this.runFunction(ast.args, formulaAddress, this.metadata('TRUE'), function () {
        return true;
      });
    }
    /**
     * Corresponds to FALSE()
     *
     * Returns the logical false
     *
     * @param ast
     * @param formulaAddress
     */

  }, {
    key: "literalFalse",
    value: function literalFalse(ast, formulaAddress) {
      return this.runFunction(ast.args, formulaAddress, this.metadata('FALSE'), function () {
        return false;
      });
    }
    /**
     * Corresponds to IF(expression, value_if_true, value_if_false)
     *
     * Returns value specified as second argument if expression is true and third argument if expression is false
     *
     * @param ast
     * @param formulaAddress
     */

  }, {
    key: "conditionalIf",
    value: function conditionalIf(ast, formulaAddress) {
      return this.runFunction(ast.args, formulaAddress, this.metadata('IF'), function (condition, arg2, arg3) {
        return condition ? arg2 : arg3;
      });
    }
    /**
     * Corresponds to AND(expression1, [expression2, ...])
     *
     * Returns true if all of the provided arguments are logically true, and false if any of it is logically false
     *
     * @param ast
     * @param formulaAddress
     */

  }, {
    key: "and",
    value: function and(ast, formulaAddress) {
      return this.runFunction(ast.args, formulaAddress, this.metadata('AND'), function () {
        for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
          args[_key] = arguments[_key];
        }

        return !args.some(function (arg) {
          return !arg;
        });
      });
    }
    /**
     * Corresponds to OR(expression1, [expression2, ...])
     *
     * Returns true if any of the provided arguments are logically true, and false otherwise
     *
     * @param ast
     * @param formulaAddress
     */

  }, {
    key: "or",
    value: function or(ast, formulaAddress) {
      return this.runFunction(ast.args, formulaAddress, this.metadata('OR'), function () {
        for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
          args[_key2] = arguments[_key2];
        }

        return args.some(function (arg) {
          return arg;
        });
      });
    }
  }, {
    key: "not",
    value: function not(ast, formulaAddress) {
      return this.runFunction(ast.args, formulaAddress, this.metadata('NOT'), function (arg) {
        return !arg;
      });
    }
  }, {
    key: "xor",
    value: function xor(ast, formulaAddress) {
      return this.runFunction(ast.args, formulaAddress, this.metadata('XOR'), function () {
        var cnt = 0;

        for (var _len3 = arguments.length, args = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
          args[_key3] = arguments[_key3];
        }

        args.forEach(function (arg) {
          if (arg) {
            cnt++;
          }
        });
        return cnt % 2 === 1;
      });
    }
  }, {
    key: "switch",
    value: function _switch(ast, formulaAddress) {
      var _this = this;

      return this.runFunction(ast.args, formulaAddress, this.metadata('SWITCH'), function (selector) {
        for (var _len4 = arguments.length, args = new Array(_len4 > 1 ? _len4 - 1 : 0), _key4 = 1; _key4 < _len4; _key4++) {
          args[_key4 - 1] = arguments[_key4];
        }

        var n = args.length;
        var i = 0;

        for (; i + 1 < n; i += 2) {
          if (args[i] instanceof CellError) {
            continue;
          }

          if (_this.interpreter.arithmeticHelper.compare(selector, args[i]) === 0) {
            return args[i + 1];
          }
        }

        if (i < n) {
          return args[i];
        } else {
          return new CellError(ErrorType.NA);
        }
      });
    }
  }, {
    key: "iferror",
    value: function iferror(ast, formulaAddress) {
      return this.runFunction(ast.args, formulaAddress, this.metadata('IFERROR'), function (arg1, arg2) {
        if (arg1 instanceof CellError) {
          return arg2;
        } else {
          return arg1;
        }
      });
    }
  }, {
    key: "ifna",
    value: function ifna(ast, formulaAddress) {
      return this.runFunction(ast.args, formulaAddress, this.metadata('IFNA'), function (arg1, arg2) {
        if (arg1 instanceof CellError && arg1.type === ErrorType.NA) {
          return arg2;
        } else {
          return arg1;
        }
      });
    }
  }, {
    key: "choose",
    value: function choose(ast, formulaAddress) {
      return this.runFunction(ast.args, formulaAddress, this.metadata('CHOOSE'), function (selector) {
        if (selector !== Math.round(selector) || selector < 1 || selector > (arguments.length <= 1 ? 0 : arguments.length - 1)) {
          return new CellError(ErrorType.NUM);
        }

        return selector - 1 + 1 < 1 || arguments.length <= selector - 1 + 1 ? undefined : arguments[selector - 1 + 1];
      });
    }
  }]);

  return BooleanPlugin;
}(FunctionPlugin);
BooleanPlugin.implementedFunctions = {
  'TRUE': {
    method: 'literalTrue',
    parameters: []
  },
  'FALSE': {
    method: 'literalFalse',
    parameters: []
  },
  'IF': {
    method: 'conditionalIf',
    parameters: [{
      argumentType: ArgumentTypes.BOOLEAN
    }, {
      argumentType: ArgumentTypes.SCALAR
    }, {
      argumentType: ArgumentTypes.SCALAR,
      defaultValue: false
    }]
  },
  'AND': {
    method: 'and',
    parameters: [{
      argumentType: ArgumentTypes.BOOLEAN
    }],
    repeatLastArg: true,
    expandRanges: true
  },
  'OR': {
    method: 'or',
    parameters: [{
      argumentType: ArgumentTypes.BOOLEAN
    }],
    repeatLastArg: true,
    expandRanges: true
  },
  'XOR': {
    method: 'xor',
    parameters: [{
      argumentType: ArgumentTypes.BOOLEAN
    }],
    repeatLastArg: true,
    expandRanges: true
  },
  'NOT': {
    method: 'not',
    parameters: [{
      argumentType: ArgumentTypes.BOOLEAN
    }]
  },
  'SWITCH': {
    method: 'switch',
    parameters: [{
      argumentType: ArgumentTypes.NOERROR
    }, {
      argumentType: ArgumentTypes.SCALAR
    }, {
      argumentType: ArgumentTypes.SCALAR
    }],
    repeatLastArg: true
  },
  'IFERROR': {
    method: 'iferror',
    parameters: [{
      argumentType: ArgumentTypes.SCALAR
    }, {
      argumentType: ArgumentTypes.SCALAR
    }]
  },
  'IFNA': {
    method: 'ifna',
    parameters: [{
      argumentType: ArgumentTypes.SCALAR
    }, {
      argumentType: ArgumentTypes.SCALAR
    }]
  },
  'CHOOSE': {
    method: 'choose',
    parameters: [{
      argumentType: ArgumentTypes.NUMBER
    }, {
      argumentType: ArgumentTypes.SCALAR
    }],
    repeatLastArg: true
  }
};