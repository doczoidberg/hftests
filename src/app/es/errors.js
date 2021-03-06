import "core-js/modules/es.symbol";
import "core-js/modules/es.symbol.description";
import "core-js/modules/es.symbol.iterator";
import "core-js/modules/es.array.concat";
import "core-js/modules/es.array.index-of";
import "core-js/modules/es.array.iterator";
import "core-js/modules/es.map";
import "core-js/modules/es.object.get-prototype-of";
import "core-js/modules/es.object.to-string";
import "core-js/modules/es.reflect.construct";
import "core-js/modules/es.regexp.constructor";
import "core-js/modules/es.regexp.exec";
import "core-js/modules/es.regexp.to-string";
import "core-js/modules/es.string.iterator";
import "core-js/modules/web.dom-collections.iterator";

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _wrapNativeSuper(Class) { var _cache = typeof Map === "function" ? new Map() : undefined; _wrapNativeSuper = function _wrapNativeSuper(Class) { if (Class === null || !_isNativeFunction(Class)) return Class; if (typeof Class !== "function") { throw new TypeError("Super expression must either be null or a function"); } if (typeof _cache !== "undefined") { if (_cache.has(Class)) return _cache.get(Class); _cache.set(Class, Wrapper); } function Wrapper() { return _construct(Class, arguments, _getPrototypeOf(this).constructor); } Wrapper.prototype = Object.create(Class.prototype, { constructor: { value: Wrapper, enumerable: false, writable: true, configurable: true } }); return _setPrototypeOf(Wrapper, Class); }; return _wrapNativeSuper(Class); }

function _construct(Parent, args, Class) { if (_isNativeReflectConstruct()) { _construct = Reflect.construct; } else { _construct = function _construct(Parent, args, Class) { var a = [null]; a.push.apply(a, args); var Constructor = Function.bind.apply(Parent, a); var instance = new Constructor(); if (Class) _setPrototypeOf(instance, Class.prototype); return instance; }; } return _construct.apply(null, arguments); }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _isNativeFunction(fn) { return Function.toString.call(fn).indexOf("[native code]") !== -1; }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

/**
 * @license
 * Copyright (c) 2020 Handsoncode. All rights reserved.
 */

/**
 * Error thrown when the sheet of a given ID does not exist.
 */
export var NoSheetWithIdError = /*#__PURE__*/function (_Error) {
  _inherits(NoSheetWithIdError, _Error);

  var _super = _createSuper(NoSheetWithIdError);

  function NoSheetWithIdError(sheetId) {
    _classCallCheck(this, NoSheetWithIdError);

    return _super.call(this, "There's no sheet with id = ".concat(sheetId));
  }

  return NoSheetWithIdError;
}( /*#__PURE__*/_wrapNativeSuper(Error));
/**
 * Error thrown when the sheet of a given name does not exist.
 */

export var NoSheetWithNameError = /*#__PURE__*/function (_Error2) {
  _inherits(NoSheetWithNameError, _Error2);

  var _super2 = _createSuper(NoSheetWithNameError);

  function NoSheetWithNameError(sheetName) {
    _classCallCheck(this, NoSheetWithNameError);

    return _super2.call(this, "There's no sheet with name '".concat(sheetName, "'"));
  }

  return NoSheetWithNameError;
}( /*#__PURE__*/_wrapNativeSuper(Error));
/**
 * Error thrown when the sheet of a given name already exists.
 */

export var SheetNameAlreadyTakenError = /*#__PURE__*/function (_Error3) {
  _inherits(SheetNameAlreadyTakenError, _Error3);

  var _super3 = _createSuper(SheetNameAlreadyTakenError);

  function SheetNameAlreadyTakenError(sheetName) {
    _classCallCheck(this, SheetNameAlreadyTakenError);

    return _super3.call(this, "Sheet with name ".concat(sheetName, " already exists"));
  }

  return SheetNameAlreadyTakenError;
}( /*#__PURE__*/_wrapNativeSuper(Error));
/**
 * Error thrown when loaded sheet size exceeds configured limits.
 */

