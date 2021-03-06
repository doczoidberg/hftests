/**
 * @license
 * Copyright (c) 2020 Handsoncode. All rights reserved.
 */
import { InvalidArgumentsError } from './errors';
export function validateAsSheet(sheet) {
  if (!Array.isArray(sheet)) {
    throw new InvalidArgumentsError('an array of arrays.');
  }

  for (var i = 0; i < sheet.length; i++) {
    if (!Array.isArray(sheet[i])) {
      throw new InvalidArgumentsError('an array of arrays.');
    }
  }
}
/**
 * Returns actual width, height and fill ratio of a sheet
 *
 * @param sheet - two-dimmensional array sheet representation
 */

export function findBoundaries(sheet) {
  var width = 0;
  var height = 0;
  var cellsCount = 0;

  for (var currentRow = 0; currentRow < sheet.length; currentRow++) {
    var currentRowWidth = 0;

    for (var currentCol = 0; currentCol < sheet[currentRow].length; currentCol++) {
      var currentValue = sheet[currentRow][currentCol];

      if (currentValue === undefined || currentValue === null) {
        continue;
      }

      currentRowWidth = currentCol + 1;
      ++cellsCount;
    }

    width = Math.max(width, currentRowWidth);

    if (currentRowWidth > 0) {
      height = currentRow + 1;
    }
  }

  var sheetSize = width * height;
  return {
    height: height,
    width: width,
    fill: sheetSize === 0 ? 0 : cellsCount / sheetSize
  };
}