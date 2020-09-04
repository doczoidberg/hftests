import "core-js/modules/es.symbol";
import "core-js/modules/es.symbol.description";
import "core-js/modules/es.symbol.iterator";
import "core-js/modules/es.array.concat";
import "core-js/modules/es.array.index-of";
import "core-js/modules/es.array.iterator";
import "core-js/modules/es.array.slice";
import "core-js/modules/es.object.get-prototype-of";
import "core-js/modules/es.object.to-string";
import "core-js/modules/es.reflect.construct";
import "core-js/modules/es.regexp.exec";
import "core-js/modules/es.regexp.to-string";
import "core-js/modules/es.string.iterator";
import "core-js/modules/es.string.repeat";
import "core-js/modules/es.string.replace";
import "core-js/modules/es.string.split";
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
 * Interpreter plugin containing text-specific functions
 */

export var TextPlugin = /*#__PURE__*/function (_FunctionPlugin) {
  _inherits(TextPlugin, _FunctionPlugin);

  var _super = _createSuper(TextPlugin);

  function TextPlugin() {
    _classCallCheck(this, TextPlugin);

    return _super.apply(this, arguments);
  }

  _createClass(TextPlugin, [{
    key: "concatenate",

    /**
     * Corresponds to CONCATENATE(value1, [value2, ...])
     *
     * Concatenates provided arguments to one string.
     *
     * @param args
     * @param formulaAddress
     */
    value: function concatenate(ast, formulaAddress) {
      return this.runFunction(ast.args, formulaAddress, this.metadata('CONCATENATE'), function () {
        var _ref;

        return (_ref = '').concat.apply(_ref, arguments);
      });
    }
    /**
     * Corresponds to SPLIT(string, index)
     *
     * Splits provided string using space separator and returns chunk at zero-based position specified by second argument
     *
     * @param ast
     * @param formulaAddress
     */

  }, {
    key: "split",
    value: function split(ast, formulaAddress) {
      return this.runFunction(ast.args, formulaAddress, this.metadata('SPLIT'), function (stringToSplit, indexToUse) {
        var splittedString = stringToSplit.split(' ');

        if (indexToUse >= splittedString.length || indexToUse < 0) {
          return new CellError(ErrorType.VALUE);
        }

        return splittedString[indexToUse];
      });
    }
  }, {
    key: "len",
    value: function len(ast, formulaAddress) {
      return this.runFunction(ast.args, formulaAddress, this.metadata('LEN'), function (arg) {
        return arg.length;
      });
    }
  }, {
    key: "trim",
    value: function trim(ast, formulaAddress) {
      return this.runFunction(ast.args, formulaAddress, this.metadata('TRIM'), function (arg) {
        return arg.replace(/^ +| +$/g, '').replace(/ +/g, ' ');
      });
    }
  }, {
    key: "proper",
    value: function proper(ast, formulaAddress) {
      return this.runFunction(ast.args, formulaAddress, this.metadata('PROPER'), function (arg) {
        return arg.replace(/\w\S*/g, function (word) {
          return word.charAt(0).toUpperCase() + word.substr(1).toLowerCase();
        });
      });
    }
  }, {
    key: "clean",
    value: function clean(ast, formulaAddress) {
      return this.runFunction(ast.args, formulaAddress, this.metadata('CLEAN'), function (arg) {
        // eslint-disable-next-line no-control-regex
        return arg.replace(/[\u0000-\u001F]/g, '');
      });
    }
  }, {
    key: "rept",
    value: function rept(ast, formulaAddress) {
      return this.runFunction(ast.args, formulaAddress, this.metadata('REPT'), function (text, count) {
        if (count < 0) {
          return new CellError(ErrorType.VALUE);
        }

        return text.repeat(count);
      });
    }
  }, {
    key: "right",
    value: function right(ast, formulaAddress) {
      return this.runFunction(ast.args, formulaAddress, this.metadata('RIGHT'), function (text, length) {
        if (length < 0) {
          return new CellError(ErrorType.VALUE);
        } else if (length === 0) {
          return '';
        }

        return text.slice(-length);
      });
    }
  }, {
    key: "left",
    value: function left(ast, formulaAddress) {
      return this.runFunction(ast.args, formulaAddress, this.metadata('LEFT'), function (text, length) {
        if (length < 0) {
          return new CellError(ErrorType.VALUE);
        }

        return text.slice(0, length);
      });
    }
  }, {
    key: "search",
    value: function search(ast, formulaAddress) {
      var _this = this;

      return this.runFunction(ast.args, formulaAddress, this.metadata('SEARCH'), function (pattern, text, startIndex) {
        if (startIndex < 1 || startIndex > text.length) {
          return new CellError(ErrorType.VALUE);
        }

        var normalizedText = text.substr(startIndex - 1).toLowerCase();
        var index;

        if (_this.interpreter.arithmeticHelper.requiresRegex(pattern)) {
          index = _this.interpreter.arithmeticHelper.searchString(pattern, normalizedText);
        } else {
          index = normalizedText.indexOf(pattern.toLowerCase());
        }

        index = index + startIndex;
        return index > 0 ? index : new CellError(ErrorType.VALUE);
      });
    }
  }, {
    key: "find",
    value: function find(ast, formulaAddress) {
      return this.runFunction(ast.args, formulaAddress, this.metadata('FIND'), function (pattern, text, startIndex) {
        if (startIndex < 1 || startIndex > text.length) {
          return new CellError(ErrorType.VALUE);
        }

        var shiftedText = text.substr(startIndex - 1);
        var index = shiftedText.indexOf(pattern) + startIndex;
        return index > 0 ? index : new CellError(ErrorType.VALUE);
      });
    }
  }]);

  return TextPlugin;
}(FunctionPlugin);
TextPlugin.implementedFunctions = {
  'CONCATENATE': {
    method: 'concatenate',
    parameters: [{
      argumentType: ArgumentTypes.STRING
    }],
    repeatLastArg: true,
    expandRanges: true
  },
  'SPLIT': {
    method: 'split',
    parameters: [{
      argumentType: ArgumentTypes.STRING
    }, {
      argumentType: ArgumentTypes.NUMBER
    }]
  },
  'LEN': {
    method: 'len',
    parameters: [{
      argumentType: ArgumentTypes.STRING
    }]
  },
  'TRIM': {
    method: 'trim',
    parameters: [{
      argumentType: ArgumentTypes.STRING
    }]
  },
  'PROPER': {
    method: 'proper',
    parameters: [{
      argumentType: ArgumentTypes.STRING
    }]
  },
  'CLEAN': {
    method: 'clean',
    parameters: [{
      argumentType: ArgumentTypes.STRING
    }]
  },
  'REPT': {
    method: 'rept',
    parameters: [{
      argumentType: ArgumentTypes.STRING
    }, {
      argumentType: ArgumentTypes.NUMBER
    }]
  },
  'RIGHT': {
    method: 'right',
    parameters: [{
      argumentType: ArgumentTypes.STRING
    }, {
      argumentType: ArgumentTypes.NUMBER,
      defaultValue: 1
    }]
  },
  'LEFT': {
    method: 'left',
    parameters: [{
      argumentType: ArgumentTypes.STRING
    }, {
      argumentType: ArgumentTypes.NUMBER,
      defaultValue: 1
    }]
  },
  'SEARCH': {
    method: 'search',
    parameters: [{
      argumentType: ArgumentTypes.STRING
    }, {
      argumentType: ArgumentTypes.STRING
    }, {
      argumentType: ArgumentTypes.NUMBER,
      defaultValue: 1
    }]
  },
  'FIND': {
    method: 'find',
    parameters: [{
      argumentType: ArgumentTypes.STRING
    }, {
      argumentType: ArgumentTypes.STRING
    }, {
      argumentType: ArgumentTypes.NUMBER,
      defaultValue: 1
    }]
  }
};