export var SheetSizeLimitExceededError = /*#__PURE__*/function (_Error4) {
  _inherits(SheetSizeLimitExceededError, _Error4);

  var _super4 = _createSuper(SheetSizeLimitExceededError);

  function SheetSizeLimitExceededError() {
    _classCallCheck(this, SheetSizeLimitExceededError);

    return _super4.call(this, 'Sheet size limit exceeded');
  }

  return SheetSizeLimitExceededError;
}( /*#__PURE__*/_wrapNativeSuper(Error));
/**
 * Error thrown when the the provided string is not a valid formula, i.e does not start with "="
 */

export var NotAFormulaError = /*#__PURE__*/function (_Error5) {
  _inherits(NotAFormulaError, _Error5);

  var _super5 = _createSuper(NotAFormulaError);

  function NotAFormulaError() {
    _classCallCheck(this, NotAFormulaError);

    return _super5.call(this, 'This is not a formula');
  }

  return NotAFormulaError;
}( /*#__PURE__*/_wrapNativeSuper(Error));
/**
 * Error thrown when the given address is invalid.
 */

export var InvalidAddressError = /*#__PURE__*/function (_Error6) {
  _inherits(InvalidAddressError, _Error6);

  var _super6 = _createSuper(InvalidAddressError);

  function InvalidAddressError(address) {
    _classCallCheck(this, InvalidAddressError);

    return _super6.call(this, "Address (row = ".concat(address.row, ", col = ").concat(address.col, ") is invalid"));
  }

  return InvalidAddressError;
}( /*#__PURE__*/_wrapNativeSuper(Error));
/**
 * Error thrown when the given arguments are invalid
 */

export var InvalidArgumentsError = /*#__PURE__*/function (_Error7) {
  _inherits(InvalidArgumentsError, _Error7);

  var _super7 = _createSuper(InvalidArgumentsError);

  function InvalidArgumentsError(expectedArguments) {
    _classCallCheck(this, InvalidArgumentsError);

    return _super7.call(this, "Invalid arguments, expected ".concat(expectedArguments));
  }

  return InvalidArgumentsError;
}( /*#__PURE__*/_wrapNativeSuper(Error));
/**
 * Error thrown when the given named expression already exists in the workbook and therefore it cannot be added.
 */

export var NamedExpressionNameIsAlreadyTakenError = /*#__PURE__*/function (_Error8) {
  _inherits(NamedExpressionNameIsAlreadyTakenError, _Error8);

  var _super8 = _createSuper(NamedExpressionNameIsAlreadyTakenError);

  function NamedExpressionNameIsAlreadyTakenError(expressionName) {
    _classCallCheck(this, NamedExpressionNameIsAlreadyTakenError);

    return _super8.call(this, "Name of Named Expression '".concat(expressionName, "' is already present"));
  }

  return NamedExpressionNameIsAlreadyTakenError;
}( /*#__PURE__*/_wrapNativeSuper(Error));
/**
 * Error thrown when the name given for the named expression is invalid.
 */

export var NamedExpressionNameIsInvalidError = /*#__PURE__*/function (_Error9) {
  _inherits(NamedExpressionNameIsInvalidError, _Error9);

  var _super9 = _createSuper(NamedExpressionNameIsInvalidError);

  function NamedExpressionNameIsInvalidError(expressionName) {
    _classCallCheck(this, NamedExpressionNameIsInvalidError);

    return _super9.call(this, "Name of Named Expression '".concat(expressionName, "' is invalid"));
  }

  return NamedExpressionNameIsInvalidError;
}( /*#__PURE__*/_wrapNativeSuper(Error));
/**
 * Error thrown when the given named expression does not exist.
 */

