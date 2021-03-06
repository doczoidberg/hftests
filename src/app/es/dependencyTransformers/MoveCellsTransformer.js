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
import { Transformer } from './Transformer';
import { CellAddress } from '../parser';
import { simpleCellAddress } from '../Cell';
import { RowAddress } from '../parser/RowAddress';
export var MoveCellsTransformer = /*#__PURE__*/function (_Transformer) {
  _inherits(MoveCellsTransformer, _Transformer);

  var _super = _createSuper(MoveCellsTransformer);

  function MoveCellsTransformer(sourceRange, toRight, toBottom, toSheet) {
    var _this;

    _classCallCheck(this, MoveCellsTransformer);

    _this = _super.call(this);
    _this.sourceRange = sourceRange;
    _this.toRight = toRight;
    _this.toBottom = toBottom;
    _this.toSheet = toSheet;
    _this.dependentFormulaTransformer = new DependentFormulaTransformer(sourceRange, toRight, toBottom, toSheet);
    return _this;
  }

  _createClass(MoveCellsTransformer, [{
    key: "isIrreversible",
    value: function isIrreversible() {
      return true;
    }
  }, {
    key: "transformSingleAst",
    value: function transformSingleAst(ast, address) {
      if (this.sourceRange.addressInRange(address)) {
        var newAst = this.transformAst(ast, address);
        return [newAst, this.fixNodeAddress(address)];
      } else {
        return this.dependentFormulaTransformer.transformSingleAst(ast, address);
      }
    }
  }, {
    key: "fixNodeAddress",
    value: function fixNodeAddress(address) {
      return simpleCellAddress(this.toSheet, address.col + this.toRight, address.row + this.toBottom);
    }
  }, {
    key: "transformCellAddress",
    value: function transformCellAddress(dependencyAddress, formulaAddress) {
      return this.transformAddress(dependencyAddress, formulaAddress);
    }
  }, {
    key: "transformCellRange",
    value: function transformCellRange(start, end, formulaAddress) {
      return this.transformRange(start, end, formulaAddress);
    }
  }, {
    key: "transformColumnRange",
    value: function transformColumnRange(start, end, formulaAddress) {
      return this.transformRange(start, end, formulaAddress);
    }
  }, {
    key: "transformRowRange",
    value: function transformRowRange(start, end, formulaAddress) {
      return this.transformRange(start, end, formulaAddress);
    }
  }, {
    key: "transformAddress",
    value: function transformAddress(dependencyAddress, formulaAddress) {
      var sourceRange = this.sourceRange;

      if (dependencyAddress instanceof CellAddress) {
        var absoluteDependencyAddress = dependencyAddress.toSimpleCellAddress(formulaAddress);

        if (sourceRange.addressInRange(absoluteDependencyAddress)) {
          // If dependency is internal, move only absolute dimensions
          return dependencyAddress.shiftAbsoluteDimensions(this.toRight, this.toBottom);
        }
      }

      return dependencyAddress.shiftRelativeDimensions(-this.toRight, -this.toBottom);
    }
  }, {
    key: "transformRange",
    value: function transformRange(start, end, formulaAddress) {
      var sourceRange = this.sourceRange;

      if (start instanceof CellAddress && end instanceof CellAddress) {
        var absoluteStart = start.toSimpleCellAddress(formulaAddress);
        var absoluteEnd = end.toSimpleCellAddress(formulaAddress);

        if (sourceRange.addressInRange(absoluteStart) && sourceRange.addressInRange(absoluteEnd)) {
          return [start.shiftAbsoluteDimensions(this.toRight, this.toBottom), end.shiftAbsoluteDimensions(this.toRight, this.toBottom)];
        }
      }

      return [start.shiftRelativeDimensions(-this.toRight, -this.toBottom), end.shiftRelativeDimensions(-this.toRight, -this.toBottom)];
    }
  }, {
    key: "sheet",
    get: function get() {
      return this.sourceRange.sheet;
    }
  }]);

  return MoveCellsTransformer;
}(Transformer);

var DependentFormulaTransformer = /*#__PURE__*/function (_Transformer2) {
  _inherits(DependentFormulaTransformer, _Transformer2);

  var _super2 = _createSuper(DependentFormulaTransformer);

  function DependentFormulaTransformer(sourceRange, toRight, toBottom, toSheet) {
    var _this2;

    _classCallCheck(this, DependentFormulaTransformer);

    _this2 = _super2.call(this);
    _this2.sourceRange = sourceRange;
    _this2.toRight = toRight;
    _this2.toBottom = toBottom;
    _this2.toSheet = toSheet;
    return _this2;
  }

  _createClass(DependentFormulaTransformer, [{
    key: "isIrreversible",
    value: function isIrreversible() {
      return true;
    }
  }, {
    key: "fixNodeAddress",
    value: function fixNodeAddress(address) {
      return address;
    }
  }, {
    key: "transformCellAddress",
    value: function transformCellAddress(dependencyAddress, formulaAddress) {
      if (this.shouldMove(dependencyAddress, formulaAddress)) {
        return dependencyAddress.moved(this.toSheet, this.toRight, this.toBottom);
      }

      return false;
    }
  }, {
    key: "shouldMove",
    value: function shouldMove(dependencyAddress, formulaAddress) {
      if (dependencyAddress instanceof CellAddress) {
        return this.sourceRange.addressInRange(dependencyAddress.toSimpleCellAddress(formulaAddress));
      } else if (dependencyAddress instanceof RowAddress) {
        return this.sourceRange.rowInRange(dependencyAddress.toSimpleRowAddress(formulaAddress)) && !this.sourceRange.isFinite();
      } else {
        return this.sourceRange.columnInRange(dependencyAddress.toSimpleColumnAddress(formulaAddress)) && !this.sourceRange.isFinite();
      }
    }
  }, {
    key: "transformCellRange",
    value: function transformCellRange(start, end, formulaAddress) {
      return this.transformRange(start, end, formulaAddress);
    }
  }, {
    key: "transformColumnRange",
    value: function transformColumnRange(start, end, formulaAddress) {
      return this.transformRange(start, end, formulaAddress);
    }
  }, {
    key: "transformRowRange",
    value: function transformRowRange(start, end, formulaAddress) {
      return this.transformRange(start, end, formulaAddress);
    }
  }, {
    key: "transformRange",
    value: function transformRange(start, end, formulaAddress) {
      var newStart = this.transformCellAddress(start, formulaAddress);
      var newEnd = this.transformCellAddress(end, formulaAddress);

      if (newStart && newEnd) {
        return [newStart, newEnd];
      }

      return false;
    }
  }, {
    key: "sheet",
    get: function get() {
      return this.sourceRange.sheet;
    }
  }]);

  return DependentFormulaTransformer;
}(Transformer);