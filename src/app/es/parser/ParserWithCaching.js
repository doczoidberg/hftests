import "core-js/modules/es.symbol";
import "core-js/modules/es.symbol.description";
import "core-js/modules/es.symbol.iterator";
import "core-js/modules/es.array.concat";
import "core-js/modules/es.array.from";
import "core-js/modules/es.array.iterator";
import "core-js/modules/es.array.join";
import "core-js/modules/es.array.map";
import "core-js/modules/es.array.slice";
import "core-js/modules/es.function.name";
import "core-js/modules/es.object.assign";
import "core-js/modules/es.object.to-string";
import "core-js/modules/es.regexp.exec";
import "core-js/modules/es.regexp.to-string";
import "core-js/modules/es.string.iterator";
import "core-js/modules/es.string.split";
import "core-js/modules/web.dom-collections.iterator";

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
import { tokenMatcher } from 'chevrotain';
import { ErrorType } from '../Cell';
import { AstNodeType, buildParsingErrorAst } from './';
import { cellAddressFromString, columnAddressFromString, rowAddressFromString } from './addressRepresentationConverters';
import { imageWithWhitespace, ParsingErrorType, RangeSheetReferenceType } from './Ast';
import { binaryOpTokenMap } from './binaryOpTokenMap';
import { Cache } from './Cache';
import { FormulaLexer, FormulaParser } from './FormulaParser';
import { buildLexerConfig, CellReference, ColumnRange, ProcedureName, RowRange, WhiteSpace } from './LexerConfig';
import { formatNumber } from './Unparser';
/**
 * Parses formula using caching if feasible.
 */

