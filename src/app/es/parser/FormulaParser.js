import "core-js/modules/es.symbol";
import "core-js/modules/es.symbol.description";
import "core-js/modules/es.symbol.iterator";
import "core-js/modules/es.array.concat";
import "core-js/modules/es.array.from";
import "core-js/modules/es.array.iterator";
import "core-js/modules/es.array.map";
import "core-js/modules/es.array.slice";
import "core-js/modules/es.function.name";
import "core-js/modules/es.number.constructor";
import "core-js/modules/es.number.is-integer";
import "core-js/modules/es.object.get-own-property-descriptor";
import "core-js/modules/es.object.get-prototype-of";
import "core-js/modules/es.object.to-string";
import "core-js/modules/es.reflect.construct";
import "core-js/modules/es.reflect.get";
import "core-js/modules/es.regexp.exec";
import "core-js/modules/es.regexp.to-string";
import "core-js/modules/es.string.iterator";
import "core-js/modules/es.string.replace";
import "core-js/modules/es.string.split";
import "core-js/modules/web.dom-collections.iterator";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _get(target, property, receiver) { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get; } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(receiver); } return desc.value; }; } return _get(target, property, receiver || target); }

function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }

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
import { EmbeddedActionsParser, EMPTY_ALT, Lexer, tokenMatcher } from 'chevrotain';
import { CellError, ErrorType, simpleCellAddress } from '../Cell';
import { cellAddressFromString, columnAddressFromString, rowAddressFromString } from './addressRepresentationConverters';
import { AstNodeType, buildCellErrorAst, buildCellRangeAst, buildCellReferenceAst, buildColumnRangeAst, buildConcatenateOpAst, buildDivOpAst, buildEmptyArgAst, buildEqualsOpAst, buildErrorWithRawInputAst, buildGreaterThanOpAst, buildGreaterThanOrEqualOpAst, buildLessThanOpAst, buildLessThanOrEqualOpAst, buildMinusOpAst, buildMinusUnaryOpAst, buildNamedExpressionAst, buildNotEqualOpAst, buildNumberAst, buildParenthesisAst, buildParsingErrorAst, buildPercentOpAst, buildPlusOpAst, buildPlusUnaryOpAst, buildPowerOpAst, buildProcedureAst, buildRowRangeAst, buildStringAst, buildTimesOpAst, parsingError as _parsingError, ParsingErrorType, RangeSheetReferenceType } from './Ast';
import { CellAddress, CellReferenceType } from './CellAddress';
import { AdditionOp, BooleanOp, CellReference, ColumnRange, ConcatenateOp, DivOp, EqualsOp, ErrorLiteral, GreaterThanOp, GreaterThanOrEqualOp, LessThanOp, LessThanOrEqualOp, LParen, MinusOp, MultiplicationOp, NamedExpression, NotEqualOp, PercentOp, PlusOp, PowerOp, ProcedureName, RangeSeparator, RowRange, RParen, StringLiteral, TimesOp, WhiteSpace } from './LexerConfig';
/**
 * LL(k) formula parser described using Chevrotain DSL
 *
 * It is equivalent to the grammar below:
 *
 * F -> '=' E <br/>
 * B -> K < B | K >= B ... | K <br/>
 * K -> E & K | E <br/>
 * E -> M + E | M - E | M <br/>
 * M -> W * M | W / M | W <br/>
 * W -> C * W | C <br/>
 * C -> N | R | O | A | P | num <br/>
 * N -> '(' E ')' <br/>
 * R -> A:OFFSET(..) | A:A <br/>
 * O -> OFFSET(..) | OFFSET(..):A | OFFSET(..):OFFSET(..) <br/>
 * A -> A1 | $A1 | A$1 | $A$1 <br/>
 * P -> SUM(..) <br/>
 */