export var NamedExpressionDoesNotExistError = /*#__PURE__*/function (_Error10) {
  _inherits(NamedExpressionDoesNotExistError, _Error10);

  var _super10 = _createSuper(NamedExpressionDoesNotExistError);

  function NamedExpressionDoesNotExistError(expressionName) {
    _classCallCheck(this, NamedExpressionDoesNotExistError);

    return _super10.call(this, "Named Expression '".concat(expressionName, "' does not exist"));
  }

  return NamedExpressionDoesNotExistError;
}( /*#__PURE__*/_wrapNativeSuper(Error));
/**
 * Error thrown when there are no operations to be undone by the [[undo]] method.
 */

export var NoOperationToUndoError = /*#__PURE__*/function (_Error11) {
  _inherits(NoOperationToUndoError, _Error11);

  var _super11 = _createSuper(NoOperationToUndoError);

  function NoOperationToUndoError() {
    _classCallCheck(this, NoOperationToUndoError);

    return _super11.call(this, 'There is no operation to undo');
  }

  return NoOperationToUndoError;
}( /*#__PURE__*/_wrapNativeSuper(Error));
/**
 * Error thrown when there are no operations to redo by the [[redo]] method.
 */

export var NoOperationToRedoError = /*#__PURE__*/function (_Error12) {
  _inherits(NoOperationToRedoError, _Error12);

  var _super12 = _createSuper(NoOperationToRedoError);

  function NoOperationToRedoError() {
    _classCallCheck(this, NoOperationToRedoError);

    return _super12.call(this, 'There is no operation to redo');
  }

  return NoOperationToRedoError;
}( /*#__PURE__*/_wrapNativeSuper(Error));
/**
 * Error thrown when there is nothing to paste by the [[paste]] method.
 */

export var NothingToPasteError = /*#__PURE__*/function (_Error13) {
  _inherits(NothingToPasteError, _Error13);

  var _super13 = _createSuper(NothingToPasteError);

  function NothingToPasteError() {
    _classCallCheck(this, NothingToPasteError);

    return _super13.call(this, 'There is nothing to paste');
  }

  return NothingToPasteError;
}( /*#__PURE__*/_wrapNativeSuper(Error));

function replacer(key, val) {
  switch (_typeof(val)) {
    case 'function':
    case 'symbol':
      return val.toString();

    case 'bigint':
      return 'BigInt(' + val.toString() + ')';

    default:
      {
        if (val instanceof RegExp) {
          return 'RegExp(' + val.toString() + ')';
        } else {
          return val;
        }
      }
  }
}
/**
 * Error thrown when the given value cannot be parsed.
 *
 * Checks against the validity in:
 *
 * @see [[buildFromArray]]
 * @see [[buildFromSheets]]
 * @see [[setCellsContents]]
 */


export var UnableToParseError = /*#__PURE__*/function (_Error14) {
  _inherits(UnableToParseError, _Error14);

  var _super14 = _createSuper(UnableToParseError);

  function UnableToParseError(value) {
    _classCallCheck(this, UnableToParseError);

    return _super14.call(this, "Unable to parse value: ".concat(JSON.stringify(value, replacer, 4)));
  }

  return UnableToParseError;
}( /*#__PURE__*/_wrapNativeSuper(Error));
/**
 * Error thrown when the expected value type differs from the given value type.
 * It also displays the expected type.
 * This error might be thrown while setting or updating the [[ConfigParams]].
 * The following methods accept [[ConfigParams]] as a parameter:
 *
 * @see [[buildEmpty]]
 * @see [[buildFromArray]]
 * @see [[buildFromSheets]]
 * @see [[updateConfig]]
 */

