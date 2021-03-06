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
export var RemoveRowsTransformer = /*#__PURE__*/function (_Transformer) {
  _inherits(RemoveRowsTransformer, _Transformer);

  var _super = _createSuper(RemoveRowsTransformer);

  function RemoveRowsTransformer(rowsSpan) {
    var _this;

    _classCallCheck(this, RemoveRowsTransformer);

    _this = _super.call(this);
    _this.rowsSpan = rowsSpan;
    return _this;
  }

  _createClass(RemoveRowsTransformer, [{
    key: "isIrreversible",
    value: function isIrreversible() {
      return true;
    }
  }, {
    key: "transformColumnRangeAst",
    value: function transformColumnRangeAst(ast, _formulaAddress) {
      return ast;
    }
  }, {
    key: "transformCellAddress",
    value: function transformCellAddress(dependencyAddress, formulaAddress) {
      var absoluteDependencySheet = absoluteSheetReference(dependencyAddress, formulaAddress); // Case 4

      if (this.rowsSpan.sheet !== formulaAddress.sheet && this.rowsSpan.sheet !== absoluteDependencySheet) {
        return false;
      } // Case 3 -- removed row in same sheet where dependency is but formula in different


      if (this.rowsSpan.sheet !== formulaAddress.sheet && this.rowsSpan.sheet === absoluteDependencySheet) {
        var absoluteDependencyAddress = dependencyAddress.toSimpleRowAddress(formulaAddress);

        if (absoluteDependencyAddress.row < this.rowsSpan.rowStart) {
          // 3.ARa
          return false;
        } else if (absoluteDependencyAddress.row > this.rowsSpan.rowEnd) {
          // 3.ARb
          return dependencyAddress.shiftedByRows(-this.rowsSpan.numberOfRows);
        }
      } // Case 2 -- removed row in same sheet where formula but dependency in different sheet


      if (this.rowsSpan.sheet === formulaAddress.sheet && this.rowsSpan.sheet !== absoluteDependencySheet) {
        if (dependencyAddress.isRowAbsolute()) {
          // 2.A
          return false;
        } else {
          if (formulaAddress.row < this.rowsSpan.rowStart) {
            // 2.Ra
            return false;
          } else if (formulaAddress.row > this.rowsSpan.rowEnd) {
            // 2.Rb
            return dependencyAddress.shiftedByRows(this.rowsSpan.numberOfRows);
          }
        }
      } // Case 1 -- same sheet


      if (this.rowsSpan.sheet === formulaAddress.sheet && this.rowsSpan.sheet === absoluteDependencySheet) {
        if (dependencyAddress.isRowAbsolute()) {
          if (dependencyAddress.row < this.rowsSpan.rowStart) {
            // 1.Aa
            return false;
          } else if (dependencyAddress.row > this.rowsSpan.rowEnd) {
            // 1.Ab
            return dependencyAddress.shiftedByRows(-this.rowsSpan.numberOfRows);
          }
        } else {
          var _absoluteDependencyAddress = dependencyAddress.toSimpleRowAddress(formulaAddress);

          if (_absoluteDependencyAddress.row < this.rowsSpan.rowStart) {
            if (formulaAddress.row < this.rowsSpan.rowStart) {
              // 1.Raa
              return false;
            } else if (formulaAddress.row > this.rowsSpan.rowEnd) {
              // 1.Rab
              return dependencyAddress.shiftedByRows(this.rowsSpan.numberOfRows);
            }
          } else if (_absoluteDependencyAddress.row > this.rowsSpan.rowEnd) {
            if (formulaAddress.row < this.rowsSpan.rowStart) {
              // 1.Rba
              return dependencyAddress.shiftedByRows(-this.rowsSpan.numberOfRows);
            } else if (formulaAddress.row > this.rowsSpan.rowEnd) {
              // 1.Rbb
              return false;
            }
          }
        }
      } // 1.Ac, 1.Rca, 1.Rcb, 3.Ac, 3.Rca, 3.Rcb


      return ErrorType.REF;
    }
  }, {
    key: "transformCellRange",
    value: function transformCellRange(start, end, formulaAddress) {
      return this.transformRange(start, end, formulaAddress);
    }
  }, {
    key: "transformRowRange",
    value: function transformRowRange(start, end, formulaAddress) {
      return this.transformRange(start, end, formulaAddress);
    }
  }, {
    key: "transformColumnRange",
    value: function transformColumnRange(_start, _end, _formulaAddress) {
      throw Error('Not implemented');
    }
  }, {
    key: "fixNodeAddress",
    value: function fixNodeAddress(address) {
      if (this.rowsSpan.sheet === address.sheet && this.rowsSpan.rowStart <= address.row) {
        return Object.assign(Object.assign({}, address), {
          row: address.row - this.rowsSpan.numberOfRows
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

      if (this.rowsSpan.sheet === startSheet) {
        var startSCA = start.toSimpleRowAddress(formulaAddress);
        var endSCA = end.toSimpleRowAddress(formulaAddress);

        if (this.rowsSpan.rowStart <= startSCA.row && this.rowsSpan.rowEnd >= endSCA.row) {
          return ErrorType.REF;
        }

        if (startSCA.row >= this.rowsSpan.rowStart && startSCA.row <= this.rowsSpan.rowEnd) {
          actualStart = start.shiftedByRows(this.rowsSpan.rowEnd - startSCA.row + 1);
        }

        if (endSCA.row >= this.rowsSpan.rowStart && endSCA.row <= this.rowsSpan.rowEnd) {
          actualEnd = end.shiftedByRows(-(endSCA.row - this.rowsSpan.rowStart + 1));
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
      return this.rowsSpan.sheet;
    }
  }]);

  return RemoveRowsTransformer;
}(Transformer);