import "core-js/modules/es.symbol";
import "core-js/modules/es.symbol.description";
import "core-js/modules/es.symbol.iterator";
import "core-js/modules/es.array.iterator";
import "core-js/modules/es.math.trunc";
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
export var FinancialPlugin = /*#__PURE__*/function (_FunctionPlugin) {
  _inherits(FinancialPlugin, _FunctionPlugin);

  var _super = _createSuper(FinancialPlugin);

  function FinancialPlugin() {
    _classCallCheck(this, FinancialPlugin);

    return _super.apply(this, arguments);
  }

  _createClass(FinancialPlugin, [{
    key: "pmt",
    value: function pmt(ast, formulaAddress) {
      return this.runFunction(ast.args, formulaAddress, this.metadata('PMT'), pmtCore);
    }
  }, {
    key: "ipmt",
    value: function ipmt(ast, formulaAddress) {
      return this.runFunction(ast.args, formulaAddress, this.metadata('IPMT'), ipmtCore);
    }
  }, {
    key: "ppmt",
    value: function ppmt(ast, formulaAddress) {
      return this.runFunction(ast.args, formulaAddress, this.metadata('PPMT'), ppmtCore);
    }
  }, {
    key: "fv",
    value: function fv(ast, formulaAddress) {
      return this.runFunction(ast.args, formulaAddress, this.metadata('FV'), fvCore);
    }
  }, {
    key: "cumipmt",
    value: function cumipmt(ast, formulaAddress) {
      return this.runFunction(ast.args, formulaAddress, this.metadata('CUMIPMT'), function (rate, periods, value, start, end, type) {
        if (start > end) {
          return new CellError(ErrorType.NUM);
        }

        var acc = 0;

        for (var i = start; i <= end; i++) {
          acc += ipmtCore(rate, i, periods, value, 0, type);
        }

        return acc;
      });
    }
  }, {
    key: "cumprinc",
    value: function cumprinc(ast, formulaAddress) {
      return this.runFunction(ast.args, formulaAddress, this.metadata('CUMPRINC'), function (rate, periods, value, start, end, type) {
        if (start > end) {
          return new CellError(ErrorType.NUM);
        }

        var acc = 0;

        for (var i = start; i <= end; i++) {
          acc += ppmtCore(rate, i, periods, value, 0, type);
        }

        return acc;
      });
    }
  }, {
    key: "db",
    value: function db(ast, formulaAddress) {
      return this.runFunction(ast.args, formulaAddress, this.metadata('DB'), function (cost, salvage, life, period, month) {
        if (month === 12 && period > life || period > life + 1) {
          return new CellError(ErrorType.NUM);
        }

        if (salvage >= cost) {
          return 0;
        }

        var rate = Math.round((1 - Math.pow(salvage / cost, 1 / life)) * 1000) / 1000;
        var initial = cost * rate * month / 12;

        if (period === 1) {
          return initial;
        }

        var total = initial;

        for (var i = 0; i < period - 2; i++) {
          total += (cost - total) * rate;
        }

        if (period === life + 1) {
          return (cost - total) * rate * (12 - month) / 12;
        }

        return (cost - total) * rate;
      });
    }
  }, {
    key: "ddb",
    value: function ddb(ast, formulaAddress) {
      return this.runFunction(ast.args, formulaAddress, this.metadata('DDB'), function (cost, salvage, life, period, factor) {
        if (period > life) {
          return new CellError(ErrorType.NUM);
        }

        var rate = factor / life;
        var oldValue;

        if (rate >= 1) {
          rate = 1;

          if (period === 1) {
            oldValue = cost;
          } else {
            oldValue = 0;
          }
        } else {
          oldValue = cost * Math.pow(1 - rate, period - 1);
        }

        var newValue = cost * Math.pow(1 - rate, period);
        return Math.max(oldValue - Math.max(salvage, newValue), 0);
      });
    }
  }, {
    key: "dollarde",
    value: function dollarde(ast, formulaAddress) {
      return this.runFunction(ast.args, formulaAddress, this.metadata('DOLLARDE'), function (dollar, fraction) {
        if (fraction < 1) {
          return new CellError(ErrorType.DIV_BY_ZERO);
        }

        fraction = Math.trunc(fraction);

        while (fraction > 10) {
          fraction /= 10;
        }

        return Math.trunc(dollar) + (dollar - Math.trunc(dollar)) * 10 / fraction;
      });
    }
  }, {
    key: "dollarfr",
    value: function dollarfr(ast, formulaAddress) {
      return this.runFunction(ast.args, formulaAddress, this.metadata('DOLLARFR'), function (dollar, fraction) {
        if (fraction < 1) {
          return new CellError(ErrorType.DIV_BY_ZERO);
        }

        fraction = Math.trunc(fraction);

        while (fraction > 10) {
          fraction /= 10;
        }

        return Math.trunc(dollar) + (dollar - Math.trunc(dollar)) * fraction / 10;
      });
    }
  }, {
    key: "effect",
    value: function effect(ast, formulaAddress) {
      return this.runFunction(ast.args, formulaAddress, this.metadata('EFFECT'), function (rate, periods) {
        periods = Math.trunc(periods);
        return Math.pow(1 + rate / periods, periods) - 1;
      });
    }
  }, {
    key: "ispmt",
    value: function ispmt(ast, formulaAddress) {
      return this.runFunction(ast.args, formulaAddress, this.metadata('ISPMT'), function (rate, period, periods, value) {
        if (periods === 0) {
          return new CellError(ErrorType.DIV_BY_ZERO);
        }

        return value * rate * (period / periods - 1);
      });
    }
  }, {
    key: "nominal",
    value: function nominal(ast, formulaAddress) {
      return this.runFunction(ast.args, formulaAddress, this.metadata('NOMINAL'), function (rate, periods) {
        periods = Math.trunc(periods);
        return (Math.pow(rate + 1, 1 / periods) - 1) * periods;
      });
    }
  }, {
    key: "nper",
    value: function nper(ast, formulaAddress) {
      return this.runFunction(ast.args, formulaAddress, this.metadata('NPER'), function (rate, payment, present, future, type) {
        if (rate === 0) {
          if (payment === 0) {
            return new CellError(ErrorType.DIV_BY_ZERO);
          }

          return (-present - future) / payment;
        }

        if (type) {
          payment *= 1 + rate;
        }

        return Math.log((payment - future * rate) / (present * rate + payment)) / Math.log(1 + rate);
      });
    }
  }, {
    key: "rate",
    value: function rate(ast, formulaAddress) {
      return this.runFunction(ast.args, formulaAddress, this.metadata('RATE'), function (periods, payment, present, future, type, guess) {
        if (guess <= -1) {
          return new CellError(ErrorType.VALUE);
        }

        var epsMax = 1e-10;
        var iterMax = 20;
        var rate = guess;
        type = type ? 1 : 0;

        for (var i = 0; i < iterMax; i++) {
          if (rate <= -1) {
            return new CellError(ErrorType.NUM);
          }

          var y = void 0;

          if (Math.abs(rate) < epsMax) {
            y = present * (1 + periods * rate) + payment * (1 + rate * type) * periods + future;
          } else {
            var f = Math.pow(1 + rate, periods);
            y = present * f + payment * (1 / rate + type) * (f - 1) + future;
          }

          if (Math.abs(y) < epsMax) {
            return rate;
          }

          var dy = void 0;

          if (Math.abs(rate) < epsMax) {
            dy = present * periods + payment * type * periods;
          } else {
            var _f = Math.pow(1 + rate, periods);

            var df = periods * Math.pow(1 + rate, periods - 1);
            dy = present * df + payment * (1 / rate + type) * df + payment * (-1 / (rate * rate)) * (_f - 1);
          }

          rate -= y / dy;
        }

        return new CellError(ErrorType.NUM);
      });
    }
  }, {
    key: "pv",
    value: function pv(ast, formulaAddress) {
      return this.runFunction(ast.args, formulaAddress, this.metadata('PV'), function (rate, periods, payment, future, type) {
        type = type ? 1 : 0;

        if (rate === -1) {
          if (periods === 0) {
            return new CellError(ErrorType.NUM);
          } else {
            return new CellError(ErrorType.DIV_BY_ZERO);
          }
        }

        if (rate === 0) {
          return -payment * periods - future;
        } else {
          return ((1 - Math.pow(1 + rate, periods)) * payment * (1 + rate * type) / rate - future) / Math.pow(1 + rate, periods);
        }
      });
    }
  }, {
    key: "rri",
    value: function rri(ast, formulaAddress) {
      return this.runFunction(ast.args, formulaAddress, this.metadata('RRI'), function (periods, present, future) {
        if (present === 0 || future < 0 && present > 0 || future > 0 && present < 0) {
          return new CellError(ErrorType.NUM);
        }

        return Math.pow(future / present, 1 / periods) - 1;
      });
    }
  }, {
    key: "sln",
    value: function sln(ast, formulaAddress) {
      return this.runFunction(ast.args, formulaAddress, this.metadata('SLN'), function (cost, salvage, life) {
        if (life === 0) {
          return new CellError(ErrorType.DIV_BY_ZERO);
        }

        return (cost - salvage) / life;
      });
    }
  }, {
    key: "syd",
    value: function syd(ast, formulaAddress) {
      return this.runFunction(ast.args, formulaAddress, this.metadata('SYD'), function (cost, salvage, life, period) {
        if (period > life) {
          return new CellError(ErrorType.NUM);
        }

        return (cost - salvage) * (life - period + 1) * 2 / (life * (life + 1));
      });
    }
  }, {
    key: "tbilleq",
    value: function tbilleq(ast, formulaAddress) {
      var _this = this;

      return this.runFunction(ast.args, formulaAddress, this.metadata('TBILLEQ'), function (settlement, maturity, discount) {
        settlement = Math.round(settlement);
        maturity = Math.round(maturity);

        if (settlement >= maturity) {
          return new CellError(ErrorType.NUM);
        }

        var startDate = _this.interpreter.dateHelper.numberToSimpleDate(settlement);

        var endDate = _this.interpreter.dateHelper.numberToSimpleDate(maturity);

        if (endDate.year > startDate.year + 1 || endDate.year === startDate.year + 1 && (endDate.month > startDate.month || endDate.month === startDate.month && endDate.day > startDate.day)) {
          return new CellError(ErrorType.NUM);
        }

        var denom = 360 - discount * (maturity - settlement);

        if (denom === 0) {
          return 0;
        }

        if (denom < 0) {
          return new CellError(ErrorType.NUM);
        }

        return 365 * discount / denom;
      });
    }
  }, {
    key: "tbillprice",
    value: function tbillprice(ast, formulaAddress) {
      var _this2 = this;

      return this.runFunction(ast.args, formulaAddress, this.metadata('TBILLPRICE'), function (settlement, maturity, discount) {
        settlement = Math.round(settlement);
        maturity = Math.round(maturity);

        if (settlement >= maturity) {
          return new CellError(ErrorType.NUM);
        }

        var startDate = _this2.interpreter.dateHelper.numberToSimpleDate(settlement);

        var endDate = _this2.interpreter.dateHelper.numberToSimpleDate(maturity);

        if (endDate.year > startDate.year + 1 || endDate.year === startDate.year + 1 && (endDate.month > startDate.month || endDate.month === startDate.month && endDate.day > startDate.day)) {
          return new CellError(ErrorType.NUM);
        }

        var denom = 360 - discount * (maturity - settlement);

        if (denom === 0) {
          return 0;
        }

        if (denom < 0) {
          return new CellError(ErrorType.NUM);
        }

        return 100 * (1 - discount * (maturity - settlement) / 360);
      });
    }
  }, {
    key: "tbillyield",
    value: function tbillyield(ast, formulaAddress) {
      var _this3 = this;

      return this.runFunction(ast.args, formulaAddress, this.metadata('TBILLYIELD'), function (settlement, maturity, price) {
        settlement = Math.round(settlement);
        maturity = Math.round(maturity);

        if (settlement >= maturity) {
          return new CellError(ErrorType.NUM);
        }

        var startDate = _this3.interpreter.dateHelper.numberToSimpleDate(settlement);

        var endDate = _this3.interpreter.dateHelper.numberToSimpleDate(maturity);

        if (endDate.year > startDate.year + 1 || endDate.year === startDate.year + 1 && (endDate.month > startDate.month || endDate.month === startDate.month && endDate.day > startDate.day)) {
          return new CellError(ErrorType.NUM);
        }

        return (100 - price) * 360 / (price * (maturity - settlement));
      });
    }
  }]);

  return FinancialPlugin;
}(FunctionPlugin);
FinancialPlugin.implementedFunctions = {
  'PMT': {
    method: 'pmt',
    parameters: [{
      argumentType: ArgumentTypes.NUMBER
    }, {
      argumentType: ArgumentTypes.NUMBER
    }, {
      argumentType: ArgumentTypes.NUMBER
    }, {
      argumentType: ArgumentTypes.NUMBER,
      defaultValue: 0
    }, {
      argumentType: ArgumentTypes.NUMBER,
      defaultValue: 0
    }]
  },
  'IPMT': {
    method: 'ipmt',
    parameters: [{
      argumentType: ArgumentTypes.NUMBER
    }, {
      argumentType: ArgumentTypes.NUMBER
    }, {
      argumentType: ArgumentTypes.NUMBER
    }, {
      argumentType: ArgumentTypes.NUMBER
    }, {
      argumentType: ArgumentTypes.NUMBER,
      defaultValue: 0
    }, {
      argumentType: ArgumentTypes.NUMBER,
      defaultValue: 0
    }]
  },
  'PPMT': {
    method: 'ppmt',
    parameters: [{
      argumentType: ArgumentTypes.NUMBER
    }, {
      argumentType: ArgumentTypes.NUMBER
    }, {
      argumentType: ArgumentTypes.NUMBER
    }, {
      argumentType: ArgumentTypes.NUMBER
    }, {
      argumentType: ArgumentTypes.NUMBER,
      defaultValue: 0
    }, {
      argumentType: ArgumentTypes.NUMBER,
      defaultValue: 0
    }]
  },
  'FV': {
    method: 'fv',
    parameters: [{
      argumentType: ArgumentTypes.NUMBER
    }, {
      argumentType: ArgumentTypes.NUMBER
    }, {
      argumentType: ArgumentTypes.NUMBER
    }, {
      argumentType: ArgumentTypes.NUMBER,
      defaultValue: 0
    }, {
      argumentType: ArgumentTypes.NUMBER,
      defaultValue: 0
    }]
  },
  'CUMIPMT': {
    method: 'cumipmt',
    parameters: [{
      argumentType: ArgumentTypes.NUMBER,
      greaterThan: 0
    }, {
      argumentType: ArgumentTypes.NUMBER,
      greaterThan: 0
    }, {
      argumentType: ArgumentTypes.NUMBER,
      greaterThan: 0
    }, {
      argumentType: ArgumentTypes.INTEGER,
      minValue: 1
    }, {
      argumentType: ArgumentTypes.INTEGER,
      minValue: 1
    }, {
      argumentType: ArgumentTypes.INTEGER,
      minValue: 0,
      maxValue: 1
    }]
  },
  'CUMPRINC': {
    method: 'cumprinc',
    parameters: [{
      argumentType: ArgumentTypes.NUMBER,
      greaterThan: 0
    }, {
      argumentType: ArgumentTypes.NUMBER,
      greaterThan: 0
    }, {
      argumentType: ArgumentTypes.NUMBER,
      greaterThan: 0
    }, {
      argumentType: ArgumentTypes.INTEGER,
      minValue: 1
    }, {
      argumentType: ArgumentTypes.INTEGER,
      minValue: 1
    }, {
      argumentType: ArgumentTypes.INTEGER,
      minValue: 0,
      maxValue: 1
    }]
  },
  'DB': {
    method: 'db',
    parameters: [{
      argumentType: ArgumentTypes.NUMBER,
      minValue: 0
    }, {
      argumentType: ArgumentTypes.NUMBER,
      minValue: 0
    }, {
      argumentType: ArgumentTypes.INTEGER,
      minValue: 0
    }, {
      argumentType: ArgumentTypes.INTEGER,
      minValue: 0
    }, {
      argumentType: ArgumentTypes.INTEGER,
      minValue: 1,
      maxValue: 12,
      defaultValue: 12
    }]
  },
  'DDB': {
    method: 'ddb',
    parameters: [{
      argumentType: ArgumentTypes.NUMBER,
      minValue: 0
    }, {
      argumentType: ArgumentTypes.NUMBER,
      minValue: 0
    }, {
      argumentType: ArgumentTypes.INTEGER,
      minValue: 0
    }, {
      argumentType: ArgumentTypes.NUMBER,
      minValue: 0
    }, {
      argumentType: ArgumentTypes.NUMBER,
      greaterThan: 0,
      defaultValue: 2
    }]
  },
  'DOLLARDE': {
    method: 'dollarde',
    parameters: [{
      argumentType: ArgumentTypes.NUMBER
    }, {
      argumentType: ArgumentTypes.NUMBER,
      minValue: 0
    }]
  },
  'DOLLARFR': {
    method: 'dollarfr',
    parameters: [{
      argumentType: ArgumentTypes.NUMBER
    }, {
      argumentType: ArgumentTypes.NUMBER,
      minValue: 0
    }]
  },
  'EFFECT': {
    method: 'effect',
    parameters: [{
      argumentType: ArgumentTypes.NUMBER,
      minValue: 0
    }, {
      argumentType: ArgumentTypes.NUMBER,
      minValue: 1
    }]
  },
  'ISPMT': {
    method: 'ispmt',
    parameters: [{
      argumentType: ArgumentTypes.NUMBER
    }, {
      argumentType: ArgumentTypes.NUMBER
    }, {
      argumentType: ArgumentTypes.NUMBER
    }, {
      argumentType: ArgumentTypes.NUMBER
    }]
  },
  'NOMINAL': {
    method: 'nominal',
    parameters: [{
      argumentType: ArgumentTypes.NUMBER,
      minValue: 0
    }, {
      argumentType: ArgumentTypes.NUMBER,
      minValue: 1
    }]
  },
  'NPER': {
    method: 'nper',
    parameters: [{
      argumentType: ArgumentTypes.NUMBER
    }, {
      argumentType: ArgumentTypes.NUMBER
    }, {
      argumentType: ArgumentTypes.NUMBER
    }, {
      argumentType: ArgumentTypes.NUMBER,
      defaultValue: 0
    }, {
      argumentType: ArgumentTypes.NUMBER,
      defaultValue: 0
    }]
  },
  'PV': {
    method: 'pv',
    parameters: [{
      argumentType: ArgumentTypes.NUMBER
    }, {
      argumentType: ArgumentTypes.NUMBER
    }, {
      argumentType: ArgumentTypes.NUMBER
    }, {
      argumentType: ArgumentTypes.NUMBER,
      defaultValue: 0
    }, {
      argumentType: ArgumentTypes.NUMBER,
      defaultValue: 0
    }]
  },
  'RATE': {
    method: 'rate',
    parameters: [{
      argumentType: ArgumentTypes.NUMBER,
      greaterThan: 0
    }, {
      argumentType: ArgumentTypes.NUMBER
    }, {
      argumentType: ArgumentTypes.NUMBER
    }, {
      argumentType: ArgumentTypes.NUMBER,
      defaultValue: 0
    }, {
      argumentType: ArgumentTypes.NUMBER,
      defaultValue: 0
    }, {
      argumentType: ArgumentTypes.NUMBER,
      defaultValue: 0.1
    }]
  },
  'RRI': {
    method: 'rri',
    parameters: [{
      argumentType: ArgumentTypes.NUMBER,
      greaterThan: 0
    }, {
      argumentType: ArgumentTypes.NUMBER
    }, {
      argumentType: ArgumentTypes.NUMBER
    }]
  },
  'SLN': {
    method: 'sln',
    parameters: [{
      argumentType: ArgumentTypes.NUMBER
    }, {
      argumentType: ArgumentTypes.NUMBER
    }, {
      argumentType: ArgumentTypes.NUMBER
    }]
  },
  'SYD': {
    method: 'syd',
    parameters: [{
      argumentType: ArgumentTypes.NUMBER
    }, {
      argumentType: ArgumentTypes.NUMBER
    }, {
      argumentType: ArgumentTypes.NUMBER,
      greaterThan: 0
    }, {
      argumentType: ArgumentTypes.NUMBER,
      greaterThan: 0
    }]
  },
  'TBILLEQ': {
    method: 'tbilleq',
    parameters: [{
      argumentType: ArgumentTypes.NUMBER,
      minValue: 0
    }, {
      argumentType: ArgumentTypes.NUMBER,
      minValue: 0
    }, {
      argumentType: ArgumentTypes.NUMBER,
      greaterThan: 0
    }]
  },
  'TBILLPRICE': {
    method: 'tbillprice',
    parameters: [{
      argumentType: ArgumentTypes.NUMBER,
      minValue: 0
    }, {
      argumentType: ArgumentTypes.NUMBER,
      minValue: 0
    }, {
      argumentType: ArgumentTypes.NUMBER,
      greaterThan: 0
    }]
  },
  'TBILLYIELD': {
    method: 'tbillyield',
    parameters: [{
      argumentType: ArgumentTypes.NUMBER,
      minValue: 0
    }, {
      argumentType: ArgumentTypes.NUMBER,
      minValue: 0
    }, {
      argumentType: ArgumentTypes.NUMBER,
      greaterThan: 0
    }]
  }
};

function pmtCore(rate, periods, present, future, type) {
  if (rate === 0) {
    return (-present - future) / periods;
  } else {
    var term = Math.pow(1 + rate, periods);
    return (future * rate + present * rate * term) * (type ? 1 / (1 + rate) : 1) / (1 - term);
  }
}

function ipmtCore(rate, period, periods, present, future, type) {
  var payment = pmtCore(rate, periods, present, future, type);

  if (period === 1) {
    return rate * (type ? 0 : -present);
  } else {
    return rate * (type ? fvCore(rate, period - 2, payment, present, type) - payment : fvCore(rate, period - 1, payment, present, type));
  }
}

function fvCore(rate, periods, payment, value, type) {
  if (rate === 0) {
    return -value - payment * periods;
  } else {
    var term = Math.pow(1 + rate, periods);
    return payment * (type ? 1 + rate : 1) * (1 - term) / rate - value * term;
  }
}

function ppmtCore(rate, period, periods, present, future, type) {
  return pmtCore(rate, periods, present, future, type) - ipmtCore(rate, period, periods, present, future, type);
}