export var ExpectedValueOfTypeError = /*#__PURE__*/function (_Error15) {
  _inherits(ExpectedValueOfTypeError, _Error15);

  var _super15 = _createSuper(ExpectedValueOfTypeError);

  function ExpectedValueOfTypeError(expectedType, paramName) {
    _classCallCheck(this, ExpectedValueOfTypeError);

    return _super15.call(this, "Expected value of type: ".concat(expectedType, " for config parameter: ").concat(paramName));
  }

  return ExpectedValueOfTypeError;
}( /*#__PURE__*/_wrapNativeSuper(Error));
/**
 * Error thrown when supplied config parameter value is too small.
 * This error might be thrown while setting or updating the [[ConfigParams]].
 * The following methods accept [[ConfigParams]] as a parameter:
 *
 * @see [[buildEmpty]]
 * @see [[buildFromArray]]
 * @see [[buildFromSheets]]
 * @see [[updateConfig]]
 */

export var ConfigValueTooSmallError = /*#__PURE__*/function (_Error16) {
  _inherits(ConfigValueTooSmallError, _Error16);

  var _super16 = _createSuper(ConfigValueTooSmallError);

  function ConfigValueTooSmallError(paramName, minimum) {
    _classCallCheck(this, ConfigValueTooSmallError);

    return _super16.call(this, "Config parameter ".concat(paramName, " should be at least ").concat(minimum));
  }

  return ConfigValueTooSmallError;
}( /*#__PURE__*/_wrapNativeSuper(Error));
/**
 * Error thrown when supplied config parameter value is too big.
 * This error might be thrown while setting or updating the [[ConfigParams]].
 * The following methods accept [[ConfigParams]] as a parameter:
 *
 * @see [[buildEmpty]]
 * @see [[buildFromArray]]
 * @see [[buildFromSheets]]
 * @see [[updateConfig]]
 */

export var ConfigValueTooBigError = /*#__PURE__*/function (_Error17) {
  _inherits(ConfigValueTooBigError, _Error17);

  var _super17 = _createSuper(ConfigValueTooBigError);

  function ConfigValueTooBigError(paramName, maximum) {
    _classCallCheck(this, ConfigValueTooBigError);

    return _super17.call(this, "Config parameter ".concat(paramName, " should be at most ").concat(maximum));
  }

  return ConfigValueTooBigError;
}( /*#__PURE__*/_wrapNativeSuper(Error));
/**
 * Error thrown when the value was expected to be set for a config parameter.
 * It also displays the expected value.
 * This error might be thrown while setting or updating the [[ConfigParams]].
 * The following methods accept [[ConfigParams]] as a parameter:
 *
 * @see [[buildEmpty]]
 * @see [[buildFromArray]]
 * @see [[buildFromSheets]]
 * @see [[updateConfig]]
 */

export var ExpectedOneOfValuesError = /*#__PURE__*/function (_Error18) {
  _inherits(ExpectedOneOfValuesError, _Error18);

  var _super18 = _createSuper(ExpectedOneOfValuesError);

  function ExpectedOneOfValuesError(values, paramName) {
    _classCallCheck(this, ExpectedOneOfValuesError);

    return _super18.call(this, "Expected one of ".concat(values, " for config parameter: ").concat(paramName));
  }

  return ExpectedOneOfValuesError;
}( /*#__PURE__*/_wrapNativeSuper(Error));
/**
 * Error thrown when computations become suspended.
 * To perform any other action wait for the batch to complete or resume the evaluation.
 * Relates to:
 *
 * @see [[batch]]
 * @see [[suspendEvaluation]]
 * @see [[resumeEvaluation]]
 */

export var EvaluationSuspendedError = /*#__PURE__*/function (_Error19) {
  _inherits(EvaluationSuspendedError, _Error19);

  var _super19 = _createSuper(EvaluationSuspendedError);

  function EvaluationSuspendedError() {
    _classCallCheck(this, EvaluationSuspendedError);

    return _super19.call(this, 'Computations are suspended');
  }

  return EvaluationSuspendedError;
}( /*#__PURE__*/_wrapNativeSuper(Error));
/**
 * Error thrown when translation is missing in translation package.
 *
 * TODO
 */

