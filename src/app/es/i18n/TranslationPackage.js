import "core-js/modules/es.symbol";
import "core-js/modules/es.symbol.description";
import "core-js/modules/es.symbol.iterator";
import "core-js/modules/es.array.from";
import "core-js/modules/es.array.iterator";
import "core-js/modules/es.array.reduce";
import "core-js/modules/es.array.slice";
import "core-js/modules/es.function.name";
import "core-js/modules/es.object.assign";
import "core-js/modules/es.object.get-own-property-names";
import "core-js/modules/es.object.keys";
import "core-js/modules/es.object.to-string";
import "core-js/modules/es.object.values";
import "core-js/modules/es.regexp.to-string";
import "core-js/modules/es.set";
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
import { ErrorType } from '../Cell';
import { MissingTranslationError, ProtectedFunctionTranslationError } from '../errors';
import { UIElement } from './index';
export var TranslationPackage = /*#__PURE__*/function () {
  function TranslationPackage(functions, errors, ui) {
    _classCallCheck(this, TranslationPackage);

    this.functions = functions;
    this.errors = errors;
    this.ui = ui;
    this._protectedTranslations = {
      'VERSION': 'VERSION'
    };
    this.checkUI();
    this.checkErrors();
    this.checkFunctionTranslations(this.functions);
    Object.assign(this.functions, this._protectedTranslations);
  }

  _createClass(TranslationPackage, [{
    key: "extendFunctions",
    value: function extendFunctions(additionalFunctionTranslations) {
      this.checkFunctionTranslations(additionalFunctionTranslations);
      Object.assign(this.functions, additionalFunctionTranslations);
    }
  }, {
    key: "buildFunctionMapping",
    value: function buildFunctionMapping() {
      var _this = this;

      return Object.keys(this.functions).reduce(function (ret, key) {
        ret[_this.functions[key]] = key;
        return ret;
      }, {});
    }
  }, {
    key: "buildErrorMapping",
    value: function buildErrorMapping() {
      var _this2 = this;

      return Object.keys(this.errors).reduce(function (ret, key) {
        ret[_this2.errors[key]] = key;
        return ret;
      }, {});
    }
  }, {
    key: "isFunctionTranslated",
    value: function isFunctionTranslated(key) {
      return this.functions[key] !== undefined;
    }
  }, {
    key: "getFunctionTranslations",
    value: function getFunctionTranslations(functionIds) {
      var translations = [];

      var _iterator = _createForOfIteratorHelper(functionIds),
          _step;

      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var functionId = _step.value;

          if (this.isFunctionTranslated(functionId)) {
            translations.push(this.functions[functionId]);
          }
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }

      return translations;
    }
  }, {
    key: "getFunctionTranslation",
    value: function getFunctionTranslation(key) {
      var val = this.functions[key];

      if (val === undefined) {
        throw new MissingTranslationError("functions.".concat(key));
      } else {
        return val;
      }
    }
  }, {
    key: "getMaybeFunctionTranslation",
    value: function getMaybeFunctionTranslation(key) {
      return this.functions[key];
    }
  }, {
    key: "getErrorTranslation",
    value: function getErrorTranslation(key) {
      var val = this.errors[key];

      if (val === undefined) {
        throw new MissingTranslationError("errors.".concat(key));
      } else {
        return val;
      }
    }
  }, {
    key: "getUITranslation",
    value: function getUITranslation(key) {
      var val = this.ui[key];

      if (val === undefined) {
        throw new MissingTranslationError("ui.".concat(key));
      } else {
        return val;
      }
    }
  }, {
    key: "checkUI",
    value: function checkUI() {
      for (var _i = 0, _Object$values = Object.values(UIElement); _i < _Object$values.length; _i++) {
        var key = _Object$values[_i];

        if (!(key in this.ui)) {
          throw new MissingTranslationError("ui.".concat(key));
        }
      }
    }
  }, {
    key: "checkErrors",
    value: function checkErrors() {
      for (var _i2 = 0, _Object$values2 = Object.values(ErrorType); _i2 < _Object$values2.length; _i2++) {
        var key = _Object$values2[_i2];

        if (!(key in this.errors)) {
          throw new MissingTranslationError("errors.".concat(key));
        }
      }
    }
  }, {
    key: "checkFunctionTranslations",
    value: function checkFunctionTranslations(functions) {
      var functionNames = new Set(Object.getOwnPropertyNames(functions));

      var _iterator2 = _createForOfIteratorHelper(Object.getOwnPropertyNames(this._protectedTranslations)),
          _step2;

      try {
        for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
          var protectedTranslation = _step2.value;

          if (functionNames.has(protectedTranslation)) {
            throw new ProtectedFunctionTranslationError(protectedTranslation);
          }
        }
      } catch (err) {
        _iterator2.e(err);
      } finally {
        _iterator2.f();
      }
    }
  }]);

  return TranslationPackage;
}();
export function buildTranslationPackage(rawTranslationPackage) {
  return new TranslationPackage(Object.assign({}, rawTranslationPackage.functions), Object.assign({}, rawTranslationPackage.errors), Object.assign({}, rawTranslationPackage.ui));
}