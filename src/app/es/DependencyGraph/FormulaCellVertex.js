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

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 * @license
 * Copyright (c) 2020 Handsoncode. All rights reserved.
 */

/**
 * Represents vertex which keeps formula
 */
export var FormulaCellVertex = /*#__PURE__*/function () {
  function FormulaCellVertex(
  /** Formula in AST format */
  formula,
  /** Address which this vertex represents */
  cellAddress, version) {
    _classCallCheck(this, FormulaCellVertex);

    this.formula = formula;
    this.cellAddress = cellAddress;
    this.version = version;
    this.formula = formula;
    this.cellAddress = cellAddress;
    this.cachedCellValue = null;
  }
  /**
   * Returns formula stored in this vertex
   */


  _createClass(FormulaCellVertex, [{
    key: "getFormula",
    value: function getFormula(updatingService) {
      this.ensureRecentData(updatingService);
      return this.formula;
    }
  }, {
    key: "ensureRecentData",
    value: function ensureRecentData(updatingService) {
      if (this.version != updatingService.version()) {
        var _updatingService$appl = updatingService.applyTransformations(this.formula, this.address, this.version),
            _updatingService$appl2 = _slicedToArray(_updatingService$appl, 3),
            newAst = _updatingService$appl2[0],
            newAddress = _updatingService$appl2[1],
            newVersion = _updatingService$appl2[2];

        this.formula = newAst;
        this.cellAddress = newAddress;
        this.version = newVersion;
      }
    }
    /**
     * Returns address of the cell associated with vertex
     */

  }, {
    key: "getAddress",
    value: function getAddress(updatingService) {
      this.ensureRecentData(updatingService);
      return this.cellAddress;
    }
  }, {
    key: "setCellValue",

    /**
     * Sets computed cell value stored in this vertex
     */
    value: function setCellValue(cellValue) {
      this.cachedCellValue = cellValue;
    }
    /**
     * Returns cell value stored in vertex
     */

  }, {
    key: "getCellValue",
    value: function getCellValue() {
      if (this.cachedCellValue !== null) {
        return this.cachedCellValue;
      } else {
        throw Error('Value of the formula cell is not computed.');
      }
    }
  }, {
    key: "valueOrNull",
    value: function valueOrNull() {
      return this.cachedCellValue;
    }
  }, {
    key: "isComputed",
    value: function isComputed() {
      return this.cachedCellValue !== null;
    }
  }, {
    key: "address",
    get: function get() {
      return this.cellAddress;
    }
  }]);

  return FormulaCellVertex;
}();