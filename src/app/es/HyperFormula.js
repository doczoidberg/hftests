import "core-js/modules/es.symbol";
import "core-js/modules/es.symbol.description";
import "core-js/modules/es.symbol.iterator";
import "core-js/modules/es.array.concat";
import "core-js/modules/es.array.from";
import "core-js/modules/es.array.iterator";
import "core-js/modules/es.array.map";
import "core-js/modules/es.array.slice";
import "core-js/modules/es.function.name";
import "core-js/modules/es.map";
import "core-js/modules/es.object.to-string";
import "core-js/modules/es.regexp.to-string";
import "core-js/modules/es.string.iterator";
import "core-js/modules/web.dom-collections.iterator";

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 * @license
 * Copyright (c) 2020 Handsoncode. All rights reserved.
 */
import { AbsoluteCellRange } from './AbsoluteCellRange';
import { CellType, getCellType as _getCellType, getCellValueType as _getCellValueType } from './Cell';
import { CellContent } from './CellContentParser';
import { numberToSimpleTime } from './DateTimeHelper';
import { buildTranslationPackage } from './i18n';
import { normalizeAddedIndexes, normalizeRemovedIndexes } from './Operations';
import { EvaluationSuspendedError, LanguageAlreadyRegisteredError, LanguageNotRegisteredError, NotAFormulaError } from './errors';
import { AstNodeType, simpleCellAddressFromString as _simpleCellAddressFromString, simpleCellAddressToString as _simpleCellAddressToString } from './parser';
import { Emitter, Events } from './Emitter';
import { BuildEngineFactory } from './BuildEngineFactory';
import { FunctionRegistry } from './interpreter/FunctionRegistry';
/**
 * This is a class for creating HyperFormula instance, all the following public methods
 * ale related to this class.
 *
 * The instance can be created only by calling one of the static methods
 * `buildFromArray`, `buildFromSheets` or `buildEmpty` and should be disposed of with the
 * `destroy` method when it's no longer needed to free the resources.
 *
 * The instance can be seen as a workbook where worksheets can be created and
 * manipulated. They are organized within a widely know structure of columns and rows
 * which can be manipulated as well. The smallest possible data unit are the cells, which
 * may contain simple values or formulas to be calculated.
 *
 * All CRUD methods are called directly on HyperFormula instance and will trigger
 * corresponding lifecycle events. The events are marked accordingly, as well as thrown
 * errors so they can be correctly handled.
 */

