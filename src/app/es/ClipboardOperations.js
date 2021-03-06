import "regenerator-runtime/runtime";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 * @license
 * Copyright (c) 2020 Handsoncode. All rights reserved.
 */
import { AbsoluteCellRange } from './AbsoluteCellRange';
import { invalidSimpleCellAddress, simpleCellAddress } from './Cell';
import { InvalidArgumentsError, SheetSizeLimitExceededError } from './errors';
var ClipboardOperationType;

(function (ClipboardOperationType) {
  ClipboardOperationType[ClipboardOperationType["COPY"] = 0] = "COPY";
  ClipboardOperationType[ClipboardOperationType["CUT"] = 1] = "CUT";
})(ClipboardOperationType || (ClipboardOperationType = {}));

export var ClipboardCellType;

(function (ClipboardCellType) {
  ClipboardCellType[ClipboardCellType["VALUE"] = 0] = "VALUE";
  ClipboardCellType[ClipboardCellType["EMPTY"] = 1] = "EMPTY";
  ClipboardCellType[ClipboardCellType["FORMULA"] = 2] = "FORMULA";
  ClipboardCellType[ClipboardCellType["PARSING_ERROR"] = 3] = "PARSING_ERROR";
})(ClipboardCellType || (ClipboardCellType = {}));

var Clipboard = /*#__PURE__*/function () {
  function Clipboard(sourceLeftCorner, width, height, type, content) {
    _classCallCheck(this, Clipboard);

    this.sourceLeftCorner = sourceLeftCorner;
    this.width = width;
    this.height = height;
    this.type = type;
    this.content = content;
  }

  _createClass(Clipboard, [{
    key: "getContent",
    value: /*#__PURE__*/regeneratorRuntime.mark(function getContent(leftCorner) {
      var y, x;
      return regeneratorRuntime.wrap(function getContent$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              if (!(this.content === undefined)) {
                _context.next = 4;
                break;
              }

              return _context.abrupt("return");

            case 4:
              y = 0;

            case 5:
              if (!(y < this.height)) {
                _context.next = 16;
                break;
              }

              x = 0;

            case 7:
              if (!(x < this.width)) {
                _context.next = 13;
                break;
              }

              _context.next = 10;
              return [simpleCellAddress(leftCorner.sheet, leftCorner.col + x, leftCorner.row + y), this.content[y][x]];

            case 10:
              ++x;
              _context.next = 7;
              break;

            case 13:
              ++y;
              _context.next = 5;
              break;

            case 16:
            case "end":
              return _context.stop();
          }
        }
      }, getContent, this);
    })
  }]);

  return Clipboard;
}();

export var ClipboardOperations = /*#__PURE__*/function () {
  function ClipboardOperations(dependencyGraph, operations, parser, lazilyTransformingAstService, config) {
    _classCallCheck(this, ClipboardOperations);

    this.dependencyGraph = dependencyGraph;
    this.operations = operations;
    this.parser = parser;
    this.lazilyTransformingAstService = lazilyTransformingAstService;
    this.config = config;
  }

  _createClass(ClipboardOperations, [{
    key: "cut",
    value: function cut(leftCorner, width, height) {
      this.clipboard = new Clipboard(leftCorner, width, height, ClipboardOperationType.CUT);
    }
  }, {
    key: "copy",
    value: function copy(leftCorner, width, height) {
      var content = [];

      for (var y = 0; y < height; ++y) {
        content[y] = [];

        for (var x = 0; x < width; ++x) {
          var clipboardCell = this.operations.getClipboardCell(simpleCellAddress(leftCorner.sheet, leftCorner.col + x, leftCorner.row + y));
          content[y].push(clipboardCell);
        }
      }

      this.clipboard = new Clipboard(leftCorner, width, height, ClipboardOperationType.COPY, content);
    }
  }, {
    key: "abortCut",
    value: function abortCut() {
      if (this.clipboard && this.clipboard.type === ClipboardOperationType.CUT) {
        this.clear();
      }
    }
  }, {
    key: "clear",
    value: function clear() {
      this.clipboard = undefined;
    }
  }, {
    key: "ensureItIsPossibleToCopyPaste",
    value: function ensureItIsPossibleToCopyPaste(destinationLeftCorner) {
      if (this.clipboard === undefined) {
        return;
      }

      if (invalidSimpleCellAddress(destinationLeftCorner) || !this.dependencyGraph.sheetMapping.hasSheetWithId(destinationLeftCorner.sheet)) {
        throw new InvalidArgumentsError('a valid target address.');
      }

      var targetRange = AbsoluteCellRange.spanFrom(destinationLeftCorner, this.clipboard.width, this.clipboard.height);

      if (targetRange.exceedsSheetSizeLimits(this.config.maxColumns, this.config.maxRows)) {
        throw new SheetSizeLimitExceededError();
      }

      if (this.dependencyGraph.matrixMapping.isFormulaMatrixInRange(targetRange)) {
        throw new Error('It is not possible to paste onto matrix');
      }
    }
  }, {
    key: "isCutClipboard",
    value: function isCutClipboard() {
      return this.clipboard !== undefined && this.clipboard.type === ClipboardOperationType.CUT;
    }
  }, {
    key: "isCopyClipboard",
    value: function isCopyClipboard() {
      return this.clipboard !== undefined && this.clipboard.type === ClipboardOperationType.COPY;
    }
  }]);

  return ClipboardOperations;
}();