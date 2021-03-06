import "core-js/modules/es.symbol";
import "core-js/modules/es.symbol.description";
import "core-js/modules/es.symbol.iterator";
import "core-js/modules/es.array.iterator";
import "core-js/modules/es.object.get-prototype-of";
import "core-js/modules/es.object.to-string";
import "core-js/modules/es.reflect.construct";
import "core-js/modules/es.regexp.constructor";
import "core-js/modules/es.regexp.exec";
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
import { padLeft } from '../../format/format';
import { ArgumentTypes, FunctionPlugin } from './FunctionPlugin';
var MAX_LENGTH = 10;
var DECIMAL_NUMBER_OF_BITS = 255;
var MIN_BASE = 2;
var MAX_BASE = 36;
var ALPHABET = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
export var RadixConversionPlugin = /*#__PURE__*/function (_FunctionPlugin) {
  _inherits(RadixConversionPlugin, _FunctionPlugin);

  var _super = _createSuper(RadixConversionPlugin);

  function RadixConversionPlugin() {
    _classCallCheck(this, RadixConversionPlugin);

    return _super.apply(this, arguments);
  }

  _createClass(RadixConversionPlugin, [{
    key: "dec2bin",
    value: function dec2bin(ast, formulaAddress) {
      return this.runFunction(ast.args, formulaAddress, this.metadata('DEC2BIN'), function (value, places) {
        return decimalToBaseWithExactPadding(value, 2, places);
      });
    }
  }, {
    key: "dec2oct",
    value: function dec2oct(ast, formulaAddress) {
      return this.runFunction(ast.args, formulaAddress, this.metadata('DEC2OCT'), function (value, places) {
        return decimalToBaseWithExactPadding(value, 8, places);
      });
    }
  }, {
    key: "dec2hex",
    value: function dec2hex(ast, formulaAddress) {
      return this.runFunction(ast.args, formulaAddress, this.metadata('DEC2HEX'), function (value, places) {
        return decimalToBaseWithExactPadding(value, 16, places);
      });
    }
  }, {
    key: "bin2dec",
    value: function bin2dec(ast, formulaAddress) {
      return this.runFunction(ast.args, formulaAddress, this.metadata('BIN2DEC'), function (binary) {
        var binaryWithSign = coerceStringToBase(binary, 2, MAX_LENGTH);

        if (binaryWithSign === undefined) {
          return new CellError(ErrorType.NUM);
        }

        return twoComplementToDecimal(binaryWithSign, 2);
      });
    }
  }, {
    key: "bin2oct",
    value: function bin2oct(ast, formulaAddress) {
      return this.runFunction(ast.args, formulaAddress, this.metadata('BIN2OCT'), function (binary, places) {
        var binaryWithSign = coerceStringToBase(binary, 2, MAX_LENGTH);

        if (binaryWithSign === undefined) {
          return new CellError(ErrorType.NUM);
        }

        return decimalToBaseWithExactPadding(twoComplementToDecimal(binaryWithSign, 2), 8, places);
      });
    }
  }, {
    key: "bin2hex",
    value: function bin2hex(ast, formulaAddress) {
      return this.runFunction(ast.args, formulaAddress, this.metadata('BIN2HEX'), function (binary, places) {
        var binaryWithSign = coerceStringToBase(binary, 2, MAX_LENGTH);

        if (binaryWithSign === undefined) {
          return new CellError(ErrorType.NUM);
        }

        return decimalToBaseWithExactPadding(twoComplementToDecimal(binaryWithSign, 2), 16, places);
      });
    }
  }, {
    key: "oct2dec",
    value: function oct2dec(ast, formulaAddress) {
      return this.runFunction(ast.args, formulaAddress, this.metadata('OCT2DEC'), function (octal) {
        var octalWithSign = coerceStringToBase(octal, 8, MAX_LENGTH);

        if (octalWithSign === undefined) {
          return new CellError(ErrorType.NUM);
        }

        return twoComplementToDecimal(octalWithSign, 8);
      });
    }
  }, {
    key: "oct2bin",
    value: function oct2bin(ast, formulaAddress) {
      return this.runFunction(ast.args, formulaAddress, this.metadata('OCT2BIN'), function (octal, places) {
        var octalWithSign = coerceStringToBase(octal, 8, MAX_LENGTH);

        if (octalWithSign === undefined) {
          return new CellError(ErrorType.NUM);
        }

        return decimalToBaseWithExactPadding(twoComplementToDecimal(octalWithSign, 8), 2, places);
      });
    }
  }, {
    key: "oct2hex",
    value: function oct2hex(ast, formulaAddress) {
      return this.runFunction(ast.args, formulaAddress, this.metadata('OCT2HEX'), function (octal, places) {
        var octalWithSign = coerceStringToBase(octal, 8, MAX_LENGTH);

        if (octalWithSign === undefined) {
          return new CellError(ErrorType.NUM);
        }

        return decimalToBaseWithExactPadding(twoComplementToDecimal(octalWithSign, 8), 16, places);
      });
    }
  }, {
    key: "hex2dec",
    value: function hex2dec(ast, formulaAddress) {
      return this.runFunction(ast.args, formulaAddress, this.metadata('HEX2DEC'), function (hexadecimal) {
        var hexadecimalWithSign = coerceStringToBase(hexadecimal, 16, MAX_LENGTH);

        if (hexadecimalWithSign === undefined) {
          return new CellError(ErrorType.NUM);
        }

        return twoComplementToDecimal(hexadecimalWithSign, 16);
      });
    }
  }, {
    key: "hex2bin",
    value: function hex2bin(ast, formulaAddress) {
      return this.runFunction(ast.args, formulaAddress, this.metadata('HEX2BIN'), function (hexadecimal, places) {
        var hexadecimalWithSign = coerceStringToBase(hexadecimal, 16, MAX_LENGTH);

        if (hexadecimalWithSign === undefined) {
          return new CellError(ErrorType.NUM);
        }

        return decimalToBaseWithExactPadding(twoComplementToDecimal(hexadecimalWithSign, 16), 2, places);
      });
    }
  }, {
    key: "hex2oct",
    value: function hex2oct(ast, formulaAddress) {
      return this.runFunction(ast.args, formulaAddress, this.metadata('HEX2OCT'), function (hexadecimal, places) {
        var hexadecimalWithSign = coerceStringToBase(hexadecimal, 16, MAX_LENGTH);

        if (hexadecimalWithSign === undefined) {
          return new CellError(ErrorType.NUM);
        }

        return decimalToBaseWithExactPadding(twoComplementToDecimal(hexadecimalWithSign, 16), 8, places);
      });
    }
  }, {
    key: "base",
    value: function base(ast, formulaAddress) {
      return this.runFunction(ast.args, formulaAddress, this.metadata('BASE'), decimalToBaseWithMinimumPadding);
    }
  }, {
    key: "decimal",
    value: function decimal(ast, formulaAddress) {
      return this.runFunction(ast.args, formulaAddress, this.metadata('DECIMAL'), function (arg, base) {
        var input = coerceStringToBase(arg, base, DECIMAL_NUMBER_OF_BITS);

        if (input === undefined) {
          return new CellError(ErrorType.NUM);
        }

        return parseInt(input, base);
      });
    }
  }]);

  return RadixConversionPlugin;
}(FunctionPlugin);
RadixConversionPlugin.implementedFunctions = {
  'DEC2BIN': {
    method: 'dec2bin',
    parameters: [{
      argumentType: ArgumentTypes.NUMBER
    }, {
      argumentType: ArgumentTypes.NUMBER,
      optionalArg: true,
      minValue: 1,
      maxValue: 10
    }]
  },
  'DEC2OCT': {
    method: 'dec2oct',
    parameters: [{
      argumentType: ArgumentTypes.NUMBER
    }, {
      argumentType: ArgumentTypes.NUMBER,
      optionalArg: true,
      minValue: 1,
      maxValue: 10
    }]
  },
  'DEC2HEX': {
    method: 'dec2hex',
    parameters: [{
      argumentType: ArgumentTypes.NUMBER
    }, {
      argumentType: ArgumentTypes.NUMBER,
      optionalArg: true,
      minValue: 1,
      maxValue: 10
    }]
  },
  'BIN2DEC': {
    method: 'bin2dec',
    parameters: [{
      argumentType: ArgumentTypes.STRING
    }]
  },
  'BIN2OCT': {
    method: 'bin2oct',
    parameters: [{
      argumentType: ArgumentTypes.STRING
    }, {
      argumentType: ArgumentTypes.NUMBER,
      optionalArg: true,
      minValue: 0,
      maxValue: MAX_LENGTH
    }]
  },
  'BIN2HEX': {
    method: 'bin2hex',
    parameters: [{
      argumentType: ArgumentTypes.STRING
    }, {
      argumentType: ArgumentTypes.NUMBER,
      optionalArg: true,
      minValue: 0,
      maxValue: MAX_LENGTH
    }]
  },
  'OCT2DEC': {
    method: 'oct2dec',
    parameters: [{
      argumentType: ArgumentTypes.STRING
    }]
  },
  'OCT2BIN': {
    method: 'oct2bin',
    parameters: [{
      argumentType: ArgumentTypes.STRING
    }, {
      argumentType: ArgumentTypes.NUMBER,
      optionalArg: true,
      minValue: 0,
      maxValue: MAX_LENGTH
    }]
  },
  'OCT2HEX': {
    method: 'oct2hex',
    parameters: [{
      argumentType: ArgumentTypes.STRING
    }, {
      argumentType: ArgumentTypes.NUMBER,
      optionalArg: true,
      minValue: 0,
      maxValue: MAX_LENGTH
    }]
  },
  'HEX2DEC': {
    method: 'hex2dec',
    parameters: [{
      argumentType: ArgumentTypes.STRING
    }]
  },
  'HEX2BIN': {
    method: 'hex2bin',
    parameters: [{
      argumentType: ArgumentTypes.STRING
    }, {
      argumentType: ArgumentTypes.NUMBER,
      optionalArg: true,
      minValue: 0,
      maxValue: MAX_LENGTH
    }]
  },
  'HEX2OCT': {
    method: 'hex2oct',
    parameters: [{
      argumentType: ArgumentTypes.STRING
    }, {
      argumentType: ArgumentTypes.NUMBER,
      optionalArg: true,
      minValue: 0,
      maxValue: MAX_LENGTH
    }]
  },
  'DECIMAL': {
    method: 'decimal',
    parameters: [{
      argumentType: ArgumentTypes.STRING
    }, {
      argumentType: ArgumentTypes.NUMBER,
      minValue: MIN_BASE,
      maxValue: MAX_BASE
    }]
  },
  'BASE': {
    method: 'base',
    parameters: [{
      argumentType: ArgumentTypes.NUMBER,
      minValue: 0
    }, {
      argumentType: ArgumentTypes.NUMBER,
      minValue: MIN_BASE,
      maxValue: MAX_BASE
    }, {
      argumentType: ArgumentTypes.NUMBER,
      optionalArg: true,
      minValue: 0,
      maxValue: DECIMAL_NUMBER_OF_BITS
    }]
  }
};