export var MissingTranslationError = /*#__PURE__*/function (_Error20) {
  _inherits(MissingTranslationError, _Error20);

  var _super20 = _createSuper(MissingTranslationError);

  function MissingTranslationError(key) {
    _classCallCheck(this, MissingTranslationError);

    return _super20.call(this, "Translation for ".concat(key, " is missing in the translation package you're using."));
  }

  return MissingTranslationError;
}( /*#__PURE__*/_wrapNativeSuper(Error));
/**
 * Error thrown when trying to override protected translation.
 *
 * @see [[registerLanguage]]
 * @see [[registerFunction]]
 * @see [[registerFunctionPlugin]]
 */

export var ProtectedFunctionTranslationError = /*#__PURE__*/function (_Error21) {
  _inherits(ProtectedFunctionTranslationError, _Error21);

  var _super21 = _createSuper(ProtectedFunctionTranslationError);

  function ProtectedFunctionTranslationError(key) {
    _classCallCheck(this, ProtectedFunctionTranslationError);

    return _super21.call(this, "Cannot register translation for function with id: ".concat(key));
  }

  return ProtectedFunctionTranslationError;
}( /*#__PURE__*/_wrapNativeSuper(Error));
/**
 * Error thrown when trying to retrieve not registered language
 *
 * @see [[getLanguage]]
 * @see [[unregisterLanguage]]
 */

export var LanguageNotRegisteredError = /*#__PURE__*/function (_Error22) {
  _inherits(LanguageNotRegisteredError, _Error22);

  var _super22 = _createSuper(LanguageNotRegisteredError);

  function LanguageNotRegisteredError() {
    _classCallCheck(this, LanguageNotRegisteredError);

    return _super22.call(this, 'Language not registered.');
  }

  return LanguageNotRegisteredError;
}( /*#__PURE__*/_wrapNativeSuper(Error));
/**
 * Error thrown when trying to register already registered language
 *
 * @see [[registerLanguage]]
 */

export var LanguageAlreadyRegisteredError = /*#__PURE__*/function (_Error23) {
  _inherits(LanguageAlreadyRegisteredError, _Error23);

  var _super23 = _createSuper(LanguageAlreadyRegisteredError);

  function LanguageAlreadyRegisteredError() {
    _classCallCheck(this, LanguageAlreadyRegisteredError);

    return _super23.call(this, 'Language already registered.');
  }

  return LanguageAlreadyRegisteredError;
}( /*#__PURE__*/_wrapNativeSuper(Error));
/**
 * Error thrown when function plugin is invalid.
 *
 * @see [[registerFunction]]
 * @see [[registerFunctionPlugin]]
 * @see [[buildFromArray]]
 * @see [[buildFromSheets]]
 * */

export var FunctionPluginValidationError = /*#__PURE__*/function (_Error24) {
  _inherits(FunctionPluginValidationError, _Error24);

  var _super24 = _createSuper(FunctionPluginValidationError);

  function FunctionPluginValidationError() {
    _classCallCheck(this, FunctionPluginValidationError);

    return _super24.apply(this, arguments);
  }

  _createClass(FunctionPluginValidationError, null, [{
    key: "functionNotDeclaredInPlugin",
    value: function functionNotDeclaredInPlugin(functionId, pluginName) {
      return new FunctionPluginValidationError("Function with id ".concat(functionId, " not declared in plugin ").concat(pluginName));
    }
  }, {
    key: "functionMethodNotFound",
    value: function functionMethodNotFound(functionName, pluginName) {
      return new FunctionPluginValidationError("Function method ".concat(functionName, " not found in plugin ").concat(pluginName));
    }
  }]);

  return FunctionPluginValidationError;
}( /*#__PURE__*/_wrapNativeSuper(Error));
/**
 * Error thrown when trying to register, override or remove function with reserved id.
 *
 * @see [[registerFunctionPlugin]]
 * @see [[registerFunction]]
 * @see [[unregisterFunction]]
 * */

