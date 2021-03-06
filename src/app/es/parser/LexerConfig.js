import "core-js/modules/es.regexp.constructor";
import "core-js/modules/es.regexp.exec";
import "core-js/modules/es.regexp.to-string";

/**
 * @license
 * Copyright (c) 2020 Handsoncode. All rights reserved.
 */
import { createToken, Lexer } from 'chevrotain';
/* arithmetic */
// abstract for + -

export var AdditionOp = createToken({
  name: 'AdditionOp',
  pattern: Lexer.NA
});
export var PlusOp = createToken({
  name: 'PlusOp',
  pattern: /\+/,
  categories: AdditionOp
});
export var MinusOp = createToken({
  name: 'MinusOp',
  pattern: /-/,
  categories: AdditionOp
}); // abstract for * /

export var MultiplicationOp = createToken({
  name: 'MultiplicationOp',
  pattern: Lexer.NA
});
export var TimesOp = createToken({
  name: 'TimesOp',
  pattern: /\*/,
  categories: MultiplicationOp
});
export var DivOp = createToken({
  name: 'DivOp',
  pattern: /\//,
  categories: MultiplicationOp
});
export var PowerOp = createToken({
  name: 'PowerOp',
  pattern: /\^/
});
export var PercentOp = createToken({
  name: 'PercentOp',
  pattern: /%/
});
export var BooleanOp = createToken({
  name: 'BooleanOp',
  pattern: Lexer.NA
});
export var EqualsOp = createToken({
  name: 'EqualsOp',
  pattern: /=/,
  categories: BooleanOp
});
export var NotEqualOp = createToken({
  name: 'NotEqualOp',
  pattern: /<>/,
  categories: BooleanOp
});
export var GreaterThanOp = createToken({
  name: 'GreaterThanOp',
  pattern: />/,
  categories: BooleanOp
});
export var LessThanOp = createToken({
  name: 'LessThanOp',
  pattern: /</,
  categories: BooleanOp
});
export var GreaterThanOrEqualOp = createToken({
  name: 'GreaterThanOrEqualOp',
  pattern: />=/,
  categories: BooleanOp
});
export var LessThanOrEqualOp = createToken({
  name: 'LessThanOrEqualOp',
  pattern: /<=/,
  categories: BooleanOp
});
export var ConcatenateOp = createToken({
  name: 'ConcatenateOp',
  pattern: /&/
});
/* addresses */

export var additionalCharactersAllowedInQuotes = ' '; // It's included in regexps, so escape characters which have special regexp semantics

export var sheetNameRegexp = "([A-Za-z0-9_\xC0-\u02AF]+|'[A-Za-z0-9".concat(additionalCharactersAllowedInQuotes, "_\xC0-\u02AF]+')!");
export var CellReference = createToken({
  name: 'CellReference',
  pattern: new RegExp("(".concat(sheetNameRegexp, ")?\\$?[A-Za-z]+\\$?[0-9]+"))
});
export var ColumnRange = createToken({
  name: 'ColumnRange',
  pattern: new RegExp("(".concat(sheetNameRegexp, ")?\\$?[A-Za-z]+:(").concat(sheetNameRegexp, ")?\\$?[A-Za-z]+"))
});
export var RowRange = createToken({
  name: 'RowRange',
  pattern: new RegExp("(".concat(sheetNameRegexp, ")?\\$?[0-9]+:(").concat(sheetNameRegexp, ")?\\$?[0-9]+"))
});
export var RangeSeparator = createToken({
  name: 'RangeSeparator',
  pattern: /:/
});
/* parenthesis */

export var LParen = createToken({
  name: 'LParen',
  pattern: /\(/
});
export var RParen = createToken({
  name: 'RParen',
  pattern: /\)/
});
/* prcoedures */

export var ProcedureName = createToken({
  name: 'ProcedureName',
  pattern: /(\.?[0-9A-Za-z\u00C0-\u02AF]+)+\(/
});
/* named expressions */

export var NamedExpression = createToken({
  name: 'NamedExpression',
  pattern: /[A-Za-z\u00C0-\u02AF_][0-9\.A-Za-z_\u00C0-\u02AF_]+/
});
/* string literal */

export var StringLiteral = createToken({
  name: 'StringLiteral',
  pattern: /"([^"\\]*(\\.[^"\\]*)*)"/
});
/* error literal */

export var ErrorLiteral = createToken({
  name: 'ErrorLiteral',
  pattern: /#[A-Za-z0-9\/]+[?!]?/
});
/* skipping whitespaces */

export var WhiteSpace = createToken({
  name: 'WhiteSpace',
  pattern: /[ \t\n\r]+/
});
export var buildLexerConfig = function buildLexerConfig(config) {
  var offsetProcedureNameLiteral = config.translationPackage.getFunctionTranslation('OFFSET');
  var errorMapping = config.errorMapping;
  var functionMapping = config.translationPackage.buildFunctionMapping();
  /* configurable tokens */

  var ArgSeparator = createToken({
    name: 'ArgSeparator',
    pattern: config.functionArgSeparator
  });
  var NumberLiteral = createToken({
    name: 'NumberLiteral',
    pattern: new RegExp("[\\d]*[".concat(config.decimalSeparator, "]?[\\d]+"))
  });
  var OffsetProcedureName = createToken({
    name: 'OffsetProcedureName',
    pattern: new RegExp(offsetProcedureNameLiteral, 'i')
  });
  /* order is important, first pattern is used */

  var allTokens = [WhiteSpace, PlusOp, MinusOp, TimesOp, DivOp, PowerOp, EqualsOp, NotEqualOp, PercentOp, GreaterThanOrEqualOp, LessThanOrEqualOp, GreaterThanOp, LessThanOp, LParen, RParen, OffsetProcedureName, ProcedureName, RangeSeparator, ArgSeparator, ColumnRange, RowRange, NumberLiteral, StringLiteral, ErrorLiteral, ConcatenateOp, BooleanOp, AdditionOp, MultiplicationOp, CellReference, NamedExpression];
  return {
    ArgSeparator: ArgSeparator,
    NumberLiteral: NumberLiteral,
    OffsetProcedureName: OffsetProcedureName,
    allTokens: allTokens,
    errorMapping: errorMapping,
    functionMapping: functionMapping,
    decimalSeparator: config.decimalSeparator,
    maxColumns: config.maxColumns,
    maxRows: config.maxRows
  };
};