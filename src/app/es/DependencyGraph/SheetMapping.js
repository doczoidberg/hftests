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
import "regenerator-runtime/runtime";

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
import { UIElement } from '../i18n';
import { NoSheetWithIdError, NoSheetWithNameError, SheetNameAlreadyTakenError } from '../errors';

function canonicalize(sheetDisplayName) {
  return sheetDisplayName.toLowerCase();
}

var Sheet = /*#__PURE__*/function () {
  function Sheet(id, displayName) {
    _classCallCheck(this, Sheet);

    this.id = id;
    this.displayName = displayName;
  }

  _createClass(Sheet, [{
    key: "canonicalName",
    get: function get() {
      return canonicalize(this.displayName);
    }
  }]);

  return Sheet;
}();

export var SheetMapping = /*#__PURE__*/function () {
  function SheetMapping(languages) {
    var _this = this;

    _classCallCheck(this, SheetMapping);

    this.languages = languages;
    this.mappingFromCanonicalName = new Map();
    this.mappingFromId = new Map();
    this.lastSheetId = -1;

    this.fetch = function (sheetName) {
      var sheet = _this.mappingFromCanonicalName.get(canonicalize(sheetName));

      if (sheet === undefined) {
        throw new NoSheetWithNameError(sheetName);
      }

      return sheet.id;
    };

    this.get = function (sheetName) {
      var sheet = _this.mappingFromCanonicalName.get(canonicalize(sheetName));

      if (sheet) {
        return sheet.id;
      } else {
        return undefined;
      }
    };

    this.fetchDisplayName = function (sheetId) {
      return _this.fetchSheetById(sheetId).displayName;
    };

    this.sheetNamePrefix = languages.getUITranslation(UIElement.NEW_SHEET_PREFIX);
  }

  _createClass(SheetMapping, [{
    key: "addSheet",
    value: function addSheet() {
      var newSheetDisplayName = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "".concat(this.sheetNamePrefix).concat(this.lastSheetId + 2);
      var newSheetCanonicalName = canonicalize(newSheetDisplayName);

      if (this.mappingFromCanonicalName.has(newSheetCanonicalName)) {
        throw new SheetNameAlreadyTakenError(newSheetDisplayName);
      }

      this.lastSheetId++;
      var sheet = new Sheet(this.lastSheetId, newSheetDisplayName);
      this.store(sheet);
      return sheet.id;
    }
  }, {
    key: "removeSheet",
    value: function removeSheet(sheetId) {
      var sheet = this.fetchSheetById(sheetId);

      if (sheetId == this.lastSheetId) {
        --this.lastSheetId;
      }

      this.mappingFromCanonicalName.delete(sheet.canonicalName);
      this.mappingFromId.delete(sheet.id);
    }
  }, {
    key: "getDisplayName",
    value: function getDisplayName(sheetId) {
      var sheet = this.mappingFromId.get(sheetId);

      if (sheet) {
        return sheet.displayName;
      } else {
        return undefined;
      }
    }
  }, {
    key: "getDisplayNameByName",
    value: function getDisplayNameByName(sheetName) {
      var sheet = this.mappingFromCanonicalName.get(canonicalize(sheetName));

      if (sheet) {
        return sheet.displayName;
      } else {
        return undefined;
      }
    }
  }, {
    key: "displayNames",
    value: /*#__PURE__*/regeneratorRuntime.mark(function displayNames() {
      var _iterator, _step, sheet;

      return regeneratorRuntime.wrap(function displayNames$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _iterator = _createForOfIteratorHelper(this.mappingFromCanonicalName.values());
              _context.prev = 1;

              _iterator.s();

            case 3:
              if ((_step = _iterator.n()).done) {
                _context.next = 9;
                break;
              }

              sheet = _step.value;
              _context.next = 7;
              return sheet.displayName;

            case 7:
              _context.next = 3;
              break;

            case 9:
              _context.next = 14;
              break;

            case 11:
              _context.prev = 11;
              _context.t0 = _context["catch"](1);

              _iterator.e(_context.t0);

            case 14:
              _context.prev = 14;

              _iterator.f();

              return _context.finish(14);

            case 17:
            case "end":
              return _context.stop();
          }
        }
      }, displayNames, this, [[1, 11, 14, 17]]);
    })
  }, {
    key: "numberOfSheets",
    value: function numberOfSheets() {
      return this.mappingFromCanonicalName.size;
    }
  }, {
    key: "hasSheetWithId",
    value: function hasSheetWithId(sheetId) {
      return this.mappingFromId.has(sheetId);
    }
  }, {
    key: "hasSheetWithName",
    value: function hasSheetWithName(sheetName) {
      return this.mappingFromCanonicalName.has(canonicalize(sheetName));
    }
  }, {
    key: "renameSheet",
    value: function renameSheet(sheetId, newDisplayName) {
      var sheet = this.fetchSheetById(sheetId);
      var currentDisplayName = sheet.displayName;

      if (currentDisplayName === newDisplayName) {
        return undefined;
      }

      var sheetWithThisCanonicalName = this.mappingFromCanonicalName.get(canonicalize(newDisplayName));

      if (sheetWithThisCanonicalName && sheetWithThisCanonicalName.id !== sheet.id) {
        throw new SheetNameAlreadyTakenError(newDisplayName);
      }

      var currentCanonicalName = sheet.canonicalName;
      this.mappingFromCanonicalName.delete(currentCanonicalName);
      sheet.displayName = newDisplayName;
      this.store(sheet);
      return currentDisplayName;
    }
  }, {
    key: "destroy",
    value: function destroy() {
      this.mappingFromCanonicalName.clear();
      this.mappingFromId.clear();
    }
  }, {
    key: "sheetNames",
    value: function sheetNames() {
      return Array.from(this.mappingFromId.values()).map(function (s) {
        return s.displayName;
      });
    }
  }, {
    key: "store",
    value: function store(sheet) {
      this.mappingFromId.set(sheet.id, sheet);
      this.mappingFromCanonicalName.set(sheet.canonicalName, sheet);
    }
  }, {
    key: "fetchSheetById",
    value: function fetchSheetById(sheetId) {
      var sheet = this.mappingFromId.get(sheetId);

      if (sheet === undefined) {
        throw new NoSheetWithIdError(sheetId);
      }

      return sheet;
    }
  }]);

  return SheetMapping;
}();