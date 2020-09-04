import "core-js/modules/es.symbol";
import "core-js/modules/es.symbol.description";
import "core-js/modules/es.symbol.iterator";
import "core-js/modules/es.array.from";
import "core-js/modules/es.array.iterator";
import "core-js/modules/es.array.map";
import "core-js/modules/es.array.reduce";
import "core-js/modules/es.array.slice";
import "core-js/modules/es.array.sort";
import "core-js/modules/es.function.name";
import "core-js/modules/es.number.constructor";
import "core-js/modules/es.number.is-integer";
import "core-js/modules/es.object.to-string";
import "core-js/modules/es.regexp.to-string";
import "core-js/modules/es.string.iterator";
import "core-js/modules/web.dom-collections.iterator";

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e2) { throw _e2; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e3) { didErr = true; err = _e3; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 * @license
 * Copyright (c) 2020 Handsoncode. All rights reserved.
 */
import { StatType } from './statistics';
import { ClipboardCellType } from './ClipboardOperations';
import { EmptyValue, invalidSimpleCellAddress, simpleCellAddress } from './Cell';
import { CellContent } from './CellContentParser';
import { ColumnsSpan, RowsSpan } from './Span';
import { ContentChanges } from './ContentChanges';
import { absolutizeDependencies } from './absolutizeDependencies';
import { buildMatrixVertex } from './GraphBuilder';
import { EmptyCellVertex, FormulaCellVertex, MatrixVertex, ParsingErrorVertex, SparseStrategy, ValueCellVertex } from './DependencyGraph';
import { InvalidArgumentsError, NamedExpressionDoesNotExistError, NoRelativeAddressesAllowedError, SheetSizeLimitExceededError, SourceLocationHasMatrixError, TargetLocationHasMatrixError } from './errors';
import { NamedExpressionDependency } from './parser';
import { AddRowsTransformer } from './dependencyTransformers/AddRowsTransformer';
import { RemoveRowsTransformer } from './dependencyTransformers/RemoveRowsTransformer';
import { AddColumnsTransformer } from './dependencyTransformers/AddColumnsTransformer';
import { MoveCellsTransformer } from './dependencyTransformers/MoveCellsTransformer';
import { RemoveSheetTransformer } from './dependencyTransformers/RemoveSheetTransformer';
import { RemoveColumnsTransformer } from './dependencyTransformers/RemoveColumnsTransformer';
import { AbsoluteCellRange } from './AbsoluteCellRange';
import { findBoundaries } from './Sheet';
import { doesContainRelativeReferences } from './NamedExpressions';
export var RemoveRowsCommand = /*#__PURE__*/function () {
  function RemoveRowsCommand(sheet, indexes) {
    _classCallCheck(this, RemoveRowsCommand);

    this.sheet = sheet;
    this.indexes = indexes;
  }

  _createClass(RemoveRowsCommand, [{
    key: "normalizedIndexes",
    value: function normalizedIndexes() {
      return normalizeRemovedIndexes(this.indexes);
    }
  }, {
    key: "rowsSpans",
    value: function rowsSpans() {
      var _this = this;

      return this.normalizedIndexes().map(function (normalizedIndex) {
        return RowsSpan.fromNumberOfRows(_this.sheet, normalizedIndex[0], normalizedIndex[1]);
      });
    }
  }]);

  return RemoveRowsCommand;
}();
export var AddRowsCommand = /*#__PURE__*/function () {
  function AddRowsCommand(sheet, indexes) {
    _classCallCheck(this, AddRowsCommand);

    this.sheet = sheet;
    this.indexes = indexes;
  }

  _createClass(AddRowsCommand, [{
    key: "normalizedIndexes",
    value: function normalizedIndexes() {
      return normalizeAddedIndexes(this.indexes);
    }
  }, {
    key: "rowsSpans",
    value: function rowsSpans() {
      var _this2 = this;

      return this.normalizedIndexes().map(function (normalizedIndex) {
        return RowsSpan.fromNumberOfRows(_this2.sheet, normalizedIndex[0], normalizedIndex[1]);
      });
    }
  }]);

  return AddRowsCommand;
}();
export var AddColumnsCommand = /*#__PURE__*/function () {
  function AddColumnsCommand(sheet, indexes) {
    _classCallCheck(this, AddColumnsCommand);

    this.sheet = sheet;
    this.indexes = indexes;
  }

  _createClass(AddColumnsCommand, [{
    key: "normalizedIndexes",
    value: function normalizedIndexes() {
      return normalizeAddedIndexes(this.indexes);
    }
  }, {
    key: "columnsSpans",
    value: function columnsSpans() {
      var _this3 = this;

      return this.normalizedIndexes().map(function (normalizedIndex) {
        return ColumnsSpan.fromNumberOfColumns(_this3.sheet, normalizedIndex[0], normalizedIndex[1]);
      });
    }
  }]);

  return AddColumnsCommand;
}();
export var RemoveColumnsCommand = /*#__PURE__*/function () {
  function RemoveColumnsCommand(sheet, indexes) {
    _classCallCheck(this, RemoveColumnsCommand);

    this.sheet = sheet;
    this.indexes = indexes;
  }

  _createClass(RemoveColumnsCommand, [{
    key: "normalizedIndexes",
    value: function normalizedIndexes() {
      return normalizeRemovedIndexes(this.indexes);
    }
  }, {
    key: "columnsSpans",
    value: function columnsSpans() {
      var _this4 = this;

      return this.normalizedIndexes().map(function (normalizedIndex) {
        return ColumnsSpan.fromNumberOfColumns(_this4.sheet, normalizedIndex[0], normalizedIndex[1]);
      });
    }
  }]);

  return RemoveColumnsCommand;
}();
export var Operations = /*#__PURE__*/function () {
  function Operations(dependencyGraph, columnSearch, cellContentParser, parser, stats, lazilyTransformingAstService, namedExpressions, config) {
    _classCallCheck(this, Operations);

    this.dependencyGraph = dependencyGraph;
    this.columnSearch = columnSearch;
    this.cellContentParser = cellContentParser;
    this.parser = parser;
    this.stats = stats;
    this.lazilyTransformingAstService = lazilyTransformingAstService;
    this.namedExpressions = namedExpressions;
    this.config = config;
    this.changes = ContentChanges.empty();
    this.allocateNamedExpressionAddressSpace();
  }

  _createClass(Operations, [{
    key: "removeRows",
    value: function removeRows(cmd) {
      var rowsRemovals = [];

      var _iterator = _createForOfIteratorHelper(cmd.rowsSpans()),
          _step;

      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var rowsToRemove = _step.value;
          var rowsRemoval = this.doRemoveRows(rowsToRemove);

          if (rowsRemoval) {
            rowsRemovals.push(rowsRemoval);
          }
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }

      return rowsRemovals;
    }
  }, {
    key: "addRows",
    value: function addRows(cmd) {
      var _iterator2 = _createForOfIteratorHelper(cmd.rowsSpans()),
          _step2;

      try {
        for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
          var addedRows = _step2.value;
          this.doAddRows(addedRows);
        }
      } catch (err) {
        _iterator2.e(err);
      } finally {
        _iterator2.f();
      }
    }
  }, {
    key: "addColumns",
    value: function addColumns(cmd) {
      var _iterator3 = _createForOfIteratorHelper(cmd.columnsSpans()),
          _step3;

      try {
        for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
          var addedColumns = _step3.value;
          this.doAddColumns(addedColumns);
        }
      } catch (err) {
        _iterator3.e(err);
      } finally {
        _iterator3.f();
      }
    }
  }, {
    key: "removeColumns",
    value: function removeColumns(cmd) {
      var columnsRemovals = [];

      var _iterator4 = _createForOfIteratorHelper(cmd.columnsSpans()),
          _step4;

      try {
        for (_iterator4.s(); !(_step4 = _iterator4.n()).done;) {
          var columnsToRemove = _step4.value;
          var columnsRemoval = this.doRemoveColumns(columnsToRemove);

          if (columnsRemoval) {
            columnsRemovals.push(columnsRemoval);
          }
        }
      } catch (err) {
        _iterator4.e(err);
      } finally {
        _iterator4.f();
      }

      return columnsRemovals;
    }
  }, {
    key: "removeSheet",
    value: function removeSheet(sheetName) {
      var _this5 = this;

      var sheetId = this.sheetMapping.fetch(sheetName);
      this.dependencyGraph.removeSheet(sheetId);
      var version;
      this.stats.measure(StatType.TRANSFORM_ASTS, function () {
        var transformation = new RemoveSheetTransformer(sheetId);
        transformation.performEagerTransformations(_this5.dependencyGraph, _this5.parser);
        version = _this5.lazilyTransformingAstService.addTransformation(transformation);
      });
      this.sheetMapping.removeSheet(sheetId);
      this.columnSearch.removeSheet(sheetId);
      return version;
    }
  }, {
    key: "clearSheet",
    value: function clearSheet(sheetId) {
      this.dependencyGraph.clearSheet(sheetId);
      this.columnSearch.removeSheet(sheetId);
    }
  }, {
    key: "addSheet",
    value: function addSheet(name) {
      var sheetId = this.sheetMapping.addSheet(name);
      var sheet = [];
      this.dependencyGraph.addressMapping.autoAddSheet(sheetId, sheet, findBoundaries(sheet));
      return this.sheetMapping.fetchDisplayName(sheetId);
    }
  }, {
    key: "renameSheet",
    value: function renameSheet(sheetId, newName) {
      return this.sheetMapping.renameSheet(sheetId, newName);
    }
  }, {
    key: "moveRows",
    value: function moveRows(sheet, startRow, numberOfRows, targetRow) {
      var rowsToAdd = RowsSpan.fromNumberOfRows(sheet, targetRow, numberOfRows);
      this.lazilyTransformingAstService.beginCombinedMode(sheet);
      this.doAddRows(rowsToAdd);

      if (targetRow < startRow) {
        startRow += numberOfRows;
      }

      var startAddress = simpleCellAddress(sheet, 0, startRow);
      var targetAddress = simpleCellAddress(sheet, 0, targetRow);
      this.moveCells(startAddress, Number.POSITIVE_INFINITY, numberOfRows, targetAddress);
      var rowsToRemove = RowsSpan.fromNumberOfRows(sheet, startRow, numberOfRows);
      this.doRemoveRows(rowsToRemove);
      return this.lazilyTransformingAstService.commitCombinedMode();
    }
  }, {
    key: "moveColumns",
    value: function moveColumns(sheet, startColumn, numberOfColumns, targetColumn) {
      var columnsToAdd = ColumnsSpan.fromNumberOfColumns(sheet, targetColumn, numberOfColumns);
      this.lazilyTransformingAstService.beginCombinedMode(sheet);
      this.doAddColumns(columnsToAdd);

      if (targetColumn < startColumn) {
        startColumn += numberOfColumns;
      }

      var startAddress = simpleCellAddress(sheet, startColumn, 0);
      var targetAddress = simpleCellAddress(sheet, targetColumn, 0);
      this.moveCells(startAddress, numberOfColumns, Number.POSITIVE_INFINITY, targetAddress);
      var columnsToRemove = ColumnsSpan.fromNumberOfColumns(sheet, startColumn, numberOfColumns);
      this.doRemoveColumns(columnsToRemove);
      return this.lazilyTransformingAstService.commitCombinedMode();
    }
  }, {
    key: "moveCells",
    value: function moveCells(sourceLeftCorner, width, height, destinationLeftCorner) {
      var _this6 = this;

      this.ensureItIsPossibleToMoveCells(sourceLeftCorner, width, height, destinationLeftCorner);
      var sourceRange = AbsoluteCellRange.spanFrom(sourceLeftCorner, width, height);
      var targetRange = AbsoluteCellRange.spanFrom(destinationLeftCorner, width, height);
      this.dependencyGraph.breakNumericMatricesInRange(sourceRange);
      this.dependencyGraph.breakNumericMatricesInRange(targetRange);
      var toRight = destinationLeftCorner.col - sourceLeftCorner.col;
      var toBottom = destinationLeftCorner.row - sourceLeftCorner.row;
      var toSheet = destinationLeftCorner.sheet;
      var currentDataAtTarget = this.getRangeClipboardCells(targetRange);
      var valuesToRemove = this.dependencyGraph.valuesFromRange(targetRange);
      this.columnSearch.removeValues(valuesToRemove);
      var valuesToMove = this.dependencyGraph.valuesFromRange(sourceRange);
      this.columnSearch.moveValues(valuesToMove, toRight, toBottom, toSheet);
      var version;
      this.stats.measure(StatType.TRANSFORM_ASTS, function () {
        var transformation = new MoveCellsTransformer(sourceRange, toRight, toBottom, toSheet);
        transformation.performEagerTransformations(_this6.dependencyGraph, _this6.parser);
        version = _this6.lazilyTransformingAstService.addTransformation(transformation);
      });
      this.dependencyGraph.moveCells(sourceRange, toRight, toBottom, toSheet);
      var addedGlobalNamedExpressions = this.updateNamedExpressionsForMovedCells(sourceLeftCorner, width, height, destinationLeftCorner);
      return {
        version: version,
        overwrittenCellsData: currentDataAtTarget,
        addedGlobalNamedExpressions: addedGlobalNamedExpressions
      };
    }
  }, {
    key: "addNamedExpression",
    value: function addNamedExpression(expressionName, expression, sheetId, options) {
      this.storeNamedExpressionInCell(this.namedExpressions.lookupNextAddress(expressionName, sheetId), expression);
      var namedExpression = this.namedExpressions.addNamedExpression(expressionName, sheetId, options);
      this.adjustNamedExpressionEdges(namedExpression, expressionName, sheetId);
    }
  }, {
    key: "restoreNamedExpression",
    value: function restoreNamedExpression(namedExpression, content, sheetId) {
      var expressionName = namedExpression.displayName;
      var options = namedExpression.options;
      this.restoreCell(namedExpression.address, content);
      var restoredNamedExpression = this.namedExpressions.addNamedExpression(expressionName, sheetId, options);
      this.adjustNamedExpressionEdges(restoredNamedExpression, expressionName, sheetId);
    }
  }, {
    key: "changeNamedExpressionExpression",
    value: function changeNamedExpressionExpression(expressionName, newExpression, sheetId, options) {
      var namedExpression = this.namedExpressions.namedExpressionForScope(expressionName, sheetId);

      if (!namedExpression) {
        throw new NamedExpressionDoesNotExistError(expressionName);
      }

      var oldNamedExpression = namedExpression.copy();
      namedExpression.options = options;
      var content = this.getClipboardCell(namedExpression.address);
      this.storeNamedExpressionInCell(namedExpression.address, newExpression);
      return [oldNamedExpression, content];
    }
  }, {
    key: "removeNamedExpression",
    value: function removeNamedExpression(expressionName, sheetId) {
      var namedExpression = this.namedExpressions.namedExpressionForScope(expressionName, sheetId);

      if (!namedExpression) {
        throw new NamedExpressionDoesNotExistError(expressionName);
      }

      this.namedExpressions.remove(namedExpression.displayName, sheetId);
      var content = this.getClipboardCell(namedExpression.address);

      if (sheetId !== undefined) {
        var globalNamedExpression = this.namedExpressions.workbookNamedExpressionOrPlaceholder(expressionName);
        this.dependencyGraph.exchangeNode(namedExpression.address, globalNamedExpression.address);
      } else {
        this.dependencyGraph.setCellEmpty(namedExpression.address);
      }

      return [namedExpression, content];
    }
  }, {
    key: "ensureItIsPossibleToMoveCells",
    value: function ensureItIsPossibleToMoveCells(sourceLeftCorner, width, height, destinationLeftCorner) {
      if (invalidSimpleCellAddress(sourceLeftCorner) || !(isPositiveInteger(width) && isPositiveInteger(height) || isRowOrColumnRange(sourceLeftCorner, width, height)) || invalidSimpleCellAddress(destinationLeftCorner) || !this.sheetMapping.hasSheetWithId(sourceLeftCorner.sheet) || !this.sheetMapping.hasSheetWithId(destinationLeftCorner.sheet)) {
        throw new InvalidArgumentsError('a valid range of cells to move.');
      }

      var sourceRange = AbsoluteCellRange.spanFrom(sourceLeftCorner, width, height);
      var targetRange = AbsoluteCellRange.spanFrom(destinationLeftCorner, width, height);

      if (targetRange.exceedsSheetSizeLimits(this.config.maxColumns, this.config.maxRows)) {
        throw new SheetSizeLimitExceededError();
      }

      if (this.dependencyGraph.matrixMapping.isFormulaMatrixInRange(sourceRange)) {
        throw new SourceLocationHasMatrixError();
      }

      if (this.dependencyGraph.matrixMapping.isFormulaMatrixInRange(targetRange)) {
        throw new TargetLocationHasMatrixError();
      }
    }
  }, {
    key: "restoreClipboardCells",
    value: function restoreClipboardCells(sourceSheetId, cells) {
      var addedNamedExpressions = [];

      var _iterator5 = _createForOfIteratorHelper(cells),
          _step5;

      try {
        for (_iterator5.s(); !(_step5 = _iterator5.n()).done;) {
          var _step5$value = _slicedToArray(_step5.value, 2),
              address = _step5$value[0],
              clipboardCell = _step5$value[1];

          this.restoreCell(address, clipboardCell);

          if (clipboardCell.type === ClipboardCellType.FORMULA) {
            var _this$parser$fetchCac = this.parser.fetchCachedResult(clipboardCell.hash),
                dependencies = _this$parser$fetchCac.dependencies;

            addedNamedExpressions.push.apply(addedNamedExpressions, _toConsumableArray(this.updateNamedExpressionsForTargetAddress(sourceSheetId, address, dependencies)));
          }
        }
      } catch (err) {
        _iterator5.e(err);
      } finally {
        _iterator5.f();
      }

      return addedNamedExpressions;
    }
  }, {
    key: "restoreCell",
    value: function restoreCell(address, clipboardCell) {
      switch (clipboardCell.type) {
        case ClipboardCellType.VALUE:
          {
            this.setValueToCell(clipboardCell.value, address);
            break;
          }

        case ClipboardCellType.FORMULA:
          {
            this.setFormulaToCellFromCache(clipboardCell.hash, address);
            break;
          }

        case ClipboardCellType.EMPTY:
          {
            this.setCellEmpty(address);
            break;
          }

        case ClipboardCellType.PARSING_ERROR:
          {
            this.setParsingErrorToCell(clipboardCell.rawInput, clipboardCell.errors, address);
            break;
          }
      }
    }
    /**
     * Removes multiple rows from sheet. </br>
     * Does nothing if rows are outside of effective sheet size.
     *
     * @param sheet - sheet id from which rows will be removed
     * @param rowStart - number of the first row to be deleted
     * @param rowEnd - number of the last row to be deleted
     * */

  }, {
    key: "doRemoveRows",
    value: function doRemoveRows(rowsToRemove) {
      var _this7 = this;

      if (this.rowEffectivelyNotInSheet(rowsToRemove.rowStart, rowsToRemove.sheet)) {
        return;
      }

      var removedCells = [];

      var _iterator6 = _createForOfIteratorHelper(this.dependencyGraph.entriesFromRowsSpan(rowsToRemove)),
          _step6;

      try {
        for (_iterator6.s(); !(_step6 = _iterator6.n()).done;) {
          var _step6$value = _slicedToArray(_step6.value, 1),
              address = _step6$value[0];

          removedCells.push({
            address: address,
            cellType: this.getClipboardCell(address)
          });
        }
      } catch (err) {
        _iterator6.e(err);
      } finally {
        _iterator6.f();
      }

      this.dependencyGraph.removeRows(rowsToRemove);
      var version;
      this.stats.measure(StatType.TRANSFORM_ASTS, function () {
        var transformation = new RemoveRowsTransformer(rowsToRemove);
        transformation.performEagerTransformations(_this7.dependencyGraph, _this7.parser);
        version = _this7.lazilyTransformingAstService.addTransformation(transformation);
      });
      return {
        version: version,
        removedCells: removedCells,
        rowFrom: rowsToRemove.rowStart,
        rowCount: rowsToRemove.numberOfRows
      };
    }
    /**
     * Removes multiple columns from sheet. </br>
     * Does nothing if columns are outside of effective sheet size.
     *
     * @param sheet - sheet id from which columns will be removed
     * @param columnStart - number of the first column to be deleted
     * @param columnEnd - number of the last row to be deleted
     */

  }, {
    key: "doRemoveColumns",
    value: function doRemoveColumns(columnsToRemove) {
      var _this8 = this;

      if (this.columnEffectivelyNotInSheet(columnsToRemove.columnStart, columnsToRemove.sheet)) {
        return;
      }

      var removedCells = [];

      var _iterator7 = _createForOfIteratorHelper(this.dependencyGraph.entriesFromColumnsSpan(columnsToRemove)),
          _step7;

      try {
        for (_iterator7.s(); !(_step7 = _iterator7.n()).done;) {
          var _step7$value = _slicedToArray(_step7.value, 1),
              address = _step7$value[0];

          removedCells.push({
            address: address,
            cellType: this.getClipboardCell(address)
          });
        }
      } catch (err) {
        _iterator7.e(err);
      } finally {
        _iterator7.f();
      }

      this.dependencyGraph.removeColumns(columnsToRemove);
      this.columnSearch.removeColumns(columnsToRemove);
      var version;
      this.stats.measure(StatType.TRANSFORM_ASTS, function () {
        var transformation = new RemoveColumnsTransformer(columnsToRemove);
        transformation.performEagerTransformations(_this8.dependencyGraph, _this8.parser);
        version = _this8.lazilyTransformingAstService.addTransformation(transformation);
      });
      return {
        version: version,
        removedCells: removedCells,
        columnFrom: columnsToRemove.columnStart,
        columnCount: columnsToRemove.numberOfColumns
      };
    }
    /**
     * Add multiple rows to sheet. </br>
     * Does nothing if rows are outside of effective sheet size.
     *
     * @param sheet - sheet id in which rows will be added
     * @param row - row number above which the rows will be added
     * @param numberOfRowsToAdd - number of rows to add
     */

  }, {
    key: "doAddRows",
    value: function doAddRows(addedRows) {
      var _this9 = this;

      if (this.rowEffectivelyNotInSheet(addedRows.rowStart, addedRows.sheet)) {
        return;
      }

      this.dependencyGraph.addRows(addedRows);
      this.stats.measure(StatType.TRANSFORM_ASTS, function () {
        var transformation = new AddRowsTransformer(addedRows);
        transformation.performEagerTransformations(_this9.dependencyGraph, _this9.parser);

        _this9.lazilyTransformingAstService.addTransformation(transformation);
      });
    }
    /**
     * Add multiple columns to sheet </br>
     * Does nothing if columns are outside of effective sheet size
     *
     * @param sheet - sheet id in which columns will be added
     * @param column - column number above which the columns will be added
     * @param numberOfColumns - number of columns to add
     */

  }, {
    key: "doAddColumns",
    value: function doAddColumns(addedColumns) {
      var _this10 = this;

      if (this.columnEffectivelyNotInSheet(addedColumns.columnStart, addedColumns.sheet)) {
        return;
      }

      this.dependencyGraph.addColumns(addedColumns);
      this.columnSearch.addColumns(addedColumns);
      this.stats.measure(StatType.TRANSFORM_ASTS, function () {
        var transformation = new AddColumnsTransformer(addedColumns);
        transformation.performEagerTransformations(_this10.dependencyGraph, _this10.parser);

        _this10.lazilyTransformingAstService.addTransformation(transformation);
      });
    }
  }, {
    key: "getClipboardCell",
    value: function getClipboardCell(address) {
      var vertex = this.dependencyGraph.getCell(address);

      if (vertex === null || vertex instanceof EmptyCellVertex) {
        return {
          type: ClipboardCellType.EMPTY
        };
      } else if (vertex instanceof ValueCellVertex) {
        return {
          type: ClipboardCellType.VALUE,
          value: vertex.getCellValue()
        };
      } else if (vertex instanceof MatrixVertex) {
        return {
          type: ClipboardCellType.VALUE,
          value: vertex.getMatrixCellValue(address)
        };
      } else if (vertex instanceof FormulaCellVertex) {
        return {
          type: ClipboardCellType.FORMULA,
          hash: this.parser.computeHashFromAst(vertex.getFormula(this.lazilyTransformingAstService))
        };
      } else if (vertex instanceof ParsingErrorVertex) {
        return {
          type: ClipboardCellType.PARSING_ERROR,
          rawInput: vertex.rawInput,
          errors: vertex.errors
        };
      }

      throw Error('Trying to copy unsupported type');
    }
  }, {
    key: "getSheetClipboardCells",
    value: function getSheetClipboardCells(sheet) {
      var sheetHeight = this.dependencyGraph.getSheetHeight(sheet);
      var sheetWidth = this.dependencyGraph.getSheetWidth(sheet);
      var arr = new Array(sheetHeight);

      for (var i = 0; i < sheetHeight; i++) {
        arr[i] = new Array(sheetWidth);

        for (var j = 0; j < sheetWidth; j++) {
          var address = simpleCellAddress(sheet, j, i);
          arr[i][j] = this.getClipboardCell(address);
        }
      }

      return arr;
    }
  }, {
    key: "getRangeClipboardCells",
    value: function getRangeClipboardCells(range) {
      var result = [];

      var _iterator8 = _createForOfIteratorHelper(range.addresses(this.dependencyGraph)),
          _step8;

      try {
        for (_iterator8.s(); !(_step8 = _iterator8.n()).done;) {
          var address = _step8.value;
          result.push([address, this.getClipboardCell(address)]);
        }
      } catch (err) {
        _iterator8.e(err);
      } finally {
        _iterator8.f();
      }

      return result;
    }
  }, {
    key: "setCellContent",
    value: function setCellContent(address, newCellContent) {
      var parsedCellContent = this.cellContentParser.parse(newCellContent);
      var vertex = this.dependencyGraph.getCell(address);

      if (vertex instanceof MatrixVertex && !vertex.isFormula() && !(parsedCellContent instanceof CellContent.Number)) {
        this.dependencyGraph.breakNumericMatrix(vertex);
        vertex = this.dependencyGraph.getCell(address);
      }

      if (vertex instanceof MatrixVertex && !vertex.isFormula() && parsedCellContent instanceof CellContent.Number) {
        var newValue = parsedCellContent.value;
        var oldValue = this.dependencyGraph.getCellValue(address);
        this.dependencyGraph.graph.markNodeAsSpecialRecentlyChanged(vertex);
        vertex.setMatrixCellValue(address, newValue);
        this.columnSearch.change(oldValue, newValue, address);
        this.changes.addChange(newValue, address);
      } else if (!(vertex instanceof MatrixVertex) && parsedCellContent instanceof CellContent.MatrixFormula) {
        var _this$parser$parse = this.parser.parse(parsedCellContent.formula, address),
            ast = _this$parser$parse.ast,
            errors = _this$parser$parse.errors,
            dependencies = _this$parser$parse.dependencies;

        if (errors.length > 0) {
          this.dependencyGraph.setParsingErrorToCell(address, new ParsingErrorVertex(errors, parsedCellContent.formulaWithBraces()));
        } else {
          var newVertex = buildMatrixVertex(ast, address);

          if (newVertex instanceof ValueCellVertex) {
            throw Error('What if new matrix vertex is not properly constructed?');
          }

          this.dependencyGraph.addNewMatrixVertex(newVertex);
          this.dependencyGraph.processCellDependencies(absolutizeDependencies(dependencies, address), newVertex);
          this.dependencyGraph.graph.markNodeAsSpecialRecentlyChanged(newVertex);
        }
      } else if (!(vertex instanceof MatrixVertex)) {
        if (parsedCellContent instanceof CellContent.Formula) {
          var _this$parser$parse2 = this.parser.parse(parsedCellContent.formula, address),
              _ast = _this$parser$parse2.ast,
              _errors = _this$parser$parse2.errors,
              hasVolatileFunction = _this$parser$parse2.hasVolatileFunction,
              hasStructuralChangeFunction = _this$parser$parse2.hasStructuralChangeFunction,
              _dependencies = _this$parser$parse2.dependencies;

          if (_errors.length > 0) {
            this.dependencyGraph.setParsingErrorToCell(address, new ParsingErrorVertex(_errors, parsedCellContent.formula));
          } else {
            this.dependencyGraph.setFormulaToCell(address, _ast, absolutizeDependencies(_dependencies, address), hasVolatileFunction, hasStructuralChangeFunction);
          }
        } else if (parsedCellContent instanceof CellContent.Empty) {
          this.setCellEmpty(address);
        } else if (parsedCellContent instanceof CellContent.MatrixFormula) {
          throw new Error('Cant happen');
        } else {
          this.setValueToCell(parsedCellContent.value, address);
        }
      } else {
        throw new Error('Illegal operation');
      }
    }
  }, {
    key: "setSheetContent",
    value: function setSheetContent(sheetId, newSheetContent) {
      this.clearSheet(sheetId);

      for (var i = 0; i < newSheetContent.length; i++) {
        for (var j = 0; j < newSheetContent[i].length; j++) {
          var address = simpleCellAddress(sheetId, j, i);
          this.setCellContent(address, newSheetContent[i][j]);
        }
      }
    }
  }, {
    key: "setValueToCell",
    value: function setValueToCell(value, address) {
      var oldValue = this.dependencyGraph.getCellValue(address);
      this.dependencyGraph.setValueToCell(address, value);
      this.columnSearch.change(oldValue, value, address);
      this.changes.addChange(value, address);
    }
  }, {
    key: "setCellEmpty",
    value: function setCellEmpty(address) {
      var oldValue = this.dependencyGraph.getCellValue(address);
      this.columnSearch.remove(oldValue, address);
      this.changes.addChange(EmptyValue, address);
      this.dependencyGraph.setCellEmpty(address);
    }
  }, {
    key: "setFormulaToCellFromCache",
    value: function setFormulaToCellFromCache(formulaHash, address) {
      var _this$parser$fetchCac2 = this.parser.fetchCachedResult(formulaHash),
          ast = _this$parser$fetchCac2.ast,
          hasVolatileFunction = _this$parser$fetchCac2.hasVolatileFunction,
          hasStructuralChangeFunction = _this$parser$fetchCac2.hasStructuralChangeFunction,
          dependencies = _this$parser$fetchCac2.dependencies;

      this.dependencyGraph.setFormulaToCell(address, ast, absolutizeDependencies(dependencies, address), hasVolatileFunction, hasStructuralChangeFunction);
    }
  }, {
    key: "setParsingErrorToCell",
    value: function setParsingErrorToCell(rawInput, errors, address) {
      this.dependencyGraph.setParsingErrorToCell(address, new ParsingErrorVertex(errors, rawInput));
    }
    /**
     * Returns true if row number is outside of given sheet.
     *
     * @param row - row number
     * @param sheet - sheet id number
     */

  }, {
    key: "rowEffectivelyNotInSheet",
    value: function rowEffectivelyNotInSheet(row, sheet) {
      var height = this.dependencyGraph.addressMapping.getHeight(sheet);
      return row >= height;
    }
  }, {
    key: "getAndClearContentChanges",
    value: function getAndClearContentChanges() {
      var changes = this.changes;
      this.changes = ContentChanges.empty();
      return changes;
    }
  }, {
    key: "forceApplyPostponedTransformations",
    value: function forceApplyPostponedTransformations() {
      this.dependencyGraph.forceApplyPostponedTransformations();
    }
  }, {
    key: "columnEffectivelyNotInSheet",

    /**
     * Returns true if row number is outside of given sheet.
     *
     * @param column - row number
     * @param sheet - sheet id number
     */
    value: function columnEffectivelyNotInSheet(column, sheet) {
      var width = this.dependencyGraph.addressMapping.getWidth(sheet);
      return column >= width;
    }
  }, {
    key: "adjustNamedExpressionEdges",
    value: function adjustNamedExpressionEdges(namedExpression, expressionName, sheetId) {
      if (sheetId !== undefined) {
        var localVertex = this.dependencyGraph.fetchCellOrCreateEmpty(namedExpression.address);
        var globalNamedExpression = this.namedExpressions.workbookNamedExpressionOrPlaceholder(expressionName);
        var globalVertex = this.dependencyGraph.fetchCellOrCreateEmpty(globalNamedExpression.address);

        var _iterator9 = _createForOfIteratorHelper(this.dependencyGraph.graph.adjacentNodes(globalVertex)),
            _step9;

        try {
          for (_iterator9.s(); !(_step9 = _iterator9.n()).done;) {
            var adjacentNode = _step9.value;

            if ((adjacentNode instanceof FormulaCellVertex || adjacentNode instanceof MatrixVertex) && adjacentNode.cellAddress.sheet === sheetId) {
              var ast = adjacentNode.getFormula(this.lazilyTransformingAstService);

              if (ast) {
                var formulaAddress = adjacentNode.getAddress(this.lazilyTransformingAstService);

                var _this$parser$fetchCac3 = this.parser.fetchCachedResultForAst(ast),
                    dependencies = _this$parser$fetchCac3.dependencies;

                var _iterator10 = _createForOfIteratorHelper(absolutizeDependencies(dependencies, formulaAddress)),
                    _step10;

                try {
                  for (_iterator10.s(); !(_step10 = _iterator10.n()).done;) {
                    var dependency = _step10.value;

                    if (dependency instanceof NamedExpressionDependency && dependency.name.toLowerCase() === namedExpression.displayName.toLowerCase()) {
                      this.dependencyGraph.graph.removeEdge(globalVertex, adjacentNode);
                      this.dependencyGraph.graph.addEdge(localVertex, adjacentNode);
                    }
                  }
                } catch (err) {
                  _iterator10.e(err);
                } finally {
                  _iterator10.f();
                }
              }
            }
          }
        } catch (err) {
          _iterator9.e(err);
        } finally {
          _iterator9.f();
        }
      }
    }
  }, {
    key: "storeNamedExpressionInCell",
    value: function storeNamedExpressionInCell(address, expression) {
      var parsedCellContent = this.cellContentParser.parse(expression);

      if (parsedCellContent instanceof CellContent.MatrixFormula) {
        throw new Error('Matrix formulas are not supported');
      } else if (parsedCellContent instanceof CellContent.Formula) {
        var parsingResult = this.parser.parse(parsedCellContent.formula, simpleCellAddress(-1, 0, 0));

        if (doesContainRelativeReferences(parsingResult.ast)) {
          throw new NoRelativeAddressesAllowedError();
        }

        var ast = parsingResult.ast,
            hasVolatileFunction = parsingResult.hasVolatileFunction,
            hasStructuralChangeFunction = parsingResult.hasStructuralChangeFunction,
            dependencies = parsingResult.dependencies;
        this.dependencyGraph.setFormulaToCell(address, ast, absolutizeDependencies(dependencies, address), hasVolatileFunction, hasStructuralChangeFunction);
      } else {
        if (parsedCellContent instanceof CellContent.Empty) {
          this.setCellEmpty(address);
        } else {
          this.setValueToCell(parsedCellContent.value, address);
        }
      }
    }
  }, {
    key: "updateNamedExpressionsForMovedCells",
    value: function updateNamedExpressionsForMovedCells(sourceLeftCorner, width, height, destinationLeftCorner) {
      if (sourceLeftCorner.sheet === destinationLeftCorner.sheet) {
        return [];
      }

      var addedGlobalNamedExpressions = [];
      var targetRange = AbsoluteCellRange.spanFrom(destinationLeftCorner, width, height);

      var _iterator11 = _createForOfIteratorHelper(targetRange.addresses(this.dependencyGraph)),
          _step11;

      try {
        for (_iterator11.s(); !(_step11 = _iterator11.n()).done;) {
          var formulaAddress = _step11.value;
          var vertex = this.addressMapping.fetchCell(formulaAddress);

          if (vertex instanceof FormulaCellVertex && formulaAddress.sheet !== sourceLeftCorner.sheet) {
            var ast = vertex.getFormula(this.lazilyTransformingAstService);

            var _this$parser$fetchCac4 = this.parser.fetchCachedResultForAst(ast),
                dependencies = _this$parser$fetchCac4.dependencies;

            addedGlobalNamedExpressions.push.apply(addedGlobalNamedExpressions, _toConsumableArray(this.updateNamedExpressionsForTargetAddress(sourceLeftCorner.sheet, formulaAddress, dependencies)));
          }
        }
      } catch (err) {
        _iterator11.e(err);
      } finally {
        _iterator11.f();
      }

      return addedGlobalNamedExpressions;
    }
  }, {
    key: "updateNamedExpressionsForTargetAddress",
    value: function updateNamedExpressionsForTargetAddress(sourceSheet, targetAddress, dependencies) {
      if (sourceSheet === targetAddress.sheet) {
        return [];
      }

      var addedGlobalNamedExpressions = [];
      var vertex = this.addressMapping.fetchCell(targetAddress);

      var _iterator12 = _createForOfIteratorHelper(absolutizeDependencies(dependencies, targetAddress)),
          _step12;

      try {
        for (_iterator12.s(); !(_step12 = _iterator12.n()).done;) {
          var namedExpressionDependency = _step12.value;

          if (!(namedExpressionDependency instanceof NamedExpressionDependency)) {
            continue;
          }

          var expressionName = namedExpressionDependency.name;
          var sourceVertex = this.dependencyGraph.fetchNamedExpressionVertex(expressionName, sourceSheet);
          var namedExpressionInTargetScope = this.namedExpressions.isExpressionInScope(expressionName, targetAddress.sheet);
          var targetScopeExpressionVertex = namedExpressionInTargetScope ? this.dependencyGraph.fetchNamedExpressionVertex(expressionName, targetAddress.sheet) : this.copyOrFetchGlobalNamedExpressionVertex(expressionName, sourceVertex, addedGlobalNamedExpressions);

          if (targetScopeExpressionVertex !== sourceVertex) {
            this.dependencyGraph.graph.softRemoveEdge(sourceVertex, vertex);
            this.dependencyGraph.graph.addEdge(targetScopeExpressionVertex, vertex);
          }
        }
      } catch (err) {
        _iterator12.e(err);
      } finally {
        _iterator12.f();
      }

      return addedGlobalNamedExpressions;
    }
  }, {
    key: "allocateNamedExpressionAddressSpace",
    value: function allocateNamedExpressionAddressSpace() {
      this.dependencyGraph.addressMapping.addSheet(-1, new SparseStrategy(0, 0));
    }
  }, {
    key: "copyOrFetchGlobalNamedExpressionVertex",
    value: function copyOrFetchGlobalNamedExpressionVertex(expressionName, sourceVertex, addedNamedExpressions) {
      var expression = this.namedExpressions.namedExpressionForScope(expressionName);

      if (expression === undefined) {
        expression = this.namedExpressions.addNamedExpression(expressionName);
        addedNamedExpressions.push(expression.normalizeExpressionName());

        if (sourceVertex instanceof FormulaCellVertex) {
          var parsingResult = this.parser.fetchCachedResultForAst(sourceVertex.getFormula(this.lazilyTransformingAstService));
          var ast = parsingResult.ast,
              hasVolatileFunction = parsingResult.hasVolatileFunction,
              hasStructuralChangeFunction = parsingResult.hasStructuralChangeFunction,
              dependencies = parsingResult.dependencies;
          this.dependencyGraph.setFormulaToCell(expression.address, ast, absolutizeDependencies(dependencies, expression.address), hasVolatileFunction, hasStructuralChangeFunction);
        } else if (sourceVertex instanceof EmptyCellVertex) {
          this.setCellEmpty(expression.address);
        } else if (sourceVertex instanceof ValueCellVertex) {
          this.setValueToCell(sourceVertex.getCellValue(), expression.address);
        }
      }

      return this.dependencyGraph.fetchCellOrCreateEmpty(expression.address);
    }
  }, {
    key: "sheetMapping",
    get: function get() {
      return this.dependencyGraph.sheetMapping;
    }
  }, {
    key: "addressMapping",
    get: function get() {
      return this.dependencyGraph.addressMapping;
    }
  }]);

  return Operations;
}();
export function normalizeRemovedIndexes(indexes) {
  if (indexes.length <= 1) {
    return indexes;
  }

  var sorted = indexes.sort(function (_ref, _ref2) {
    var _ref3 = _slicedToArray(_ref, 1),
        a = _ref3[0];

    var _ref4 = _slicedToArray(_ref2, 1),
        b = _ref4[0];

    return a < b ? -1 : a > b ? 1 : 0;
  });
  /* merge overlapping and adjacent indexes */

  var merged = sorted.reduce(function (acc, _ref5) {
    var _ref6 = _slicedToArray(_ref5, 2),
        startIndex = _ref6[0],
        amount = _ref6[1];

    var previous = acc[acc.length - 1];
    var lastIndex = previous[0] + previous[1];

    if (startIndex <= lastIndex) {
      previous[1] += Math.max(0, amount - (lastIndex - startIndex));
    } else {
      acc.push([startIndex, amount]);
    }

    return acc;
  }, [sorted[0]]);
  /* shift further indexes */

  var shift = 0;

  for (var i = 0; i < merged.length; ++i) {
    merged[i][0] -= shift;
    shift += merged[i][1];
  }

  return merged;
}
export function normalizeAddedIndexes(indexes) {
  if (indexes.length <= 1) {
    return indexes;
  }

  var sorted = indexes.sort(function (_ref7, _ref8) {
    var _ref9 = _slicedToArray(_ref7, 1),
        a = _ref9[0];

    var _ref10 = _slicedToArray(_ref8, 1),
        b = _ref10[0];

    return a < b ? -1 : a > b ? 1 : 0;
  });
  /* merge indexes with same start */

  var merged = sorted.reduce(function (acc, _ref11) {
    var _ref12 = _slicedToArray(_ref11, 2),
        startIndex = _ref12[0],
        amount = _ref12[1];

    var previous = acc[acc.length - 1];

    if (startIndex === previous[0]) {
      previous[1] = Math.max(previous[1], amount);
    } else {
      acc.push([startIndex, amount]);
    }

    return acc;
  }, [sorted[0]]);
  /* shift further indexes */

  var shift = 0;

  for (var i = 0; i < merged.length; ++i) {
    merged[i][0] += shift;
    shift += merged[i][1];
  }

  return merged;
}

function isPositiveInteger(x) {
  return Number.isInteger(x) && x > 0;
}

function isRowOrColumnRange(leftCorner, width, height) {
  return leftCorner.row === 0 && isPositiveInteger(width) && height === Number.POSITIVE_INFINITY || leftCorner.col === 0 && isPositiveInteger(height) && width === Number.POSITIVE_INFINITY;
}