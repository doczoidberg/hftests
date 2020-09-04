import "core-js/modules/es.array.concat";
import "core-js/modules/es.array.reduce";
import "core-js/modules/es.number.constructor";
import "core-js/modules/es.regexp.constructor";
import "core-js/modules/es.regexp.exec";
import "core-js/modules/es.regexp.to-string";
import "core-js/modules/es.string.split";

/**
 * @license
 * Copyright (c) 2020 Handsoncode. All rights reserved.
 */
import { simpleCellAddress } from '../Cell';
import { CellAddress } from './CellAddress';
import { ColumnAddress } from './ColumnAddress';
import { additionalCharactersAllowedInQuotes } from './LexerConfig';
import { RowAddress } from './RowAddress';
var addressRegex = new RegExp("^((([A-Za-z0-9_\xC0-\u02AF]+)|'([A-Za-z0-9".concat(additionalCharactersAllowedInQuotes, "_\xC0-\u02AF]+)')!)?(\\$?)([A-Za-z]+)(\\$?)([0-9]+)$"));
var columnRegex = new RegExp("^((([A-Za-z0-9_\xC0-\u02AF]+)|'([A-Za-z0-9".concat(additionalCharactersAllowedInQuotes, "_\xC0-\u02AF]+)')!)?(\\$?)([A-Za-z]+)"));
var rowRegex = new RegExp("^((([A-Za-z0-9_\xC0-\u02AF]+)|'([A-Za-z0-9".concat(additionalCharactersAllowedInQuotes, "_\xC0-\u02AF]+)')!)?(\\$?)([0-9]+)"));
/**
 * Computes R0C0 representation of cell address based on it's string representation and base address.
 *
 * @param sheetMapping - mapping function needed to change name of a sheet to index
 * @param stringAddress - string representation of cell address, e.g. 'C64'
 * @param baseAddress - base address for R0C0 conversion
 * @returns object representation of address
 */

export var cellAddressFromString = function cellAddressFromString(sheetMapping, stringAddress, baseAddress) {
  var result = addressRegex.exec(stringAddress);
  var col = columnLabelToIndex(result[6]);
  var maybeSheetName = result[3] || result[4];
  var sheet = null;

  if (maybeSheetName) {
    sheet = sheetMapping(maybeSheetName);

    if (sheet === undefined) {
      return undefined;
    }
  }

  var row = Number(result[8]) - 1;

  if (result[5] === '$' && result[7] === '$') {
    return CellAddress.absolute(sheet, col, row);
  } else if (result[5] === '$') {
    return CellAddress.absoluteCol(sheet, col, row - baseAddress.row);
  } else if (result[7] === '$') {
    return CellAddress.absoluteRow(sheet, col - baseAddress.col, row);
  } else {
    return CellAddress.relative(sheet, col - baseAddress.col, row - baseAddress.row);
  }
};
export var columnAddressFromString = function columnAddressFromString(sheetMapping, stringAddress, baseAddress) {
  var result = columnRegex.exec(stringAddress);
  var sheet = extractSheetNumber(result, sheetMapping);

  if (sheet === undefined) {
    return undefined;
  }

  var col = columnLabelToIndex(result[6]);

  if (result[5] === '$') {
    return ColumnAddress.absolute(sheet, col);
  } else {
    return ColumnAddress.relative(sheet, col - baseAddress.col);
  }
};
export var rowAddressFromString = function rowAddressFromString(sheetMapping, stringAddress, baseAddress) {
  var result = rowRegex.exec(stringAddress);
  var sheet = extractSheetNumber(result, sheetMapping);

  if (sheet === undefined) {
    return undefined;
  }

  var row = Number(result[6]) - 1;

  if (result[5] === '$') {
    return RowAddress.absolute(sheet, row);
  } else {
    return RowAddress.relative(sheet, row - baseAddress.row);
  }
};
/**
 * Computes simple (absolute) address of a cell address based on its string representation.
 * If sheet name present in string representation but is not present in sheet mapping, returns undefined.
 * If sheet name is not present in string representation, returns {@param sheetContext} as sheet number
 *
 * @param sheetMapping - mapping function needed to change name of a sheet to index
 * @param stringAddress - string representation of cell address, e.g. 'C64'
 * @param sheetContext - sheet in context of which we should parse the address
 * @returns absolute representation of address, e.g. { sheet: 0, col: 1, row: 1 }
 */

export var simpleCellAddressFromString = function simpleCellAddressFromString(sheetMapping, stringAddress, sheetContext) {
  var result = addressRegex.exec(stringAddress);
  var col = columnLabelToIndex(result[6]);
  var maybeSheetName = result[3] || result[4];
  var sheet;

  if (maybeSheetName) {
    sheet = sheetMapping(maybeSheetName);
  } else {
    sheet = sheetContext;
  }

  if (sheet === undefined) {
    return undefined;
  }

  var row = Number(result[8]) - 1;
  return simpleCellAddress(sheet, col, row);
};
/**
 * Returns string representation of absolute address
 * If sheet index is not present in sheet mapping, returns undefined
 *
 * @param sheetIndexMapping - mapping function needed to change sheet index to sheet name
 * @param address - object representation of absolute address
 * @param sheetIndex - if is not equal with address sheet index, string representation will contain sheet name
 * */

export var simpleCellAddressToString = function simpleCellAddressToString(sheetIndexMapping, address, sheetIndex) {
  var column = columnIndexToLabel(address.col);
  var sheetName = sheetIndexMapping(address.sheet);

  if (sheetName === undefined) {
    return undefined;
  }

  if (sheetIndex !== address.sheet) {
    return "".concat(sheetName, "!").concat(column).concat(address.row + 1);
  } else {
    return "".concat(column).concat(address.row + 1);
  }
};
/**
* Convert column label to index
*
* @param columnStringRepresentation - column label (e.g. 'AAB')
* @returns column index
* */

function columnLabelToIndex(columnStringRepresentation) {
  if (columnStringRepresentation.length === 1) {
    return columnStringRepresentation.toUpperCase().charCodeAt(0) - 65;
  } else {
    return columnStringRepresentation.split('').reduce(function (currentColumn, nextLetter) {
      return currentColumn * 26 + (nextLetter.toUpperCase().charCodeAt(0) - 64);
    }, 0) - 1;
  }
}
/**
 * Converts column index to label
 *
 * @param column - address to convert
 * @returns string representation, e.g. 'AAB'
 */


export function columnIndexToLabel(column) {
  var result = '';

  while (column >= 0) {
    result = String.fromCharCode(column % 26 + 97) + result;
    column = Math.floor(column / 26) - 1;
  }

  return result.toUpperCase();
}

function extractSheetNumber(regexResult, sheetMapping) {
  var maybeSheetName = regexResult[3] || regexResult[4];
  var sheet = null;

  if (maybeSheetName) {
    sheet = sheetMapping(maybeSheetName);

    if (sheet === undefined) {
      return undefined;
    }
  }

  return sheet;
}