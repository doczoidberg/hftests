import "core-js/modules/es.symbol";
import "core-js/modules/es.symbol.description";
import "core-js/modules/es.symbol.iterator";
import "core-js/modules/es.array.from";
import "core-js/modules/es.array.iterator";
import "core-js/modules/es.array.slice";
import "core-js/modules/es.array.splice";
import "core-js/modules/es.function.name";
import "core-js/modules/es.map";
import "core-js/modules/es.object.to-string";
import "core-js/modules/es.regexp.to-string";
import "core-js/modules/es.string.iterator";
import "core-js/modules/web.dom-collections.iterator";
import "regenerator-runtime/runtime";

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e2) { throw _e2; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e3) { didErr = true; err = _e3; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * @license
 * Copyright (c) 2020 Handsoncode. All rights reserved.
 */
import { simpleCellAddress } from './Cell';
import { AddColumnsCommand, AddRowsCommand, RemoveColumnsCommand, RemoveRowsCommand } from './Operations';
export var RemoveRowsUndoEntry = function RemoveRowsUndoEntry(command, rowsRemovals) {
  _classCallCheck(this, RemoveRowsUndoEntry);

  this.command = command;
  this.rowsRemovals = rowsRemovals;
};
export var MoveCellsUndoEntry = function MoveCellsUndoEntry(sourceLeftCorner, width, height, destinationLeftCorner, overwrittenCellsData, addedGlobalNamedExpressions, version) {
  _classCallCheck(this, MoveCellsUndoEntry);

  this.sourceLeftCorner = sourceLeftCorner;
  this.width = width;
  this.height = height;
  this.destinationLeftCorner = destinationLeftCorner;
  this.overwrittenCellsData = overwrittenCellsData;
  this.addedGlobalNamedExpressions = addedGlobalNamedExpressions;
  this.version = version;
};
export var AddRowsUndoEntry = function AddRowsUndoEntry(command) {
  _classCallCheck(this, AddRowsUndoEntry);

  this.command = command;
};
export var SetSheetContentUndoEntry = function SetSheetContentUndoEntry(sheetId, oldSheetContent, newSheetContent) {
  _classCallCheck(this, SetSheetContentUndoEntry);

  this.sheetId = sheetId;
  this.oldSheetContent = oldSheetContent;
  this.newSheetContent = newSheetContent;
};
export var MoveRowsUndoEntry = function MoveRowsUndoEntry(sheet, startRow, numberOfRows, targetRow, version) {
  _classCallCheck(this, MoveRowsUndoEntry);

  this.sheet = sheet;
  this.startRow = startRow;
  this.numberOfRows = numberOfRows;
  this.targetRow = targetRow;
  this.version = version;
  this.undoStart = this.startRow < this.targetRow ? this.targetRow - this.numberOfRows : this.targetRow;
  this.undoEnd = this.startRow > this.targetRow ? this.startRow + this.numberOfRows : this.startRow;
};
export var MoveColumnsUndoEntry = function MoveColumnsUndoEntry(sheet, startColumn, numberOfColumns, targetColumn, version) {
  _classCallCheck(this, MoveColumnsUndoEntry);

  this.sheet = sheet;
  this.startColumn = startColumn;
  this.numberOfColumns = numberOfColumns;
  this.targetColumn = targetColumn;
  this.version = version;
  this.undoStart = this.startColumn < this.targetColumn ? this.targetColumn - this.numberOfColumns : this.targetColumn;
  this.undoEnd = this.startColumn > this.targetColumn ? this.startColumn + this.numberOfColumns : this.startColumn;
};
export var AddColumnsUndoEntry = function AddColumnsUndoEntry(command) {
  _classCallCheck(this, AddColumnsUndoEntry);

  this.command = command;
};
export var RemoveColumnsUndoEntry = function RemoveColumnsUndoEntry(command, columnsRemovals) {
  _classCallCheck(this, RemoveColumnsUndoEntry);

  this.command = command;
  this.columnsRemovals = columnsRemovals;
};
export var AddSheetUndoEntry = function AddSheetUndoEntry(sheetName) {
  _classCallCheck(this, AddSheetUndoEntry);

  this.sheetName = sheetName;
};
export var RemoveSheetUndoEntry = function RemoveSheetUndoEntry(sheetName, sheetId, oldSheetContent, version) {
  _classCallCheck(this, RemoveSheetUndoEntry);

  this.sheetName = sheetName;
  this.sheetId = sheetId;
  this.oldSheetContent = oldSheetContent;
  this.version = version;
};
export var RenameSheetUndoEntry = function RenameSheetUndoEntry(sheetId, oldName, newName) {
  _classCallCheck(this, RenameSheetUndoEntry);

  this.sheetId = sheetId;
  this.oldName = oldName;
  this.newName = newName;
};
export var ClearSheetUndoEntry = function ClearSheetUndoEntry(sheetId, oldSheetContent) {
  _classCallCheck(this, ClearSheetUndoEntry);

  this.sheetId = sheetId;
  this.oldSheetContent = oldSheetContent;
};
export var SetCellContentsUndoEntry = function SetCellContentsUndoEntry(cellContents) {
  _classCallCheck(this, SetCellContentsUndoEntry);

  this.cellContents = cellContents;
};
export var PasteUndoEntry = function PasteUndoEntry(targetLeftCorner, oldContent, newContent, addedGlobalNamedExpressions) {
  _classCallCheck(this, PasteUndoEntry);

  this.targetLeftCorner = targetLeftCorner;
  this.oldContent = oldContent;
  this.newContent = newContent;
  this.addedGlobalNamedExpressions = addedGlobalNamedExpressions;
};
export var AddNamedExpressionUndoEntry = function AddNamedExpressionUndoEntry(name, newContent, scope, options) {
  _classCallCheck(this, AddNamedExpressionUndoEntry);

  this.name = name;
  this.newContent = newContent;
  this.scope = scope;
  this.options = options;
};
export var RemoveNamedExpressionUndoEntry = function RemoveNamedExpressionUndoEntry(namedExpression, content, scope) {
  _classCallCheck(this, RemoveNamedExpressionUndoEntry);

  this.namedExpression = namedExpression;
  this.content = content;
  this.scope = scope;
};
export var ChangeNamedExpressionUndoEntry = function ChangeNamedExpressionUndoEntry(namedExpression, newContent, oldContent, scope, options) {
  _classCallCheck(this, ChangeNamedExpressionUndoEntry);

  this.namedExpression = namedExpression;
  this.newContent = newContent;
  this.oldContent = oldContent;
  this.scope = scope;
  this.options = options;
};
export var BatchUndoEntry = /*#__PURE__*/function () {
  function BatchUndoEntry() {
    _classCallCheck(this, BatchUndoEntry);

    this.operations = [];
  }

  _createClass(BatchUndoEntry, [{
    key: "add",
    value: function add(operation) {
      this.operations.push(operation);
    }
  }, {
    key: "reversedOperations",
    value: /*#__PURE__*/regeneratorRuntime.mark(function reversedOperations() {
      var i;
      return regeneratorRuntime.wrap(function reversedOperations$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              i = this.operations.length - 1;

            case 1:
              if (!(i >= 0)) {
                _context.next = 7;
                break;
              }

              _context.next = 4;
              return this.operations[i];

            case 4:
              i--;
              _context.next = 1;
              break;

            case 7:
            case "end":
              return _context.stop();
          }
        }
      }, reversedOperations, this);
    })
  }]);

  return BatchUndoEntry;
}();
export var UndoRedo = /*#__PURE__*/function () {
  function UndoRedo(config, operations) {
    _classCallCheck(this, UndoRedo);

    this.operations = operations;
    this.undoStack = [];
    this.redoStack = [];
    this.oldData = new Map();
    this.undoLimit = config.undoLimit;
  }

  _createClass(UndoRedo, [{
    key: "saveOperation",
    value: function saveOperation(operation) {
      if (this.batchUndoEntry !== undefined) {
        this.batchUndoEntry.add(operation);
      } else {
        this.addUndoEntry(operation);
      }
    }
  }, {
    key: "beginBatchMode",
    value: function beginBatchMode() {
      this.batchUndoEntry = new BatchUndoEntry();
    }
  }, {
    key: "addUndoEntry",
    value: function addUndoEntry(operation) {
      this.undoStack.push(operation);
      this.undoStack.splice(0, Math.max(0, this.undoStack.length - this.undoLimit));
    }
  }, {
    key: "commitBatchMode",
    value: function commitBatchMode() {
      if (this.batchUndoEntry === undefined) {
        throw 'Batch mode wasn\'t started';
      }

      this.addUndoEntry(this.batchUndoEntry);
      this.batchUndoEntry = undefined;
    }
  }, {
    key: "storeDataForVersion",
    value: function storeDataForVersion(version, address, astHash) {
      if (!this.oldData.has(version)) {
        this.oldData.set(version, []);
      }

      var currentOldData = this.oldData.get(version);
      currentOldData.push([address, astHash]);
    }
  }, {
    key: "clearRedoStack",
    value: function clearRedoStack() {
      this.redoStack = [];
    }
  }, {
    key: "clearUndoStack",
    value: function clearUndoStack() {
      this.undoStack = [];
    }
  }, {
    key: "isUndoStackEmpty",
    value: function isUndoStackEmpty() {
      return this.undoStack.length === 0;
    }
  }, {
    key: "isRedoStackEmpty",
    value: function isRedoStackEmpty() {
      return this.redoStack.length === 0;
    }
  }, {
    key: "undo",
    value: function undo() {
      var operation = this.undoStack.pop();

      if (!operation) {
        throw 'Attempted to undo without operation on stack';
      }

      this.undoEntry(operation);
      this.redoStack.push(operation);
    }
  }, {
    key: "undoEntry",
    value: function undoEntry(operation) {
      if (operation instanceof RemoveRowsUndoEntry) {
        this.undoRemoveRows(operation);
      } else if (operation instanceof AddRowsUndoEntry) {
        this.undoAddRows(operation);
      } else if (operation instanceof SetCellContentsUndoEntry) {
        this.undoSetCellContents(operation);
      } else if (operation instanceof MoveRowsUndoEntry) {
        this.undoMoveRows(operation);
      } else if (operation instanceof AddSheetUndoEntry) {
        this.undoAddSheet(operation);
      } else if (operation instanceof RemoveSheetUndoEntry) {
        this.undoRemoveSheet(operation);
      } else if (operation instanceof RenameSheetUndoEntry) {
        this.undoRenameSheet(operation);
      } else if (operation instanceof ClearSheetUndoEntry) {
        this.undoClearSheet(operation);
      } else if (operation instanceof AddColumnsUndoEntry) {
        this.undoAddColumns(operation);
      } else if (operation instanceof RemoveColumnsUndoEntry) {
        this.undoRemoveColumns(operation);
      } else if (operation instanceof MoveColumnsUndoEntry) {
        this.undoMoveColumns(operation);
      } else if (operation instanceof MoveCellsUndoEntry) {
        this.undoMoveCells(operation);
      } else if (operation instanceof SetSheetContentUndoEntry) {
        this.undoSetSheetContent(operation);
      } else if (operation instanceof PasteUndoEntry) {
        this.undoPaste(operation);
      } else if (operation instanceof BatchUndoEntry) {
        this.undoBatch(operation);
      } else if (operation instanceof AddNamedExpressionUndoEntry) {
        this.undoAddNamedExpression(operation);
      } else if (operation instanceof RemoveNamedExpressionUndoEntry) {
        this.undoRemoveNamedExpression(operation);
      } else if (operation instanceof ChangeNamedExpressionUndoEntry) {
        this.undoChangeNamedExpression(operation);
      } else {
        throw 'Unknown element';
      }
    }
  }, {
    key: "undoBatch",
    value: function undoBatch(batchOperation) {
      var _iterator = _createForOfIteratorHelper(batchOperation.reversedOperations()),
          _step;

      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var operation = _step.value;
          this.undoEntry(operation);
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
    }
  }, {
    key: "undoRemoveRows",
    value: function undoRemoveRows(operation) {
      this.operations.forceApplyPostponedTransformations();
      var sheet = operation.command.sheet,
          rowsRemovals = operation.rowsRemovals;

      for (var i = rowsRemovals.length - 1; i >= 0; --i) {
        var rowsRemoval = rowsRemovals[i];
        this.operations.addRows(new AddRowsCommand(sheet, [[rowsRemoval.rowFrom, rowsRemoval.rowCount]]));

        var _iterator2 = _createForOfIteratorHelper(rowsRemoval.removedCells),
            _step2;

        try {
          for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
            var _step2$value = _step2.value,
                address = _step2$value.address,
                cellType = _step2$value.cellType;
            this.operations.restoreCell(address, cellType);
          }
        } catch (err) {
          _iterator2.e(err);
        } finally {
          _iterator2.f();
        }

        this.restoreOldDataFromVersion(rowsRemoval.version - 1);
      }
    }
  }, {
    key: "undoRemoveColumns",
    value: function undoRemoveColumns(operation) {
      this.operations.forceApplyPostponedTransformations();
      var sheet = operation.command.sheet,
          columnsRemovals = operation.columnsRemovals;

      for (var i = columnsRemovals.length - 1; i >= 0; --i) {
        var columnsRemoval = columnsRemovals[i];
        this.operations.addColumns(new AddColumnsCommand(sheet, [[columnsRemoval.columnFrom, columnsRemoval.columnCount]]));

        var _iterator3 = _createForOfIteratorHelper(columnsRemoval.removedCells),
            _step3;

        try {
          for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
            var _step3$value = _step3.value,
                address = _step3$value.address,
                cellType = _step3$value.cellType;
            this.operations.restoreCell(address, cellType);
          }
        } catch (err) {
          _iterator3.e(err);
        } finally {
          _iterator3.f();
        }

        this.restoreOldDataFromVersion(columnsRemoval.version - 1);
      }
    }
  }, {
    key: "undoAddRows",
    value: function undoAddRows(operation) {
      var addedRowsSpans = operation.command.rowsSpans();

      for (var i = addedRowsSpans.length - 1; i >= 0; --i) {
        var addedRows = addedRowsSpans[i];
        this.operations.removeRows(new RemoveRowsCommand(operation.command.sheet, [[addedRows.rowStart, addedRows.numberOfRows]]));
      }
    }
  }, {
    key: "undoAddColumns",
    value: function undoAddColumns(operation) {
      var addedColumnsSpans = operation.command.columnsSpans();

      for (var i = addedColumnsSpans.length - 1; i >= 0; --i) {
        var addedColumns = addedColumnsSpans[i];
        this.operations.removeColumns(new RemoveColumnsCommand(operation.command.sheet, [[addedColumns.columnStart, addedColumns.numberOfColumns]]));
      }
    }
  }, {
    key: "undoSetCellContents",
    value: function undoSetCellContents(operation) {
      var _iterator4 = _createForOfIteratorHelper(operation.cellContents),
          _step4;

      try {
        for (_iterator4.s(); !(_step4 = _iterator4.n()).done;) {
          var cellContentData = _step4.value;
          this.operations.restoreCell(cellContentData.address, cellContentData.oldContent);
        }
      } catch (err) {
        _iterator4.e(err);
      } finally {
        _iterator4.f();
      }
    }
  }, {
    key: "undoPaste",
    value: function undoPaste(operation) {
      var _iterator5 = _createForOfIteratorHelper(operation.oldContent),
          _step5;

      try {
        for (_iterator5.s(); !(_step5 = _iterator5.n()).done;) {
          var _step5$value = _slicedToArray(_step5.value, 2),
              address = _step5$value[0],
              clipboardCell = _step5$value[1];

          this.operations.restoreCell(address, clipboardCell);
        }
      } catch (err) {
        _iterator5.e(err);
      } finally {
        _iterator5.f();
      }

      var _iterator6 = _createForOfIteratorHelper(operation.addedGlobalNamedExpressions),
          _step6;

      try {
        for (_iterator6.s(); !(_step6 = _iterator6.n()).done;) {
          var namedExpression = _step6.value;
          this.operations.removeNamedExpression(namedExpression);
        }
      } catch (err) {
        _iterator6.e(err);
      } finally {
        _iterator6.f();
      }
    }
  }, {
    key: "undoMoveRows",
    value: function undoMoveRows(operation) {
      var sheet = operation.sheet;
      this.operations.moveRows(sheet, operation.undoStart, operation.numberOfRows, operation.undoEnd);
      this.restoreOldDataFromVersion(operation.version - 1);
    }
  }, {
    key: "undoMoveColumns",
    value: function undoMoveColumns(operation) {
      var sheet = operation.sheet;
      this.operations.moveColumns(sheet, operation.undoStart, operation.numberOfColumns, operation.undoEnd);
      this.restoreOldDataFromVersion(operation.version - 1);
    }
  }, {
    key: "undoMoveCells",
    value: function undoMoveCells(operation) {
      this.operations.forceApplyPostponedTransformations();
      this.operations.moveCells(operation.destinationLeftCorner, operation.width, operation.height, operation.sourceLeftCorner);

      var _iterator7 = _createForOfIteratorHelper(operation.overwrittenCellsData),
          _step7;

      try {
        for (_iterator7.s(); !(_step7 = _iterator7.n()).done;) {
          var _step7$value = _slicedToArray(_step7.value, 2),
              address = _step7$value[0],
              clipboardCell = _step7$value[1];

          this.operations.restoreCell(address, clipboardCell);
        }
      } catch (err) {
        _iterator7.e(err);
      } finally {
        _iterator7.f();
      }

      this.restoreOldDataFromVersion(operation.version - 1);

      var _iterator8 = _createForOfIteratorHelper(operation.addedGlobalNamedExpressions),
          _step8;

      try {
        for (_iterator8.s(); !(_step8 = _iterator8.n()).done;) {
          var namedExpression = _step8.value;
          this.operations.removeNamedExpression(namedExpression);
        }
      } catch (err) {
        _iterator8.e(err);
      } finally {
        _iterator8.f();
      }
    }
  }, {
    key: "undoAddSheet",
    value: function undoAddSheet(operation) {
      var sheetName = operation.sheetName;
      this.operations.removeSheet(sheetName);
    }
  }, {
    key: "undoRemoveSheet",
    value: function undoRemoveSheet(operation) {
      this.operations.forceApplyPostponedTransformations();
      var oldSheetContent = operation.oldSheetContent,
          sheetId = operation.sheetId;
      this.operations.addSheet(operation.sheetName);

      for (var rowIndex = 0; rowIndex < oldSheetContent.length; rowIndex++) {
        var row = oldSheetContent[rowIndex];

        for (var col = 0; col < row.length; col++) {
          var cellType = row[col];
          var address = simpleCellAddress(sheetId, col, rowIndex);
          this.operations.restoreCell(address, cellType);
        }
      }

      this.restoreOldDataFromVersion(operation.version - 1);
    }
  }, {
    key: "undoRenameSheet",
    value: function undoRenameSheet(operation) {
      this.operations.renameSheet(operation.sheetId, operation.oldName);
    }
  }, {
    key: "undoClearSheet",
    value: function undoClearSheet(operation) {
      var oldSheetContent = operation.oldSheetContent,
          sheetId = operation.sheetId;

      for (var rowIndex = 0; rowIndex < oldSheetContent.length; rowIndex++) {
        var row = oldSheetContent[rowIndex];

        for (var col = 0; col < row.length; col++) {
          var cellType = row[col];
          var address = simpleCellAddress(sheetId, col, rowIndex);
          this.operations.restoreCell(address, cellType);
        }
      }
    }
  }, {
    key: "undoSetSheetContent",
    value: function undoSetSheetContent(operation) {
      var oldSheetContent = operation.oldSheetContent,
          newSheetContent = operation.newSheetContent,
          sheetId = operation.sheetId;
      this.operations.clearSheet(sheetId);

      for (var rowIndex = 0; rowIndex < oldSheetContent.length; rowIndex++) {
        var row = oldSheetContent[rowIndex];

        for (var col = 0; col < row.length; col++) {
          var cellType = row[col];
          var address = simpleCellAddress(sheetId, col, rowIndex);
          this.operations.restoreCell(address, cellType);
        }
      }
    }
  }, {
    key: "undoAddNamedExpression",
    value: function undoAddNamedExpression(operation) {
      this.operations.removeNamedExpression(operation.name, operation.scope);
    }
  }, {
    key: "undoRemoveNamedExpression",
    value: function undoRemoveNamedExpression(operation) {
      this.operations.restoreNamedExpression(operation.namedExpression, operation.content, operation.scope);
    }
  }, {
    key: "undoChangeNamedExpression",
    value: function undoChangeNamedExpression(operation) {
      this.operations.restoreNamedExpression(operation.namedExpression, operation.oldContent, operation.scope);
    }
  }, {
    key: "redo",
    value: function redo() {
      var operation = this.redoStack.pop();

      if (!operation) {
        throw 'Attempted to redo without operation on stack';
      }

      this.redoEntry(operation);
      this.undoStack.push(operation);
    }
  }, {
    key: "redoEntry",
    value: function redoEntry(operation) {
      if (operation instanceof RemoveRowsUndoEntry) {
        this.redoRemoveRows(operation);
      } else if (operation instanceof RemoveRowsUndoEntry) {
        this.redoRemoveRows(operation);
      } else if (operation instanceof AddRowsUndoEntry) {
        this.redoAddRows(operation);
      } else if (operation instanceof SetCellContentsUndoEntry) {
        this.redoSetCellContents(operation);
      } else if (operation instanceof MoveRowsUndoEntry) {
        this.redoMoveRows(operation);
      } else if (operation instanceof AddSheetUndoEntry) {
        this.redoAddSheet(operation);
      } else if (operation instanceof RemoveSheetUndoEntry) {
        this.redoRemoveSheet(operation);
      } else if (operation instanceof RenameSheetUndoEntry) {
        this.redoRenameSheet(operation);
      } else if (operation instanceof ClearSheetUndoEntry) {
        this.redoClearSheet(operation);
      } else if (operation instanceof AddColumnsUndoEntry) {
        this.redoAddColumns(operation);
      } else if (operation instanceof RemoveColumnsUndoEntry) {
        this.redoRemoveColumns(operation);
      } else if (operation instanceof MoveColumnsUndoEntry) {
        this.redoMoveColumns(operation);
      } else if (operation instanceof MoveCellsUndoEntry) {
        this.redoMoveCells(operation);
      } else if (operation instanceof SetSheetContentUndoEntry) {
        this.redoSetSheetContent(operation);
      } else if (operation instanceof PasteUndoEntry) {
        this.redoPaste(operation);
      } else if (operation instanceof BatchUndoEntry) {
        this.redoBatch(operation);
      } else if (operation instanceof AddNamedExpressionUndoEntry) {
        this.redoAddNamedExpression(operation);
      } else if (operation instanceof RemoveNamedExpressionUndoEntry) {
        this.redoRemoveNamedExpression(operation);
      } else if (operation instanceof ChangeNamedExpressionUndoEntry) {
        this.redoChangeNamedExpression(operation);
      } else {
        throw 'Unknown element';
      }
    }
  }, {
    key: "redoBatch",
    value: function redoBatch(batchOperation) {
      var _iterator9 = _createForOfIteratorHelper(batchOperation.operations),
          _step9;

      try {
        for (_iterator9.s(); !(_step9 = _iterator9.n()).done;) {
          var operation = _step9.value;
          this.redoEntry(operation);
        }
      } catch (err) {
        _iterator9.e(err);
      } finally {
        _iterator9.f();
      }
    }
  }, {
    key: "redoRemoveRows",
    value: function redoRemoveRows(operation) {
      this.operations.removeRows(operation.command);
    }
  }, {
    key: "redoMoveCells",
    value: function redoMoveCells(operation) {
      this.operations.moveCells(operation.sourceLeftCorner, operation.width, operation.height, operation.destinationLeftCorner);
    }
  }, {
    key: "redoRemoveColumns",
    value: function redoRemoveColumns(operation) {
      this.operations.removeColumns(operation.command);
    }
  }, {
    key: "redoPaste",
    value: function redoPaste(operation) {
      var targetLeftCorner = operation.targetLeftCorner,
          newContent = operation.newContent;
      var height = newContent.length;
      var width = newContent[0].length;

      for (var y = 0; y < height; ++y) {
        for (var x = 0; x < width; ++x) {
          var address = simpleCellAddress(targetLeftCorner.sheet, targetLeftCorner.col + x, targetLeftCorner.row + y);
          this.operations.restoreCell(address, newContent[y][x]);
        }
      }
    }
  }, {
    key: "redoSetCellContents",
    value: function redoSetCellContents(operation) {
      var _iterator10 = _createForOfIteratorHelper(operation.cellContents),
          _step10;

      try {
        for (_iterator10.s(); !(_step10 = _iterator10.n()).done;) {
          var cellContentData = _step10.value;
          this.operations.setCellContent(cellContentData.address, cellContentData.newContent);
        }
      } catch (err) {
        _iterator10.e(err);
      } finally {
        _iterator10.f();
      }
    }
  }, {
    key: "redoAddRows",
    value: function redoAddRows(operation) {
      this.operations.addRows(operation.command);
    }
  }, {
    key: "redoAddColumns",
    value: function redoAddColumns(operation) {
      this.operations.addColumns(operation.command);
    }
  }, {
    key: "redoRemoveSheet",
    value: function redoRemoveSheet(operation) {
      this.operations.removeSheet(operation.sheetName);
    }
  }, {
    key: "redoAddSheet",
    value: function redoAddSheet(operation) {
      this.operations.addSheet(operation.sheetName);
    }
  }, {
    key: "redoRenameSheet",
    value: function redoRenameSheet(operation) {
      this.operations.renameSheet(operation.sheetId, operation.newName);
    }
  }, {
    key: "redoMoveRows",
    value: function redoMoveRows(operation) {
      this.operations.moveRows(operation.sheet, operation.startRow, operation.numberOfRows, operation.targetRow);
    }
  }, {
    key: "redoMoveColumns",
    value: function redoMoveColumns(operation) {
      this.operations.moveColumns(operation.sheet, operation.startColumn, operation.numberOfColumns, operation.targetColumn);
    }
  }, {
    key: "redoClearSheet",
    value: function redoClearSheet(operation) {
      this.operations.clearSheet(operation.sheetId);
    }
  }, {
    key: "redoSetSheetContent",
    value: function redoSetSheetContent(operation) {
      var sheetId = operation.sheetId,
          newSheetContent = operation.newSheetContent;
      this.operations.setSheetContent(sheetId, newSheetContent);
    }
  }, {
    key: "redoAddNamedExpression",
    value: function redoAddNamedExpression(operation) {
      this.operations.addNamedExpression(operation.name, operation.newContent, operation.scope, operation.options);
    }
  }, {
    key: "redoRemoveNamedExpression",
    value: function redoRemoveNamedExpression(operation) {
      this.operations.removeNamedExpression(operation.namedExpression.displayName, operation.scope);
    }
  }, {
    key: "redoChangeNamedExpression",
    value: function redoChangeNamedExpression(operation) {
      this.operations.changeNamedExpressionExpression(operation.namedExpression.displayName, operation.newContent, operation.scope, operation.options);
    }
  }, {
    key: "restoreOldDataFromVersion",
    value: function restoreOldDataFromVersion(version) {
      var oldDataToRestore = this.oldData.get(version) || [];

      var _iterator11 = _createForOfIteratorHelper(oldDataToRestore),
          _step11;

      try {
        for (_iterator11.s(); !(_step11 = _iterator11.n()).done;) {
          var entryToRestore = _step11.value;

          var _entryToRestore = _slicedToArray(entryToRestore, 2),
              address = _entryToRestore[0],
              hash = _entryToRestore[1];

          this.operations.setFormulaToCellFromCache(hash, address);
        }
      } catch (err) {
        _iterator11.e(err);
      } finally {
        _iterator11.f();
      }
    }
  }]);

  return UndoRedo;
}();