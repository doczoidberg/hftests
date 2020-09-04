import "core-js/modules/es.symbol";
import "core-js/modules/es.symbol.description";
import "core-js/modules/es.symbol.iterator";
import "core-js/modules/es.array.from";
import "core-js/modules/es.array.iterator";
import "core-js/modules/es.array.slice";
import "core-js/modules/es.function.name";
import "core-js/modules/es.object.get-own-property-names";
import "core-js/modules/es.object.get-prototype-of";
import "core-js/modules/es.object.to-string";
import "core-js/modules/es.reflect.construct";
import "core-js/modules/es.regexp.to-string";
import "core-js/modules/es.string.iterator";
import "core-js/modules/es.string.starts-with";
import "core-js/modules/web.dom-collections.iterator";

function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

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
import { CellType, CellValueType, ErrorType } from './Cell';
import { DetailedCellError, ExportedCellChange, ExportedNamedExpressionChange } from './CellValue';
import { HyperFormula } from './HyperFormula';
import { Config } from './Config';
import enGB from './i18n/languages/enGB';
import { ConfigValueTooBigError, ConfigValueTooSmallError, EvaluationSuspendedError, ExpectedOneOfValuesError, ExpectedValueOfTypeError, FunctionPluginValidationError, InvalidAddressError, InvalidArgumentsError, LanguageAlreadyRegisteredError, LanguageNotRegisteredError, MatrixFormulasNotSupportedError, MissingTranslationError, NamedExpressionDoesNotExistError, NamedExpressionNameIsAlreadyTakenError, NamedExpressionNameIsInvalidError, NoOperationToRedoError, NoOperationToUndoError, NoRelativeAddressesAllowedError, NoSheetWithIdError, NoSheetWithNameError, NotAFormulaError, NothingToPasteError, ProtectedFunctionTranslationError, SheetNameAlreadyTakenError, SheetSizeLimitExceededError, SourceLocationHasMatrixError, TargetLocationHasMatrixError, UnableToParseError } from './errors';
import * as plugins from './interpreter/plugin';
import { FunctionPlugin } from './interpreter';
/** @internal */

var HyperFormulaNS = /*#__PURE__*/function (_HyperFormula) {
  _inherits(HyperFormulaNS, _HyperFormula);

  var _super = _createSuper(HyperFormulaNS);

  function HyperFormulaNS() {
    _classCallCheck(this, HyperFormulaNS);

    return _super.apply(this, arguments);
  }

  return HyperFormulaNS;
}(HyperFormula);

HyperFormulaNS.HyperFormula = HyperFormula;
HyperFormulaNS.ErrorType = ErrorType;
HyperFormulaNS.CellType = CellType;
HyperFormulaNS.CellValueType = CellValueType;
HyperFormulaNS.DetailedCellError = DetailedCellError;
HyperFormulaNS.ExportedCellChange = ExportedCellChange;
HyperFormulaNS.ExportedNamedExpressionChange = ExportedNamedExpressionChange;
HyperFormulaNS.ConfigValueTooBigError = ConfigValueTooBigError;
HyperFormulaNS.ConfigValueTooSmallError = ConfigValueTooSmallError;
HyperFormulaNS.EvaluationSuspendedError = EvaluationSuspendedError;
HyperFormulaNS.ExpectedOneOfValuesError = ExpectedOneOfValuesError;
HyperFormulaNS.ExpectedValueOfTypeError = ExpectedValueOfTypeError;
HyperFormulaNS.FunctionPlugin = FunctionPlugin;
HyperFormulaNS.FunctionPluginValidationError = FunctionPluginValidationError;
HyperFormulaNS.InvalidAddressError = InvalidAddressError;
HyperFormulaNS.InvalidArgumentsError = InvalidArgumentsError;
HyperFormulaNS.LanguageNotRegisteredError = LanguageNotRegisteredError;
HyperFormulaNS.LanguageAlreadyRegisteredError = LanguageAlreadyRegisteredError;
HyperFormulaNS.MatrixFormulasNotSupportedError = MatrixFormulasNotSupportedError;
HyperFormulaNS.MissingTranslationError = MissingTranslationError;
HyperFormulaNS.NamedExpressionDoesNotExistError = NamedExpressionDoesNotExistError;
HyperFormulaNS.NamedExpressionNameIsAlreadyTakenError = NamedExpressionNameIsAlreadyTakenError;
HyperFormulaNS.NamedExpressionNameIsInvalidError = NamedExpressionNameIsInvalidError;
HyperFormulaNS.NoOperationToRedoError = NoOperationToRedoError;
HyperFormulaNS.NoOperationToUndoError = NoOperationToUndoError;
HyperFormulaNS.NoRelativeAddressesAllowedError = NoRelativeAddressesAllowedError;
HyperFormulaNS.NoSheetWithIdError = NoSheetWithIdError;
HyperFormulaNS.NoSheetWithNameError = NoSheetWithNameError;
HyperFormulaNS.NotAFormulaError = NotAFormulaError;
HyperFormulaNS.NothingToPasteError = NothingToPasteError;
HyperFormulaNS.ProtectedFunctionTranslationError = ProtectedFunctionTranslationError;
HyperFormulaNS.SheetNameAlreadyTakenError = SheetNameAlreadyTakenError;
HyperFormulaNS.SheetSizeLimitExceededError = SheetSizeLimitExceededError;
HyperFormulaNS.SourceLocationHasMatrixError = SourceLocationHasMatrixError;
HyperFormulaNS.TargetLocationHasMatrixError = TargetLocationHasMatrixError;
HyperFormulaNS.UnableToParseError = UnableToParseError;
var defaultLanguage = Config.defaultConfig.language;
HyperFormula.registerLanguage(defaultLanguage, enGB);
HyperFormula.languages[enGB.langCode] = enGB;

var _iterator = _createForOfIteratorHelper(Object.getOwnPropertyNames(plugins)),
    _step;

try {
  for (_iterator.s(); !(_step = _iterator.n()).done;) {
    var pluginName = _step.value;

    if (!pluginName.startsWith('_')) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
      // @ts-ignore
      HyperFormula.registerFunctionPlugin(plugins[pluginName]);
    }
  }
} catch (err) {
  _iterator.e(err);
} finally {
  _iterator.f();
}

export default HyperFormulaNS;
export { HyperFormula, CellType, CellValueType, ErrorType, ExportedCellChange, ExportedNamedExpressionChange, DetailedCellError, ConfigValueTooBigError, ConfigValueTooSmallError, EvaluationSuspendedError, ExpectedOneOfValuesError, ExpectedValueOfTypeError, FunctionPlugin, FunctionPluginValidationError, InvalidAddressError, InvalidArgumentsError, LanguageAlreadyRegisteredError, LanguageNotRegisteredError, MatrixFormulasNotSupportedError, MissingTranslationError, NamedExpressionDoesNotExistError, NamedExpressionNameIsAlreadyTakenError, NamedExpressionNameIsInvalidError, NoOperationToRedoError, NoOperationToUndoError, NoRelativeAddressesAllowedError, NoSheetWithIdError, NoSheetWithNameError, NotAFormulaError, NothingToPasteError, ProtectedFunctionTranslationError, SheetNameAlreadyTakenError, SheetSizeLimitExceededError, SourceLocationHasMatrixError, TargetLocationHasMatrixError, UnableToParseError };