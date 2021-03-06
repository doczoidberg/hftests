import "core-js/modules/es.symbol";
import "core-js/modules/es.symbol.description";
import "core-js/modules/es.symbol.iterator";
import "core-js/modules/es.array.iterator";
import "core-js/modules/es.object.assign";
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
import { absoluteSheetReference, ErrorType } from '../Cell';
import { Transformer } from './Transformer';
export var RemoveColumnsTransformer = /*#__PURE__*/function (_Transformer) {
  _inherits(RemoveColumnsTransformer, _Transformer);

  var _super = _createSuper(RemoveColumnsTransformer);

  function RemoveColumnsTransformer(columnsSpan) {
    var _this;

    _classCallCheck(this, RemoveColumnsTransformer);

    _this = _super.call(this);
    _this.columnsSpan = columnsSpan;
    return _this;
  }

  _createClass(RemoveColumnsTransformer, [{
    key: "isIrreversible",
    value: function isIrreversible() {
      return true;
    }
  }, {
    key: "transformRowRangeAst",
    value: function transformRowRangeAst(ast, _formulaAddress) {
      return ast;
    }
  }, {
    key: "transformCellRange",
    value: function transformCellRange(start, end, formulaAddress) {
      return this.transformRange(start, end, formulaAddress);
    }
  }, {
    key: "transformRowRange",
    value: function transformRowRange(_start, _end, _formulaAddress) {
      throw Error('Not implemented');
    }
  }, {
    key: "transformColumnRange",
    value: function transformColumnRange(start, end, formulaAddress) {
      return this.transformRange(start, end, formulaAddress);
    }
  }, {
    key: "transformCellAddress",
    value: function transformCellAddress(dependencyAddress, formulaAddress) {
      var absoluteDependencySheet = absoluteSheetReference(dependencyAddress, formulaAddress); // Case 4

      if (this.columnsSpan.sheet !== formulaAddress.sheet && this.columnsSpan.sheet !== absoluteDependencySheet) {
        return false;
      } // Case 3 -- removed column in same sheet where dependency is but formula in different


      if (this.columnsSpan.sheet !== formulaAddress.sheet && this.columnsSpan.sheet === absoluteDependencySheet) {
        var absoluteDependencyAddress = dependencyAddress.toSimpleColumnAddress(formulaAddress);

        if (absoluteDependencyAddress.col < this.columnsSpan.columnStart) {
          // 3.ARa
          return false;
        } else if (absoluteDependencyAddress.col > this.columnsSpan.columnEnd) {
          // 3.ARb
          return dependencyAddress.shiftedByColumns(-this.columnsSpan.numberOfColumns);
        }
      } // Case 2 -- removed column in same sheet where formula but dependency in different sheet


      if (this.columnsSpan.sheet === formulaAddress.sheet && this.columnsSpan.sheet !== absoluteDependencySheet) {
        if (dependencyAddress.isColumnAbsolute()) {
          // 2.A
          return false;
        } else {
          if (formulaAddress.col < this.columnsSpan.columnStart) {
            // 2.Ra
            return false;
          } else if (formulaAddress.col > this.columnsSpan.columnEnd) {
            // 2.Rb
            return dependencyAddress.shiftedByColumns(this.columnsSpan.numberOfColumns);
          }
        }
      } // Case 1 -- same sheet


      if (this.columnsSpan.sheet === formulaAddress.sheet && this.columnsSpan.sheet === absoluteDependencySheet) {
        if (dependencyAddress.isColumnAbsolute()) {
          if (dependencyAddress.col < this.columnsSpan.columnStart) {
            // 1.Aa
            return false;
          } else if (dependencyAddress.col > this.columnsSpan.columnEnd) {
            // 1.Ab
            return dependencyAddress.shiftedByColumns(-this.columnsSpan.numberOfColumns);
          }
        } else {
          var _absoluteDependencyAddress = dependencyAddress.toSimpleColumnAddress(formulaAddress);

          if (_absoluteDependencyAddress.col < this.columnsSpan.columnStart) {
            if (formulaAddress.col < this.columnsSpan.columnStart) {
              // 1.Raa
              return false;
            } else if (formulaAddress.col > this.columnsSpan.columnEnd) {
              // 1.Rab
              return dependencyAddress.shiftedByColumns(this.columnsSpan.numberOfColumns);
            }
          } else if (_absoluteDependencyAddress.col > this.columnsSpan.columnEnd) {
            if (formulaAddress.col < this.columnsSpan.columnStart) {
              // 1.Rba
              return dependencyAddress.shiftedByColumns(-this.columnsSpan.numberOfColumns);
            } else if (formulaAddress.col > this.columnsSpan.columnEnd) {
              // 1.Rbb
              return false;
            }
          }
        }
      } // 1.Ac, 1.Rca, 1.Rcb, 3.Ac, 3.Rca, 3.Rcb


      return ErrorType.REF;
    }
  }, {
    key: "fixNodeAddress",
    value: function fixNodeAddress(address) {
      if (this.columnsSpan.sheet === address.sheet && this.columnsSpan.columnStart <= address.col) {
        return Object.assign(Object.assign({}, address), {
          col: address.col - this.columnsSpan.numberOfColumns
        });
      } else {
        return address;
      }
    }
  }, {
    key: "transformRange",
    value: function transformRange(start, end, formulaAddress) {
      var startSheet = absoluteSheetReference(start, formulaAddress);
      var actualStart = start;
      var actualEnd = end;

      if (this.columnsSpan.sheet === startSheet) {
        var startSCA = start.toSimpleColumnAddress(formulaAddress);
        var endSCA = end.toSimpleColumnAddress(formulaAddress);

        if (this.columnsSpan.columnStart <= startSCA.col && this.columnsSpan.columnEnd >= endSCA.col) {
          return ErrorType.REF;
        }

        if (startSCA.col >= this.columnsSpan.columnStart && startSCA.col <= this.columnsSpan.columnEnd) {
          actualStart = start.shiftedByColumns(this.columnsSpan.columnEnd - startSCA.col + 1);
        }

        if (endSCA.col >= this.columnsSpan.columnStart && endSCA.col <= this.columnsSpan.columnEnd) {
          actualEnd = end.shiftedByColumns(-(endSCA.col - this.columnsSpan.columnStart + 1));
        }
      }

      var newStart = this.transformCellAddress(actualStart, formulaAddress);
      var newEnd = this.transformCellAddress(actualEnd, formulaAddress);

      if (newStart === false && newEnd === false) {
        return [actualStart, actualEnd];
      } else if (newStart === ErrorType.REF || newEnd === ErrorType.REF) {
        throw Error('Cannot happen');
      } else {
        return [newStart || actualStart, newEnd || actualEnd];
      }
    }
  }, {
    key: "sheet",
    get: function get() {
      return this.columnsSpan.sheet;
    }
  }]);

  return RemoveColumnsTransformer;
}(Transformer);