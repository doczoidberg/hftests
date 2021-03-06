import "core-js/modules/es.symbol";
import "core-js/modules/es.symbol.description";
import "core-js/modules/es.symbol.iterator";
import "core-js/modules/es.array.from";
import "core-js/modules/es.array.iterator";
import "core-js/modules/es.array.slice";
import "core-js/modules/es.function.name";
import "core-js/modules/es.object.to-string";
import "core-js/modules/es.regexp.to-string";
import "core-js/modules/es.string.iterator";
import "core-js/modules/web.dom-collections.iterator";

function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 * @license
 * Copyright (c) 2020 Handsoncode. All rights reserved.
 */
import { simpleCellAddress } from './Cell';
import { DetailedCellError } from './CellValue';
import { FormulaCellVertex, MatrixVertex, ParsingErrorVertex } from './DependencyGraph';
import { buildLexerConfig, Unparser } from './parser';
export var Serialization = /*#__PURE__*/function () {
  function Serialization(dependencyGraph, unparser, config, exporter) {
    _classCallCheck(this, Serialization);

    this.dependencyGraph = dependencyGraph;
    this.unparser = unparser;
    this.config = config;
    this.exporter = exporter;
  }

  _createClass(Serialization, [{
    key: "getCellFormula",
    value: function getCellFormula(address) {
      var formulaVertex = this.dependencyGraph.getCell(address);

      if (formulaVertex instanceof FormulaCellVertex) {
        var formula = formulaVertex.getFormula(this.dependencyGraph.lazilyTransformingAstService);
        return this.unparser.unparse(formula, address);
      } else if (formulaVertex instanceof MatrixVertex) {
        var _formula = formulaVertex.getFormula();

        if (_formula) {
          return '{' + this.unparser.unparse(_formula, formulaVertex.getAddress()) + '}';
        }
      } else if (formulaVertex instanceof ParsingErrorVertex) {
        return formulaVertex.getFormula();
      }

      return undefined;
    }
  }, {
    key: "getCellSerialized",
    value: function getCellSerialized(address) {
      var formula = this.getCellFormula(address);

      if (formula !== undefined) {
        return formula;
      } else {
        var value = this.getCellValue(address);

        if (value instanceof DetailedCellError) {
          return this.config.translationPackage.getErrorTranslation(value.type);
        } else {
          return value;
        }
      }
    }
  }, {
    key: "getCellValue",
    value: function getCellValue(address) {
      return this.exporter.exportValue(this.dependencyGraph.getScalarValue(address));
    }
  }, {
    key: "getSheetValues",
    value: function getSheetValues(sheet) {
      var _this = this;

      return this.genericSheetGetter(sheet, function (arg) {
        return _this.getCellValue(arg);
      });
    }
  }, {
    key: "getSheetFormulas",
    value: function getSheetFormulas(sheet) {
      var _this2 = this;

      return this.genericSheetGetter(sheet, function (arg) {
        return _this2.getCellFormula(arg);
      });
    }
  }, {
    key: "genericSheetGetter",
    value: function genericSheetGetter(sheet, getter) {
      var sheetHeight = this.dependencyGraph.getSheetHeight(sheet);
      var sheetWidth = this.dependencyGraph.getSheetWidth(sheet);
      var arr = new Array(sheetHeight);

      for (var i = 0; i < sheetHeight; i++) {
        arr[i] = new Array(sheetWidth);

        for (var j = 0; j < sheetWidth; j++) {
          var address = simpleCellAddress(sheet, j, i);
          arr[i][j] = getter(address);
        }

        for (var _j = sheetWidth - 1; _j >= 0; _j--) {
          if (arr[i][_j] === null || arr[i][_j] === undefined) {
            arr[i].pop();
          } else {
            break;
          }
        }
      }

      for (var _i = sheetHeight - 1; _i >= 0; _i--) {
        if (arr[_i].length === 0) {
          arr.pop();
        } else {
          break;
        }
      }

      return arr;
    }
  }, {
    key: "genericAllSheetsGetter",
    value: function genericAllSheetsGetter(sheetGetter) {
      var result = {};

      var _iterator = _createForOfIteratorHelper(this.dependencyGraph.sheetMapping.displayNames()),
          _step;

      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var sheetName = _step.value;
          var sheetId = this.dependencyGraph.sheetMapping.fetch(sheetName);
          result[sheetName] = sheetGetter(sheetId);
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }

      return result;
    }
  }, {
    key: "getSheetSerialized",
    value: function getSheetSerialized(sheet) {
      var _this3 = this;

      return this.genericSheetGetter(sheet, function (arg) {
        return _this3.getCellSerialized(arg);
      });
    }
  }, {
    key: "getAllSheetsValues",
    value: function getAllSheetsValues() {
      var _this4 = this;

      return this.genericAllSheetsGetter(function (arg) {
        return _this4.getSheetValues(arg);
      });
    }
  }, {
    key: "getAllSheetsFormulas",
    value: function getAllSheetsFormulas() {
      var _this5 = this;

      return this.genericAllSheetsGetter(function (arg) {
        return _this5.getSheetFormulas(arg);
      });
    }
  }, {
    key: "getAllSheetsSerialized",
    value: function getAllSheetsSerialized() {
      var _this6 = this;

      return this.genericAllSheetsGetter(function (arg) {
        return _this6.getSheetSerialized(arg);
      });
    }
  }, {
    key: "withNewConfig",
    value: function withNewConfig(newConfig, namedExpressions) {
      var newUnparser = new Unparser(newConfig, buildLexerConfig(newConfig), this.dependencyGraph.sheetMapping.fetchDisplayName, namedExpressions);
      return new Serialization(this.dependencyGraph, newUnparser, newConfig, this.exporter);
    }
  }]);

  return Serialization;
}();