export var ParserWithCaching = /*#__PURE__*/function () {
  function ParserWithCaching(config, functionRegistry, sheetMapping) {
    _classCallCheck(this, ParserWithCaching);

    this.config = config;
    this.functionRegistry = functionRegistry;
    this.sheetMapping = sheetMapping;
    this.statsCacheUsed = 0;
    this.lexerConfig = buildLexerConfig(config);
    this.lexer = new FormulaLexer(this.lexerConfig);
    this.formulaParser = new FormulaParser(this.lexerConfig, this.sheetMapping);
    this.cache = new Cache(this.functionRegistry);
  }
  /**
   * Parses a formula.
   *
   * @param text - formula to parse
   * @param formulaAddress - address with regard to which formula should be parsed. Impacts computed addresses in R0C0 format.
   */


  _createClass(ParserWithCaching, [{
    key: "parse",
    value: function parse(text, formulaAddress) {
      var lexerResult = this.lexer.tokenizeFormula(text);

      if (lexerResult.errors.length > 0) {
        var errors = lexerResult.errors.map(function (e) {
          return {
            type: ParsingErrorType.LexingError,
            message: e.message
          };
        });
        return {
          ast: buildParsingErrorAst(),
          errors: errors,
          hasVolatileFunction: false,
          hasStructuralChangeFunction: false,
          dependencies: []
        };
      }

      var hash = this.computeHashFromTokens(lexerResult.tokens, formulaAddress);
      var cacheResult = this.cache.get(hash);

      if (cacheResult) {
        ++this.statsCacheUsed;
      } else {
        var processedTokens = bindWhitespacesToTokens(lexerResult.tokens);
        var parsingResult = this.formulaParser.parseFromTokens(processedTokens, formulaAddress);

        if (parsingResult.errors.length > 0) {
          return Object.assign(Object.assign({}, parsingResult), {
            hasVolatileFunction: false,
            hasStructuralChangeFunction: false,
            dependencies: []
          });
        } else {
          cacheResult = this.cache.set(hash, parsingResult.ast);
        }
      }

      var _cacheResult = cacheResult,
          ast = _cacheResult.ast,
          hasVolatileFunction = _cacheResult.hasVolatileFunction,
          hasStructuralChangeFunction = _cacheResult.hasStructuralChangeFunction,
          relativeDependencies = _cacheResult.relativeDependencies;
      return {
        ast: ast,
        errors: [],
        hasVolatileFunction: hasVolatileFunction,
        hasStructuralChangeFunction: hasStructuralChangeFunction,
        dependencies: relativeDependencies
      };
    }
  }, {
    key: "fetchCachedResultForAst",
    value: function fetchCachedResultForAst(ast) {
      var hash = this.computeHashFromAst(ast);
      return this.fetchCachedResult(hash);
    }
  }, {
    key: "fetchCachedResult",
    value: function fetchCachedResult(hash) {
      var cacheResult = this.cache.get(hash);

      if (cacheResult === null) {
        throw new Error('There is no AST with such key in the cache');
      } else {
        var ast = cacheResult.ast,
            hasVolatileFunction = cacheResult.hasVolatileFunction,
            hasStructuralChangeFunction = cacheResult.hasStructuralChangeFunction,
            relativeDependencies = cacheResult.relativeDependencies;
        return {
          ast: ast,
          errors: [],
          hasVolatileFunction: hasVolatileFunction,
          hasStructuralChangeFunction: hasStructuralChangeFunction,
          dependencies: relativeDependencies
        };
      }
    }
  }, {
    key: "computeHashFromTokens",
    value: function computeHashFromTokens(tokens, baseAddress) {
      var _a;

      var hash = '';
      var idx = 0;

      while (idx < tokens.length) {
        var token = tokens[idx];

        if (tokenMatcher(token, CellReference)) {
          var cellAddress = cellAddressFromString(this.sheetMapping, token.image, baseAddress);

          if (cellAddress === undefined) {
            hash = hash.concat(token.image);
          } else {
            hash = hash.concat(cellAddress.hash(true));
          }
        } else if (tokenMatcher(token, ProcedureName)) {
          var procedureName = token.image.toUpperCase().slice(0, -1);
          var canonicalProcedureName = (_a = this.lexerConfig.functionMapping[procedureName]) !== null && _a !== void 0 ? _a : procedureName;
          hash = hash.concat(canonicalProcedureName, '(');
        } else if (tokenMatcher(token, ColumnRange)) {
          var _token$image$split = token.image.split(':'),
              _token$image$split2 = _slicedToArray(_token$image$split, 2),
              start = _token$image$split2[0],
              end = _token$image$split2[1];

          var startAddress = columnAddressFromString(this.sheetMapping, start, baseAddress);
          var endAddress = columnAddressFromString(this.sheetMapping, end, baseAddress);

          if (startAddress === undefined || endAddress === undefined) {
            hash = hash.concat('!REF');
          } else {
            hash = hash.concat(startAddress.hash(true), ':', endAddress.hash(true));
          }
        } else if (tokenMatcher(token, RowRange)) {
          var _token$image$split3 = token.image.split(':'),
              _token$image$split4 = _slicedToArray(_token$image$split3, 2),
              _start = _token$image$split4[0],
              _end = _token$image$split4[1];

          var _startAddress = rowAddressFromString(this.sheetMapping, _start, baseAddress);

          var _endAddress = rowAddressFromString(this.sheetMapping, _end, baseAddress);

          if (_startAddress === undefined || _endAddress === undefined) {
            hash = hash.concat('!REF');
          } else {
            hash = hash.concat(_startAddress.hash(true), ':', _endAddress.hash(true));
          }
        } else {
          hash = hash.concat(token.image);
        }

        idx++;
      }

      return hash;
    }
  }, {
    key: "rememberNewAst",
    value: function rememberNewAst(ast) {
      var hash = this.computeHashFromAst(ast);
      return this.cache.maybeSetAndThenGet(hash, ast);
    }
  }, {
    key: "computeHashFromAst",
    value: function computeHashFromAst(ast) {
      return '=' + this.computeHashOfAstNode(ast);
    }
  }, {
    key: "destroy",
    value: function destroy() {
      this.cache.destroy();
    }
  }, {
    key: "computeHashOfAstNode",
    value: function computeHashOfAstNode(ast) {
      var _this = this;

      switch (ast.type) {
        case AstNodeType.EMPTY:
          {
            return ast.leadingWhitespace || '';
          }

        case AstNodeType.NUMBER:
          {
            return imageWithWhitespace(formatNumber(ast.value, this.config.decimalSeparator), ast.leadingWhitespace);
          }

        case AstNodeType.STRING:
          {
            return imageWithWhitespace('"' + ast.value + '"', ast.leadingWhitespace);
          }

        case AstNodeType.NAMED_EXPRESSION:
          {
            return imageWithWhitespace(ast.expressionName, ast.leadingWhitespace);
          }

        case AstNodeType.FUNCTION_CALL:
          {
            var args = ast.args.map(function (arg) {
              return _this.computeHashOfAstNode(arg);
            }).join(this.config.functionArgSeparator);
            var rightPart = ast.procedureName + '(' + args + imageWithWhitespace(')', ast.internalWhitespace);
            return imageWithWhitespace(rightPart, ast.leadingWhitespace);
          }

        case AstNodeType.CELL_REFERENCE:
          {
            return imageWithWhitespace(ast.reference.hash(true), ast.leadingWhitespace);
          }

        case AstNodeType.COLUMN_RANGE:
        case AstNodeType.ROW_RANGE:
        case AstNodeType.CELL_RANGE:
          {
            var start = ast.start.hash(ast.sheetReferenceType !== RangeSheetReferenceType.RELATIVE);
            var end = ast.end.hash(ast.sheetReferenceType === RangeSheetReferenceType.BOTH_ABSOLUTE);
            return imageWithWhitespace(start + ':' + end, ast.leadingWhitespace);
          }

        case AstNodeType.MINUS_UNARY_OP:
          {
            return imageWithWhitespace('-' + this.computeHashOfAstNode(ast.value), ast.leadingWhitespace);
          }

        case AstNodeType.PLUS_UNARY_OP:
          {
            return imageWithWhitespace('+' + this.computeHashOfAstNode(ast.value), ast.leadingWhitespace);
          }

        case AstNodeType.PERCENT_OP:
          {
            return this.computeHashOfAstNode(ast.value) + imageWithWhitespace('%', ast.leadingWhitespace);
          }

        case AstNodeType.ERROR:
          {
            var image = this.config.translationPackage.getErrorTranslation(ast.error ? ast.error.type : ErrorType.ERROR);
            return imageWithWhitespace(image, ast.leadingWhitespace);
          }

        case AstNodeType.ERROR_WITH_RAW_INPUT:
          {
            return imageWithWhitespace(ast.rawInput, ast.leadingWhitespace);
          }

        case AstNodeType.PARENTHESIS:
          {
            var expression = this.computeHashOfAstNode(ast.expression);

            var _rightPart = '(' + expression + imageWithWhitespace(')', ast.internalWhitespace);

            return imageWithWhitespace(_rightPart, ast.leadingWhitespace);
          }

        default:
          {
            return this.computeHashOfAstNode(ast.left) + imageWithWhitespace(binaryOpTokenMap[ast.type], ast.leadingWhitespace) + this.computeHashOfAstNode(ast.right);
          }
      }
    }
  }]);

  return ParserWithCaching;
}();
export function bindWhitespacesToTokens(tokens) {
  var processedTokens = [];
  var first = tokens[0];

  if (!tokenMatcher(first, WhiteSpace)) {
    processedTokens.push(first);
  }

  for (var i = 1; i < tokens.length; ++i) {
    var current = tokens[i];

    if (tokenMatcher(current, WhiteSpace)) {
      continue;
    }

    var previous = tokens[i - 1];

    if (tokenMatcher(previous, WhiteSpace)) {
      current.leadingWhitespace = previous;
    }

    processedTokens.push(current);
  }

  return processedTokens;
}