export var ProtectedFunctionError = /*#__PURE__*/function (_Error25) {
  _inherits(ProtectedFunctionError, _Error25);

  var _super25 = _createSuper(ProtectedFunctionError);

  function ProtectedFunctionError() {
    _classCallCheck(this, ProtectedFunctionError);

    return _super25.apply(this, arguments);
  }

  _createClass(ProtectedFunctionError, null, [{
    key: "cannotRegisterFunctionWithId",
    value: function cannotRegisterFunctionWithId(functionId) {
      return new ProtectedFunctionError("Cannot register function with id ".concat(functionId));
    }
  }, {
    key: "cannotUnregisterFunctionWithId",
    value: function cannotUnregisterFunctionWithId(functionId) {
      return new ProtectedFunctionError("Cannot unregister function with id ".concat(functionId));
    }
  }, {
    key: "cannotUnregisterProtectedPlugin",
    value: function cannotUnregisterProtectedPlugin() {
      return new ProtectedFunctionError('Cannot unregister protected plugin');
    }
  }]);

  return ProtectedFunctionError;
}( /*#__PURE__*/_wrapNativeSuper(Error));
/**
 * Error thrown when selected source location has a matrix.
 */

export var SourceLocationHasMatrixError = /*#__PURE__*/function (_Error26) {
  _inherits(SourceLocationHasMatrixError, _Error26);

  var _super26 = _createSuper(SourceLocationHasMatrixError);

  function SourceLocationHasMatrixError() {
    _classCallCheck(this, SourceLocationHasMatrixError);

    return _super26.call(this, 'Cannot perform this operation, source location has a matrix inside.');
  }

  return SourceLocationHasMatrixError;
}( /*#__PURE__*/_wrapNativeSuper(Error));
/**
 * Error thrown when selected target location has a matrix.
 *
 * @see [[addRows]]
 * @see [[addColumns]]
 * @see [[moveCells]]
 * @see [[moveRows]]
 * @see [[moveColumns]]
 * @see [[paste]]
 */

export var TargetLocationHasMatrixError = /*#__PURE__*/function (_Error27) {
  _inherits(TargetLocationHasMatrixError, _Error27);

  var _super27 = _createSuper(TargetLocationHasMatrixError);

  function TargetLocationHasMatrixError() {
    _classCallCheck(this, TargetLocationHasMatrixError);

    return _super27.call(this, 'Cannot perform this operation, target location has a matrix inside.');
  }

  return TargetLocationHasMatrixError;
}( /*#__PURE__*/_wrapNativeSuper(Error));
/**
 * Error thrown when trying to use matrix expression as named expression.
 *
 * @see [[addNamedExpression]]
 * @see [[changeNamedExpression]]
 */

export var MatrixFormulasNotSupportedError = /*#__PURE__*/function (_Error28) {
  _inherits(MatrixFormulasNotSupportedError, _Error28);

  var _super28 = _createSuper(MatrixFormulasNotSupportedError);

  function MatrixFormulasNotSupportedError() {
    _classCallCheck(this, MatrixFormulasNotSupportedError);

    return _super28.call(this, 'Matrix formulas are not supported in named expressions.');
  }

  return MatrixFormulasNotSupportedError;
}( /*#__PURE__*/_wrapNativeSuper(Error));
/**
 * Error thrown when named expression contains relative addresses.
 *
 * @see [[addNamedExpression]]
 * @see [[changeNamedExpression]]
 * */

export var NoRelativeAddressesAllowedError = /*#__PURE__*/function (_Error29) {
  _inherits(NoRelativeAddressesAllowedError, _Error29);

  var _super29 = _createSuper(NoRelativeAddressesAllowedError);

  function NoRelativeAddressesAllowedError() {
    _classCallCheck(this, NoRelativeAddressesAllowedError);

    return _super29.call(this, 'Relative addresses not allowed in named expressions.');
  }

  return NoRelativeAddressesAllowedError;
}( /*#__PURE__*/_wrapNativeSuper(Error));