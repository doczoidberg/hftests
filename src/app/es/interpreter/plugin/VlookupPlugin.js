import "core-js/modules/es.symbol";
import "core-js/modules/es.symbol.description";
import "core-js/modules/es.symbol.iterator";
import "core-js/modules/es.array.find";
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
import { CellError, ErrorType, simpleCellAddress } from '../../Cell';
import { AstNodeType } from '../../parser';
import { StatType } from '../../statistics';
import { FunctionPlugin } from './FunctionPlugin';
export var VlookupPlugin = /*#__PURE__*/function (_FunctionPlugin) {
  _inherits(VlookupPlugin, _FunctionPlugin);

  var _super = _createSuper(VlookupPlugin);

  function VlookupPlugin() {
    _classCallCheck(this, VlookupPlugin);

    return _super.apply(this, arguments);
  }

  _createClass(VlookupPlugin, [{
    key: "vlookup",

    /**
     * Corresponds to VLOOKUP(key, range, index, [sorted])
     *
     * @param ast
     * @param formulaAddress
     */
    value: function vlookup(ast, formulaAddress) {
      if (ast.args.length < 3 || ast.args.length > 4) {
        return new CellError(ErrorType.NA);
      }

      if (ast.args.some(function (ast) {
        return ast.type === AstNodeType.EMPTY;
      })) {
        return new CellError(ErrorType.NUM);
      }

      var key = this.evaluateAst(ast.args[0], formulaAddress);

      if (typeof key !== 'string' && typeof key !== 'number' && typeof key !== 'boolean') {
        return new CellError(ErrorType.VALUE);
      }

      var rangeArg = ast.args[1];

      if (rangeArg.type !== AstNodeType.CELL_RANGE) {
        /* gsheet returns REF */
        return new CellError(ErrorType.VALUE);
      }

      var index = this.evaluateAst(ast.args[2], formulaAddress);

      if (typeof index !== 'number') {
        return new CellError(ErrorType.VALUE);
      }

      var sorted = true;

      if (ast.args.length === 4) {
        var computedSorted = this.evaluateAst(ast.args[3], formulaAddress);

        if (typeof computedSorted === 'boolean') {
          sorted = computedSorted;
        } else {
          return new CellError(ErrorType.VALUE);
        }
      }

      var range = AbsoluteCellRange.fromCellRange(rangeArg, formulaAddress);

      if (index > range.width()) {
        return new CellError(ErrorType.REF);
      }

      return this.doVlookup(key, range, index - 1, sorted);
    }
  }, {
    key: "match",
    value: function match(ast, formulaAddress) {
      if (ast.args.length < 2 || ast.args.length > 3) {
        return new CellError(ErrorType.NA);
      }

      var key = this.evaluateAst(ast.args[0], formulaAddress);

      if (typeof key !== 'string' && typeof key !== 'number' && typeof key !== 'boolean') {
        return new CellError(ErrorType.VALUE);
      }

      var rangeArg = ast.args[1];

      if (rangeArg.type !== AstNodeType.CELL_RANGE) {
        return new CellError(ErrorType.VALUE);
      }

      var sorted = 1;

      if (ast.args.length === 3) {
        sorted = this.evaluateAst(ast.args[2], formulaAddress);

        if (typeof sorted !== 'number') {
          return new CellError(ErrorType.VALUE);
        }
      }

      var searchedRange = AbsoluteCellRange.fromCellRange(rangeArg, formulaAddress);

      if (searchedRange.width() === 1) {
        var rowIndex = this.columnSearch.find(key, searchedRange, sorted !== 0);

        if (rowIndex === -1) {
          return new CellError(ErrorType.NA);
        }

        return rowIndex - searchedRange.start.row + 1;
      } else {
        var columnIndex = this.searchInRange(key, searchedRange, false);

        if (columnIndex === -1) {
          return new CellError(ErrorType.NA);
        }

        return columnIndex - searchedRange.start.row + 1;
      }
    }
  }, {
    key: "searchInRange",
    value: function searchInRange(key, range, sorted) {
      if (!sorted && typeof key === 'string' && this.interpreter.arithmeticHelper.requiresRegex(key)) {
        return this.columnSearch.advancedFind(this.interpreter.arithmeticHelper.eqMatcherFunction(key), range);
      } else {
        return this.columnSearch.find(key, range, sorted);
      }
    }
  }, {
    key: "doVlookup",
    value: function doVlookup(key, range, index, sorted) {
      this.dependencyGraph.stats.start(StatType.VLOOKUP);
      var searchedRange = AbsoluteCellRange.spanFrom(range.start, 1, range.height());
      var rowIndex = this.searchInRange(key, searchedRange, sorted);
      this.dependencyGraph.stats.end(StatType.VLOOKUP);

      if (rowIndex === -1) {
        return new CellError(ErrorType.NA);
      }

      var address = simpleCellAddress(range.sheet, range.start.col + index, rowIndex);
      return this.dependencyGraph.getCellValue(address);
    }
  }]);

  return VlookupPlugin;
}(FunctionPlugin);
VlookupPlugin.implementedFunctions = {
  'VLOOKUP': {
    method: 'vlookup'
  },
  'MATCH': {
    method: 'match'
  }
};