function coerceStringToBase(value, base, maxLength) {
  var baseAlphabet = ALPHABET.substr(0, base);
  var regex = new RegExp("^[".concat(baseAlphabet, "]+$"));

  if (value.length > maxLength || !regex.test(value)) {
    return undefined;
  }

  return value;
}

function decimalToBaseWithExactPadding(value, base, places) {
  if (value > maxValFromBase(base) || value < minValFromBase(base)) {
    return new CellError(ErrorType.NUM);
  }

  var result = decimalToRadixComplement(value, base);

  if (places === undefined || value < 0) {
    return result;
  } else if (result.length > places) {
    return new CellError(ErrorType.NUM);
  } else {
    return padLeft(result, places);
  }
}

function minValFromBase(base) {
  return -Math.pow(base, MAX_LENGTH) / 2;
}

function maxValFromBase(base) {
  return -minValFromBase(base) - 1;
}

function decimalToBaseWithMinimumPadding(value, base, places) {
  var result = decimalToRadixComplement(value, base);

  if (places !== undefined && places > result.length) {
    return padLeft(result, places);
  } else {
    return result;
  }
}

function decimalToRadixComplement(value, base) {
  var offset = value < 0 ? Math.pow(base, MAX_LENGTH) : 0;
  return (value + offset).toString(base).toUpperCase();
}

function twoComplementToDecimal(value, base) {
  var parsed = parseInt(value, base);
  var offset = Math.pow(base, MAX_LENGTH);
  return parsed >= offset / 2 ? parsed - offset : parsed;
}