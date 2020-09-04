import "core-js/modules/es.array.concat";
import "core-js/modules/es.array.join";
import "core-js/modules/es.array.map";
import "core-js/modules/es.object.to-string";
import "core-js/modules/es.regexp.constructor";
import "core-js/modules/es.regexp.exec";
import "core-js/modules/es.regexp.to-string";
import "core-js/modules/es.string.replace";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 * @license
 * Copyright (c) 2020 Handsoncode. All rights reserved.
 */
import { ErrorType } from '../Cell';
import { AstNodeType, imageWithWhitespace, RangeSheetReferenceType } from './Ast';
import { binaryOpTokenMap } from './binaryOpTokenMap';
import { additionalCharactersAllowedInQuotes } from './LexerConfig';
export var Unparser = /*#__PURE__*/function () {
  function Unparser(config, lexerConfig, sheetMappingFn, namedExpressions) {
    _classCallCheck(this, Unparser);

    this.config = config;
    this.lexerConfig = lexerConfig;
    this.sheetMappingFn = sheetMappingFn;
    this.namedExpressions = namedExpressions;
  }

  _createClass(Unparser, [{
    key: "unparse",
    value: function unparse(ast, address) {
      return '=' + this.unparseAst(ast, address);
    }
  }, {
    key: "unparseAst",
    value: function unparseAst(ast, address) {
      var _this = this;

      var _a;

      switch (ast.type) {
        case AstNodeType.EMPTY:
          {
            return imageWithWhitespace('', ast.leadingWhitespace);
          }

        case AstNodeType.NUMBER:
          {
            return imageWithWhitespace(formatNumber(ast.value, this.config.decimalSeparator), ast.leadingWhitespace);
          }

        case AstNodeType.STRING:
          {
            return imageWithWhitespace('"' + ast.value + '"', ast.leadingWhitespace);
          }

        case AstNodeType.FUNCTION_CALL:
          {
            var args = ast.args.map(function (arg) {
              return arg !== undefined ? _this.unparseAst(arg, address) : '';
            }).join(this.config.functionArgSeparator);
            var procedureName = this.config.translationPackage.isFunctionTranslated(ast.procedureName) ? this.config.translationPackage.getFunctionTranslation(ast.procedureName) : ast.procedureName;
            var rightPart = procedureName + '(' + args + imageWithWhitespace(')', ast.internalWhitespace);
            return imageWithWhitespace(rightPart, ast.leadingWhitespace);
          }

        case AstNodeType.NAMED_EXPRESSION:
          {
            var originalNamedExpressionName = (_a = this.namedExpressions.nearestNamedExpression(ast.expressionName, address.sheet)) === null || _a === void 0 ? void 0 : _a.displayName;
            return imageWithWhitespace(originalNamedExpressionName || ast.expressionName, ast.leadingWhitespace);
          }

        case AstNodeType.CELL_REFERENCE:
          {
            var image;

            if (ast.reference.sheet !== null) {
              image = this.unparseSheetName(ast.reference.sheet) + '!' + ast.reference.unparse(address);
            } else {
              image = ast.reference.unparse(address);
            }

            return imageWithWhitespace(image, ast.leadingWhitespace);
          }

        case AstNodeType.COLUMN_RANGE:
        case AstNodeType.ROW_RANGE:
        case AstNodeType.CELL_RANGE:
          {
            return imageWithWhitespace(this.formatRange(ast, address), ast.leadingWhitespace);
          }

        case AstNodeType.PLUS_UNARY_OP:
          {
            var unparsedExpr = this.unparseAst(ast.value, address);
            return imageWithWhitespace('+', ast.leadingWhitespace) + unparsedExpr;
          }

        case AstNodeType.MINUS_UNARY_OP:
          {
            var _unparsedExpr = this.unparseAst(ast.value, address);

            return imageWithWhitespace('-', ast.leadingWhitespace) + _unparsedExpr;
          }

        case AstNodeType.PERCENT_OP:
          {
            return this.unparseAst(ast.value, address) + imageWithWhitespace('%', ast.leadingWhitespace);
          }

        case AstNodeType.ERROR:
          {
            var _image = this.config.translationPackage.getErrorTranslation(ast.error ? ast.error.type : ErrorType.ERROR);

            return imageWithWhitespace(_image, ast.leadingWhitespace);
          }

        case AstNodeType.ERROR_WITH_RAW_INPUT:
          {
            return imageWithWhitespace(ast.rawInput, ast.leadingWhitespace);
          }

        case AstNodeType.PARENTHESIS:
          {
            var expression = this.unparseAst(ast.expression, address);

            var _rightPart = '(' + expression + imageWithWhitespace(')', ast.internalWhitespace);

            return imageWithWhitespace(_rightPart, ast.leadingWhitespace);
          }

        default:
          {
            var left = this.unparseAst(ast.left, address);
            var right = this.unparseAst(ast.right, address);
            return left + imageWithWhitespace(binaryOpTokenMap[ast.type], ast.leadingWhitespace) + right;
          }
      }
    }
  }, {
    key: "unparseSheetName",
    value: function unparseSheetName(sheetId) {
      var sheet = this.sheetMappingFn(sheetId);

      if (new RegExp(additionalCharactersAllowedInQuotes).exec(sheet)) {
        return "'".concat(sheet, "'");
      } else {
        return sheet;
      }
    }
  }, {
    key: "formatRange",
    value: function formatRange(ast, baseAddress) {
      var startSheeet = '';
      var endSheet = '';

      if (ast.start.sheet !== null && ast.sheetReferenceType !== RangeSheetReferenceType.RELATIVE) {
        startSheeet = this.unparseSheetName(ast.start.sheet) + '!';
      }

      if (ast.end.sheet !== null && ast.sheetReferenceType === RangeSheetReferenceType.BOTH_ABSOLUTE) {
        endSheet = this.unparseSheetName(ast.end.sheet) + '!';
      }

      return "".concat(startSheeet).concat(ast.start.unparse(baseAddress), ":").concat(endSheet).concat(ast.end.unparse(baseAddress));
    }
  }]);

  return Unparser;
}();
export function formatNumber(number, decimalSeparator) {
  var numericString = number.toString();
  return numericString.replace('.', decimalSeparator);
}