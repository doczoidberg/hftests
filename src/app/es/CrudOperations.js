import "core-js/modules/es.symbol";
import "core-js/modules/es.symbol.description";
import "core-js/modules/es.symbol.iterator";
import "core-js/modules/es.array.concat";
import "core-js/modules/es.array.from";
import "core-js/modules/es.array.iterator";
import "core-js/modules/es.array.map";
import "core-js/modules/es.array.reduce";
import "core-js/modules/es.array.slice";
import "core-js/modules/es.function.name";
import "core-js/modules/es.number.constructor";
import "core-js/modules/es.number.is-integer";
import "core-js/modules/es.object.to-string";
import "core-js/modules/es.regexp.to-string";
import "core-js/modules/es.string.iterator";
import "core-js/modules/web.dom-collections.iterator";

function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e2) { throw _e2; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e3) { didErr = true; err = _e3; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

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
import { AbsoluteCellRange } from './AbsoluteCellRange';
import { invalidSimpleCellAddress, simpleCellAddress } from './Cell';
import { CellContent, isMatrix } from './CellContentParser';
import { ClipboardOperations } from './ClipboardOperations';
import { AddColumnsCommand, AddRowsCommand, Operations, RemoveColumnsCommand, RemoveRowsCommand } from './Operations';
import { doesContainRelativeReferences } from './NamedExpressions';
import { InvalidAddressError, InvalidArgumentsError, MatrixFormulasNotSupportedError, NamedExpressionDoesNotExistError, NamedExpressionNameIsAlreadyTakenError, NamedExpressionNameIsInvalidError, NoOperationToRedoError, NoOperationToUndoError, NoRelativeAddressesAllowedError, NoSheetWithIdError, NoSheetWithNameError, NothingToPasteError, SheetNameAlreadyTakenError, SheetSizeLimitExceededError, SourceLocationHasMatrixError, TargetLocationHasMatrixError } from './errors';
import { ColumnsSpan, RowsSpan } from './Span';
import { AddColumnsUndoEntry, AddNamedExpressionUndoEntry, AddRowsUndoEntry, AddSheetUndoEntry, ChangeNamedExpressionUndoEntry, ClearSheetUndoEntry, MoveCellsUndoEntry, MoveColumnsUndoEntry, MoveRowsUndoEntry, PasteUndoEntry, RemoveColumnsUndoEntry, RemoveNamedExpressionUndoEntry, RemoveRowsUndoEntry, RemoveSheetUndoEntry, RenameSheetUndoEntry, SetCellContentsUndoEntry, SetSheetContentUndoEntry, UndoRedo } from './UndoRedo';
import { findBoundaries, validateAsSheet } from './Sheet';
export var CrudOperations = /*#__PURE__*/function () {
  function CrudOperations(
  /** Engine config */
  config,
  /** Statistics module for benchmarking */
  stats,
  /** Dependency graph storing sheets structure */
  dependencyGraph,
  /** Column search strategy used by VLOOKUP plugin */
  columnSearch,
  /** Parser with caching */
  parser,
  /** Raw cell input parser */
  cellContentParser,
  /** Service handling postponed CRUD transformations */
  lazilyTransformingAstService,
  /** Storage for named expressions */
  namedExpressions) {
    _classCallCheck(this, CrudOperations);

    this.config = config;
    this.stats = stats;
    this.dependencyGraph = dependencyGraph;
    this.columnSearch = columnSearch;
    this.parser = parser;
    this.cellContentParser = cellContentParser;
    this.lazilyTransformingAstService = lazilyTransformingAstService;
    this.namedExpressions = namedExpressions;
    this.operations = new Operations(this.dependencyGraph, this.columnSearch, this.cellContentParser, this.parser, this.stats, this.lazilyTransformingAstService, this.namedExpressions, this.config);
    this.clipboardOperations = new ClipboardOperations(this.dependencyGraph, this.operations, this.parser, this.lazilyTransformingAstService, this.config);
    this.undoRedo = new UndoRedo(this.config, this.operations);
  }

  _createClass(CrudOperations, [{
    key: "addRows",
    value: function addRows(sheet) {
      for (var _len = arguments.length, indexes = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        indexes[_key - 1] = arguments[_key];
      }

      var addRowsCommand = new AddRowsCommand(sheet, indexes);
      this.ensureItIsPossibleToAddRows.apply(this, [sheet].concat(indexes));
      this.undoRedo.clearRedoStack();
      this.clipboardOperations.abortCut();
      this.operations.addRows(addRowsCommand);
      this.undoRedo.saveOperation(new AddRowsUndoEntry(addRowsCommand));
    }
  }, {
    key: "removeRows",
    value: function removeRows(sheet) {
      for (var _len2 = arguments.length, indexes = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
        indexes[_key2 - 1] = arguments[_key2];
      }

      var removeRowsCommand = new RemoveRowsCommand(sheet, indexes);
      this.ensureItIsPossibleToRemoveRows.apply(this, [sheet].concat(indexes));
      this.undoRedo.clearRedoStack();
      this.clipboardOperations.abortCut();
      var rowsRemovals = this.operations.removeRows(removeRowsCommand);
      this.undoRedo.saveOperation(new RemoveRowsUndoEntry(removeRowsCommand, rowsRemovals));
    }
  }, {
    key: "addColumns",
    value: function addColumns(sheet) {
      for (var _len3 = arguments.length, indexes = new Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
        indexes[_key3 - 1] = arguments[_key3];
      }

      var addColumnsCommand = new AddColumnsCommand(sheet, indexes);
      this.ensureItIsPossibleToAddColumns.apply(this, [sheet].concat(indexes));
      this.undoRedo.clearRedoStack();
      this.clipboardOperations.abortCut();
      this.operations.addColumns(addColumnsCommand);
      this.undoRedo.saveOperation(new AddColumnsUndoEntry(addColumnsCommand));
    }
  }, {
    key: "removeColumns",
    value: function removeColumns(sheet) {
      for (var _len4 = arguments.length, indexes = new Array(_len4 > 1 ? _len4 - 1 : 0), _key4 = 1; _key4 < _len4; _key4++) {
        indexes[_key4 - 1] = arguments[_key4];
      }

      var removeColumnsCommand = new RemoveColumnsCommand(sheet, indexes);
      this.ensureItIsPossibleToRemoveColumns.apply(this, [sheet].concat(indexes));
      this.undoRedo.clearRedoStack();
      this.clipboardOperations.abortCut();
      var columnsRemovals = this.operations.removeColumns(removeColumnsCommand);
      this.undoRedo.saveOperation(new RemoveColumnsUndoEntry(removeColumnsCommand, columnsRemovals));
    }
  }, {
    key: "moveCells",
    value: function moveCells(sourceLeftCorner, width, height, destinationLeftCorner) {
      this.undoRedo.clearRedoStack();
      this.clipboardOperations.abortCut();

      var _this$operations$move = this.operations.moveCells(sourceLeftCorner, width, height, destinationLeftCorner),
          version = _this$operations$move.version,
          overwrittenCellsData = _this$operations$move.overwrittenCellsData,
          addedGlobalNamedExpressions = _this$operations$move.addedGlobalNamedExpressions;

      this.undoRedo.saveOperation(new MoveCellsUndoEntry(sourceLeftCorner, width, height, destinationLeftCorner, overwrittenCellsData, addedGlobalNamedExpressions, version));
    }
  }, {
    key: "moveRows",
    value: function moveRows(sheet, startRow, numberOfRows, targetRow) {
      this.ensureItIsPossibleToMoveRows(sheet, startRow, numberOfRows, targetRow);
      this.undoRedo.clearRedoStack();
      this.clipboardOperations.abortCut();
      var version = this.operations.moveRows(sheet, startRow, numberOfRows, targetRow);
      this.undoRedo.saveOperation(new MoveRowsUndoEntry(sheet, startRow, numberOfRows, targetRow, version));
    }
  }, {
    key: "moveColumns",
    value: function moveColumns(sheet, startColumn, numberOfColumns, targetColumn) {
      this.ensureItIsPossibleToMoveColumns(sheet, startColumn, numberOfColumns, targetColumn);
      this.undoRedo.clearRedoStack();
      var version = this.operations.moveColumns(sheet, startColumn, numberOfColumns, targetColumn);
      this.undoRedo.saveOperation(new MoveColumnsUndoEntry(sheet, startColumn, numberOfColumns, targetColumn, version));
    }
  }, {
    key: "cut",
    value: function cut(sourceLeftCorner, width, height) {
      this.clipboardOperations.cut(sourceLeftCorner, width, height);
    }
  }, {
    key: "ensureItIsPossibleToCopy",
    value: function ensureItIsPossibleToCopy(sourceLeftCorner, width, height) {
      if (!isPositiveInteger(width)) {
        throw new InvalidArgumentsError('width to be positive integer.');
      }

      if (!isPositiveInteger(height)) {
        throw new InvalidArgumentsError('height to be positive integer.');
      }
    }
  }, {
    key: "copy",
    value: function copy(sourceLeftCorner, width, height) {
      this.ensureItIsPossibleToCopy(sourceLeftCorner, width, height);
      this.clipboardOperations.copy(sourceLeftCorner, width, height);
    }
  }, {
    key: "paste",
    value: function paste(targetLeftCorner) {
      var clipboard = this.clipboardOperations.clipboard;

      if (clipboard === undefined) {
        throw new NothingToPasteError();
      } else if (this.clipboardOperations.isCutClipboard()) {
        this.moveCells(clipboard.sourceLeftCorner, clipboard.width, clipboard.height, targetLeftCorner);
      } else if (this.clipboardOperations.isCopyClipboard()) {
        this.clipboardOperations.ensureItIsPossibleToCopyPaste(targetLeftCorner);
        var targetRange = AbsoluteCellRange.spanFrom(targetLeftCorner, clipboard.width, clipboard.height);
        var oldContent = this.operations.getRangeClipboardCells(targetRange);
        this.undoRedo.clearRedoStack();
        this.dependencyGraph.breakNumericMatricesInRange(targetRange);
        var addedGlobalNamedExpressions = this.operations.restoreClipboardCells(clipboard.sourceLeftCorner.sheet, clipboard.getContent(targetLeftCorner));
        this.undoRedo.saveOperation(new PasteUndoEntry(targetLeftCorner, oldContent, clipboard.content, addedGlobalNamedExpressions));
      }
    }
  }, {
    key: "beginUndoRedoBatchMode",
    value: function beginUndoRedoBatchMode() {
      this.undoRedo.beginBatchMode();
    }
  }, {
    key: "commitUndoRedoBatchMode",
    value: function commitUndoRedoBatchMode() {
      this.undoRedo.commitBatchMode();
    }
  }, {
    key: "isClipboardEmpty",
    value: function isClipboardEmpty() {
      return this.clipboardOperations.clipboard === undefined;
    }
  }, {
    key: "clearClipboard",
    value: function clearClipboard() {
      this.clipboardOperations.clear();
    }
  }, {
    key: "addSheet",
    value: function addSheet(name) {
      if (name) {
        this.ensureItIsPossibleToAddSheet(name);
      }

      this.undoRedo.clearRedoStack();
      var addedSheetName = this.operations.addSheet(name);
      this.undoRedo.saveOperation(new AddSheetUndoEntry(addedSheetName));
      return addedSheetName;
    }
  }, {
    key: "removeSheet",
    value: function removeSheet(sheetName) {
      this.ensureSheetExists(sheetName);
      this.undoRedo.clearRedoStack();
      this.clipboardOperations.abortCut();
      var sheetId = this.sheetMapping.fetch(sheetName);
      var originalName = this.sheetMapping.fetchDisplayName(sheetId);
      var oldSheetContent = this.operations.getSheetClipboardCells(sheetId);
      var version = this.operations.removeSheet(sheetName);
      this.undoRedo.saveOperation(new RemoveSheetUndoEntry(originalName, sheetId, oldSheetContent, version));
    }
  }, {
    key: "renameSheet",
    value: function renameSheet(sheetId, newName) {
      this.ensureItIsPossibleToRenameSheet(sheetId, newName);
      var oldName = this.operations.renameSheet(sheetId, newName);

      if (oldName !== undefined) {
        this.undoRedo.clearRedoStack();
        this.undoRedo.saveOperation(new RenameSheetUndoEntry(sheetId, oldName, newName));
      }

      return oldName;
    }
  }, {
    key: "clearSheet",
    value: function clearSheet(sheetName) {
      this.ensureSheetExists(sheetName);
      this.undoRedo.clearRedoStack();
      this.clipboardOperations.abortCut();
      var sheetId = this.sheetMapping.fetch(sheetName);
      var oldSheetContent = this.operations.getSheetClipboardCells(sheetId);
      this.operations.clearSheet(sheetId);
      this.undoRedo.saveOperation(new ClearSheetUndoEntry(sheetId, oldSheetContent));
    }
  }, {
    key: "setCellContents",
    value: function setCellContents(topLeftCornerAddress, cellContents) {
      if (!(cellContents instanceof Array)) {
        cellContents = [[cellContents]];
      } else {
        for (var i = 0; i < cellContents.length; i++) {
          if (!(cellContents[i] instanceof Array)) {
            throw new InvalidArgumentsError('an array of arrays or a raw cell value.');
          }

          for (var j = 0; j < cellContents[i].length; j++) {
            if (isMatrix(cellContents[i][j])) {
              throw new Error('Cant change matrices in batch operation');
            }
          }
        }
      }

      this.ensureItIsPossibleToChangeCellContents(topLeftCornerAddress, cellContents);
      this.undoRedo.clearRedoStack();
      var modifiedCellContents = [];

      for (var _i = 0; _i < cellContents.length; _i++) {
        for (var _j = 0; _j < cellContents[_i].length; _j++) {
          var address = {
            sheet: topLeftCornerAddress.sheet,
            row: topLeftCornerAddress.row + _i,
            col: topLeftCornerAddress.col + _j
          };
          this.clipboardOperations.abortCut();
          var oldContent = this.operations.getClipboardCell(address);
          this.operations.setCellContent(address, cellContents[_i][_j]);
          modifiedCellContents.push({
            address: address,
            newContent: cellContents[_i][_j],
            oldContent: oldContent
          });
        }
      }

      this.undoRedo.saveOperation(new SetCellContentsUndoEntry(modifiedCellContents));
    }
  }, {
    key: "setSheetContent",
    value: function setSheetContent(sheetName, values) {
      this.ensureSheetExists(sheetName);
      var sheetId = this.sheetMapping.fetch(sheetName);
      this.ensureItIsPossibleToChangeSheetContents(sheetId, values);
      validateAsSheet(values);
      this.undoRedo.clearRedoStack();
      this.clipboardOperations.abortCut();
      var oldSheetContent = this.operations.getSheetClipboardCells(sheetId);
      this.operations.setSheetContent(sheetId, values);
      this.undoRedo.saveOperation(new SetSheetContentUndoEntry(sheetId, oldSheetContent, values));
    }
  }, {
    key: "undo",
    value: function undo() {
      if (this.undoRedo.isUndoStackEmpty()) {
        throw new NoOperationToUndoError();
      }

      this.clipboardOperations.abortCut();
      this.undoRedo.undo();
    }
  }, {
    key: "redo",
    value: function redo() {
      if (this.undoRedo.isRedoStackEmpty()) {
        throw new NoOperationToRedoError();
      }

      this.clipboardOperations.abortCut();
      this.undoRedo.redo();
    }
  }, {
    key: "addNamedExpression",
    value: function addNamedExpression(expressionName, expression, sheetScope, options) {
      var sheetId = this.scopeId(sheetScope);
      this.ensureNamedExpressionNameIsValid(expressionName, sheetId);
      this.operations.addNamedExpression(expressionName, expression, sheetId, options);
      this.undoRedo.clearRedoStack();
      this.clipboardOperations.abortCut();
      this.undoRedo.saveOperation(new AddNamedExpressionUndoEntry(expressionName, expression, sheetId, options));
    }
  }, {
    key: "changeNamedExpressionExpression",
    value: function changeNamedExpressionExpression(expressionName, sheetScope, newExpression, options) {
      var sheetId = this.scopeId(sheetScope);

      var _this$operations$chan = this.operations.changeNamedExpressionExpression(expressionName, newExpression, sheetId, options),
          _this$operations$chan2 = _slicedToArray(_this$operations$chan, 2),
          oldNamedExpression = _this$operations$chan2[0],
          content = _this$operations$chan2[1];

      this.undoRedo.clearRedoStack();
      this.clipboardOperations.abortCut();
      this.undoRedo.saveOperation(new ChangeNamedExpressionUndoEntry(oldNamedExpression, newExpression, content, sheetId, options));
    }
  }, {
    key: "removeNamedExpression",
    value: function removeNamedExpression(expressionName, sheetScope) {
      var sheetId = this.scopeId(sheetScope);

      var _this$operations$remo = this.operations.removeNamedExpression(expressionName, sheetId),
          _this$operations$remo2 = _slicedToArray(_this$operations$remo, 2),
          namedExpression = _this$operations$remo2[0],
          content = _this$operations$remo2[1];

      this.undoRedo.clearRedoStack();
      this.clipboardOperations.abortCut();
      this.undoRedo.saveOperation(new RemoveNamedExpressionUndoEntry(namedExpression, content, sheetId));
      return namedExpression;
    }
  }, {
    key: "ensureItIsPossibleToAddNamedExpression",
    value: function ensureItIsPossibleToAddNamedExpression(expressionName, expression, sheetScope) {
      var scopeId = this.scopeId(sheetScope);
      this.ensureNamedExpressionNameIsValid(expressionName, scopeId);
      this.ensureNamedExpressionIsValid(expression);
    }
  }, {
    key: "ensureItIsPossibleToChangeNamedExpression",
    value: function ensureItIsPossibleToChangeNamedExpression(expressionName, expression, sheetScope) {
      var scopeId = this.scopeId(sheetScope);

      if (this.namedExpressions.namedExpressionForScope(expressionName, scopeId) === undefined) {
        throw new NamedExpressionDoesNotExistError(expressionName);
      }

      this.ensureNamedExpressionIsValid(expression);
    }
  }, {
    key: "isItPossibleToRemoveNamedExpression",
    value: function isItPossibleToRemoveNamedExpression(expressionName, sheetScope) {
      var scopeId = this.scopeId(sheetScope);

      if (this.namedExpressions.namedExpressionForScope(expressionName, scopeId) === undefined) {
        throw new NamedExpressionDoesNotExistError(expressionName);
      }
    }
  }, {
    key: "ensureItIsPossibleToAddRows",
    value: function ensureItIsPossibleToAddRows(sheet) {
      if (!this.sheetMapping.hasSheetWithId(sheet)) {
        throw new NoSheetWithIdError(sheet);
      }

      var sheetHeight = this.dependencyGraph.getSheetHeight(sheet);

      for (var _len5 = arguments.length, indexes = new Array(_len5 > 1 ? _len5 - 1 : 0), _key5 = 1; _key5 < _len5; _key5++) {
        indexes[_key5 - 1] = arguments[_key5];
      }

      var newRowsCount = indexes.map(function (index) {
        return index[1];
      }).reduce(function (a, b) {
        return a + b;
      }, 0);

      if (sheetHeight + newRowsCount > this.config.maxRows) {
        throw new SheetSizeLimitExceededError();
      }

      for (var _i2 = 0, _indexes = indexes; _i2 < _indexes.length; _i2++) {
        var _indexes$_i = _slicedToArray(_indexes[_i2], 2),
            row = _indexes$_i[0],
            numberOfRowsToAdd = _indexes$_i[1];

        if (!isNonnegativeInteger(row) || !isPositiveInteger(numberOfRowsToAdd)) {
          throw new InvalidArgumentsError('row number to be nonnegative and number of rows to add to be positive.');
        }

        if (isPositiveInteger(row) && this.dependencyGraph.matrixMapping.isFormulaMatrixInRow(sheet, row - 1) && this.dependencyGraph.matrixMapping.isFormulaMatrixInRow(sheet, row)) {
          throw new TargetLocationHasMatrixError();
        }
      }
    }
  }, {
    key: "ensureItIsPossibleToRemoveRows",
    value: function ensureItIsPossibleToRemoveRows(sheet) {
      for (var _len6 = arguments.length, indexes = new Array(_len6 > 1 ? _len6 - 1 : 0), _key6 = 1; _key6 < _len6; _key6++) {
        indexes[_key6 - 1] = arguments[_key6];
      }

      for (var _i3 = 0, _indexes2 = indexes; _i3 < _indexes2.length; _i3++) {
        var _indexes2$_i = _slicedToArray(_indexes2[_i3], 2),
            rowStart = _indexes2$_i[0],
            numberOfRows = _indexes2$_i[1];

        var rowEnd = rowStart + numberOfRows - 1;

        if (!isNonnegativeInteger(rowStart) || !isNonnegativeInteger(rowEnd)) {
          throw new InvalidArgumentsError('starting and ending row to be nonnegative.');
        }

        if (rowEnd < rowStart) {
          throw new InvalidArgumentsError('starting row to be smaller than the ending row.');
        }

        var rowsToRemove = RowsSpan.fromRowStartAndEnd(sheet, rowStart, rowEnd);

        if (!this.sheetMapping.hasSheetWithId(sheet)) {
          throw new NoSheetWithIdError(sheet);
        }

        if (this.dependencyGraph.matrixMapping.isFormulaMatrixInRows(rowsToRemove)) {
          throw new SourceLocationHasMatrixError();
        }
      }
    }
  }, {
    key: "ensureItIsPossibleToAddColumns",
    value: function ensureItIsPossibleToAddColumns(sheet) {
      if (!this.sheetMapping.hasSheetWithId(sheet)) {
        throw new NoSheetWithIdError(sheet);
      }

      var sheetWidth = this.dependencyGraph.getSheetWidth(sheet);

      for (var _len7 = arguments.length, indexes = new Array(_len7 > 1 ? _len7 - 1 : 0), _key7 = 1; _key7 < _len7; _key7++) {
        indexes[_key7 - 1] = arguments[_key7];
      }

      var newColumnsCount = indexes.map(function (index) {
        return index[1];
      }).reduce(function (a, b) {
        return a + b;
      }, 0);

      if (sheetWidth + newColumnsCount > this.config.maxColumns) {
        throw new SheetSizeLimitExceededError();
      }

      for (var _i4 = 0, _indexes3 = indexes; _i4 < _indexes3.length; _i4++) {
        var _indexes3$_i = _slicedToArray(_indexes3[_i4], 2),
            column = _indexes3$_i[0],
            numberOfColumnsToAdd = _indexes3$_i[1];

        if (!isNonnegativeInteger(column) || !isPositiveInteger(numberOfColumnsToAdd)) {
          throw new InvalidArgumentsError('column number to be nonnegative and number of columns to add to be positive.');
        }

        if (isPositiveInteger(column) && this.dependencyGraph.matrixMapping.isFormulaMatrixInColumn(sheet, column - 1) && this.dependencyGraph.matrixMapping.isFormulaMatrixInColumn(sheet, column)) {
          throw new TargetLocationHasMatrixError();
        }
      }
    }
  }, {
    key: "ensureItIsPossibleToRemoveColumns",
    value: function ensureItIsPossibleToRemoveColumns(sheet) {
      for (var _len8 = arguments.length, indexes = new Array(_len8 > 1 ? _len8 - 1 : 0), _key8 = 1; _key8 < _len8; _key8++) {
        indexes[_key8 - 1] = arguments[_key8];
      }

      for (var _i5 = 0, _indexes4 = indexes; _i5 < _indexes4.length; _i5++) {
        var _indexes4$_i = _slicedToArray(_indexes4[_i5], 2),
            columnStart = _indexes4$_i[0],
            numberOfColumns = _indexes4$_i[1];

        var columnEnd = columnStart + numberOfColumns - 1;

        if (!isNonnegativeInteger(columnStart) || !isNonnegativeInteger(columnEnd)) {
          throw new InvalidArgumentsError('starting and ending column to be nonnegative.');
        }

        if (columnEnd < columnStart) {
          throw new InvalidArgumentsError('starting column to be smaller than the ending column.');
        }

        var columnsToRemove = ColumnsSpan.fromColumnStartAndEnd(sheet, columnStart, columnEnd);

        if (!this.sheetMapping.hasSheetWithId(sheet)) {
          throw new NoSheetWithIdError(sheet);
        }

        if (this.dependencyGraph.matrixMapping.isFormulaMatrixInColumns(columnsToRemove)) {
          throw new SourceLocationHasMatrixError();
        }
      }
    }
  }, {
    key: "ensureItIsPossibleToMoveRows",
    value: function ensureItIsPossibleToMoveRows(sheet, startRow, numberOfRows, targetRow) {
      this.ensureItIsPossibleToAddRows(sheet, [targetRow, numberOfRows]);
      var sourceStart = simpleCellAddress(sheet, 0, startRow);
      var targetStart = simpleCellAddress(sheet, 0, targetRow);

      if (!this.sheetMapping.hasSheetWithId(sheet) || invalidSimpleCellAddress(sourceStart) || invalidSimpleCellAddress(targetStart) || !isPositiveInteger(numberOfRows) || targetRow <= startRow + numberOfRows && targetRow >= startRow) {
        throw new InvalidArgumentsError('a valid range of rows to move.');
      }

      var width = this.dependencyGraph.getSheetWidth(sheet);
      var sourceRange = AbsoluteCellRange.spanFrom(sourceStart, width, numberOfRows);

      if (this.dependencyGraph.matrixMapping.isFormulaMatrixInRange(sourceRange)) {
        throw new SourceLocationHasMatrixError();
      }
    }
  }, {
    key: "ensureItIsPossibleToMoveColumns",
    value: function ensureItIsPossibleToMoveColumns(sheet, startColumn, numberOfColumns, targetColumn) {
      this.ensureItIsPossibleToAddColumns(sheet, [targetColumn, numberOfColumns]);
      var sourceStart = simpleCellAddress(sheet, startColumn, 0);
      var targetStart = simpleCellAddress(sheet, targetColumn, 0);

      if (!this.sheetMapping.hasSheetWithId(sheet) || invalidSimpleCellAddress(sourceStart) || invalidSimpleCellAddress(targetStart) || !isPositiveInteger(numberOfColumns) || targetColumn <= startColumn + numberOfColumns && targetColumn >= startColumn) {
        throw new InvalidArgumentsError('a valid range of columns to move.');
      }

      var sheetHeight = this.dependencyGraph.getSheetHeight(sheet);
      var sourceRange = AbsoluteCellRange.spanFrom(sourceStart, numberOfColumns, sheetHeight);

      if (this.dependencyGraph.matrixMapping.isFormulaMatrixInRange(sourceRange)) {
        throw new SourceLocationHasMatrixError();
      }
    }
  }, {
    key: "ensureItIsPossibleToAddSheet",
    value: function ensureItIsPossibleToAddSheet(name) {
      if (this.sheetMapping.hasSheetWithName(name)) {
        throw new SheetNameAlreadyTakenError(name);
      }
    }
  }, {
    key: "ensureItIsPossibleToRenameSheet",
    value: function ensureItIsPossibleToRenameSheet(sheetId, name) {
      if (!this.sheetMapping.hasSheetWithId(sheetId)) {
        throw new NoSheetWithIdError(sheetId);
      }

      var existingSheetId = this.sheetMapping.get(name);

      if (existingSheetId !== undefined && existingSheetId !== sheetId) {
        throw new SheetNameAlreadyTakenError(name);
      }
    }
  }, {
    key: "ensureItIsPossibleToChangeContent",
    value: function ensureItIsPossibleToChangeContent(address) {
      if (invalidSimpleCellAddress(address)) {
        throw new InvalidAddressError(address);
      }

      if (!this.sheetMapping.hasSheetWithId(address.sheet)) {
        throw new NoSheetWithIdError(address.sheet);
      }

      if (this.dependencyGraph.matrixMapping.isFormulaMatrixAtAddress(address)) {
        throw new SourceLocationHasMatrixError();
      }
    }
  }, {
    key: "ensureItIsPossibleToChangeCellContents",
    value: function ensureItIsPossibleToChangeCellContents(address, content) {
      var boundaries = findBoundaries(content);
      var targetRange = AbsoluteCellRange.spanFrom(address, boundaries.width, boundaries.height);
      this.ensureRangeInSizeLimits(targetRange);

      var _iterator = _createForOfIteratorHelper(targetRange.addresses(this.dependencyGraph)),
          _step;

      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var _address = _step.value;
          this.ensureItIsPossibleToChangeContent(_address);
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
    }
  }, {
    key: "ensureItIsPossibleToChangeSheetContents",
    value: function ensureItIsPossibleToChangeSheetContents(sheetId, content) {
      var boundaries = findBoundaries(content);
      var targetRange = AbsoluteCellRange.spanFrom(simpleCellAddress(sheetId, 0, 0), boundaries.width, boundaries.height);
      this.ensureRangeInSizeLimits(targetRange);
    }
  }, {
    key: "ensureRangeInSizeLimits",
    value: function ensureRangeInSizeLimits(range) {
      if (range.exceedsSheetSizeLimits(this.config.maxColumns, this.config.maxRows)) {
        throw new SheetSizeLimitExceededError();
      }
    }
  }, {
    key: "isThereSomethingToUndo",
    value: function isThereSomethingToUndo() {
      return !this.undoRedo.isUndoStackEmpty();
    }
  }, {
    key: "isThereSomethingToRedo",
    value: function isThereSomethingToRedo() {
      return !this.undoRedo.isRedoStackEmpty();
    }
  }, {
    key: "getAndClearContentChanges",
    value: function getAndClearContentChanges() {
      return this.operations.getAndClearContentChanges();
    }
  }, {
    key: "ensureSheetExists",
    value: function ensureSheetExists(sheetName) {
      if (!this.sheetMapping.hasSheetWithName(sheetName)) {
        throw new NoSheetWithNameError(sheetName);
      }
    }
  }, {
    key: "scopeId",
    value: function scopeId(sheetName) {
      if (sheetName !== undefined) {
        this.ensureSheetExists(sheetName);
        return this.sheetMapping.fetch(sheetName);
      }

      return undefined;
    }
  }, {
    key: "ensureNamedExpressionNameIsValid",
    value: function ensureNamedExpressionNameIsValid(expressionName, sheetId) {
      if (!this.namedExpressions.isNameValid(expressionName)) {
        throw new NamedExpressionNameIsInvalidError(expressionName);
      }

      if (!this.namedExpressions.isNameAvailable(expressionName, sheetId)) {
        throw new NamedExpressionNameIsAlreadyTakenError(expressionName);
      }
    }
  }, {
    key: "ensureNamedExpressionIsValid",
    value: function ensureNamedExpressionIsValid(expression) {
      var parsedExpression = this.cellContentParser.parse(expression);

      if (parsedExpression instanceof CellContent.MatrixFormula) {
        throw new MatrixFormulasNotSupportedError();
      } else if (parsedExpression instanceof CellContent.Formula) {
        var parsingResult = this.parser.parse(parsedExpression.formula, simpleCellAddress(-1, 0, 0));

        if (doesContainRelativeReferences(parsingResult.ast)) {
          throw new NoRelativeAddressesAllowedError();
        }
      }
    }
  }, {
    key: "sheetMapping",
    get: function get() {
      return this.dependencyGraph.sheetMapping;
    }
  }]);

  return CrudOperations;
}();

function isPositiveInteger(x) {
  return Number.isInteger(x) && x > 0;
}

function isNonnegativeInteger(x) {
  return Number.isInteger(x) && x >= 0;
}