export var FormulaParser = /*#__PURE__*/function (_EmbeddedActionsParse) {
  _inherits(FormulaParser, _EmbeddedActionsParse);

  var _super = _createSuper(FormulaParser);

  function FormulaParser(lexerConfig, sheetMapping) {
    var _this;

    _classCallCheck(this, FormulaParser);

    _this = _super.call(this, lexerConfig.allTokens, {
      outputCst: false,
      maxLookahead: 7
    });
    /**
     * Entry rule
     */

    _this.formula = _this.RULE('formula', function () {
      _this.CONSUME(EqualsOp);

      return _this.SUBRULE(_this.booleanExpression);
    });
    /**
     * Rule for boolean expression (e.g. 1 <= A1)
     */

    _this.booleanExpression = _this.RULE('booleanExpression', function () {
      var lhs = _this.SUBRULE(_this.concatenateExpression);

      _this.MANY(function () {
        var op = _this.CONSUME(BooleanOp);

        var rhs = _this.SUBRULE2(_this.concatenateExpression);

        if (tokenMatcher(op, EqualsOp)) {
          lhs = buildEqualsOpAst(lhs, rhs, op.leadingWhitespace);
        } else if (tokenMatcher(op, NotEqualOp)) {
          lhs = buildNotEqualOpAst(lhs, rhs, op.leadingWhitespace);
        } else if (tokenMatcher(op, GreaterThanOp)) {
          lhs = buildGreaterThanOpAst(lhs, rhs, op.leadingWhitespace);
        } else if (tokenMatcher(op, LessThanOp)) {
          lhs = buildLessThanOpAst(lhs, rhs, op.leadingWhitespace);
        } else if (tokenMatcher(op, GreaterThanOrEqualOp)) {
          lhs = buildGreaterThanOrEqualOpAst(lhs, rhs, op.leadingWhitespace);
        } else if (tokenMatcher(op, LessThanOrEqualOp)) {
          lhs = buildLessThanOrEqualOpAst(lhs, rhs, op.leadingWhitespace);
        } else {
          _this.ACTION(function () {
            throw Error('Operator not supported');
          });
        }
      });

      return lhs;
    });
    _this.booleanExpressionOrEmpty = _this.RULE('booleanExpressionOrEmpty', function () {
      return _this.OR([{
        ALT: function ALT() {
          return _this.SUBRULE(_this.booleanExpression);
        }
      }, {
        ALT: EMPTY_ALT(buildEmptyArgAst())
      }]);
    });
    /**
     * Rule for concatenation operator expression (e.g. "=" & A1)
     */

    _this.concatenateExpression = _this.RULE('concatenateExpression', function () {
      var lhs = _this.SUBRULE(_this.additionExpression);

      _this.MANY(function () {
        var op = _this.CONSUME(ConcatenateOp);

        var rhs = _this.SUBRULE2(_this.additionExpression);

        lhs = buildConcatenateOpAst(lhs, rhs, op.leadingWhitespace);
      });

      return lhs;
    });
    /**
     * Rule for addition category operators (e.g. 1 + A1, 1 - A1)
     */

    _this.additionExpression = _this.RULE('additionExpression', function () {
      var lhs = _this.SUBRULE(_this.multiplicationExpression);

      _this.MANY(function () {
        var op = _this.CONSUME(AdditionOp);

        var rhs = _this.SUBRULE2(_this.multiplicationExpression);

        if (tokenMatcher(op, PlusOp)) {
          lhs = buildPlusOpAst(lhs, rhs, op.leadingWhitespace);
        } else if (tokenMatcher(op, MinusOp)) {
          lhs = buildMinusOpAst(lhs, rhs, op.leadingWhitespace);
        } else {
          _this.ACTION(function () {
            throw Error('Operator not supported');
          });
        }
      });

      return lhs;
    });
    /**
     * Rule for multiplication category operators (e.g. 1 * A1, 1 / A1)
     */

    _this.multiplicationExpression = _this.RULE('multiplicationExpression', function () {
      var lhs = _this.SUBRULE(_this.powerExpression);

      _this.MANY(function () {
        var op = _this.CONSUME(MultiplicationOp);

        var rhs = _this.SUBRULE2(_this.powerExpression);

        if (tokenMatcher(op, TimesOp)) {
          lhs = buildTimesOpAst(lhs, rhs, op.leadingWhitespace);
        } else if (tokenMatcher(op, DivOp)) {
          lhs = buildDivOpAst(lhs, rhs, op.leadingWhitespace);
        } else {
          _this.ACTION(function () {
            throw Error('Operator not supported');
          });
        }
      });

      return lhs;
    });
    /**
     * Rule for power expression
     */

    _this.powerExpression = _this.RULE('powerExpression', function () {
      var lhs = _this.SUBRULE(_this.atomicExpression);

      _this.MANY(function () {
        var op = _this.CONSUME(PowerOp);

        var rhs = _this.SUBRULE2(_this.atomicExpression);

        if (tokenMatcher(op, PowerOp)) {
          lhs = buildPowerOpAst(lhs, rhs, op.leadingWhitespace);
        } else {
          _this.ACTION(function () {
            throw Error('Operator not supported');
          });
        }
      });

      return lhs;
    });
    /**
     * Rule for atomic expressions, which is positive atomic expression or negation of it
     */

    _this.atomicExpression = _this.RULE('atomicExpression', function () {
      return _this.OR([{
        ALT: function ALT() {
          var op = _this.CONSUME(AdditionOp);

          var value = _this.SUBRULE(_this.atomicExpression);

          if (tokenMatcher(op, PlusOp)) {
            return buildPlusUnaryOpAst(value, op.leadingWhitespace);
          } else if (tokenMatcher(op, MinusOp)) {
            return buildMinusUnaryOpAst(value, op.leadingWhitespace);
          } else {
            _this.customParsingError = _parsingError(ParsingErrorType.ParserError, 'Mismatched token type');
            return _this.customParsingError;
          }
        }
      }, {
        ALT: function ALT() {
          return _this.SUBRULE2(_this.rightUnaryOpAtomicExpression);
        }
      }]);
    });
    _this.rightUnaryOpAtomicExpression = _this.RULE('rightUnaryOpAtomicExpression', function () {
      var positiveAtomicExpression = _this.SUBRULE(_this.positiveAtomicExpression);

      var percentage = _this.OPTION(function () {
        return _this.CONSUME(PercentOp);
      });

      if (percentage) {
        return buildPercentOpAst(positiveAtomicExpression, percentage.leadingWhitespace);
      }

      return positiveAtomicExpression;
    });
    /**
     * Rule for positive atomic expressions
     */

    _this.positiveAtomicExpression = _this.RULE('positiveAtomicExpression', function () {
      return _this.OR(_this.atomicExpCache || (_this.atomicExpCache = [{
        ALT: function ALT() {
          return _this.SUBRULE(_this.parenthesisExpression);
        }
      }, {
        ALT: function ALT() {
          return _this.SUBRULE(_this.cellRangeExpression);
        }
      }, {
        ALT: function ALT() {
          return _this.SUBRULE(_this.columnRangeExpression);
        }
      }, {
        ALT: function ALT() {
          return _this.SUBRULE(_this.rowRangeExpression);
        }
      }, {
        ALT: function ALT() {
          return _this.SUBRULE(_this.offsetExpression);
        }
      }, {
        ALT: function ALT() {
          return _this.SUBRULE(_this.cellReference);
        }
      }, {
        ALT: function ALT() {
          return _this.SUBRULE(_this.procedureExpression);
        }
      }, {
        ALT: function ALT() {
          return _this.SUBRULE(_this.namedExpressionExpression);
        }
      }, {
        ALT: function ALT() {
          var number = _this.CONSUME(_this.lexerConfig.NumberLiteral);

          return buildNumberAst(_this.numericStringToNumber(number.image), number.leadingWhitespace);
        }
      }, {
        ALT: function ALT() {
          var str = _this.CONSUME(StringLiteral);

          return buildStringAst(str);
        }
      }, {
        ALT: function ALT() {
          var token = _this.CONSUME(ErrorLiteral);

          var errString = token.image.toUpperCase();
          var errorType = _this.lexerConfig.errorMapping[errString];

          if (errorType) {
            return buildCellErrorAst(new CellError(errorType), token.leadingWhitespace);
          } else {
            return _this.parsingError(ParsingErrorType.ParserError, 'Unknown error literal');
          }
        }
      }]));
    });
    /**
     * Rule for procedure expressions: SUM(1,A1)
     */

    _this.procedureExpression = _this.RULE('procedureExpression', function () {
      var _a;

      var procedureNameToken = _this.CONSUME(ProcedureName);

      var procedureName = procedureNameToken.image.toUpperCase().slice(0, -1);
      var canonicalProcedureName = (_a = _this.lexerConfig.functionMapping[procedureName]) !== null && _a !== void 0 ? _a : procedureName;
      var args = [];

      var argument = _this.SUBRULE(_this.booleanExpressionOrEmpty);

      _this.MANY(function () {
        var _a;

        var separator = _this.CONSUME(_this.lexerConfig.ArgSeparator);

        if (argument.type === AstNodeType.EMPTY) {
          argument.leadingWhitespace = (_a = separator.leadingWhitespace) === null || _a === void 0 ? void 0 : _a.image;
        }

        args.push(argument);
        argument = _this.SUBRULE2(_this.booleanExpressionOrEmpty);
      });

      args.push(argument);

      if (args.length === 1 && args[0].type === AstNodeType.EMPTY) {
        args.length = 0;
      }

      var rParenToken = _this.CONSUME(RParen);

      return buildProcedureAst(canonicalProcedureName, args, procedureNameToken.leadingWhitespace, rParenToken.leadingWhitespace);
    });
    _this.namedExpressionExpression = _this.RULE('namedExpressionExpression', function () {
      var name = _this.CONSUME(NamedExpression);

      return buildNamedExpressionAst(name.image, name.leadingWhitespace);
    });
    /**
     * Rule for expressions that start with OFFSET() function
     *
     * OFFSET() function can occur as cell reference or part of cell range.
     * In order to preserve LL(k) properties, expressions that starts with OFFSET() functions needs to have separate rule.
     *
     * Proper {@link Ast} node type is built depending on the presence of {@link RangeSeparator}
     */

    _this.offsetExpression = _this.RULE('offsetExpression', function () {
      var offsetProcedure = _this.SUBRULE(_this.offsetProcedureExpression);

      var end;

      _this.OPTION(function () {
        _this.CONSUME(RangeSeparator);

        if (offsetProcedure.type === AstNodeType.CELL_RANGE) {
          end = _this.parsingError(ParsingErrorType.RangeOffsetNotAllowed, 'Range offset not allowed here');
        } else {
          end = _this.SUBRULE(_this.endOfRangeWithOffsetStartExpression, {
            ARGS: [offsetProcedure]
          });
        }
      });

      if (end !== undefined) {
        return end;
      }

      return offsetProcedure;
    });
    /**
     * Rule for OFFSET() function expression
     */

    _this.offsetProcedureExpression = _this.RULE('offsetProcedureExpression', function () {
      var args = [];

      _this.CONSUME(_this.lexerConfig.OffsetProcedureName);

      _this.CONSUME(LParen);

      _this.MANY_SEP({
        SEP: _this.lexerConfig.ArgSeparator,
        DEF: function DEF() {
          args.push(_this.SUBRULE(_this.booleanExpression));
        }
      });

      _this.CONSUME(RParen);

      return _this.handleOffsetHeuristic(args);
    });
    /**
     * Rule for cell ranges (e.g. A1:B$3, A1:OFFSET())
     */

    _this.cellRangeExpression = _this.RULE('cellRangeExpression', function () {
      var start = _this.CONSUME(CellReference);

      _this.CONSUME2(RangeSeparator);

      return _this.SUBRULE(_this.endOfRangeExpression, {
        ARGS: [start]
      });
    });
    /*
    * Rule for column range, e.g. A:B, Sheet1!A:B, Sheet1!A:Sheet1!B
    * */

    _this.columnRangeExpression = _this.RULE('columnRangeExpression', function () {
      var range = _this.CONSUME(ColumnRange);

      var _range$image$split = range.image.split(':'),
          _range$image$split2 = _slicedToArray(_range$image$split, 2),
          startImage = _range$image$split2[0],
          endImage = _range$image$split2[1];

      var start = _this.ACTION(function () {
        return columnAddressFromString(_this.sheetMapping, startImage, _this.formulaAddress);
      });

      var end = _this.ACTION(function () {
        return columnAddressFromString(_this.sheetMapping, endImage, _this.formulaAddress);
      });

      if (start === undefined || end === undefined) {
        return buildCellErrorAst(new CellError(ErrorType.REF));
      }

      if (start.exceedsSheetSizeLimits(_this.lexerConfig.maxColumns) || end.exceedsSheetSizeLimits(_this.lexerConfig.maxColumns)) {
        return buildErrorWithRawInputAst(range.image, new CellError(ErrorType.NAME), range.leadingWhitespace);
      }

      if (start.sheet === null && end.sheet !== null) {
        return _this.parsingError(ParsingErrorType.ParserError, 'Malformed range expression');
      }

      var sheetReferenceType = _this.rangeSheetReferenceType(start.sheet, end.sheet);

      if (start.sheet !== null && end.sheet === null) {
        end = end.withAbsoluteSheet(start.sheet);
      }

      return buildColumnRangeAst(start, end, sheetReferenceType, range.leadingWhitespace);
    });
    /*
    * Rule for row range, e.g. 1:2, Sheet1!1:2, Sheet1!1:Sheet1!2
    * */

    _this.rowRangeExpression = _this.RULE('rowRangeExpression', function () {
      var range = _this.CONSUME(RowRange);

      var _range$image$split3 = range.image.split(':'),
          _range$image$split4 = _slicedToArray(_range$image$split3, 2),
          startImage = _range$image$split4[0],
          endImage = _range$image$split4[1];

      var start = _this.ACTION(function () {
        return rowAddressFromString(_this.sheetMapping, startImage, _this.formulaAddress);
      });

      var end = _this.ACTION(function () {
        return rowAddressFromString(_this.sheetMapping, endImage, _this.formulaAddress);
      });

      if (start === undefined || end === undefined) {
        return buildCellErrorAst(new CellError(ErrorType.REF));
      }

      if (start.exceedsSheetSizeLimits(_this.lexerConfig.maxRows) || end.exceedsSheetSizeLimits(_this.lexerConfig.maxRows)) {
        return buildErrorWithRawInputAst(range.image, new CellError(ErrorType.NAME), range.leadingWhitespace);
      }

      if (start.sheet === null && end.sheet !== null) {
        return _this.parsingError(ParsingErrorType.ParserError, 'Malformed range expression');
      }

      var sheetReferenceType = _this.rangeSheetReferenceType(start.sheet, end.sheet);

      if (start.sheet !== null && end.sheet === null) {
        end = end.withAbsoluteSheet(start.sheet);
      }

      return buildRowRangeAst(start, end, sheetReferenceType, range.leadingWhitespace);
    });
    /**
     * Rule for cell reference expression (e.g. A1, $A1, A$1, $A$1, $Sheet42!A$17)
     */

    _this.cellReference = _this.RULE('cellReference', function () {
      var cell = _this.CONSUME(CellReference);

      var address = _this.ACTION(function () {
        return cellAddressFromString(_this.sheetMapping, cell.image, _this.formulaAddress);
      });

      if (address === undefined) {
        return buildErrorWithRawInputAst(cell.image, new CellError(ErrorType.REF), cell.leadingWhitespace);
      } else if (address.exceedsSheetSizeLimits(_this.lexerConfig.maxColumns, _this.lexerConfig.maxRows)) {
        return buildErrorWithRawInputAst(cell.image, new CellError(ErrorType.NAME), cell.leadingWhitespace);
      } else {
        return buildCellReferenceAst(address, cell.leadingWhitespace);
      }
    });
    /**
     * Rule for end of range expression
     *
     * End of range may be a cell reference or OFFSET() function call
     */

    _this.endOfRangeExpression = _this.RULE('endOfRangeExpression', function (start) {
      return _this.OR([{
        ALT: function ALT() {
          return _this.SUBRULE(_this.endRangeReference, {
            ARGS: [start]
          });
        }
      }, {
        ALT: function ALT() {
          var _a;

          var offsetProcedure = _this.SUBRULE(_this.offsetProcedureExpression);

          var startAddress = _this.ACTION(function () {
            return cellAddressFromString(_this.sheetMapping, start.image, _this.formulaAddress);
          });

          if (startAddress === undefined) {
            return buildCellErrorAst(new CellError(ErrorType.REF));
          }

          if (offsetProcedure.type === AstNodeType.CELL_REFERENCE) {
            var end = offsetProcedure.reference;
            var sheetReferenceType = RangeSheetReferenceType.RELATIVE;

            if (startAddress.sheet !== null) {
              sheetReferenceType = RangeSheetReferenceType.START_ABSOLUTE;
              end = end.withAbsoluteSheet(startAddress.sheet);
            }

            return buildCellRangeAst(startAddress, end, sheetReferenceType, (_a = start.leadingWhitespace) === null || _a === void 0 ? void 0 : _a.image);
          } else {
            return _this.parsingError(ParsingErrorType.RangeOffsetNotAllowed, 'Range offset not allowed here');
          }
        }
      }]);
    });
    /**
     * Rule for end of range expression
     *
     * End of range may be a cell reference or OFFSET() function call
     */

    _this.endOfRangeWithOffsetStartExpression = _this.RULE('endOfRangeWithOffsetStartExpression', function (start) {
      return _this.OR([{
        ALT: function ALT() {
          return _this.SUBRULE(_this.endRangeWithOffsetStartReference, {
            ARGS: [start]
          });
        }
      }, {
        ALT: function ALT() {
          var offsetProcedure = _this.SUBRULE(_this.offsetProcedureExpression);

          if (offsetProcedure.type === AstNodeType.CELL_REFERENCE) {
            var end = offsetProcedure.reference;
            var sheetReferenceType = RangeSheetReferenceType.RELATIVE;

            if (start.reference.sheet !== null) {
              sheetReferenceType = RangeSheetReferenceType.START_ABSOLUTE;
              end = end.withAbsoluteSheet(start.reference.sheet);
            }

            return buildCellRangeAst(start.reference, end, sheetReferenceType, start.leadingWhitespace);
          } else {
            return _this.parsingError(ParsingErrorType.RangeOffsetNotAllowed, 'Range offset not allowed here');
          }
        }
      }]);
    });
    /**
     * Rule for end range reference expression with additional checks considering range start
     */

    _this.endRangeReference = _this.RULE('endRangeReference', function (start) {
      var _a;

      var end = _this.CONSUME(CellReference);

      var startAddress = _this.ACTION(function () {
        return cellAddressFromString(_this.sheetMapping, start.image, _this.formulaAddress);
      });

      var endAddress = _this.ACTION(function () {
        return cellAddressFromString(_this.sheetMapping, end.image, _this.formulaAddress);
      });

      if (startAddress === undefined || endAddress === undefined) {
        return _this.ACTION(function () {
          return buildErrorWithRawInputAst("".concat(start.image, ":").concat(end.image), new CellError(ErrorType.REF), start.leadingWhitespace);
        });
      } else if (startAddress.exceedsSheetSizeLimits(_this.lexerConfig.maxColumns, _this.lexerConfig.maxRows) || endAddress.exceedsSheetSizeLimits(_this.lexerConfig.maxColumns, _this.lexerConfig.maxRows)) {
        return _this.ACTION(function () {
          return buildErrorWithRawInputAst("".concat(start.image, ":").concat(end.image), new CellError(ErrorType.NAME), start.leadingWhitespace);
        });
      }

      return _this.buildCellRange(startAddress, endAddress, (_a = start.leadingWhitespace) === null || _a === void 0 ? void 0 : _a.image);
    });
    /**
     * Rule for end range reference expression starting with offset procedure with additional checks considering range start
     */

    _this.endRangeWithOffsetStartReference = _this.RULE('endRangeWithOffsetStartReference', function (start) {
      var end = _this.CONSUME(CellReference);

      var endAddress = _this.ACTION(function () {
        return cellAddressFromString(_this.sheetMapping, end.image, _this.formulaAddress);
      });

      if (endAddress === undefined) {
        return _this.ACTION(function () {
          return buildCellErrorAst(new CellError(ErrorType.REF));
        });
      }

      return _this.buildCellRange(start.reference, endAddress, start.leadingWhitespace);
    });
    /**
     * Rule for parenthesis expression
     */

    _this.parenthesisExpression = _this.RULE('parenthesisExpression', function () {
      var lParenToken = _this.CONSUME(LParen);

      var expression = _this.SUBRULE(_this.booleanExpression);

      var rParenToken = _this.CONSUME(RParen);

      return buildParenthesisAst(expression, lParenToken.leadingWhitespace, rParenToken.leadingWhitespace);
    });

    _this.numericStringToNumber = function (input) {
      var normalized = input.replace(_this.lexerConfig.decimalSeparator, '.');
      return Number(normalized);
    };

    _this.lexerConfig = lexerConfig;
    _this.sheetMapping = sheetMapping;
    _this.formulaAddress = simpleCellAddress(0, 0, 0);

    _this.performSelfAnalysis();

    return _this;
  }
  /**
   * Parses tokenized formula and builds abstract syntax tree
   *
   * @param tokens - tokenized formula
   * @param formulaAddress - address of the cell in which formula is located
   */


  _createClass(FormulaParser, [{
    key: "parseFromTokens",
    value: function parseFromTokens(tokens, formulaAddress) {
      this.input = tokens;
      var ast = this.formulaWithContext(formulaAddress);
      var errors = [];

      if (this.customParsingError) {
        errors.push(this.customParsingError);
      }

      errors = errors.concat(this.errors.map(function (e) {
        return {
          type: ParsingErrorType.ParserError,
          message: e.message
        };
      }));

      if (errors.length > 0) {
        ast = buildParsingErrorAst();
      }

      return {
        ast: ast,
        errors: errors
      };
    }
    /**
     * Entry rule wrapper that sets formula address
     *
     * @param address - address of the cell in which formula is located
     */

  }, {
    key: "formulaWithContext",
    value: function formulaWithContext(address) {
      this.formulaAddress = address;
      return this.formula();
    }
  }, {
    key: "reset",
    value: function reset() {
      _get(_getPrototypeOf(FormulaParser.prototype), "reset", this).call(this);

      this.customParsingError = undefined;
    }
  }, {
    key: "buildCellRange",
    value: function buildCellRange(startAddress, endAddress, leadingWhitespace) {
      if (startAddress.sheet === null && endAddress.sheet !== null) {
        return this.parsingError(ParsingErrorType.ParserError, 'Malformed range expression');
      }

      var sheetReferenceType = this.rangeSheetReferenceType(startAddress.sheet, endAddress.sheet);

      if (startAddress.sheet !== null && endAddress.sheet === null) {
        endAddress = endAddress.withAbsoluteSheet(startAddress.sheet);
      }

      return buildCellRangeAst(startAddress, endAddress, sheetReferenceType, leadingWhitespace);
    }
    /**
     * Returns {@link CellReferenceAst} or {@link CellRangeAst} based on OFFSET function arguments
     *
     * @param args - OFFSET function arguments
     */

  }, {
    key: "handleOffsetHeuristic",
    value: function handleOffsetHeuristic(args) {
      var cellArg = args[0];

      if (cellArg.type !== AstNodeType.CELL_REFERENCE) {
        return this.parsingError(ParsingErrorType.StaticOffsetError, 'First argument to OFFSET is not a reference');
      }

      var rowsArg = args[1];
      var rowShift;

      if (rowsArg.type === AstNodeType.NUMBER && Number.isInteger(rowsArg.value)) {
        rowShift = rowsArg.value;
      } else if (rowsArg.type === AstNodeType.PLUS_UNARY_OP && rowsArg.value.type === AstNodeType.NUMBER && Number.isInteger(rowsArg.value.value)) {
        rowShift = rowsArg.value.value;
      } else if (rowsArg.type === AstNodeType.MINUS_UNARY_OP && rowsArg.value.type === AstNodeType.NUMBER && Number.isInteger(rowsArg.value.value)) {
        rowShift = -rowsArg.value.value;
      } else {
        return this.parsingError(ParsingErrorType.StaticOffsetError, 'Second argument to OFFSET is not a static number');
      }

      var columnsArg = args[2];
      var colShift;

      if (columnsArg.type === AstNodeType.NUMBER && Number.isInteger(columnsArg.value)) {
        colShift = columnsArg.value;
      } else if (columnsArg.type === AstNodeType.PLUS_UNARY_OP && columnsArg.value.type === AstNodeType.NUMBER && Number.isInteger(columnsArg.value.value)) {
        colShift = columnsArg.value.value;
      } else if (columnsArg.type === AstNodeType.MINUS_UNARY_OP && columnsArg.value.type === AstNodeType.NUMBER && Number.isInteger(columnsArg.value.value)) {
        colShift = -columnsArg.value.value;
      } else {
        return this.parsingError(ParsingErrorType.StaticOffsetError, 'Third argument to OFFSET is not a static number');
      }

      var heightArg = args[3];
      var height;

      if (heightArg === undefined) {
        height = 1;
      } else if (heightArg.type === AstNodeType.NUMBER) {
        height = heightArg.value;

        if (height < 1) {
          return this.parsingError(ParsingErrorType.StaticOffsetError, 'Fourth argument to OFFSET is too small number');
        } else if (!Number.isInteger(height)) {
          return this.parsingError(ParsingErrorType.StaticOffsetError, 'Fourth argument to OFFSET is not integer');
        }
      } else {
        return this.parsingError(ParsingErrorType.StaticOffsetError, 'Fourth argument to OFFSET is not a static number');
      }

      var widthArg = args[4];
      var width;

      if (widthArg === undefined) {
        width = 1;
      } else if (widthArg.type === AstNodeType.NUMBER) {
        width = widthArg.value;

        if (width < 1) {
          return this.parsingError(ParsingErrorType.StaticOffsetError, 'Fifth argument to OFFSET is too small number');
        } else if (!Number.isInteger(width)) {
          return this.parsingError(ParsingErrorType.StaticOffsetError, 'Fifth argument to OFFSET is not integer');
        }
      } else {
        return this.parsingError(ParsingErrorType.StaticOffsetError, 'Fifth argument to OFFSET is not a static number');
      }

      var topLeftCorner = new CellAddress(null, cellArg.reference.col + colShift, cellArg.reference.row + rowShift, cellArg.reference.type);
      var absoluteCol = topLeftCorner.col;
      var absoluteRow = topLeftCorner.row;

      if (cellArg.reference.type === CellReferenceType.CELL_REFERENCE_RELATIVE || cellArg.reference.type === CellReferenceType.CELL_REFERENCE_ABSOLUTE_COL) {
        absoluteRow = absoluteRow + this.formulaAddress.row;
      }

      if (cellArg.reference.type === CellReferenceType.CELL_REFERENCE_RELATIVE || cellArg.reference.type === CellReferenceType.CELL_REFERENCE_ABSOLUTE_ROW) {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        absoluteCol = absoluteCol + this.formulaAddress.col;
      }

      if (absoluteCol < 0 || absoluteRow < 0) {
        return buildCellErrorAst(new CellError(ErrorType.REF, 'Resulting reference is out of the sheet'));
      }

      if (width === 1 && height === 1) {
        return buildCellReferenceAst(topLeftCorner);
      } else {
        var bottomRightCorner = new CellAddress(null, topLeftCorner.col + width - 1, topLeftCorner.row + height - 1, topLeftCorner.type);
        return buildCellRangeAst(topLeftCorner, bottomRightCorner, RangeSheetReferenceType.RELATIVE);
      }
    }
  }, {
    key: "parsingError",
    value: function parsingError(type, message) {
      this.customParsingError = _parsingError(type, message);
      return buildParsingErrorAst();
    }
  }, {
    key: "rangeSheetReferenceType",
    value: function rangeSheetReferenceType(start, end) {
      if (start === null) {
        return RangeSheetReferenceType.RELATIVE;
      } else if (end === null) {
        return RangeSheetReferenceType.START_ABSOLUTE;
      } else {
        return RangeSheetReferenceType.BOTH_ABSOLUTE;
      }
    }
  }]);

  return FormulaParser;
}(EmbeddedActionsParser);
export var FormulaLexer = /*#__PURE__*/function () {
  function FormulaLexer(lexerConfig) {
    _classCallCheck(this, FormulaLexer);

    this.lexerConfig = lexerConfig;
    this.lexer = new Lexer(lexerConfig.allTokens, {
      ensureOptimizations: true
    });
  }
  /**
   * Returns Lexer tokens from formula string
   *
   * @param text - string representation of a formula
   */


  _createClass(FormulaLexer, [{
    key: "tokenizeFormula",
    value: function tokenizeFormula(text) {
      var lexingResult = this.lexer.tokenize(text);
      var tokens = lexingResult.tokens;
      tokens = this.trimTrailingWhitespaces(tokens);
      tokens = this.skipWhitespacesInsideRanges(tokens);
      tokens = this.skipWhitespacesBeforeArgSeparators(tokens);
      lexingResult.tokens = tokens;
      return lexingResult;
    }
  }, {
    key: "skipWhitespacesInsideRanges",
    value: function skipWhitespacesInsideRanges(tokens) {
      return this.filterTokensByNeighbors(tokens, function (previous, current, next) {
        return (tokenMatcher(previous, CellReference) || tokenMatcher(previous, RangeSeparator)) && tokenMatcher(current, WhiteSpace) && (tokenMatcher(next, CellReference) || tokenMatcher(next, RangeSeparator));
      });
    }
  }, {
    key: "skipWhitespacesBeforeArgSeparators",
    value: function skipWhitespacesBeforeArgSeparators(tokens) {
      var _this2 = this;

      return this.filterTokensByNeighbors(tokens, function (previous, current, next) {
        return !tokenMatcher(previous, _this2.lexerConfig.ArgSeparator) && tokenMatcher(current, WhiteSpace) && tokenMatcher(next, _this2.lexerConfig.ArgSeparator);
      });
    }
  }, {
    key: "filterTokensByNeighbors",
    value: function filterTokensByNeighbors(tokens, shouldBeSkipped) {
      if (tokens.length < 3) {
        return tokens;
      }

      var i = 0;
      var filteredTokens = [tokens[i++]];

      while (i < tokens.length - 1) {
        if (!shouldBeSkipped(tokens[i - 1], tokens[i], tokens[i + 1])) {
          filteredTokens.push(tokens[i]);
        }

        ++i;
      }

      filteredTokens.push(tokens[i]);
      return filteredTokens;
    }
  }, {
    key: "trimTrailingWhitespaces",
    value: function trimTrailingWhitespaces(tokens) {
      if (tokens.length > 0 && tokenMatcher(tokens[tokens.length - 1], WhiteSpace)) {
        tokens.pop();
      }

      return tokens;
    }
  }]);

  return FormulaLexer;
}();