export var HyperFormula = /*#__PURE__*/function () {
  function HyperFormula(_config, _stats, _dependencyGraph, _columnSearch, _parser, _unparser, _cellContentParser, _evaluator, _lazilyTransformingAstService, _crudOperations, _exporter, _namedExpressions, _serialization, _functionRegistry) {
    _classCallCheck(this, HyperFormula);

    this._config = _config;
    this._stats = _stats;
    this._dependencyGraph = _dependencyGraph;
    this._columnSearch = _columnSearch;
    this._parser = _parser;
    this._unparser = _unparser;
    this._cellContentParser = _cellContentParser;
    this._evaluator = _evaluator;
    this._lazilyTransformingAstService = _lazilyTransformingAstService;
    this._crudOperations = _crudOperations;
    this._exporter = _exporter;
    this._namedExpressions = _namedExpressions;
    this._serialization = _serialization;
    this._functionRegistry = _functionRegistry;
    this._emitter = new Emitter();
    this._evaluationSuspended = false;
  }
  /**
   * Calls the `graph` method on the dependency graph.
   * Allows to execute `graph` directly without a need to refer to `dependencyGraph`.
   *
   * @internal
   */


  _createClass(HyperFormula, [{
    key: "getCellValue",

    /**
     * Returns the cell value of a given address.
     * Applies rounding and post-processing.
     *
     * @param {SimpleCellAddress} cellAddress - cell coordinates
     *
     * @throws [[NoSheetWithIdError]] when the given sheet ID does not exist
     * @throws [[EvaluationSuspendedError]] when the evaluation is suspended
     *
     * @example
     * ```js
     * const hfInstance = HyperFormula.buildFromArray([
     *  ['=SUM(1,2,3)', '2'],
     * ]);
     *
     * // get value of A1 cell, should be '6'
     * const A1Value = hfInstance.getCellValue({ sheet: 0, col: 0, row: 0 });
     *
     * // get value of B1 cell, should be '2'
     * const B1Value = hfInstance.getCellValue({ sheet: 0, col: 1, row: 0 });
     * ```
     *
     * @category Cells
     */
    value: function getCellValue(cellAddress) {
      this.ensureEvaluationIsNotSuspended();
      return this._serialization.getCellValue(cellAddress);
    }
  }, {
    key: "ensureEvaluationIsNotSuspended",
    value: function ensureEvaluationIsNotSuspended() {
      if (this._evaluationSuspended) {
        throw new EvaluationSuspendedError();
      }
    }
    /**
     * Returns a normalized formula string from the cell of a given address or `undefined` for an address that does not exist and empty values.
     *
     * @param {SimpleCellAddress} cellAddress - cell coordinates
     *
     * @example
     * ```js
     * const hfInstance = HyperFormula.buildFromArray([
     *  ['=SUM(1,2,3)', '0'],
     * ]);
     *
     * // should return a normalized A1 cell formula: '=SUM(1,2,3)'
     * const A1Formula = hfInstance.getCellFormula({ sheet: 0, col: 0, row: 0 });
     *
     * // should return a normalized B1 cell formula: 'undefined'
     * const B1Formula = hfInstance.getCellFormula({ sheet: 0, col: 1, row: 0 });
     * ```
     *
     * @category Cells
     */

  }, {
    key: "getCellFormula",
    value: function getCellFormula(cellAddress) {
      return this._serialization.getCellFormula(cellAddress);
    }
    /**
     * Returns [[CellValue]] which a serialized content of the cell of a given address either a cell formula, an explicit value, or an error.
     *
     * @param {SimpleCellAddress} cellAddress - cell coordinates
     *
     * @throws [[EvaluationSuspendedError]] when the evaluation is suspended
     *
     * @example
     * ```js
     * const hfInstance = HyperFormula.buildFromArray([
     *  ['=SUM(1,2,3)', '0'],
     * ]);
     *
     * // should return serialized content of A1 cell: '=SUM(1,2,3)'
     * const cellA1Serialized = hfInstance.getCellSerialized({ sheet: 0, col: 0, row: 0 });
     *
     * // should return serialized content of B1 cell: '0'
     * const cellB1Serialized = hfInstance.getCellSerialized({ sheet: 0, col: 1, row: 0 });
     * ```
     *
     * @category Cells
     */

  }, {
    key: "getCellSerialized",
    value: function getCellSerialized(cellAddress) {
      this.ensureEvaluationIsNotSuspended();
      return this._serialization.getCellSerialized(cellAddress);
    }
    /**
     * Returns an array of arrays of [[CellValue]] with values of all cells from [[Sheet]].
     * Applies rounding and post-processing.
     *
     * @throws [[NoSheetWithIdError]] when the given sheet ID does not exist
     * @throws [[EvaluationSuspendedError]] when the evaluation is suspended
     *
     * @param {number} sheetId - sheet ID number
     *
     * @example
     * ```js
     * const hfInstance = HyperFormula.buildFromArray([
     *  ['0', '=SUM(1,2,3)', '=A1'],
     *  ['1', '=TEXT(A2, "0.0%")', '=C1'],
     *  ['2', '=SUM(A1:C1)', '=C1'],
     * ]);
     *
     * // should return all values of a sheet: [[0, 6, 0], [1, '1.0%', 0], [2, 6, 0]]
     * const sheetValues = hfInstance.getSheetValues(0);
     * ```
     *
     * @category Sheets
     */

  }, {
    key: "getSheetValues",
    value: function getSheetValues(sheetId) {
      this.ensureEvaluationIsNotSuspended();
      return this._serialization.getSheetValues(sheetId);
    }
    /**
     * Returns an array with normalized formula strings from [[Sheet]] or `undefined` for a cells that have no value.
     *
     * @param {SimpleCellAddress} sheetId - sheet ID number
     *
     * @throws [[NoSheetWithIdError]] when the given sheet ID does not exist
     *
     * @example
     * ```js
     * const hfInstance = HyperFormula.buildFromArray([
     *  ['0', '=SUM(1,2,3)', '=A1'],
     *  ['1', '=TEXT(A2, "0.0%")', '=C1'],
     *  ['2', '=SUM(A1:C1)', '=C1'],
     * ]);
     *
     * // should return all formulas of a sheet:
     * // [
     * //  [undefined, '=SUM(1,2,3)', '=A1'],
     * //  [undefined, '=TEXT(A2, "0.0%")', '=C1'],
     * //  [undefined, '=SUM(A1:C1)', '=C1'],
     * // ];
     * const sheetFormulas = hfInstance.getSheetFormulas(0);
     * ```
     *
     * @category Sheets
     */

  }, {
    key: "getSheetFormulas",
    value: function getSheetFormulas(sheetId) {
      return this._serialization.getSheetFormulas(sheetId);
    }
    /**
     * Returns an array of arrays of [[NoErrorCellValue]] with serialized content of cells from [[Sheet]], either a cell formula or an explicit value.
     *
     * @param {SimpleCellAddress} sheetId - sheet ID number
     *
     * @throws [[EvaluationSuspendedError]] when the evaluation is suspended
     * @throws [[NoSheetWithIdError]] when the given sheet ID does not exist
     *
     * @example
     * ```js
     * const hfInstance = HyperFormula.buildFromArray([
     *  ['0', '=SUM(1,2,3)', '=A1'],
     *  ['1', '=TEXT(A2, "0.0%")', '=C1'],
     *  ['2', '=SUM(A1:C1)', '=C1'],
     * ]);
     *
     * // should return:
     * // [
     * //  ['0', '=SUM(1,2,3)', '=A1'],
     * //  ['1', '=TEXT(A2, "0.0%")', '=C1'],
     * //  ['2', '=SUM(A1:C1)', '=C1'],
     * // ];
     * const serializedContent = hfInstance.getSheetSerialized(0);
     * ```
     *
     * @category Sheets
     */

  }, {
    key: "getSheetSerialized",
    value: function getSheetSerialized(sheetId) {
      this.ensureEvaluationIsNotSuspended();
      return this._serialization.getSheetSerialized(sheetId);
    }
    /**
     * Returns a map containing dimensions of all sheets for the engine instance represented as a key-value pairs where keys are sheet IDs and dimensions are returned as numbers, width and height respectively.
     *
     * @throws [[NoSheetWithIdError]] when the given sheet ID does not exist
     *
     * @example
     * ```js
     * const hfInstance = HyperFormula.buildFromSheets({
     *   Sheet1: [
     *    ['1', '2', '=Sheet2!$A1'],
     *   ],
     *   Sheet2: [
     *    ['3'],
     *    ['4'],
     *   ],
     * });
     *
     * // should return the dimensions of all sheets:
     * // { Sheet1: { width: 3, height: 1 }, Sheet2: { width: 1, height: 2 } }
     * const allSheetsDimensions = hfInstance.getAllSheetsDimensions();
     * ```
     *
     * @category Sheets
     */

  }, {
    key: "getAllSheetsDimensions",
    value: function getAllSheetsDimensions() {
      var _this = this;

      return this._serialization.genericAllSheetsGetter(function (arg) {
        return _this.getSheetDimensions(arg);
      });
    }
    /**
     * Returns dimensions of a specified sheet.
     * The sheet dimensions is represented with numbers: width and height.
     *
     * @throws [[NoSheetWithIdError]] when the given sheet ID does not exist
     *
     * @param {number} sheetId - sheet ID number
     *
     * @example
     * ```js
     * const hfInstance = HyperFormula.buildFromArray([
     *    ['1', '2', '=Sheet2!$A1'],
     * ]);
     *
     * // should return provided sheet's dimensions: { width: 3, height: 1 }
     * const sheetDimensions = hfInstance.getSheetDimensions(0);
     * ```
     *
     * @category Sheets
     */

  }, {
    key: "getSheetDimensions",
    value: function getSheetDimensions(sheetId) {
      return {
        width: this.dependencyGraph.getSheetWidth(sheetId),
        height: this.dependencyGraph.getSheetHeight(sheetId)
      };
    }
    /**
     * Returns values of all sheets in a form of an object which property keys are strings and values are arrays of arrays of [[CellValue]].
     *
     * @throws [[EvaluationSuspendedError]] when the evaluation is suspended
     *
     * @example
     * ```js
     * const hfInstance = HyperFormula.buildFromArray([
     *  ['1', '=A1+10', '3'],
     * ]);
     *
     * // should return all sheets values: { Sheet1: [ [ 1, 11, 3 ] ] }
     * const allSheetsValues = hfInstance.getAllSheetsValues();
     * ```
     *
     * @category Sheets
     */

  }, {
    key: "getAllSheetsValues",
    value: function getAllSheetsValues() {
      this.ensureEvaluationIsNotSuspended();
      return this._serialization.getAllSheetsValues();
    }
    /**
     * Returns formulas of all sheets in a form of an object which property keys are strings and values are arrays of arrays of strings or possibly `undefined` when the call does not contain a formula.
     *
     * @example
     * ```js
     * const hfInstance = HyperFormula.buildFromArray([
     *  ['1', '2', '=A1+10'],
     * ]);
     *
     * // should return only formulas: { Sheet1: [ [ undefined, undefined, '=A1+10' ] ] }
     * const allSheetsFormulas = hfInstance.getAllSheetsFormulas();
     * ```
     * @category Sheets
     */

  }, {
    key: "getAllSheetsFormulas",
    value: function getAllSheetsFormulas() {
      return this._serialization.getAllSheetsFormulas();
    }
    /**
     * Returns formulas or values of all sheets in a form of an object which property keys are strings and values are arrays of arrays of [[CellValue]].
     *
     * @throws [[EvaluationSuspendedError]] when the evaluation is suspended
     *
     * @example
     * ```js
     * const hfInstance = HyperFormula.buildFromArray([
     *  ['1', '2', '=A1+10'],
     * ]);
     *
     * // should return all sheets serialized content: { Sheet1: [ [ 1, 2, '=A1+10' ] ] }
     * const allSheetsSerialized = hfInstance.getAllSheetsSerialized();
     * ```
     *
     * @category Sheets
     */

  }, {
    key: "getAllSheetsSerialized",
    value: function getAllSheetsSerialized() {
      this.ensureEvaluationIsNotSuspended();
      return this._serialization.getAllSheetsSerialized();
    }
    /**
     * Updates the config with given new metadata.
     *
     * @param {Partial<ConfigParams>} newParams configuration options to be updated or added
     *
     * @example
     * ```js
     * const hfInstance = HyperFormula.buildFromArray([
     *  ['1', '2'],
     * ]);
     *
     * // add a config param, for example maxColumns,
     * // you can check the configuration with getConfig method
     * hfInstance.updateConfig({ maxColumns: 1000 });
     * ```
     *
     * @category Instance
     */

  }, {
    key: "updateConfig",
    value: function updateConfig(newParams) {
      var newConfig = this._config.mergeConfig(newParams);

      var configNewLanguage = this._config.mergeConfig({
        language: newParams.language
      });

      var serializedSheets = this._serialization.withNewConfig(configNewLanguage, this._namedExpressions).getAllSheetsSerialized();

      var newEngine = BuildEngineFactory.rebuildWithConfig(newConfig, serializedSheets, this._stats);
      this._config = newEngine.config;
      this._stats = newEngine.stats;
      this._dependencyGraph = newEngine.dependencyGraph;
      this._columnSearch = newEngine.columnSearch;
      this._parser = newEngine.parser;
      this._unparser = newEngine.unparser;
      this._cellContentParser = newEngine.cellContentParser;
      this._evaluator = newEngine.evaluator;
      this._lazilyTransformingAstService = newEngine.lazilyTransformingAstService;
      this._crudOperations = newEngine.crudOperations;
      this._exporter = newEngine.exporter;
      this._namedExpressions = newEngine.namedExpressions;
      this._serialization = newEngine.serialization;
      this._functionRegistry = newEngine.functionRegistry;
    }
    /**
     * Returns current configuration of the engine instance.
     *
     * @example
     * ```js
     * // should return all config metadata including default and those which were added
     * const hfConfig = hfInstance.getConfig();
     * ```
     *
     * @category Instance
     */

  }, {
    key: "getConfig",
    value: function getConfig() {
      return this._config.getConfig();
    }
    /**
     * Serializes and deserializes whole engine, effectively reloading it.
     *
     * @example
     * ```js
     * hfInstance.rebuildAndRecalculate();
     * ```
     *
     * @category Instance
     */

  }, {
    key: "rebuildAndRecalculate",
    value: function rebuildAndRecalculate() {
      this.updateConfig({});
    }
    /**
     * Returns a snapshot of computation time statistics.
     * It returns a map with key-value pairs where keys are enums for stat type and time (number).
     *
     * @internal
     *
     * @category Instance
     */

  }, {
    key: "getStats",
    value: function getStats() {
      return this._stats.snapshot();
    }
    /**
     * Undo the previous operation.
     *
     * Note that this method may trigger dependency graph recalculation.
     *
     * @fires [[valuesUpdated]] if recalculation was triggered by this change
     *
     * @throws [[NoOperationToUndoError]] when there is no operation running that can be undone
     *
     * @example
     * ```js
     * const hfInstance = HyperFormula.buildFromArray([
     *  ['1', '2'],
     *  ['3', ''],
     * ]);
     *
     * // perform CRUD operation, for example remove the second row
     * hfInstance.removeRows(0, [1, 1]);
     *
     * // do an undo, it should return the changes
     * const changes = hfInstance.undo();
     * ```
     *
     * @category Undo and Redo
     */

  }, {
    key: "undo",
    value: function undo() {
      this._crudOperations.undo();

      return this.recomputeIfDependencyGraphNeedsIt();
    }
    /**
     * Re-do recently undone operation.
     *
     * Note that this method may trigger dependency graph recalculation.
     *
     * @fires [[valuesUpdated]] if recalculation was triggered by this change
     *
     * @throws [[NoOperationToRedoError]] when there is no operation running that can be re-done
     *
     * @example
     * ```js
     * const hfInstance = HyperFormula.buildFromArray([
     *  ['1'],
     *  ['2'],
     *  ['3'],
     * ]);
     *
     * // perform CRUD operation, for example remove the second row
     * hfInstance.removeRows(0, [1, 1]);
     *
     * // do an undo, it should return prvious values: [['1'], ['2'], ['3']]
     * hfInstance.undo();
     *
     * // do a redo, it should return the values after removing the second row: [['1'], ['3']]
     * const changes = hfInstance.redo();
     * ```
     *
     * @category Undo and Redo
     */

  }, {
    key: "redo",
    value: function redo() {
      this._crudOperations.redo();

      return this.recomputeIfDependencyGraphNeedsIt();
    }
    /**
     * Checks if there is at least one operation that can be undone.
     *
     * @example
     * ```js
     * const hfInstance = HyperFormula.buildFromArray([
     *  ['1'],
     *  ['2'],
     *  ['3'],
     * ]);
     *
     * // perform CRUD operation, for example remove the second row
     * hfInstance.removeRows(0, [1, 1]);
     *
     * // should return 'true', it is possible to undo last operation
     * // which is removing rows in this example
     * const isSomethingToUndo = hfInstance.isThereSomethingToUndo();
     * ```
     *
     * @category Undo and Redo
     */

  }, {
    key: "isThereSomethingToUndo",
    value: function isThereSomethingToUndo() {
      return this._crudOperations.isThereSomethingToUndo();
    }
    /**
     * Checks if there is at least one operation that can be re-done.
     *
     * @example
     * ```js
     * hfInstance.undo();
     *
     * // when there is an action to redo, this will return 'true'
     * const isSomethingToRedo = hfInstance.isThereSomethingToRedo();
     * ```
     *
     * @category Undo and Redo
     */

  }, {
    key: "isThereSomethingToRedo",
    value: function isThereSomethingToRedo() {
      return this._crudOperations.isThereSomethingToRedo();
    }
    /**
     * Returns information whether it is possible to change the content in a rectangular area bounded by the box.
     * If returns `true`, doing [[setCellContents]] operation won't throw any errors.
     * Returns `false` if the operation might be disrupted and causes side-effects by the fact that there is a matrix inside selected cells, the address is invalid or the sheet does not exist.
     *
     * @param {SimpleCellAddress} topLeftCornerAddress -  top left corner of block of cells
     * @param {number} width - width of the box
     * @param {number} height - height of the box
     *
     * @example
     * ```js
     * const hfInstance = HyperFormula.buildFromArray([
     *  ['1', '2'],
     * ]);
     *
     * // choose the address and assign it to a variable
     * const address = { col: 0, row: 0, sheet: 0 };
     *
     * // should return 'true' for this example, it is possible to set content of
     * // width 2, height 1 in the first row and column of sheet 0
     * const isSettable = hfInstance.isItPossibleToSetCellContents(address, 2, 1);
     * ```
     *
     * @category Cells
     */

  }, {
    key: "isItPossibleToSetCellContents",
    value: function isItPossibleToSetCellContents(topLeftCornerAddress) {
      var width = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
      var height = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1;

      try {
        this._crudOperations.ensureRangeInSizeLimits(AbsoluteCellRange.spanFrom(topLeftCornerAddress, width, height));

        for (var i = 0; i < width; i++) {
          for (var j = 0; j < height; j++) {
            this._crudOperations.ensureItIsPossibleToChangeContent({
              col: topLeftCornerAddress.col + i,
              row: topLeftCornerAddress.row + j,
              sheet: topLeftCornerAddress.sheet
            });
          }
        }
      } catch (e) {
        return false;
      }

      return true;
    }
    /**
     * Sets the content for a block of cells of a given coordinates.
     *
     * Note that this method may trigger dependency graph recalculation.
     *
     * @param {SimpleCellAddress} topLeftCornerAddress - top left corner of block of cells
     * @param {(RawCellContent[][]|RawCellContent)} cellContents - array with content
     *
     * @fires [[valuesUpdated]] if recalculation was triggered by this change
     *
     * @throws [[InvalidArgumentsError]] when the value is not an array of arrays or a raw cell value
     * @throws [[SheetSizeLimitExceededError]] when performing this operation would result in sheet size limits exceeding
     * @throws an error when it is an attempt to set cells content inside matrices during batch operation
     *
     * @example
     * ```js
     * const hfInstance = HyperFormula.buildFromArray([
     *  ['1', '2', '=A1'],
     * ]);
     *
     * // should set the content, returns:
     * // [{
     * //   address: { sheet: 0, col: 3, row: 0 },
     * //   newValue: 2,
     * // }]
     * const changes = hfInstance.setCellContents({ col: 3, row: 0, sheet: 0 }, [['=B1']]);
     * ```
     *
     * @category Cells
     */

  }, {
    key: "setCellContents",
    value: function setCellContents(topLeftCornerAddress, cellContents) {
      this._crudOperations.setCellContents(topLeftCornerAddress, cellContents);

      return this.recomputeIfDependencyGraphNeedsIt();
    }
    /**
     * Returns information whether it is possible to add rows into a specified position in a given sheet.
     * Checks against particular rules to ascertain that addRows can be called.
     * If returns `true`, doing [[addRows]] operation won't throw any errors.
     * Returns `false` if the operation might be disrupted and causes side-effects by the fact that there is a matrix inside the selected rows.
     *
     * @param {number} sheetId - sheet ID in which rows will be added
     * @param {ColumnRowIndex[]} indexes - non-contiguous indexes with format [row, amount], where row is a row number above which the rows will be added
     *
     * @example
     * ```js
     * const hfInstance = HyperFormula.buildFromArray([
     *  ['1', '2', '3'],
     * ]);
     *
     * // should return 'true' for this example,
     * // it is possible to add one row in the second row of sheet 0
     * const isAddable = hfInstance.isItPossibleToAddRows(0, [1, 1]);
     * ```
     *
     * @category Rows
     */

  }, {
    key: "isItPossibleToAddRows",
    value: function isItPossibleToAddRows(sheetId) {
      for (var _len = arguments.length, indexes = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        indexes[_key - 1] = arguments[_key];
      }

      var normalizedIndexes = normalizeAddedIndexes(indexes);

      try {
        var _this$_crudOperations;

        (_this$_crudOperations = this._crudOperations).ensureItIsPossibleToAddRows.apply(_this$_crudOperations, [sheetId].concat(_toConsumableArray(normalizedIndexes)));

        return true;
      } catch (e) {
        return false;
      }
    }
    /**
     * Adds multiple rows into a specified position in a given sheet.
     * Does nothing if rows are outside of effective sheet size.
     *
     * Note that this method may trigger dependency graph recalculation.
     *
     * @param {number} sheetId - sheet ID in which rows will be added
     * @param {ColumnRowIndex[]} indexes - non-contiguous indexes with format [row, amount], where row is a row number above which the rows will be added
     *
     * @fires [[valuesUpdated]] if recalculation was triggered by this change
     *
     * @throws [[NoSheetWithIdError]] when the given sheet ID does not exist
     * @throws [[SheetSizeLimitExceededError]] when performing this operation would result in sheet size limits exceeding
     * @throws [[TargetLocationHasMatrixError]] when the selected position has matrix inside
     *
     * @example
     * ```js
     * const hfInstance = HyperFormula.buildFromArray([
     *  ['1'],
     *  ['2'],
     * ]);
     *
     * // should return a list of cells which values changed after the operation,
     * // their absolute addresses and new values
     * const changes = hfInstance.addRows(0, [0, 1]);
     * ```
     *
     * @category Rows
     */

  }, {
    key: "addRows",
    value: function addRows(sheetId) {
      var _this$_crudOperations2;

      for (var _len2 = arguments.length, indexes = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
        indexes[_key2 - 1] = arguments[_key2];
      }

      (_this$_crudOperations2 = this._crudOperations).addRows.apply(_this$_crudOperations2, [sheetId].concat(indexes));

      return this.recomputeIfDependencyGraphNeedsIt();
    }
    /**
     * Returns information whether it is possible to remove rows from a specified position in a given sheet.
     * Checks against particular rules to ascertain that removeRows can be called.
     * If returns `true`, doing [[removeRows]] operation won't throw any errors.
     * Returns `false` if the operation might be disrupted and causes side-effects by the fact that there is a matrix inside the selected rows.
     *
     * @param {number} sheetId - sheet ID from which rows will be removed
     * @param {ColumnRowIndex[]} indexes - non-contiguous indexes with format: [row, amount]
     *
     * @example
     * ```js
     * const hfInstance = HyperFormula.buildFromArray([
     *  ['1'],
     *  ['2'],
     * ]);
     *
     * // should return 'true' for this example
     * // it is possible to remove one row from row 1 of sheet 0
     * const isRemovable = hfInstance.isItPossibleToRemoveRows(0, [1, 1]);
     * ```
     *
     * @category Rows
     */

  }, {
    key: "isItPossibleToRemoveRows",
    value: function isItPossibleToRemoveRows(sheetId) {
      for (var _len3 = arguments.length, indexes = new Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
        indexes[_key3 - 1] = arguments[_key3];
      }

      var normalizedIndexes = normalizeRemovedIndexes(indexes);

      try {
        var _this$_crudOperations3;

        (_this$_crudOperations3 = this._crudOperations).ensureItIsPossibleToRemoveRows.apply(_this$_crudOperations3, [sheetId].concat(_toConsumableArray(normalizedIndexes)));

        return true;
      } catch (e) {
        return false;
      }
    }
    /**
     * Removes multiple rows from a specified position in a given sheet.
     * Does nothing if rows are outside of the effective sheet size.
     *
     * Note that this method may trigger dependency graph recalculation.
     *
     * @param {number} sheetId - sheet ID from which rows will be removed
     * @param {ColumnRowIndex[]} indexes - non-contiguous indexes with format: [row, amount]
     *
     * @fires [[valuesUpdated]] if recalculation was triggered by this change
     *
     * @throws [[InvalidArgumentsError]] when the given arguments are invalid
     * @throws [[NoSheetWithIdError]] when the given sheet ID does not exist
     * @throws [[SourceLocationHasMatrixError]] when the selected position has matrix inside
     *
     * @example
     * ```js
     * const hfInstance = HyperFormula.buildFromArray([
     *  ['1'],
     *  ['2'],
     * ]);
     *
     * // should return: [{ sheet: 0, col: 1, row: 2, value: null }] for this example
     * const changes = hfInstance.removeRows(0, [1, 1]);
     * ```
     *
     * @category Rows
     */

  }, {
    key: "removeRows",
    value: function removeRows(sheetId) {
      var _this$_crudOperations4;

      for (var _len4 = arguments.length, indexes = new Array(_len4 > 1 ? _len4 - 1 : 0), _key4 = 1; _key4 < _len4; _key4++) {
        indexes[_key4 - 1] = arguments[_key4];
      }

      (_this$_crudOperations4 = this._crudOperations).removeRows.apply(_this$_crudOperations4, [sheetId].concat(indexes));

      return this.recomputeIfDependencyGraphNeedsIt();
    }
    /**
     * Returns information whether it is possible to add columns into a specified position in a given sheet.
     * Checks against particular rules to ascertain that addColumns can be called.
     * If returns `true`, doing [[addColumns]] operation won't throw any errors.
     * Returns `false` if the operation might be disrupted and causes side-effects by the fact that there is a matrix inside the selected columns.
     *
     * @param {number} sheetId - sheet ID in which columns will be added
     * @param {ColumnRowIndex[]} indexes - non-contiguous indexes with format: [column, amount], where column is a column number from which new columns will be added
     *
     * @example
     * ```js
     * const hfInstance = HyperFormula.buildFromArray([
     *  ['1', '2'],
     * ]);
     *
     * // should return 'true' for this example,
     * // it is possible to add 1 column in sheet 0, at column 1
     * const isAddable = hfInstance.isItPossibleToAddColumns(0, [1, 1]);
     * ```
     *
     * @category Columns
     */

  }, {
    key: "isItPossibleToAddColumns",
    value: function isItPossibleToAddColumns(sheetId) {
      for (var _len5 = arguments.length, indexes = new Array(_len5 > 1 ? _len5 - 1 : 0), _key5 = 1; _key5 < _len5; _key5++) {
        indexes[_key5 - 1] = arguments[_key5];
      }

      var normalizedIndexes = normalizeAddedIndexes(indexes);

      try {
        var _this$_crudOperations5;

        (_this$_crudOperations5 = this._crudOperations).ensureItIsPossibleToAddColumns.apply(_this$_crudOperations5, [sheetId].concat(_toConsumableArray(normalizedIndexes)));

        return true;
      } catch (e) {
        return false;
      }
    }
    /**
     * Adds multiple columns into a specified position in a given sheet.
     * Does nothing if the columns are outside of the effective sheet size.
     *
     * Note that this method may trigger dependency graph recalculation.
     *
     * @param {number} sheetId - sheet ID in which columns will be added
     * @param {ColumnRowIndex[]} indexes - non-contiguous indexes with format: [column, amount], where column is a column number from which new columns will be added
     *
     * @fires [[valuesUpdated]] if recalculation was triggered by this change
     *
     * @throws [[NoSheetWithIdError]] when the given sheet ID does not exist
     * @throws [[InvalidArgumentsError]] when the given arguments are invalid
     * @throws [[SheetSizeLimitExceededError]] when performing this operation would result in sheet size limits exceeding
     * @throws [[TargetLocationHasMatrixError]] when the selected position has matrix inside
     *
     * @example
     * ```js
     * const hfInstance = HyperFormula.buildFromArray([
     *  ['=RAND()', '42'],
     * ]);
     *
     * // should return a list of cells which values changed after the operation,
     * // their absolute addresses and new values, for this example:
     * // [{
     * //   address: { sheet: 0, col: 1, row: 0 },
     * //   newValue: 0.92754862796338,
     * // }]
     * const changes = hfInstance.addColumns(0, [0, 1]);
     * ```
     *
     * @category Columns
     */

  }, {
    key: "addColumns",
    value: function addColumns(sheetId) {
      var _this$_crudOperations6;

      for (var _len6 = arguments.length, indexes = new Array(_len6 > 1 ? _len6 - 1 : 0), _key6 = 1; _key6 < _len6; _key6++) {
        indexes[_key6 - 1] = arguments[_key6];
      }

      (_this$_crudOperations6 = this._crudOperations).addColumns.apply(_this$_crudOperations6, [sheetId].concat(indexes));

      return this.recomputeIfDependencyGraphNeedsIt();
    }
    /**
     * Returns information whether it is possible to remove columns from a specified position in a given sheet.
     * Checks against particular rules to ascertain that removeColumns can be called.
     * If returns `true`, doing [[removeColumns]] operation won't throw any errors.
     * Returns `false` if the operation might be disrupted and causes side-effects by the fact that there is a matrix inside the selected columns.
     *
     * @param {number} sheetId - sheet ID from which columns will be removed
     * @param {ColumnRowIndex[]} indexes - non-contiguous indexes with format [column, amount]
     *
     * @example
     * ```js
     * const hfInstance = HyperFormula.buildFromArray([
     *  ['1', '2'],
     * ]);
     *
     * // should return 'true' for this example
     * // it is possible to remove one column, in place of the second column of sheet 0
     * const isRemovable = hfInstance.isItPossibleToRemoveColumns(0, [1, 1]);
     * ```
     *
     * @category Columns
     */

  }, {
    key: "isItPossibleToRemoveColumns",
    value: function isItPossibleToRemoveColumns(sheetId) {
      for (var _len7 = arguments.length, indexes = new Array(_len7 > 1 ? _len7 - 1 : 0), _key7 = 1; _key7 < _len7; _key7++) {
        indexes[_key7 - 1] = arguments[_key7];
      }

      var normalizedIndexes = normalizeRemovedIndexes(indexes);

      try {
        var _this$_crudOperations7;

        (_this$_crudOperations7 = this._crudOperations).ensureItIsPossibleToRemoveColumns.apply(_this$_crudOperations7, [sheetId].concat(_toConsumableArray(normalizedIndexes)));

        return true;
      } catch (e) {
        return false;
      }
    }
    /**
     * Removes multiple columns from a specified position in a given sheet.
     * Does nothing if columns are outside of the effective sheet size.
     *
     * Note that this method may trigger dependency graph recalculation.
     *
     * @param {number} sheetId - sheet ID from which columns will be removed
     * @param {ColumnRowIndex[]} indexes - non-contiguous indexes with format: [column, amount]
     *
     * @fires [[valuesUpdated]] if recalculation was triggered by this change
     *
     * @throws [[NoSheetWithIdError]] when the given sheet ID does not exist
     * @throws [[InvalidArgumentsError]] when the given arguments are invalid
     * @throws [[SourceLocationHasMatrixError]] when the selected position has matrix inside
     *
     * @example
     * ```js
     * const hfInstance = HyperFormula.buildFromArray([
     *  ['0', '=SUM(1,2,3)', '=A1'],
     * ]);
     *
     * // should return a list of cells which values changed after the operation,
     * // their absolute addresses and new values, in this example it will return:
     * // [{
     * //   address: { sheet: 0, col: 1, row: 0 },
     * //   newValue: { error: [CellError], value: '#REF!' },
     * // }]
     * const changes = hfInstance.removeColumns(0, [0, 1]);
     * ```
     *
     * @category Columns
     */

  }, {
    key: "removeColumns",
    value: function removeColumns(sheetId) {
      var _this$_crudOperations8;

      for (var _len8 = arguments.length, indexes = new Array(_len8 > 1 ? _len8 - 1 : 0), _key8 = 1; _key8 < _len8; _key8++) {
        indexes[_key8 - 1] = arguments[_key8];
      }

      (_this$_crudOperations8 = this._crudOperations).removeColumns.apply(_this$_crudOperations8, [sheetId].concat(indexes));

      return this.recomputeIfDependencyGraphNeedsIt();
    }
    /**
     * Returns information whether it is possible to move cells to a specified position in a given sheet.
     * Checks against particular rules to ascertain that moveCells can be called.
     * If returns `true`, doing [[moveCells]] operation won't throw any errors.
     * Returns `false` if the operation might be disrupted and causes side-effects by the fact that there is a matrix inside the selected columns, the target location has matrix or the provided address is invalid.
     *
     * @param {SimpleCellAddress} sourceLeftCorner - address of the upper left corner of a moved block
     * @param {number} width - width of the cell block that is being moved
     * @param {number} height - height of the cell block that is being moved
     * @param {SimpleCellAddress} destinationLeftCorner - upper left address of the target cell block
     *
     * @example
     * ```js
     * const hfInstance = HyperFormula.buildFromArray([
     *  ['1', '2'],
     * ]);
     *
     * // choose the coordinates and assign them to variables
     * const source = { sheet: 0, col: 1, row: 0 };
     * const destination = { sheet: 0, col: 3, row: 0 };
     *
     * // should return 'true' for this example
     * // it is possible to move a block of width 1 and height 1
     * // from the corner: column 1 and row 0 of sheet 0
     * // into destination corner: column 3, row 0 of sheet 0
     * const isMovable = hfInstance.isItPossibleToMoveCells(source, 1, 1, destination);
     * ```
     * @category Cells
     */

  }, {
    key: "isItPossibleToMoveCells",
    value: function isItPossibleToMoveCells(sourceLeftCorner, width, height, destinationLeftCorner) {
      try {
        this._crudOperations.operations.ensureItIsPossibleToMoveCells(sourceLeftCorner, width, height, destinationLeftCorner);

        return true;
      } catch (e) {
        return false;
      }
    }
    /**
     * Moves the content of a cell block from source to the target location.
     *
     * Note that this method may trigger dependency graph recalculation.
     *
     * @param {SimpleCellAddress} sourceLeftCorner - address of the upper left corner of a moved block
     * @param {number} width - width of the cell block that is being moved
     * @param {number} height - height of the cell block that is being moved
     * @param {SimpleCellAddress} destinationLeftCorner - upper left address of the target cell block
     *
     * @fires [[valuesUpdated]] if recalculation was triggered by this change
     *
     * @throws [[InvalidArgumentsError]] when the given arguments are invalid
     * @throws [[SheetSizeLimitExceededError]] when performing this operation would result in sheet size limits exceeding
     * @throws [[SourceLocationHasMatrixError]] when the source location has matrix inside - matrix cannot be moved
     * @throws [[TargetLocationHasMatrixError]] when the target location has matrix inside - cells cannot be replaced by the matrix
     *
     * @example
     * ```js
     * const hfInstance = HyperFormula.buildFromArray([
     *  ['=RAND()', '42'],
     * ]);
     *
     * // choose the coordinates and assign them to variables
     * const source = { sheet: 0, col: 1, row: 0 };
     * const destination = { sheet: 0, col: 3, row: 0 };
     *
     * // should return a list of cells which values changed after the operation,
     * // their absolute addresses and new values, for this example:
     * // [{
     * //   address: { sheet: 0, col: 0, row: 0 },
     * //   newValue: 0.93524248002062,
     * // }]
     * const changes = hfInstance.moveCells(source, 1, 1, destination);
     * ```
     *
     * @category Cells
     */

  }, {
    key: "moveCells",
    value: function moveCells(sourceLeftCorner, width, height, destinationLeftCorner) {
      this._crudOperations.moveCells(sourceLeftCorner, width, height, destinationLeftCorner);

      return this.recomputeIfDependencyGraphNeedsIt();
    }
    /**
     * Returns information whether it is possible to move a particular number of rows to a specified position in a given sheet.
     * Checks against particular rules to ascertain that moveRows can be called.
     * If returns `true`, doing [[moveRows]] operation won't throw any errors.
     * Returns `false` if the operation might be disrupted and causes side-effects by the fact that there is a matrix inside the selected rows, the target location has matrix or the provided address is invalid.
     *
     * @param {number} sheetId - a sheet number in which the operation will be performed
     * @param {number} startRow - number of the first row to move
     * @param {number} numberOfRows - number of rows to move
     * @param {number} targetRow - row number before which rows will be moved
     *
     * @example
     * ```js
     * const hfInstance = HyperFormula.buildFromArray([
     *  ['1'],
     *  ['2'],
     * ]);
     *
     * // should return 'true' for this example
     * // it is possible to move one row from row 0 into row 2
     * const isMovable = hfInstance.isItPossibleToMoveRows(0, 0, 1, 2);
     * ```
     *
     * @category Rows
     */

  }, {
    key: "isItPossibleToMoveRows",
    value: function isItPossibleToMoveRows(sheetId, startRow, numberOfRows, targetRow) {
      try {
        this._crudOperations.ensureItIsPossibleToMoveRows(sheetId, startRow, numberOfRows, targetRow);

        return true;
      } catch (e) {
        return false;
      }
    }
    /**
     * Moves a particular number of rows to a specified position in a given sheet.
     *
     * Note that this method may trigger dependency graph recalculation.
     *
     * @param {number} sheetId - a sheet number in which the operation will be performed
     * @param {number} startRow - number of the first row to move
     * @param {number} numberOfRows - number of rows to move
     * @param {number} targetRow - row number before which rows will be moved
     *
     * @fires [[valuesUpdated]] if recalculation was triggered by this change
     *
     * @throws [[InvalidArgumentsError]] when the given arguments are invalid
     * @throws [[SourceLocationHasMatrixError]] when the source location has matrix inside - matrix cannot be moved
     * @throws [[TargetLocationHasMatrixError]] when the target location has matrix inside - cells cannot be replaced by the matrix
     *
     * @example
     * ```js
     * const hfInstance = HyperFormula.buildFromArray([
     *  ['1'],
     *  ['2'],
     * ]);
     *
     * // should return a list of cells which values changed after the operation,
     * // their absolute addresses and new values
     * const changes = hfInstance.moveRows(0, 0, 1, 2);
     * ```
     *
     * @category Rows
     */

  }, {
    key: "moveRows",
    value: function moveRows(sheetId, startRow, numberOfRows, targetRow) {
      this._crudOperations.moveRows(sheetId, startRow, numberOfRows, targetRow);

      return this.recomputeIfDependencyGraphNeedsIt();
    }
    /**
     * Returns information whether it is possible to move a particular number of columns to a specified position in a given sheet.
     * Checks against particular rules to ascertain that moveColumns can be called.
     * If returns `true`, doing [[moveColumns]] operation won't throw any errors.
     * Returns `false` if the operation might be disrupted and causes side-effects by the fact that there is a matrix inside the selected columns, the target location has matrix or the provided address is invalid.
     *
     * @param {number} sheetId - a sheet number in which the operation will be performed
     * @param {number} startColumn - number of the first column to move
     * @param {number} numberOfColumns - number of columns to move
     * @param {number} targetColumn - column number before which columns will be moved
     *
     * @example
     * ```js
     * const hfInstance = HyperFormula.buildFromArray([
     *  ['1', '2'],
     * ]);
     *
     * // should return 'true' for this example
     * // it is possible to move one column from column 1 into column 2 of sheet 0
     * const isMovable = hfInstance.isItPossibleToMoveColumns(0, 1, 1, 2);
     * ```
     *
     * @category Columns
     */

  }, {
    key: "isItPossibleToMoveColumns",
    value: function isItPossibleToMoveColumns(sheetId, startColumn, numberOfColumns, targetColumn) {
      try {
        this._crudOperations.ensureItIsPossibleToMoveColumns(sheetId, startColumn, numberOfColumns, targetColumn);

        return true;
      } catch (e) {
        return false;
      }
    }
    /**
     * Moves a particular number of columns to a specified position in a given sheet.
     *
     * Note that this method may trigger dependency graph recalculation.
     *
     * @param {number} sheetId - a sheet number in which the operation will be performed
     * @param {number} startColumn - number of the first column to move
     * @param {number} numberOfColumns - number of columns to move
     * @param {number} targetColumn - column number before which columns will be moved
     *
     * @fires [[valuesUpdated]] if recalculation was triggered by this change
     *
     * @throws [[InvalidArgumentsError]] when the given arguments are invalid
     * @throws [[SourceLocationHasMatrixError]] when the source location has matrix inside - matrix cannot be moved
     * @throws [[TargetLocationHasMatrixError]] when the target location has matrix inside - cells cannot be replaced by the matrix
     *
     * @example
     * ```js
     * const hfInstance = HyperFormula.buildFromArray([
     *  ['1', '2', '3', '=RAND()', '=SUM(A1:C1)'],
     * ]);
     *
     * // should return a list of cells which values changed after the operation,
     * // their absolute addresses and new values, for this example:
     * // [{
     * //   address: { sheet: 0, col: 1, row: 0 },
     * //   newValue: 0.16210054671639,
     * //  }, {
     * //   address: { sheet: 0, col: 4, row: 0 },
     * //   newValue: 6.16210054671639,
     * // }]
     * const changes = hfInstance.moveColumns(0, 1, 1, 2);
     * ```
     *
     * @category Columns
     */

  }, {
    key: "moveColumns",
    value: function moveColumns(sheetId, startColumn, numberOfColumns, targetColumn) {
      this._crudOperations.moveColumns(sheetId, startColumn, numberOfColumns, targetColumn);

      return this.recomputeIfDependencyGraphNeedsIt();
    }
    /**
     * Stores a copy of the cell block in internal clipboard for the further paste.
     * Returns values of cells for use in external clipboard.
     *
     * @param {SimpleCellAddress} sourceLeftCorner - address of the upper left corner of a copied block
     * @param {number} width - width of the cell block being copied
     * @param {number} height - height of the cell block being copied
     *
     * @throws an error while attempting to copy unsupported content type
     *
     * @example
     * ```js
     * const hfInstance = HyperFormula.buildFromArray([
     *  ['1', '2'],
     * ]);
     *
     * // should return: [ [ 2 ] ]
     * const clipboardContent = hfInstance.copy({ sheet: 0, col: 1, row: 0 }, 1, 1);
     * ```
     *
     * @category Clipboard
     */

  }, {
    key: "copy",
    value: function copy(sourceLeftCorner, width, height) {
      this._crudOperations.copy(sourceLeftCorner, width, height);

      return this.getRangeValues(sourceLeftCorner, width, height);
    }
    /**
     * Stores information of the cell block in internal clipboard for further paste.
     * Calling [[paste]] right after this method is equivalent to call [[moveCells]].
     * Almost any CRUD operation called after this method will abort the cut operation.
     * Returns values of cells for use in external clipboard.
     *
     * @param {SimpleCellAddress} sourceLeftCorner - address of the upper left corner of a copied block
     * @param {number} width - width of the cell block being copied
     * @param {number} height - height of the cell block being copied
     *
     * @example
     * ```js
     * const hfInstance = HyperFormula.buildFromArray([
     *  ['1', '2'],
     * ]);
     *
     * // should return values that were cut: [ [ 1 ] ]
     * const clipboardContent = hfInstance.cut({ sheet: 0, col: 0, row: 0 }, 1, 1);
     * ```
     *
     * @category Clipboard
     */

  }, {
    key: "cut",
    value: function cut(sourceLeftCorner, width, height) {
      this._crudOperations.cut(sourceLeftCorner, width, height);

      return this.getRangeValues(sourceLeftCorner, width, height);
    }
    /**
     * When called after [[copy]] it will paste copied values and formulas into a cell block.
     * When called after [[cut]] it will perform [[moveCells]] operation into the cell block.
     * Does nothing if the clipboard is empty.
     *
     * Note that this method may trigger dependency graph recalculation.
     *
     * @param {SimpleCellAddress} targetLeftCorner - upper left address of the target cell block
     *
     * @fires [[valuesUpdated]] if recalculation was triggered by this change
     *
     * @throws an error while attempting to paste onto a matrix
     * @throws [[EvaluationSuspendedError]] when the evaluation is suspended
     * @throws [[SheetSizeLimitExceededError]] when performing this operation would result in sheet size limits exceeding
     * @throws [[NothingToPasteError]] when clipboard is empty
     * @throws [[TargetLocationHasMatrixError]] when the selected target area has matrix inside
     *
     * @example
     * ```js
     * const hfInstance = HyperFormula.buildFromArray([
     *  ['1', '2'],
     * ]);
     *
     * // do a copy, [ [ 2 ] ] was copied
     * hfInstance.copy({ sheet: 0, col: 0, row: 0 }, 1, 1);
     *
     * // do a paste, should return a list of cells which values changed
     * // after the operation, their absolute addresses and new values
     * const changes = hfInstance.paste({ sheet: 0, col: 1, row: 0 });
     * ```
     *
     * @category Clipboard
     */

  }, {
    key: "paste",
    value: function paste(targetLeftCorner) {
      this.ensureEvaluationIsNotSuspended();

      this._crudOperations.paste(targetLeftCorner);

      return this.recomputeIfDependencyGraphNeedsIt();
    }
    /**
     * Returns information whether there is something in the clipboard.
     *
     * @example
     * ```js
     * const hfInstance = HyperFormula.buildFromArray([
     *  ['1', '2'],
     * ]);
     *
     * // copy desired content
     * hfInstance.copy({ sheet: 0, col: 1, row: 0 }, 1, 1);
     *
     * // returns 'false', there is content in the clipboard
     * const isClipboardEmpty = hfInstance.isClipboardEmpty();
     * ```
     *
     * @category Clipboard
     */

  }, {
    key: "isClipboardEmpty",
    value: function isClipboardEmpty() {
      return this._crudOperations.isClipboardEmpty();
    }
    /**
     * Clears the clipboard content.
     *
     * @example
     * ```js
     * // clears the clipboard, isClipboardEmpty() should return true if called afterwards
     * hfInstance.clearClipboard();
     * ```
     *
     * @category Clipboard
     */

  }, {
    key: "clearClipboard",
    value: function clearClipboard() {
      this._crudOperations.clearClipboard();
    }
    /**
     * Clears the redo stack in undoRedo history.
     *
     * @example
     * ```js
     * const hfInstance = HyperFormula.buildFromArray([
     *   ['1', '2', '3'],
     * ]);
     *
     * // do an operation, for example remove columns
     * hfInstance.removeColumns(0, [0, 1]);
     *
     * // undo the operation
     * hfInstance.undo();
     *
     * // redo the operation
     * hfInstance.redo();
     *
     * // clear the redo stack
     * hfInstance.clearRedoStack();
     * ```
     *
     * @category Undo and Redo
     */

  }, {
    key: "clearRedoStack",
    value: function clearRedoStack() {
      this._crudOperations.undoRedo.clearRedoStack();
    }
    /**
     * Clears the undo stack in undoRedo history.
     *
     * @example
     * ```js
     * const hfInstance = HyperFormula.buildFromArray([
     *   ['1', '2', '3'],
     * ]);
     *
     * // do an operation, for example remove columns
     * hfInstance.removeColumns(0, [0, 1]);
     *
     * // undo the operation
     * hfInstance.undo();
     *
     * // clear the undo stack
     * hfInstance.clearUndoStack();
     * ```
     *
     * @category Undo and Redo
     */

  }, {
    key: "clearUndoStack",
    value: function clearUndoStack() {
      this._crudOperations.undoRedo.clearUndoStack();
    }
    /**
     * Returns the cell content of a given range in a [[CellValue]][][] format.
     *
     * @param {SimpleCellAddress} leftCorner - address of the upper left corner of a range
     * @param {number} width - width of a range
     * @param {number} height - height of a range
     *
     * @example
     * ```js
     * const hfInstance = HyperFormula.buildFromArray([
     *  ['=SUM(1,2)', '2', '10'],
     *  ['5', '6', '7'],
     *  ['40', '30', '20'],
     * ]);
     *
     *
     * // returns calculated cells content: [ [ 3, 2 ], [ 5, 6 ] ]
     * const rangeValues = hfInstance.getRangeValues({ sheet: 0, col: 0, row: 0 }, 2, 2);
     * ```
     *
     * @category Ranges
     */

  }, {
    key: "getRangeValues",
    value: function getRangeValues(leftCorner, width, height) {
      var _this2 = this;

      var cellRange = AbsoluteCellRange.spanFrom(leftCorner, width, height);
      return cellRange.arrayOfAddressesInRange().map(function (subarray) {
        return subarray.map(function (address) {
          return _this2.getCellValue(address);
        });
      });
    }
    /**
     * Returns cell formulas in given range.
     *
     * @param {SimpleCellAddress} leftCorner - address of the upper left corner of a range
     * @param {number} width - width of a range
     * @param {number} height - height of a range
     *
     * @example
     * ```js
     * const hfInstance = HyperFormula.buildFromArray([
     *  ['=SUM(1,2)', '2', '10'],
     *  ['5', '6', '7'],
     *  ['40', '30', '20'],
     * ]);
     *
     * // returns cell formulas of a given range only:
     * // [ [ '=SUM(1,2)', undefined ], [ undefined, undefined ] ]
     * const rangeFormulas = hfInstance.getRangeFormulas({ sheet: 0, col: 0, row: 0 }, 2, 2);
     * ```
     *
     * @category Ranges
     */

  }, {
    key: "getRangeFormulas",
    value: function getRangeFormulas(leftCorner, width, height) {
      var _this3 = this;

      var cellRange = AbsoluteCellRange.spanFrom(leftCorner, width, height);
      return cellRange.arrayOfAddressesInRange().map(function (subarray) {
        return subarray.map(function (address) {
          return _this3.getCellFormula(address);
        });
      });
    }
    /**
     * Returns serialized cells in given range.
     *
     * @param {SimpleCellAddress} leftCorner - address of the upper left corner of a range
     * @param {number} width - width of a range
     * @param {number} height - height of a range
     *
     * @example
     * ```js
     * const hfInstance = HyperFormula.buildFromArray([
     *  ['=SUM(1,2)', '2', '10'],
     *  ['5', '6', '7'],
     *  ['40', '30', '20'],
     * ]);
     *
     * // should return serialized cell content for the given range:
     * // [ [ '=SUM(1,2)', 2 ], [ 5, 6 ] ]
     * const rangeSerialized = hfInstance.getRangeSerialized({ sheet: 0, col: 0, row: 0 }, 2, 2);
     * ```
     *
     * @category Ranges
     */

  }, {
    key: "getRangeSerialized",
    value: function getRangeSerialized(leftCorner, width, height) {
      var _this4 = this;

      var cellRange = AbsoluteCellRange.spanFrom(leftCorner, width, height);
      return cellRange.arrayOfAddressesInRange().map(function (subarray) {
        return subarray.map(function (address) {
          return _this4.getCellSerialized(address);
        });
      });
    }
    /**
     * Returns information whether it is possible to add a sheet to the engine.
     * Checks against particular rules to ascertain that addSheet can be called.
     * If returns `true`, doing [[addSheet]] operation won't throw any errors and it possible to add sheet with provided name.
     * Returns `false` if the chosen name is already used.
     *
     * @param {string} sheetName - sheet name, case insensitive
     *
     * @example
     * ```js
     * const hfInstance = HyperFormula.buildFromSheets({
     *   MySheet1: [ ['1'] ],
     *   MySheet2: [ ['10'] ],
     * });
     *
     * // should return 'false' because 'MySheet2' already exists
     * const isAddable = hfInstance.isItPossibleToAddSheet('MySheet2');
     * ```
     *
     * @category Sheets
     */

  }, {
    key: "isItPossibleToAddSheet",
    value: function isItPossibleToAddSheet(sheetName) {
      try {
        this._crudOperations.ensureItIsPossibleToAddSheet(sheetName);

        return true;
      } catch (e) {
        return false;
      }
    }
    /**
     * Adds a new sheet to the HyperFormula instance. Returns given or autogenerated name of a new sheet.
     *
     * @param {string} [sheetName] - if not specified, name will be autogenerated
     *
     * @fires [[sheetAdded]] after the sheet was added
     *
     * @throws [[SheetNameAlreadyTakenError]] when sheet with a given name already exists
     *
     * @example
     * ```js
     * const hfInstance = HyperFormula.buildFromSheets({
     *  MySheet1: [ ['1'] ],
     *  MySheet2: [ ['10'] ],
     * });
     *
     * // should return 'MySheet3'
     * const nameProvided = hfInstance.addSheet('MySheet3');
     *
     * // should return autogenerated 'Sheet4'
     * // because no name was provided and 3 other ones already exist
     * const generatedName = hfInstance.addSheet();
     * ```
     *
     * @category Sheets
     */

  }, {
    key: "addSheet",
    value: function addSheet(sheetName) {
      var addedSheetName = this._crudOperations.addSheet(sheetName);

      this._emitter.emit(Events.SheetAdded, addedSheetName);

      return addedSheetName;
    }
    /**
     * Returns information whether it is possible to remove sheet for the engine.
     * Returns `true` if the provided name of a sheet exists and therefore it can be removed, doing [[removeSheet]] operation won't throw any errors.
     * Returns `false` if there is no sheet with a given name.
     *
     * @param {string} sheetName - sheet name, case insensitive
     *
     * @example
     * ```js
     * const hfInstance = HyperFormula.buildFromSheets({
     *  MySheet1: [ ['1'] ],
     *  MySheet2: [ ['10'] ],
     * });
     *
     * // should return 'true' because 'MySheet2' exists and is removable
     * const isRemovable = hfInstance.isItPossibleToRemoveSheet('MySheet2');
     * ```
     *
     * @category Sheets
     */

  }, {
    key: "isItPossibleToRemoveSheet",
    value: function isItPossibleToRemoveSheet(sheetName) {
      try {
        this._crudOperations.ensureSheetExists(sheetName);

        return true;
      } catch (e) {
        return false;
      }
    }
    /**
     * Removes sheet with a specified name.
     *
     * Note that this method may trigger dependency graph recalculation.
     *
     * @param {string} sheetName - sheet name, case insensitive
     *
     * @fires [[sheetRemoved]] after the sheet was removed
     * @fires [[valuesUpdated]] if recalculation was triggered by this change
     *
     * @throws [[NoSheetWithNameError]] when the given sheet name does not exists
     *
     * @example
     * ```js
     * const hfInstance = HyperFormula.buildFromSheets({
     *  MySheet1: [ ['=SUM(MySheet2!A1:A2)'] ],
     *  MySheet2: [ ['10'] ],
     * });
     *
     * // should return a list of cells which values changed after the operation,
     * // their absolute addresses and new values, in this example it will return:
     * // [{
     * //   address: { sheet: 0, col: 0, row: 0 },
     * //   newValue: { error: [CellError], value: '#REF!' },
     * // }]
     * const changes = hfInstance.removeSheet('MySheet2');
     * ```
     *
     * @category Sheets
     */

  }, {
    key: "removeSheet",
    value: function removeSheet(sheetName) {
      var displayName = this.sheetMapping.getDisplayNameByName(sheetName);

      this._crudOperations.removeSheet(sheetName);

      var changes = this.recomputeIfDependencyGraphNeedsIt();

      this._emitter.emit(Events.SheetRemoved, displayName, changes);

      return changes;
    }
    /**
     * Returns information whether it is possible to clear a specified sheet.
     * If returns `true`, doing [[clearSheet]] operation won't throw any errors, provided name of a sheet exists and then its content can be cleared.
     * Returns `false` if there is no sheet with a given name.
     *
     * @param {string} sheetName - sheet name, case insensitive.
     *
     * @example
     * ```js
     * const hfInstance = HyperFormula.buildFromSheets({
     *  MySheet1: [ ['1'] ],
     *  MySheet2: [ ['10'] ],
     * });
     *
     * // should return 'true' because 'MySheet2' exists and can be cleared
     * const isClearable = hfInstance.isItPossibleToClearSheet('MySheet2');
     * ```
     *
     * @category Sheets
     */

  }, {
    key: "isItPossibleToClearSheet",
    value: function isItPossibleToClearSheet(sheetName) {
      try {
        this._crudOperations.ensureSheetExists(sheetName);

        return true;
      } catch (e) {
        return false;
      }
    }
    /**
     * Clears the sheet content. Based on that the method finds the ID of a sheet to be cleared.
     * Double-checks if the sheet exists.
     *
     * Note that this method may trigger dependency graph recalculation.
     *
     * @param {string} sheetName - sheet name, case insensitive.
     *
     * @fires [[valuesUpdated]] if recalculation was triggered by this change
     *
     * @throws [[NoSheetWithNameError]] when the given sheet name does not exists
     *
     * @example
     * ```js
     * const hfInstance = HyperFormula.buildFromSheets({
     *  MySheet1: [ ['=SUM(MySheet2!A1:A2)'] ],
     *  MySheet2: [ ['10'] ],
     * });
     *
     * // should return a list of cells which values changed after the operation,
     * // their absolute addresses and new values, in this example it will return:
     * // [{
     * //   address: { sheet: 0, col: 0, row: 0 },
     * //   newValue: 0,
     * // }]
     * const changes = hfInstance.clearSheet('MySheet2');
     * ```
     *
     * @category Sheets
     */

  }, {
    key: "clearSheet",
    value: function clearSheet(sheetName) {
      this._crudOperations.ensureSheetExists(sheetName);

      this._crudOperations.clearSheet(sheetName);

      return this.recomputeIfDependencyGraphNeedsIt();
    }
    /**
     * Returns information whether it is possible to replace the sheet content.
     * If returns `true`, doing [[setSheetContent]] operation won't throw any errors, the provided name of a sheet exists and then its content can be replaced.
     * Returns `false` if there is no sheet with a given name.
     *
     * @param {string} sheetName - sheet name, case insensitive.
     * @param {RawCellContent[][]} values - array of new values
     *
     * @example
     * ```js
     * const hfInstance = HyperFormula.buildFromSheets({
     *  MySheet1: [ ['1'] ],
     *  MySheet2: [ ['10'] ],
     * });
     *
     * // should return 'true' because 'MySheet1' exists
     * // and the provided content can be placed in this sheet
     * const isReplaceable = hfInstance.isItPossibleToReplaceSheetContent('MySheet1', [['50'], ['60']]);
     * ```
     *
     * @category Sheets
     */

  }, {
    key: "isItPossibleToReplaceSheetContent",
    value: function isItPossibleToReplaceSheetContent(sheetName, values) {
      try {
        this._crudOperations.ensureSheetExists(sheetName);

        var sheetId = this.sheetMapping.fetch(sheetName);

        this._crudOperations.ensureItIsPossibleToChangeSheetContents(sheetId, values);

        return true;
      } catch (e) {
        return false;
      }
    }
    /**
     * Replaces the sheet content with new values.
     * The new value is to be provided as an array of arrays of [[RawCellContent]].
     * The method finds sheet ID based on the provided sheet name.
     *
     * @param {string} sheetName - sheet name, case insensitive.
     * @param {RawCellContent[][]} values - array of new values
     *
     * @throws [[NoSheetWithNameError]] when the given sheet name does not exists
     * @throws [[InvalidArgumentsError]] when values is not an array of arrays
     *
     * @example
     * ```js
     * const hfInstance = HyperFormula.buildFromSheets({
     *  MySheet1: [ ['1'] ],
     *  MySheet2: [ ['10'] ],
     * });
     *
     * // should return a list of cells which values changed after the operation,
     * // their absolute addresses and new values
     * const changes = hfInstance.setSheetContent('MySheet1', [['50'], ['60']]);
     * ```
     *
     * @category Sheets
     */

  }, {
    key: "setSheetContent",
    value: function setSheetContent(sheetName, values) {
      this._crudOperations.setSheetContent(sheetName, values);

      return this.recomputeIfDependencyGraphNeedsIt();
    }
    /**
     * Computes simple (absolute) address of a cell address based on its string representation.
     * If sheet name is present in string representation but not present in the engine, returns `undefined`.
     * If sheet name is not present in string representation, returns the sheet number.
     * Returns an absolute representation of address.
     *
     * @param {string} cellAddress - string representation of cell address in A1 notation
     * @param {number} sheetId - override sheet index regardless of sheet mapping
     *
     * @example
     * ```js
     * const hfInstance = HyperFormula.buildEmpty();
     *
     * // should return { sheet: 0, col: 0, row: 0 }
     * const simpleCellAddress = hfInstance.simpleCellAddressFromString('A1', 0);
     * ```
     *
     * @category Helpers
     */

  }, {
    key: "simpleCellAddressFromString",
    value: function simpleCellAddressFromString(cellAddress, sheetId) {
      return _simpleCellAddressFromString(this.sheetMapping.get, cellAddress, sheetId);
    }
    /**
     * Returns string representation of an absolute address in A1 notation or `undefined` if the sheet index is not present in the engine.
     *
     * @param {SimpleCellAddress} cellAddress - object representation of an absolute address
     * @param {number} sheetId - if is not equal with address sheet index, string representation will contain sheet name
     *
     * @example
     * ```js
     * const hfInstance = HyperFormula.buildEmpty();
     *
     * // should return 'B2'
     * const A1Notation = hfInstance.simpleCellAddressToString({ sheet: 0, col: 1, row: 1 }, 0);
     * ```
     *
     * @category Helpers
     */

  }, {
    key: "simpleCellAddressToString",
    value: function simpleCellAddressToString(cellAddress, sheetId) {
      return _simpleCellAddressToString(this.sheetMapping.fetchDisplayName, cellAddress, sheetId);
    }
    /**
     * Returns all addresses and ranges whose computation depends on input address or range provided.
     *
     * @param {SimpleCellAddress | AbsoluteCellRange} address - object representation of an absolute address or range of addresses
     *
     * @example
     * ```js
     * const hfInstance = HyperFormula.buildFromArray( [ ['1', '=A1', '=A1+B1'] ] );
     *
     * hfInstance.getCellDependents({ sheet: 0, col: 0, row: 0});
     * // should return [{ sheet: 0, col: 1, row: 0}, { sheet: 0, col: 2, row: 0}]
     * ```
     *
     * @category Helpers
     */

  }, {
    key: "getCellDependents",
    value: function getCellDependents(address) {
      var vertex;

      if (address instanceof AbsoluteCellRange) {
        vertex = this._dependencyGraph.rangeMapping.getRange(address.start, address.end);

        if (vertex === undefined) {
          return [];
        }
      } else {
        vertex = this._dependencyGraph.addressMapping.getCell(address);

        if (vertex === null) {
          return [];
        }
      }

      return this._dependencyGraph.getAdjacentNodesAddresses(vertex);
    }
    /**
     * Returns all addresses and ranges necessary for computation of a given address or range.
     *
     * @param {SimpleCellAddress | AbsoluteCellRange} address - object representation of an absolute address or range of addresses
     *
     * @example
     * ```js
     * const hfInstance = HyperFormula.buildFromArray( [ ['1', '=A1', '=A1+B1'] ] );
     *
     * hfInstance.getCellPrecedents({ sheet: 0, col: 2, row: 0});
     * // should return [{ sheet: 0, col: 0, row: 0}, { sheet: 0, col: 1, row: 0}]
     * ```
     *
     * @category Helpers
     */

  }, {
    key: "getCellPrecedents",
    value: function getCellPrecedents(address) {
      var _a;

      var vertex;

      if (address instanceof AbsoluteCellRange) {
        vertex = this._dependencyGraph.rangeMapping.getRange(address.start, address.end);

        if (vertex === undefined) {
          return [];
        }
      } else {
        vertex = this._dependencyGraph.addressMapping.getCell(address);

        if (vertex === null) {
          return [];
        }
      }

      return (_a = this._dependencyGraph.dependencyQueryAddresses(vertex)) !== null && _a !== void 0 ? _a : [];
    }
    /**
     * Returns a unique sheet name assigned to the sheet of a given ID or `undefined` if the there is no sheet with a given ID.
     *
     * @param {number} sheetId - ID of the sheet, for which we want to retrieve name
     *
     * @example
     * ```js
     * const hfInstance = HyperFormula.buildFromSheets({
     *  MySheet1: [ ['1'] ],
     *  MySheet2: [ ['10'] ],
     * });
     *
     * // should return 'MySheet2' as this sheet is the second one
     * const sheetName = hfInstance.getSheetName(1);
     * ```
     *
     * @category Sheets
     */

  }, {
    key: "getSheetName",
    value: function getSheetName(sheetId) {
      return this.sheetMapping.getDisplayName(sheetId);
    }
    /**
     * List all sheet names.
     * Returns an array of sheet names as strings.
     *
     * @example
     * ```js
     * const hfInstance = HyperFormula.buildFromSheets({
     *  MySheet1: [ ['1'] ],
     *  MySheet2: [ ['10'] ],
     * });
     *
     * // should return all sheets names: ['MySheet1', 'MySheet2']
     * const sheetNames = hfInstance.getSheetNames();
     * ```
     *
     * @category Sheets
     */

  }, {
    key: "getSheetNames",
    value: function getSheetNames() {
      return this.sheetMapping.sheetNames();
    }
    /**
     * Returns a unique sheet ID assigned to the sheet with a given name or `undefined` if the sheet does not exist.
     *
     * @param {string} sheetName - name of the sheet, for which we want to retrieve ID, case insensitive.
     *
     * @example
     * ```js
     * const hfInstance = HyperFormula.buildFromSheets({
     *   MySheet1: [ ['1'] ],
     *   MySheet2: [ ['10'] ],
     * });
     *
     * // should return '0' because 'MySheet1' is of ID '0'
     * const sheetID = hfInstance.getSheetId('MySheet1');
     * ```
     *
     * @category Sheets
     */

  }, {
    key: "getSheetId",
    value: function getSheetId(sheetName) {
      return this.sheetMapping.get(sheetName);
    }
    /**
     * Returns `true` whether sheet with a given name exists. The methods accepts sheet name to be checked.
     *
     * @param {string} sheetName - name of the sheet, case insensitive.
     *
     * @example
     * ```js
     * const hfInstance = HyperFormula.buildFromSheets({
     *   MySheet1: [ ['1'] ],
     *   MySheet2: [ ['10'] ],
     * });
     *
     * // should return 'true' since 'MySheet1' exists
     * const sheetExist = hfInstance.doesSheetExist('MySheet1');
     * ```
     *
     * @category Sheets
     */

  }, {
    key: "doesSheetExist",
    value: function doesSheetExist(sheetName) {
      return this.sheetMapping.hasSheetWithName(sheetName);
    }
    /**
     * Returns type of a specified cell of a given address.
     * The methods accepts cell coordinates as object with column, row and sheet numbers.
     *
     * @param {SimpleCellAddress} cellAddress - cell coordinates
     *
     * @throws [[NoSheetWithIdError]] when the given sheet ID does not exist
     *
     * @example
     * ```js
     * const hfInstance = HyperFormula.buildFromArray([
     *  ['=SUM(A2:A3)', '2'],
     * ]);
     *
     * // should return 'FORMULA', the cell of given coordinates is of this type
     * const cellA1Type = hfInstance.getCellType({ sheet: 0, col: 0, row: 0 });
     *
     * // should return 'VALUE', the cell of given coordinates is of this type
     * const cellB1Type = hfInstance.getCellType({ sheet: 0, col: 1, row: 0 });
     * ```
     *
     * @category Cells
     */

  }, {
    key: "getCellType",
    value: function getCellType(cellAddress) {
      var vertex = this.dependencyGraph.getCell(cellAddress);
      return _getCellType(vertex);
    }
    /**
     * Returns `true` if the specified cell contains a simple value.
     * The methods accepts cell coordinates as object with column, row and sheet numbers.
     *
     * @param {SimpleCellAddress} cellAddress - cell coordinates
     *
     * @example
     * ```js
     * const hfInstance = HyperFormula.buildFromArray([
     *  ['=SUM(A2:A3)', '2'],
     * ]);
     *
     * // should return 'true' since the selected cell contains a simple value
     * const isA1Simple = hfInstance.doesCellHaveSimpleValue({ sheet: 0, col: 0, row: 0 });
     *
     * // should return 'false' since the selected cell does not contain a simple value
     * const isB1Simple = hfInstance.doesCellHaveSimpleValue({ sheet: 0, col: 1, row: 0 });
     * ```
     *
     * @category Cells
     */

  }, {
    key: "doesCellHaveSimpleValue",
    value: function doesCellHaveSimpleValue(cellAddress) {
      return this.getCellType(cellAddress) === CellType.VALUE;
    }
    /**
     * Returns `true` if the specified cell contains a formula.
     * The methods accepts cell coordinates as object with column, row and sheet numbers.
     *
     * @param {SimpleCellAddress} cellAddress - cell coordinates
     *
     * @example
     * ```js
     * const hfInstance = HyperFormula.buildFromArray([
     *  ['=SUM(A2:A3)', '2'],
     * ]);
     *
     * // should return 'true' since the A1 cell contains a formula
     * const A1Formula = hfInstance.doesCellHaveFormula({ sheet: 0, col: 0, row: 0 });
     *
     * // should return 'false' since the B1 cell does not contain a formula
     * const B1NoFormula = hfInstance.doesCellHaveFormula({ sheet: 0, col: 1, row: 0 });
     * ```
     *
     * @category Cells
     */

  }, {
    key: "doesCellHaveFormula",
    value: function doesCellHaveFormula(cellAddress) {
      return this.getCellType(cellAddress) === CellType.FORMULA;
    }
    /**
     * Returns`true` if the specified cell is empty.
     * The methods accepts cell coordinates as object with column, row and sheet numbers.
     *
     * @param {SimpleCellAddress} cellAddress - cell coordinates
     *
     * @example
     * ```js
     * const hfInstance = HyperFormula.buildFromArray([
     *   [null, '1'],
     * ]);
     *
     * // should return 'true', cell of provided coordinates is empty
     * const isEmpty = hfInstance.isCellEmpty({ sheet: 0, col: 0, row: 0 });
     *
     * // should return 'false', cell of provided coordinates is not empty
     * const isNotEmpty = hfInstance.isCellEmpty({ sheet: 0, col: 1, row: 0 });
     * ```
     *
     * @category Cells
     */

  }, {
    key: "isCellEmpty",
    value: function isCellEmpty(cellAddress) {
      return this.getCellType(cellAddress) === CellType.EMPTY;
    }
    /**
     * Returns `true` if a given cell is a part of a matrix.
     * The methods accepts cell coordinates as object with column, row and sheet numbers.
     *
     * @param {SimpleCellAddress} cellAddress - cell coordinates
     *
     * @example
     * ```js
     * const hfInstance = HyperFormula.buildFromArray([
     *    ['{=TRANSPOSE(B1:B1)}'],
     * ]);
     *
     * // should return 'true', cell of provided coordinates is a part of a matrix
     * const isPartOfMatrix = hfInstance.isCellPartOfMatrix({ sheet: 0, col: 0, row: 0 });
     * ```
     *
     * @category Cells
     */

  }, {
    key: "isCellPartOfMatrix",
    value: function isCellPartOfMatrix(cellAddress) {
      return this.getCellType(cellAddress) === CellType.MATRIX;
    }
    /**
     * Returns type of the cell value of a given address.
     * The methods accepts cell coordinates as object with column, row and sheet numbers.
     *
     * @param {SimpleCellAddress} cellAddress - cell coordinates
     *
     * @throws [[EvaluationSuspendedError]] when the evaluation is suspended
     *
     * @example
     * ```js
     * const hfInstance = HyperFormula.buildFromArray([
     *  ['=SUM(1,2,3)', '2'],
     * ]);
     *
     * // should return 'NUMBER', cell value type of provided coordinates is a number
     * const cellValue = hfInstance.getCellValueType({ sheet: 0, col: 1, row: 0 });
     *
     * // should return 'NUMBER', cell value type of provided coordinates is a number
     * const cellValue = hfInstance.getCellValueType({ sheet: 0, col: 0, row: 0 });
     * ```
     *
     * @category Cells
     */

  }, {
    key: "getCellValueType",
    value: function getCellValueType(cellAddress) {
      this.ensureEvaluationIsNotSuspended();
      var value = this.dependencyGraph.getCellValue(cellAddress);
      return _getCellValueType(value);
    }
    /**
     * Returns the number of existing sheets.
     *
     * @example
     * ```js
     * const hfInstance = HyperFormula.buildFromArray([
     *  ['1', '2'],
     * ]);
     *
     * // should return the number of sheets which is '1'
     * const sheetsCount = hfInstance.countSheets();
     * ```
     *
     * @category Sheets
     */

  }, {
    key: "countSheets",
    value: function countSheets() {
      return this.sheetMapping.numberOfSheets();
    }
    /**
     * Returns information whether it is possible to rename sheet.
     * Returns `true` if the sheet with provided id exists and new name is available
     * Returns `false` if sheet cannot be renamed
     *
     * @param {number} sheetId - a sheet number
     * @param {string} newName - a name of the sheet to be given
     *
     *
     * @example
     * ```js
     * const hfInstance = HyperFormula.buildFromSheets({
     *   MySheet1: [ ['1'] ],
     *   MySheet2: [ ['10'] ],
     * });
     *
     * // returns true
     * hfInstance.isItPossibleToRenameSheet(0, 'MySheet0');
     * ```
     *
     * @category Sheets
     */

  }, {
    key: "isItPossibleToRenameSheet",
    value: function isItPossibleToRenameSheet(sheetId, newName) {
      try {
        this._crudOperations.ensureItIsPossibleToRenameSheet(sheetId, newName);

        return true;
      } catch (e) {
        return false;
      }
    }
    /**
     * Renames a specified sheet.
     *
     * @param {number} sheetId - a sheet number
     * @param {string} newName - a name of the sheet to be given, if is the same as the old one the method does nothing
     *
     * @fires [[sheetRenamed]] after the sheet was renamed
     *
     * @throws [[NoSheetWithIdError]] when the given sheet ID does not exist
     *
     * @throws [[SheetNameAlreadyTakenError]] when the provided sheet name already exists
     *
     * @example
     * ```js
     * const hfInstance = HyperFormula.buildFromSheets({
     *   MySheet1: [ ['1'] ],
     *   MySheet2: [ ['10'] ],
     * });
     *
     * // renames the sheet 'MySheet1'
     * hfInstance.renameSheet(0, 'MySheet0');
     * ```
     *
     * @category Sheets
     */

  }, {
    key: "renameSheet",
    value: function renameSheet(sheetId, newName) {
      var oldName = this._crudOperations.renameSheet(sheetId, newName);

      if (oldName !== undefined) {
        this._emitter.emit(Events.SheetRenamed, oldName, newName);
      }
    }
    /**
     * Runs multiple operations and recomputes formulas at the end.
     *
     * Note that this method may trigger dependency graph recalculation.
     *
     * @param {() => void} batchOperations
     * @fires [[valuesUpdated]] if recalculation was triggered by this change
     *
     * @example
     * ```js
     * const hfInstance = HyperFormula.buildFromSheets({
     *  MySheet1: [ ['1'] ],
     *  MySheet2: [ ['10'] ],
     * });
     *
     * // multiple operations in a single callback will trigger evaluation only once
     * // and only one set of changes is returned as a combined result of all
     * // the operations that were triggered within the callback
     * const changes = hfInstance.batch(() => {
     *  hfInstance.setCellContents({ col: 3, row: 0, sheet: 0 }, [['=B1']]);
     *  hfInstance.setCellContents({ col: 4, row: 0, sheet: 0 }, [['=A1']]);
     * });
     * ```
     *
     * @category Batch
     */

  }, {
    key: "batch",
    value: function batch(batchOperations) {
      this.suspendEvaluation();

      this._crudOperations.beginUndoRedoBatchMode();

      try {
        batchOperations();
      } catch (e) {
        this._crudOperations.commitUndoRedoBatchMode();

        this.resumeEvaluation();
        throw e;
      }

      this._crudOperations.commitUndoRedoBatchMode();

      return this.resumeEvaluation();
    }
    /**
     * Suspends the dependency graph recalculation.
     * It allows optimizing the performance.
     * With this method, multiple CRUD operations can be done without triggering recalculation after every operation.
     * Suspending evaluation should result in an overall faster calculation compared to recalculating after each operation separately.
     * To resume the evaluation use [[resumeEvaluation]].
     *
     * @example
     * ```js
     * const hfInstance = HyperFormula.buildFromSheets({
     *  MySheet1: [ ['1'] ],
     *  MySheet2: [ ['10'] ],
     * });
     *
     * // similar to batch() but operations are not within a callback,
     * // one method suspends the recalculation
     * // the second will resume calculations and return the changes
     *
     * // suspend the evaluation with this method
     * hfInstance.suspendEvaluation();
     *
     * // perform operations
     * hfInstance.setCellContents({ col: 3, row: 0, sheet: 0 }, [['=B1']]);
     * hfInstance.setSheetContent('MySheet2', [['50'], ['60']]);
     *
     * // use resumeEvaluation to resume
     * const changes = hfInstance.resumeEvaluation();
     * ```
     *
     * @category Batch
     */

  }, {
    key: "suspendEvaluation",
    value: function suspendEvaluation() {
      this._evaluationSuspended = true;
    }
    /**
     * Resumes the dependency graph recalculation that was suspended with [[suspendEvaluation]].
     * It also triggers the recalculation and returns changes that are a result of all batched operations.
     *
     * @fires [[valuesUpdated]] if recalculation was triggered by this change
     *
     * @example
     * ```js
     * const hfInstance = HyperFormula.buildFromSheets({
     *  MySheet1: [ ['1'] ],
     *  MySheet2: [ ['10'] ],
     * });
     *
     * // similar to batch() but operations are not within a callback,
     * // one method suspends the recalculation
     * // the second will resume calculations and return the changes
     *
     * // first, suspend the evaluation
     * hfInstance.suspendEvaluation();
     *
     * // perform operations
     * hfInstance.setCellContents({ col: 3, row: 0, sheet: 0 }, [['=B1']]);
     * hfInstance.setSheetContent('MySheet2', [['50'], ['60']]);
     *
     * // resume the evaluation
     * const changes = hfInstance.resumeEvaluation();
     * ```
     *
     * @category Batch
     */

  }, {
    key: "resumeEvaluation",
    value: function resumeEvaluation() {
      this._evaluationSuspended = false;
      return this.recomputeIfDependencyGraphNeedsIt();
    }
    /**
     * Checks if the dependency graph recalculation process is suspended or not.
     *
     * @example
     * ```js
     * const hfInstance = HyperFormula.buildEmpty();
     *
     * // suspend the evaluation
     * hfInstance.suspendEvaluation();
     *
     * // between suspendEvaluation() and resumeEvaluation()
     * // or inside batch() callback it will return 'true', otherwise 'false'
     * const isEvaluationSuspended = hfInstance.isEvaluationSuspended();
     *
     * const changes = hfInstance.resumeEvaluation();
     * ```
     *
     * @category Batch
     */

  }, {
    key: "isEvaluationSuspended",
    value: function isEvaluationSuspended() {
      return this._evaluationSuspended;
    }
    /**
     * Returns information whether it is possible to add named expression into a specific scope.
     * Checks against particular rules to ascertain that addNamedExpression can be called.
     * If returns `true`, doing [[addNamedExpression]] operation won't throw any errors.
     * Returns `false` if the operation might be disrupted.
     *
     * @param {string} expressionName - a name of the expression to be added
     * @param {RawCellContent} expression - the expression
     * @param {string?} scope - scope definition, `sheetName` for local scope or `undefined` for global scope
     *
     * @example
     * ```js
     * const hfInstance = HyperFormula.buildFromArray([
     *  ['42'],
     * ]);
     *
     * // should return 'true' for this example,
     * // it is possible to add named expression to global scope
     * const isAddable = hfInstance.isItPossibleToAddNamedExpression('prettyName', '=Sheet1!$A$1+100');
     * ```
     *
     * @category Named Expressions
     */

  }, {
    key: "isItPossibleToAddNamedExpression",
    value: function isItPossibleToAddNamedExpression(expressionName, expression, scope) {
      try {
        this._crudOperations.ensureItIsPossibleToAddNamedExpression(expressionName, expression, scope);

        return true;
      } catch (e) {
        return false;
      }
    }
    /**
     * Adds a specified named expression.
     *
     * Note that this method may trigger dependency graph recalculation.
     *
     * @param {string} expressionName - a name of the expression to be added
     * @param {RawCellContent} expression - the expression
     * @param {string?} scope - scope definition, `sheetName` for local scope or `undefined` for global scope
     * @param {NamedExpressionOptions?} options - additional metadata related to named expression
     *
     * @fires [[namedExpressionAdded]] always, unless [[batch]] mode is used
     * @fires [[valuesUpdated]] if recalculation was triggered by this change
     *
     * @throws [[NamedExpressionNameIsAlreadyTaken]] when the named expression name is not available.
     * @throws [[NamedExpressionNameIsInvalid]] when the named expression name is not valid
     * @throws [[MatrixFormulasNotSupportedError]] when the named expression formula is a Matrix formula
     * @throws [[NoRelativeAddressesAllowedError]] when the named expression formula contains relative references
     * @throws [[NoSheetWithNameError]] when the given sheet name does not exists
     *
     * @example
     * ```js
     * const hfInstance = HyperFormula.buildFromArray([
     *  ['42'],
     * ]);
     *
     * // add own expression, scope limited to 'Sheet1', the method should return a list of cells which values
     * // changed after the operation, their absolute addresses and new values
     * // for this example:
     * // [{
     * //   name: 'prettyName',
     * //   newValue: 142,
     * // }]
     * const changes = hfInstance.addNamedExpression('prettyName', '=Sheet1!$A$1+100', 'Sheet1');
     * ```
     *
     * @category Named Expressions
     */

  }, {
    key: "addNamedExpression",
    value: function addNamedExpression(expressionName, expression, scope, options) {
      this._crudOperations.addNamedExpression(expressionName, expression, scope, options);

      var changes = this.recomputeIfDependencyGraphNeedsIt();

      this._emitter.emit(Events.NamedExpressionAdded, expressionName, changes);

      return changes;
    }
    /**
     * Gets specified named expression value.
     * Returns a [[CellValue]] or undefined if the given named expression does not exists.
     *
     * @param {string} expressionName - expression name, case insensitive.
     * @param {string?} scope - scope definition, `sheetName` for local scope or `undefined` for global scope
     *
     * @throws [[NoSheetWithNameError]] when the given sheet name does not exists
     *
     * @example
     * ```js
     * const hfInstance = HyperFormula.buildFromArray([
     *  ['42'],
     * ]);
     *
     * // add a named expression, only 'Sheet1' considered as it is the scope
     * hfInstance.addNamedExpression('prettyName', '=Sheet1!$A$1+100', 'Sheet1');
     *
     * // returns the calculated value of a passed named expression, '142' for this example
     * const myFormula = hfInstance.getNamedExpressionValue('prettyName', 'Sheet1');
     * ```
     *
     * @category Named Expressions
     */

  }, {
    key: "getNamedExpressionValue",
    value: function getNamedExpressionValue(expressionName, scope) {
      this.ensureEvaluationIsNotSuspended();

      var sheetId = this._crudOperations.scopeId(scope);

      var namedExpression = this._namedExpressions.namedExpressionForScope(expressionName, sheetId);

      if (namedExpression) {
        return this._serialization.getCellValue(namedExpression.address);
      } else {
        return undefined;
      }
    }
    /**
     * Returns a normalized formula string for given named expression or `undefined` for a named expression that does not exist or does not hold a formula.
     *
     * @param {string} expressionName - expression name, case insensitive.
     * @param {string?} scope - scope definition, `sheetName` for local scope or `undefined` for global scope
     *
     * @throws [[NoSheetWithNameError]] when the given sheet name does not exists
     *
     * @example
     * ```js
     * const hfInstance = HyperFormula.buildFromArray([
     *  ['42'],
     * ]);
     *
     * // add a named expression in 'Sheet1'
     * hfInstance.addNamedExpression('prettyName', '=Sheet1!$A$1+100', 'Sheet1');
     *
     * // returns a normalized formula string corresponding to a passed name from 'Sheet1',
     * // '=Sheet1!A1+100' for this example
     * const myFormula = hfInstance.getNamedExpressionFormula('prettyName', 'Sheet1');
     * ```
     *
     * @category Named Expressions
     */

  }, {
    key: "getNamedExpressionFormula",
    value: function getNamedExpressionFormula(expressionName, scope) {
      var sheetId = this._crudOperations.scopeId(scope);

      var namedExpression = this._namedExpressions.namedExpressionForScope(expressionName, sheetId);

      if (namedExpression === undefined) {
        return undefined;
      } else {
        return this._serialization.getCellFormula(namedExpression.address);
      }
    }
    /**
     * Returns named expression a normalized formula string for given named expression or `undefined` for a named expression that does not exist or does not hold a formula.
     *
     * @param {string} expressionName - expression name, case insensitive.
     * @param {string?} scope - scope definition, `sheetName` for local scope or `undefined` for global scope
     *
     * @throws [[NoSheetWithNameError]] when the given sheet name does not exists
     *
     * @example
     * ```js
     * const hfInstance = HyperFormula.buildFromArray([
     *  ['42'],
     * ]);
     *
     * // add a named expression in 'Sheet1'
     * hfInstance.addNamedExpression('prettyName', '=Sheet1!$A$1+100', 'Sheet1');
     *
     * // returns a normalized formula string corresponding to a passed name from 'Sheet1',
     * // '=Sheet1!$A$1+100' for this example
     * const myFormula = hfInstance.getNamedExpression('prettyName', 'Sheet1');
     * ```
     *
     * @category Named Expressions
     */

  }, {
    key: "getNamedExpression",
    value: function getNamedExpression(expressionName, scope) {
      var sheetId = this._crudOperations.scopeId(scope);

      var namedExpression = this._namedExpressions.namedExpressionForScope(expressionName, sheetId);

      if (namedExpression === undefined) {
        return undefined;
      }

      var expression = this._serialization.getCellFormula(namedExpression.address);

      return {
        name: expressionName,
        scope: scope,
        expression: expression,
        options: namedExpression.options
      };
    }
    /**
     * Returns information whether it is possible to change named expression in a specific scope.
     * Checks against particular rules to ascertain that changeNamedExpression can be called.
     * If returns `true`, doing [[changeNamedExpression]] operation won't throw any errors.
     * Returns `false` if the operation might be disrupted.
     *
     * @param {string} expressionName - an expression name, case insensitive.
     * @param {RawCellContent} newExpression - a new expression
     * @param {string?} scope - scope definition, `sheetName` for local scope or `undefined` for global scope
     *
     * @example
     * ```js
     * const hfInstance = HyperFormula.buildFromArray([
     *  ['42'],
     * ]);
     *
     * // add a named expression
     * hfInstance.addNamedExpression('prettyName', '=Sheet1!$A$1+100');
     *
     * // should return 'true' for this example,
     * // it is possible to change named expression
     * const isAddable = hfInstance.isItPossibleToChangeNamedExpression('prettyName', '=Sheet1!$A$1+100');
     * ```
     *
     * @category Named Expressions
     */

  }, {
    key: "isItPossibleToChangeNamedExpression",
    value: function isItPossibleToChangeNamedExpression(expressionName, newExpression, scope) {
      try {
        this._crudOperations.ensureItIsPossibleToChangeNamedExpression(expressionName, newExpression, scope);

        return true;
      } catch (e) {
        return false;
      }
    }
    /**
     * Changes a given named expression to a specified formula.
     *
     * Note that this method may trigger dependency graph recalculation.
     *
     * @param {string} expressionName - an expression name, case insensitive.
     * @param {RawCellContent} newExpression - a new expression
     * @param {string?} scope - scope definition, `sheetName` for local scope or `undefined` for global scope
     * @param {NamedExpressionOptions?} options - additional metadata related to named expression
     *
     * @fires [[valuesUpdated]] if recalculation was triggered by this change
     *
     * @throws [[NamedExpressionDoesNotExist]] when the given expression does not exist.
     * @throws [[NoSheetWithNameError]] when the given sheet name does not exists
     * @throws [[MatrixFormulasNotSupportedError]] when the named expression formula is a Matrix formula
     * @throws [[NoRelativeAddressesAllowedError]] when the named expression formula contains relative references
     *
     * @example
     * ```js
     * const hfInstance = HyperFormula.buildFromArray([
     *  ['42'],
     * ]);
     *
     * // add a named expression, scope limited to 'Sheet1'
     * hfInstance.addNamedExpression('prettyName', 'Sheet1', '=Sheet1!$A$1+100');
     *
     * // change the named expression
     * const changes = hfInstance.changeNamedExpression('prettyName', '=Sheet1!$A$1+200');
     * ```
     *
     * @category Named Expressions
     */

  }, {
    key: "changeNamedExpression",
    value: function changeNamedExpression(expressionName, newExpression, scope, options) {
      this._crudOperations.changeNamedExpressionExpression(expressionName, scope, newExpression, options);

      return this.recomputeIfDependencyGraphNeedsIt();
    }
    /**
     * Returns information whether it is possible to remove named expression from a specific scope.
     * Checks against particular rules to ascertain that removeNamedExpression can be called.
     * If returns `true`, doing [[removeNamedExpression]] operation won't throw any errors.
     * Returns `false` if the operation might be disrupted.
     *
     * @param {string} expressionName - an expression name, case insensitive.
     * @param {string?} scope - scope definition, `sheetName` for local scope or `undefined` for global scope
     *
     * @example
     * ```js
     * const hfInstance = HyperFormula.buildFromArray([
     *  ['42'],
     * ]);
     *
     * // add a named expression
     * hfInstance.addNamedExpression('prettyName', '=Sheet1!$A$1+100');
     *
     * // should return 'true' for this example,
     * // it is possible to change named expression
     * const isAddable = hfInstance.isItPossibleToRemoveNamedExpression('prettyName');
     * ```
     *
     * @category Named Expressions
     */

  }, {
    key: "isItPossibleToRemoveNamedExpression",
    value: function isItPossibleToRemoveNamedExpression(expressionName, scope) {
      try {
        this._crudOperations.isItPossibleToRemoveNamedExpression(expressionName, scope);

        return true;
      } catch (e) {
        return false;
      }
    }
    /**
     * Removes a named expression.
     *
     * Note that this method may trigger dependency graph recalculation.
     *
     * @param {string} expressionName - expression name, case insensitive.
     * @param {string?} sheetScope - scope definition, `sheetName` for local scope or `undefined` for global scope
     *
     * @fires [[namedExpressionRemoved]] after the expression was removed
     * @fires [[valuesUpdated]] if recalculation was triggered by this change
     *
     * @throws [[NamedExpressionDoesNotExist]] when the given expression does not exist.
     * @throws [[NoSheetWithNameError]] when the given sheet name does not exists
     *
     * @example
     * ```js
     * const hfInstance = HyperFormula.buildFromArray([
     *  ['42'],
     * ]);
     *
     * // add a named expression
     * hfInstance.addNamedExpression('prettyName', '=Sheet1!$A$1+100', 'Sheet1');
     *
     * // remove the named expression
     * const changes = hfInstance.removeNamedExpression('prettyName', 'Sheet1');
     * ```
     *
     * @category Named Expressions
     */

  }, {
    key: "removeNamedExpression",
    value: function removeNamedExpression(expressionName, scope) {
      var removedNamedExpression = this._crudOperations.removeNamedExpression(expressionName, scope);

      if (removedNamedExpression) {
        var changes = this.recomputeIfDependencyGraphNeedsIt();

        this._emitter.emit(Events.NamedExpressionRemoved, removedNamedExpression.displayName, changes);

        return changes;
      } else {
        return [];
      }
    }
    /**
     * Lists all named expressions.
     * Returns an array of expression names as strings
     *
     * @example
     * ```js
     * const hfInstance = HyperFormula.buildFromArray([
     *  ['42'],
     *  ['50'],
     * ]);
     *
     * // add two named expressions
     * hfInstance.addNamedExpression('prettyName', '=Sheet1!A1+100');
     * hfInstance.addNamedExpression('prettyName2', '=Sheet1!A2+100');
     *
     * // list the expressions, should return: ['prettyName', 'prettyName2'] for this example
     * const listOfExpressions = hfInstance.listNamedExpressions();
     * ```
     *
     * @category Named Expressions
     */

  }, {
    key: "listNamedExpressions",
    value: function listNamedExpressions() {
      return this._namedExpressions.getAllNamedExpressionsNames();
    }
    /**
     * Returns a normalized formula.
     *
     * @param {string} formulaString - a formula in a proper format - it must start with "="
     *
     * @throws [[NotAFormulaError]] when the provided string is not a valid formula, i.e does not start with "="
     *
     * @example
     * ```js
     * const hfInstance = HyperFormula.buildFromArray([
     *  ['42'],
     *  ['50'],
     * ]);
     *
     * // normalize the formula, should return '=Sheet1!A1+10' for this example
     * const normalizedFormula = hfInstance.normalizeFormula('=SHEET1!A1+10');
     * ```
     *
     * @category Helpers
     */

  }, {
    key: "normalizeFormula",
    value: function normalizeFormula(formulaString) {
      var _this$extractTemporar = this.extractTemporaryFormula(formulaString),
          _this$extractTemporar2 = _slicedToArray(_this$extractTemporar, 2),
          ast = _this$extractTemporar2[0],
          address = _this$extractTemporar2[1];

      if (ast === undefined) {
        throw new NotAFormulaError();
      }

      return this._unparser.unparse(ast, address);
    }
    /**
     * Calculates fire-and-forget formula, returns the calculated value.
     *
     * @param {string} formulaString -  a formula in a proper format - it must start with "="
     * @param {string} sheetName - a name of the sheet in context of which we evaluate formula, case insensitive.
     *
     * @throws [[NotAFormulaError]] when the provided string is not a valid formula, i.e does not start with "="
     * @throws [[NoSheetWithNameError]] when the given sheet name does not exists
     *
     * @example
     * ```js
     * const hfInstance = HyperFormula.buildFromSheets({
     *  Sheet1: [['22']],
     *  Sheet2: [['58']],
     * });
     *
     * // returns the value of calculated formula, '32' for this example
     * const calculatedFormula = hfInstance.calculateFormula('=A1+10', 'Sheet1');
     * ```
     *
     * @category Helpers
     */

  }, {
    key: "calculateFormula",
    value: function calculateFormula(formulaString, sheetName) {
      this._crudOperations.ensureSheetExists(sheetName);

      var sheetId = this.sheetMapping.fetch(sheetName);

      var _this$extractTemporar3 = this.extractTemporaryFormula(formulaString, sheetId),
          _this$extractTemporar4 = _slicedToArray(_this$extractTemporar3, 3),
          ast = _this$extractTemporar4[0],
          address = _this$extractTemporar4[1],
          dependencies = _this$extractTemporar4[2];

      if (ast === undefined) {
        throw new NotAFormulaError();
      }

      var internalCellValue = this.evaluator.runAndForget(ast, address, dependencies);
      return this._exporter.exportValue(internalCellValue);
    }
    /**
     * Validates the formula.
     * If the provided string starts with "=" and is a parsable formula the method returns `true`.
     *
     * @param {string} formulaString -  a formula in a proper format - it must start with "="
     *
     * @example
     * ```js
     * // checks if the given string is a valid formula, should return 'true' for this example
     * const isFormula = hfInstance.validateFormula('=SUM(1,2)');
     * ```
     *
     * @category Helpers
     */

  }, {
    key: "validateFormula",
    value: function validateFormula(formulaString) {
      var _this$extractTemporar5 = this.extractTemporaryFormula(formulaString),
          _this$extractTemporar6 = _slicedToArray(_this$extractTemporar5, 1),
          ast = _this$extractTemporar6[0];

      if (ast === undefined) {
        return false;
      }

      if (ast.type === AstNodeType.ERROR && !ast.error) {
        return false;
      }

      return true;
    }
    /**
     * Returns translated names of all functions registered in this instance of HyperFormula
     * according to the language set in the configuration
     *
     * @example
     * ```js
     * const hfInstance = HyperFormula.buildEmpty();
     *
     * // return translated names of all functions, assign to a variable
     * const allNames = hfInstance.getRegisteredFunctionNames();
     * ```
     *
     * @category Custom Functions
     */

  }, {
    key: "getRegisteredFunctionNames",
    value: function getRegisteredFunctionNames() {
      var language = HyperFormula.getLanguage(this._config.language);
      return language.getFunctionTranslations(this._functionRegistry.getRegisteredFunctionIds());
    }
    /**
     * Returns class of a plugin used by function with given id
     *
     * @param {string} functionId - id of a function, e.g. 'SUMIF'
     *
     * @example
     * ```js
     * // import your own plugin
     * import { MyExamplePlugin } from './file_with_your_plugin';
     *
     * const hfInstance = HyperFormula.buildEmpty();
     *
     * // register a plugin
     * HyperFormula.registerFunctionPlugin(MyExamplePlugin);
     *
     * // get the plugin
     * const myPlugin = hfInstance.getFunctionPlugin('EXAMPLE');
     * ```
     *
     * @category Custom Functions
     */

  }, {
    key: "getFunctionPlugin",
    value: function getFunctionPlugin(functionId) {
      return this._functionRegistry.getFunctionPlugin(functionId);
    }
    /**
     * Returns classes of all plugins registered in this instance of HyperFormula
     *
     * @example
     * ```js
     * const hfInstance = HyperFormula.buildEmpty();
     *
     * // return classes of all plugins registered, assign to a variable
     * const allNames = hfInstance.getAllFunctionPlugins();
     * ```
     *
     * @category Custom Functions
     */

  }, {
    key: "getAllFunctionPlugins",
    value: function getAllFunctionPlugins() {
      return this._functionRegistry.getPlugins();
    }
    /**
     * Interprets number as a date + time.
     *
     * @param {number} val - number of days since nullDate, should be nonnegative, fractions are interpreted as hours/minutes/seconds.
     *
     * @example
     * ```js
     * const hfInstance = HyperFormula.buildEmpty();
     *
     * // pass the number of days since nullDate
     * // the method should return formatted date and time, for this example:
     * // {year: 2020, month: 1, day: 15, hours: 2, minutes: 24, seconds: 0}
     * const dateTimeFromNumber = hfInstance.numberToDateTime(43845.1);
     *
     * ```
     *
     * @category Helpers
     */

  }, {
    key: "numberToDateTime",
    value: function numberToDateTime(val) {
      return this._evaluator.dateHelper.numberToSimpleDateTime(val);
    }
    /**
     * Interprets number as a date.
     *
     * @param {number} val - number of days since nullDate, should be nonnegative, fractions are ignored.
         * @example
     * ```js
     * const hfInstance = HyperFormula.buildEmpty();
     *
     * // pass the number of days since nullDate
     * // the method should return formatted date, for this example:
     * // {year: 2020, month: 1, day: 15}
     * const dateFromNumber = hfInstance.numberToDate(43845);
     * ```
     *
     * @category Helpers
     */

  }, {
    key: "numberToDate",
    value: function numberToDate(val) {
      return this._evaluator.dateHelper.numberToSimpleDate(val);
    }
    /**
     * Interprets number as a time (hours/minutes/seconds).
     *
     * @param {number} val - time in 24h units.
     *
     * @example
     * ```js
     * const hfInstance = HyperFormula.buildEmpty();
     *
     * // pass a number to be interpreted as a time
     * // should return {hours: 26, minutes: 24} for this example
     * const timeFromNumber = hfInstance.numberToTime(1.1);
     * ```
     *
     * @category Helpers
     */

  }, {
    key: "numberToTime",
    value: function numberToTime(val) {
      return numberToSimpleTime(val);
    }
  }, {
    key: "extractTemporaryFormula",
    value: function extractTemporaryFormula(formulaString) {
      var sheetId = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;

      var parsedCellContent = this._cellContentParser.parse(formulaString);

      var exampleTemporaryFormulaAddress = {
        sheet: sheetId,
        col: 0,
        row: 0
      };

      if (!(parsedCellContent instanceof CellContent.Formula)) {
        return [undefined, exampleTemporaryFormulaAddress, []];
      }

      var _this$_parser$parse = this._parser.parse(parsedCellContent.formula, exampleTemporaryFormulaAddress),
          ast = _this$_parser$parse.ast,
          errors = _this$_parser$parse.errors,
          dependencies = _this$_parser$parse.dependencies;

      if (errors.length > 0) {
        return [undefined, exampleTemporaryFormulaAddress, []];
      }

      return [ast, exampleTemporaryFormulaAddress, dependencies];
    }
    /**
     * A method that subscribes to an event.
     *
     * @param {Event} event the name of the event to subscribe to
     * @param {Listener} listener to be called when event is emitted
     *
     * @example
     * ```js
     * const hfInstance = HyperFormula.buildEmpty();
     *
     * // subscribe to a 'sheetAdded', pass a simple handler
     * hfInstance.on('sheetAdded', ( ) => { console.log('foo') });
     *
     * // add a sheet to trigger an event,
     * // console should print 'foo' after each time sheet is added in this example
     * hfInstance.addSheet('FooBar');
     * ```
     *
     * @category Events
     */

  }, {
    key: "on",
    value: function on(event, listener) {
      this._emitter.on(event, listener);
    }
    /**
     * A method that subscribes to an event once.
     *
     * @param {Event} event the name of the event to subscribe to
     * @param {Listener} listener to be called when event is emitted
     *
     * @example
     * ```js
     * const hfInstance = HyperFormula.buildEmpty();
     *
     * // subscribe to a 'sheetAdded', pass a simple handler
     * hfInstance.once('sheetAdded', ( ) => { console.log('foo') });
     *
     * // call addSheet twice,
     * // console should print 'foo' only once when the sheet is added in this example
     * hfInstance.addSheet('FooBar');
     * hfInstance.addSheet('FooBaz');
     * ```
     *
     * @category Events
     */

  }, {
    key: "once",
    value: function once(event, listener) {
      this._emitter.once(event, listener);
    }
    /**
     * A method that unsubscribe from an event or all events.
     *
     * @param {Event} event the name of the event to subscribe to
     * @param {Listener} listener to be called when event is emitted
     *
     * @example
     * ```js
     * const hfInstance = HyperFormula.buildEmpty();
     *
     * // define a simple function to be called upon emitting an event
     * const handler = ( ) => { console.log('baz') }
     *
     * // subscribe to a 'sheetAdded', pass the handler
     * hfInstance.on('sheetAdded', handler);
     *
     * // add a sheet to trigger an event,
     * // console should print 'baz' each time a sheet is added
     * hfInstance.addSheet('FooBar');
     *
     * // unsubscribe from a 'sheetAdded'
     * hfInstance.off('sheetAdded', handler);
     *
     * // add a sheet, the console should not print anything
     * hfInstance.addSheet('FooBaz');
     * ```
     *
     * @category Events
     */

  }, {
    key: "off",
    value: function off(event, listener) {
      this._emitter.off(event, listener);
    }
    /**
     * Destroys instance of HyperFormula.
     *
     * @example
     * ```js
     * // destroys the instance
     * hfInstance.destroy();
     * ```
     *
     * @category Instance
     */

  }, {
    key: "destroy",
    value: function destroy() {
      this.dependencyGraph.destroy();
      this.columnSearch.destroy();
      this.evaluator.destroy();

      this._parser.destroy();

      this._lazilyTransformingAstService.destroy();

      this._stats.destroy();

      this._crudOperations.clearClipboard();
    }
    /**
     * Runs a recomputation starting from recently changed vertices.
     *
     * Note that this method may trigger dependency graph recalculation.
     *
     * @fires [[valuesUpdated]] if recalculation was triggered by this change
     */

  }, {
    key: "recomputeIfDependencyGraphNeedsIt",
    value: function recomputeIfDependencyGraphNeedsIt() {
      if (!this._evaluationSuspended) {
        var changes = this._crudOperations.getAndClearContentChanges();

        var verticesToRecomputeFrom = Array.from(this.dependencyGraph.verticesToRecompute());
        this.dependencyGraph.clearRecentlyChangedVertices();

        if (verticesToRecomputeFrom.length > 0) {
          changes.addAll(this.evaluator.partialRun(verticesToRecomputeFrom));
        }

        var exportedChanges = changes.exportChanges(this._exporter);

        if (!changes.isEmpty()) {
          this._emitter.emit(Events.ValuesUpdated, exportedChanges);
        }

        return exportedChanges;
      } else {
        return [];
      }
    }
  }, {
    key: "graph",
    get: function get() {
      return this.dependencyGraph.graph;
    }
    /**
     * Calls the `rangeMapping` method on the dependency graph.
     * Allows to execute `rangeMapping` directly without a need to refer to `dependencyGraph`.
     *
     * @internal
     */

  }, {
    key: "rangeMapping",
    get: function get() {
      return this.dependencyGraph.rangeMapping;
    }
    /**
     * Calls the `matrixMapping` method on the dependency graph.
     * Allows to execute `matrixMapping` directly without a need to refer to `dependencyGraph`.
     *
     * @internal
     */

  }, {
    key: "matrixMapping",
    get: function get() {
      return this.dependencyGraph.matrixMapping;
    }
    /**
     * Calls the `sheetMapping` method on the dependency graph.
     * Allows to execute `sheetMapping` directly without a need to refer to `dependencyGraph`.
     *
     * @internal
     */

  }, {
    key: "sheetMapping",
    get: function get() {
      return this.dependencyGraph.sheetMapping;
    }
    /**
     * Calls the `addressMapping` method on the dependency graph.
     * Allows to execute `addressMapping` directly without a need to refer to `dependencyGraph`.
     *
     * @internal
     */

  }, {
    key: "addressMapping",
    get: function get() {
      return this.dependencyGraph.addressMapping;
    }
    /** @internal */

  }, {
    key: "dependencyGraph",
    get: function get() {
      return this._dependencyGraph;
    }
    /** @internal */

  }, {
    key: "evaluator",
    get: function get() {
      return this._evaluator;
    }
    /** @internal */

  }, {
    key: "columnSearch",
    get: function get() {
      return this._columnSearch;
    }
    /** @internal */

  }, {
    key: "lazilyTransformingAstService",
    get: function get() {
      return this._lazilyTransformingAstService;
    }
    /**
     * Returns state of the validity of the license key.
     *
     * @internal
     */

  }, {
    key: "licenseKeyValidityState",
    get: function get() {
      return this._config.licenseKeyValidityState;
    }
  }], [{
    key: "buildFromEngineState",
    value: function buildFromEngineState(engine) {
      return new HyperFormula(engine.config, engine.stats, engine.dependencyGraph, engine.columnSearch, engine.parser, engine.unparser, engine.cellContentParser, engine.evaluator, engine.lazilyTransformingAstService, engine.crudOperations, engine.exporter, engine.namedExpressions, engine.serialization, engine.functionRegistry);
    }
    /**
     * Builds the engine for a sheet from a two-dimensional array representation.
     * The engine is created with a single sheet.
     * Can be configured with the optional second parameter that represents a [[ConfigParams]].
     * If not specified, the engine will be built with the default configuration.
     *
     * @param {Sheet} sheet - two-dimensional array representation of sheet
     * @param {Partial<ConfigParams>} configInput - engine configuration
     *
     * @throws [[SheetSizeLimitExceededError]] when sheet size exceeds the limits
     * @throws [[InvalidArgumentsError]] when sheet is not an array of arrays
     * @throws [[FunctionPluginValidationError]] when plugin class definition is not consistent with metadata
     *
     * @example
     * ```js
     * // data represented as an array
     * const sheetData = [
     *  ['0', '=SUM(1,2,3)', '52'],
     *  ['=SUM(A1:C1)', '', '=A1'],
     *  ['2', '=SUM(A1:C1)', '91'],
     * ];
     *
     * // method with optional config parameter maxColumns
     * const hfInstance = HyperFormula.buildFromArray(sheetData, { maxColumns: 1000 });
     * ```
     *
     * @category Factories
     */

  }, {
    key: "buildFromArray",
    value: function buildFromArray(sheet, configInput) {
      return this.buildFromEngineState(BuildEngineFactory.buildFromSheet(sheet, configInput));
    }
    /**
     * Builds the engine from an object containing multiple sheets with names.
     * The engine is created with one or more sheets.
     * Can be configured with the optional second parameter that represents a [[ConfigParams]].
     * If not specified the engine will be built with the default configuration.
     *
     * @param {Sheet} sheets - object with sheets definition
     * @param {Partial<ConfigParams>} configInput - engine configuration
     *
     * @throws [[SheetSizeLimitExceededError]] when sheet size exceeds the limits
     * @throws [[InvalidArgumentsError]] when any sheet is not an array of arrays
     * @throws [[FunctionPluginValidationError]] when plugin class definition is not consistent with metadata
     *
     * @example
     * ```js
     * // data represented as an object with sheets: Sheet1 and Sheet2
     * const sheetData = {
     *  'Sheet1': [
     *    ['1', '', '=Sheet2!$A1'],
     *    ['', '2', '=SUM(1,2,3)'],
     *    ['=Sheet2!$A2', '2', ''],
     *   ],
     *  'Sheet2': [
     *    ['', '4', '=Sheet1!$B1'],
     *    ['', '8', '=SUM(9,3,3)'],
     *    ['=Sheet1!$B1', '2', ''],
     *   ],
     * };
     *
     * // method with optional config parameter useColumnIndex
     * const hfInstance = HyperFormula.buildFromSheets(sheetData, { useColumnIndex: true });
     * ```
     *
     * @category Factories
     */

  }, {
    key: "buildFromSheets",
    value: function buildFromSheets(sheets, configInput) {
      return this.buildFromEngineState(BuildEngineFactory.buildFromSheets(sheets, configInput));
    }
    /**
     * Builds an empty engine instance.
     * Can be configured with the optional parameter that represents a [[ConfigParams]].
     * If not specified the engine will be built with the default configuration.
     *
     * @param {Partial<ConfigParams>} configInput - engine configuration
     *
     * @example
     * ```js
     * // build with no initial data and with optional config parameter maxColumns
     * const hfInstance = HyperFormula.buildEmpty({ maxColumns: 1000 });
     * ```
     *
     * @category Factories
     */

  }, {
    key: "buildEmpty",
    value: function buildEmpty(configInput) {
      return this.buildFromEngineState(BuildEngineFactory.buildEmpty(configInput));
    }
    /**
     * Returns registered language from its code string.
     *
     * @param {string} languageCode - code string of the translation package
     *
     * @throws [[LanguageNotRegisteredError]] when trying to retrieve not registered language
     *
     * @example
     * ```js
     * // return registered language
     * const language = HyperFormula.getLanguage('enGB');
     * ```
     *
     * @category Static Methods
     */

  }, {
    key: "getLanguage",
    value: function getLanguage(languageCode) {
      var val = this.registeredLanguages.get(languageCode);

      if (val === undefined) {
        throw new LanguageNotRegisteredError();
      } else {
        return val;
      }
    }
    /**
     * Registers language from under given code string.
     *
     * @param {string} languageCode - code string of the translation package
     * @param {RawTranslationPackage} languagePackage - translation package to be registered
     *
     * @throws [[ProtectedFunctionTranslationError]] when trying to register translation for protected function
     * @throws [[LanguageAlreadyRegisteredError]] when given language is already registered
     *
     * @example
     * ```js
     * // return registered language
     * HyperFormula.registerLanguage('plPL', plPL);
     * ```
     *
     * @category Static Methods
     */

  }, {
    key: "registerLanguage",
    value: function registerLanguage(languageCode, languagePackage) {
      if (this.registeredLanguages.has(languageCode)) {
        throw new LanguageAlreadyRegisteredError();
      } else {
        this.registeredLanguages.set(languageCode, buildTranslationPackage(languagePackage));
      }
    }
    /**
     * Unregisters language that is registered under given code string.
     *
     * @param {string} languageCode - code string of the translation package
     *
     * @throws [[LanguageNotRegisteredError]] when given language is not registered
     *
     * @example
     * ```js
     * // register the language for the instance
     * HyperFormula.registerLanguage('plPL', plPL);
     *
     * // unregister plPL
     * HyperFormula.unregisterLanguage('plPL');
     * ```
     *
     * @category Static Methods
     */

  }, {
    key: "unregisterLanguage",
    value: function unregisterLanguage(languageCode) {
      if (this.registeredLanguages.has(languageCode)) {
        this.registeredLanguages.delete(languageCode);
      } else {
        throw new LanguageNotRegisteredError();
      }
    }
    /**
     * Returns all registered languages codes.
     *
     * @example
     * ```js
     * // should return all registered language codes: ['enGB', 'plPL']
     * const registeredLangugaes = HyperFormula.getRegisteredLanguagesCodes();
     * ```
     *
     * @category Static Methods
     */

  }, {
    key: "getRegisteredLanguagesCodes",
    value: function getRegisteredLanguagesCodes() {
      return Array.from(this.registeredLanguages.keys());
    }
    /**
     * Registers all functions in a given plugin with optional translations
     *
     * @param {FunctionPluginDefinition} plugin - plugin class
     * @param {FunctionTranslationsPackage} translations - optional package of function names translations
     *
     * @throws [[FunctionPluginValidationError]] when plugin class definition is not consistent with metadata
     * @throws [[ProtectedFunctionTranslationError]] when trying to register translation for protected function
     *
     * @example
     * ```js
     * // import your own plugin
     * import { MyExamplePlugin } from './file_with_your_plugin';
     *
     * // register the plugin
     * HyperFormula.registerFunctionPlugin(MyExamplePlugin);
     * ```
     *
     * @category Static Methods
     */

  }, {
    key: "registerFunctionPlugin",
    value: function registerFunctionPlugin(plugin, translations) {
      FunctionRegistry.registerFunctionPlugin(plugin, translations);
    }
    /**
     * Unregisters all functions defined in given plugin
     *
     * @param {FunctionPluginDefinition} plugin - plugin class
     *
     * @example
     * ```js
     * // get the class of a plugin
     * const registeredPluginClass = HyperFormula.getFunctionPlugin('EXAMPLE');
     *
     * // unregister all functions defined in a plugin of ID 'EXAMPLE'
     * HyperFormula.unregisterFunctionPlugin(registeredPluginClass);
     * ```
     *
     * @category Static Methods
     */

  }, {
    key: "unregisterFunctionPlugin",
    value: function unregisterFunctionPlugin(plugin) {
      FunctionRegistry.unregisterFunctionPlugin(plugin);
    }
    /**
     * Registers a function with a given id if such exists in a plugin
     *
     * @param {string} functionId - function id, e.g. 'SUMIF'
     * @param {FunctionPluginDefinition} plugin - plugin class
     * @param translations
     *
     * @throws [[FunctionPluginValidationError]] when function with a given id does not exists in plugin or plugin class definition is not consistent with metadata
     * @throws [[ProtectedFunctionTranslationError]] when trying to register translation for protected function
     * @example
     * ```js
     * // import your own plugin
     * import { MyExamplePlugin } from './file_with_your_plugin';
     *
     * // register a function
     * HyperFormula.registerFunction('EXAMPLE', MyExamplePlugin);
     * ```
     *
     * @category Static Methods
     */

  }, {
    key: "registerFunction",
    value: function registerFunction(functionId, plugin, translations) {
      FunctionRegistry.registerFunction(functionId, plugin, translations);
    }
    /**
     * Unregisters a function with a given id
     *
     * @param {string} functionId - function id, e.g. 'SUMIF'
     *
     * @example
     * ```js
     * // import your own plugin
     * import { MyExamplePlugin } from './file_with_your_plugin';
     *
     * // register a function
     * HyperFormula.registerFunction('EXAMPLE', MyExamplePlugin);
     *
     * // unregister a function
     * HyperFormula.unregisterFunction('EXAMPLE');
     * ```
     *
     * @category Static Methods
     */

  }, {
    key: "unregisterFunction",
    value: function unregisterFunction(functionId) {
      FunctionRegistry.unregisterFunction(functionId);
    }
    /**
     * Clears function registry
     *
     * @example
     * ```js
     * HyperFormula.unregisterAllFunctions();
     * ```
     *
     * @category Static Methods
     */

  }, {
    key: "unregisterAllFunctions",
    value: function unregisterAllFunctions() {
      FunctionRegistry.unregisterAll();
    }
    /**
     * Returns translated names of all registered functions for a given language
     *
     * @param {string} code - language code
     *
     * @example
     * ```js
     * // return a list of function names registered for enGB
     * const allNames = HyperFormula.getRegisteredFunctionNames('enGB');
     * ```
     *
     * @category Static Methods
     */

  }, {
    key: "getRegisteredFunctionNames",
    value: function getRegisteredFunctionNames(code) {
      var functionIds = FunctionRegistry.getRegisteredFunctionIds();
      var language = this.getLanguage(code);
      return language.getFunctionTranslations(functionIds);
    }
    /**
     * Returns class of a plugin used by function with given id
     *
     * @param {string} functionId - id of a function, e.g. 'SUMIF'
     *
     * @example
     * ```js
     * // import your own plugin
     * import { MyExamplePlugin } from './file_with_your_plugin';
     *
     * // register a plugin
     * HyperFormula.registerFunctionPlugin(MyExamplePlugin);
     *
     * // return the class of a given plugin
     * const myFunctionClass = HyperFormula.getFunctionPlugin('EXAMPLE');
     * ```
     *
     * @category Static Methods
     */

  }, {
    key: "getFunctionPlugin",
    value: function getFunctionPlugin(functionId) {
      return FunctionRegistry.getFunctionPlugin(functionId);
    }
    /**
     * Returns classes of all plugins registered in this instance of HyperFormula
     *
     * @example
     * ```js
     * // return classes of all plugins
     * const allClasses = HyperFormula.getAllFunctionPlugins();
     * ```
     *
     * @category Static Methods
     */

  }, {
    key: "getAllFunctionPlugins",
    value: function getAllFunctionPlugins() {
      return FunctionRegistry.getPlugins();
    }
  }]);

  return HyperFormula;
}();
/**
 * Version of the HyperFormula.
 *
 * @category Static Properties
 */

HyperFormula.version = "0.1.3";
/**
 * Latest build date.
 *
 * @category Static Properties
 */

HyperFormula.buildDate = "02/09/2020 13:37:52";
/**
 * A release date.
 *
 * @category Static Properties
 */

HyperFormula.releaseDate = "21/07/2020";
/**
 * Contains all available languages to use in registerLanguage.
 *
 * @category Static Properties
 */

HyperFormula.languages = {};
HyperFormula.registeredLanguages = new Map();