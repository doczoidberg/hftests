import "core-js/modules/es.symbol";
import "core-js/modules/es.symbol.description";
import "core-js/modules/es.symbol.iterator";
import "core-js/modules/es.array.iterator";
import "core-js/modules/es.array.some";
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
import { AbsoluteCellRange } from '../../AbsoluteCellRange';
import { CellError, EmptyValue, ErrorType } from '../../Cell';
import { FormulaCellVertex, MatrixVertex } from '../../DependencyGraph';
import { AstNodeType } from '../../parser';
import { ArgumentTypes, FunctionPlugin } from './FunctionPlugin';
/**
 * Interpreter plugin containing information functions
 */

export var InformationPlugin = /*#__PURE__*/function (_FunctionPlugin) {
  _inherits(InformationPlugin, _FunctionPlugin);

  var _super = _createSuper(InformationPlugin);

  function InformationPlugin() {
    _classCallCheck(this, InformationPlugin);

    return _super.apply(this, arguments);
  }

  _createClass(InformationPlugin, [{
    key: "isbinary",

    /**
     * Corresponds to ISBINARY(value)
     *
     * Returns true if provided value is a valid binary number
     *
     * @param ast
     * @param formulaAddress
     */
    value: function isbinary(ast, formulaAddress) {
      return this.runFunction(ast.args, formulaAddress, this.metadata('ISBINARY'), function (arg) {
        return /^[01]{1,10}$/.test(arg);
      });
    }
    /**
     * Corresponds to ISERR(value)
     *
     * Returns true if provided value is an error except #N/A!
     *
     * @param ast
     * @param formulaAddress
     */

  }, {
    key: "iserr",
    value: function iserr(ast, formulaAddress) {
      return this.runFunction(ast.args, formulaAddress, this.metadata('ISERR'), function (arg) {
        return arg instanceof CellError && arg.type !== ErrorType.NA;
      });
    }
    /**
     * Corresponds to ISERROR(value)
     *
     * Checks whether provided value is an error
     *
     * @param ast
     * @param formulaAddress
     */

  }, {
    key: "iserror",
    value: function iserror(ast, formulaAddress) {
      return this.runFunction(ast.args, formulaAddress, this.metadata('ISERROR'), function (arg) {
        return arg instanceof CellError;
      });
    }
    /**
     * Corresponds to ISFORMULA(value)
     *
     * Checks whether referenced cell is a formula
     *
     * @param ast
     * @param formulaAddress
     */

  }, {
    key: "isformula",
    value: function isformula(ast, formulaAddress) {
      var _this = this;

      return this.runFunctionWithReferenceArgument(ast.args, formulaAddress, this.metadata('ISFORMULA'), function () {
        return new CellError(ErrorType.NA);
      }, function (reference) {
        var vertex = _this.dependencyGraph.addressMapping.getCell(reference);

        return vertex instanceof FormulaCellVertex || vertex instanceof MatrixVertex && vertex.isFormula();
      }, function () {
        return new CellError(ErrorType.NA);
      });
    }
    /**
     * Corresponds to ISBLANK(value)
     *
     * Checks whether provided cell reference is empty
     *
     * @param ast
     * @param formulaAddress
     */

  }, {
    key: "isblank",
    value: function isblank(ast, formulaAddress) {
      return this.runFunction(ast.args, formulaAddress, this.metadata('ISBLANK'), function (arg) {
        return arg === EmptyValue;
      });
    }
    /**
     * Corresponds to ISNA(value)
     *
     * Returns true if provided value is #N/A! error
     *
     * @param ast
     * @param formulaAddress
     */

  }, {
    key: "isna",
    value: function isna(ast, formulaAddress) {
      return this.runFunction(ast.args, formulaAddress, this.metadata('ISNA'), function (arg) {
        return arg instanceof CellError && arg.type == ErrorType.NA;
      });
    }
    /**
     * Corresponds to ISNUMBER(value)
     *
     * Checks whether provided cell reference is a number
     *
     * @param ast
     * @param formulaAddress
     */

  }, {
    key: "isnumber",
    value: function isnumber(ast, formulaAddress) {
      return this.runFunction(ast.args, formulaAddress, this.metadata('ISNUMBER'), function (arg) {
        return typeof arg === 'number';
      });
    }
    /**
     * Corresponds to ISLOGICAL(value)
     *
     * Checks whether provided cell reference is of logical type
     *
     * @param ast
     * @param formulaAddress
     */

  }, {
    key: "islogical",
    value: function islogical(ast, formulaAddress) {
      return this.runFunction(ast.args, formulaAddress, this.metadata('ISLOGICAL'), function (arg) {
        return typeof arg === 'boolean';
      });
    }
    /**
     * Corresponds to ISREF(value)
     *
     * Returns true if provided value is #REF! error
     *
     * @param ast
     * @param formulaAddress
     */

  }, {
    key: "isref",
    value: function isref(ast, formulaAddress) {
      return this.runFunction(ast.args, formulaAddress, this.metadata('ISREF'), function (arg) {
        return arg instanceof CellError && (arg.type == ErrorType.REF || arg.type == ErrorType.CYCLE);
      });
    }
    /**
     * Corresponds to ISTEXT(value)
     *
     * Checks whether provided cell reference is of logical type
     *
     * @param ast
     * @param formulaAddress
     */

  }, {
    key: "istext",
    value: function istext(ast, formulaAddress) {
      return this.runFunction(ast.args, formulaAddress, this.metadata('ISTEXT'), function (arg) {
        return typeof arg === 'string';
      });
    }
    /**
     * Corresponds to ISNONTEXT(value)
     *
     * Checks whether provided cell reference is of logical type
     *
     * @param ast
     * @param formulaAddress
     */

  }, {
    key: "isnontext",
    value: function isnontext(ast, formulaAddress) {
      return this.runFunction(ast.args, formulaAddress, this.metadata('ISNONTEXT'), function (arg) {
        return typeof arg !== 'string';
      });
    }
    /**
     * Corresponds to COLUMNS(range)
     *
     * Returns number of columns in provided range of cells
     *
     * @param ast
     * @param formulaAddress
     */
    // eslint-disable-next-line @typescript-eslint/no-unused-vars

  }, {
    key: "columns",
    value: function columns(ast, formulaAddress) {
      if (ast.args.length !== 1) {
        return new CellError(ErrorType.NA);
      }

      if (ast.args.some(function (ast) {
        return ast.type === AstNodeType.EMPTY;
      })) {
        return new CellError(ErrorType.NUM);
      }

      var rangeAst = ast.args[0];

      if (rangeAst.type === AstNodeType.CELL_RANGE) {
        return rangeAst.end.col - rangeAst.start.col + 1;
      } else {
        return new CellError(ErrorType.VALUE);
      }
    }
    /**
     * Corresponds to ROWS(range)
     *
     * Returns number of rows in provided range of cells
     *
     * @param ast
     * @param formulaAddress
     */
    // eslint-disable-next-line @typescript-eslint/no-unused-vars

  }, {
    key: "rows",
    value: function rows(ast, formulaAddress) {
      if (ast.args.length !== 1) {
        return new CellError(ErrorType.NA);
      }

      if (ast.args.some(function (ast) {
        return ast.type === AstNodeType.EMPTY;
      })) {
        return new CellError(ErrorType.NUM);
      }

      var rangeAst = ast.args[0];

      if (rangeAst.type === AstNodeType.CELL_RANGE) {
        return rangeAst.end.row - rangeAst.start.row + 1;
      } else {
        return new CellError(ErrorType.VALUE);
      }
    }
  }, {
    key: "index",
    value: function index(ast, formulaAddress) {
      var rangeArg = ast.args[0];

      if (ast.args.length < 1 || ast.args.length > 3) {
        return new CellError(ErrorType.NA);
      }

      if (ast.args.some(function (ast) {
        return ast.type === AstNodeType.EMPTY;
      })) {
        return new CellError(ErrorType.NUM);
      }

      var width, height;
      var range;

      if (rangeArg.type === AstNodeType.CELL_RANGE) {
        range = AbsoluteCellRange.fromCellRange(rangeArg, formulaAddress);
        width = range.width();
        height = range.height();
      } else {
        width = 1;
        height = 1;
      }

      var rowArg = ast.args[1];
      var rowValue = this.evaluateAst(rowArg, formulaAddress);

      if (typeof rowValue !== 'number' || rowValue < 0 || rowValue > height) {
        return new CellError(ErrorType.NUM);
      }

      var columnArg = ast.args[2];
      var columnValue = this.evaluateAst(columnArg, formulaAddress);

      if (typeof columnValue !== 'number' || columnValue < 0 || columnValue > width) {
        return new CellError(ErrorType.NUM);
      }

      if (columnValue === 0 || rowValue === 0 || range === undefined) {
        throw Error('Not implemented yet');
      }

      var address = range.getAddress(columnValue - 1, rowValue - 1);
      return this.dependencyGraph.getCellValue(address);
    }
    /**
     * Corresponds to NA()
     *
     * Returns #N/A!
     *
     * @param _ast
     * @param _formulaAddress
     */

  }, {
    key: "na",
    value: function na(_ast, _formulaAddress) {
      return new CellError(ErrorType.NA);
    }
    /**
     * Corresponds to SHEET(value)
     *
     * Returns sheet number of a given value or a formula sheet number if no argument is provided
     *
     * @param ast
     * @param formulaAddress
     * */

  }, {
    key: "sheet",
    value: function sheet(ast, formulaAddress) {
      var _this2 = this;

      return this.runFunctionWithReferenceArgument(ast.args, formulaAddress, {
        parameters: [{
          argumentType: ArgumentTypes.STRING
        }]
      }, function () {
        return formulaAddress.sheet + 1;
      }, function (reference) {
        return reference.sheet + 1;
      }, function (value) {
        var sheetNumber = _this2.dependencyGraph.sheetMapping.get(value);

        if (sheetNumber !== undefined) {
          return sheetNumber + 1;
        } else {
          return new CellError(ErrorType.NA);
        }
      });
    }
    /**
     * Corresponds to SHEETS(value)
     *
     * Returns number of sheet of a given reference or number of all sheets in workbook when no argument is provided.
     * It returns always 1 for a valid reference as 3D references are not supported.
     *
     * @param ast
     * @param formulaAddress
     * */

  }, {
    key: "sheets",
    value: function sheets(ast, formulaAddress) {
      var _this3 = this;

      return this.runFunctionWithReferenceArgument(ast.args, formulaAddress, {
        parameters: [{
          argumentType: ArgumentTypes.STRING
        }]
      }, function () {
        return _this3.dependencyGraph.sheetMapping.numberOfSheets();
      }, // return number of sheets if no argument
      function () {
        return 1;
      }, // return 1 for valid reference
      function () {
        return new CellError(ErrorType.VALUE);
      } // error otherwise
      );
    }
  }]);

  return InformationPlugin;
}(FunctionPlugin);
InformationPlugin.implementedFunctions = {
  'COLUMNS': {
    method: 'columns',
    isDependentOnSheetStructureChange: true,
    doesNotNeedArgumentsToBeComputed: true
  },
  'ISBINARY': {
    method: 'isbinary',
    parameters: [{
      argumentType: ArgumentTypes.STRING
    }]
  },
  'ISERR': {
    method: 'iserr',
    parameters: [{
      argumentType: ArgumentTypes.SCALAR
    }]
  },
  'ISFORMULA': {
    method: 'isformula',
    parameters: [{
      argumentType: ArgumentTypes.NOERROR
    }],
    doesNotNeedArgumentsToBeComputed: true
  },
  'ISNA': {
    method: 'isna',
    parameters: [{
      argumentType: ArgumentTypes.SCALAR
    }]
  },
  'ISREF': {
    method: 'isref',
    parameters: [{
      argumentType: ArgumentTypes.SCALAR
    }]
  },
  'ISERROR': {
    method: 'iserror',
    parameters: [{
      argumentType: ArgumentTypes.SCALAR
    }]
  },
  'ISBLANK': {
    method: 'isblank',
    parameters: [{
      argumentType: ArgumentTypes.SCALAR
    }]
  },
  'ISNUMBER': {
    method: 'isnumber',
    parameters: [{
      argumentType: ArgumentTypes.SCALAR
    }]
  },
  'ISLOGICAL': {
    method: 'islogical',
    parameters: [{
      argumentType: ArgumentTypes.SCALAR
    }]
  },
  'ISTEXT': {
    method: 'istext',
    parameters: [{
      argumentType: ArgumentTypes.SCALAR
    }]
  },
  'ISNONTEXT': {
    method: 'isnontext',
    parameters: [{
      argumentType: ArgumentTypes.SCALAR
    }]
  },
  'INDEX': {
    method: 'index'
  },
  'NA': {
    method: 'na'
  },
  'ROWS': {
    method: 'rows',
    isDependentOnSheetStructureChange: true,
    doesNotNeedArgumentsToBeComputed: true
  },
  'SHEET': {
    method: 'sheet',
    parameters: [{
      argumentType: ArgumentTypes.NOERROR
    }],
    doesNotNeedArgumentsToBeComputed: true
  },
  'SHEETS': {
    method: 'sheets',
    parameters: [{
      argumentType: ArgumentTypes.NOERROR
    }],
    doesNotNeedArgumentsToBeComputed: true
  }
};