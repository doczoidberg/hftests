function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 * @license
 * Copyright (c) 2020 Handsoncode. All rights reserved.
 */
import { AbsoluteCellRange } from '../AbsoluteCellRange';
import { ErroredMatrix, Matrix, MatrixSize, NotComputedMatrix } from '../Matrix';
import { ColumnsSpan, RowsSpan } from '../Span';
export var MatrixVertex = /*#__PURE__*/function () {
  function MatrixVertex(cellAddress, width, height, formula) {
    _classCallCheck(this, MatrixVertex);

    this.cellAddress = cellAddress;
    this.formula = formula || null;
    this.matrix = new NotComputedMatrix(new MatrixSize(width, height));
  }

  _createClass(MatrixVertex, [{
    key: "setCellValue",
    value: function setCellValue(matrix) {
      this.matrix = matrix;
    }
  }, {
    key: "setErrorValue",
    value: function setErrorValue(error) {
      this.matrix = new ErroredMatrix(error, this.matrix.size);
    }
  }, {
    key: "getCellValue",
    value: function getCellValue() {
      if (this.matrix instanceof NotComputedMatrix) {
        throw Error('Matrix not computed yet.');
      }

      return this.matrix;
    }
  }, {
    key: "getMatrixCellValue",
    value: function getMatrixCellValue(address) {
      var col = address.col - this.cellAddress.col;
      var row = address.row - this.cellAddress.row;
      return this.matrix.get(col, row);
    }
  }, {
    key: "setMatrixCellValue",
    value: function setMatrixCellValue(address, value) {
      var col = address.col - this.cellAddress.col;
      var row = address.row - this.cellAddress.row;

      if (this.matrix instanceof Matrix) {
        this.matrix.set(col, row, value);
      }
    }
  }, {
    key: "getRange",
    value: function getRange() {
      return AbsoluteCellRange.spanFrom(this.cellAddress, this.width, this.height);
    }
  }, {
    key: "getAddress",
    value: function getAddress() {
      return this.cellAddress;
    }
  }, {
    key: "setAddress",
    value: function setAddress(address) {
      this.cellAddress = address;
    }
  }, {
    key: "getFormula",
    value: function getFormula() {
      return this.formula;
    }
  }, {
    key: "setFormula",
    value: function setFormula(newFormula) {
      this.formula = newFormula;
    }
  }, {
    key: "isFormula",
    value: function isFormula() {
      return this.formula !== null;
    }
  }, {
    key: "isNumeric",
    value: function isNumeric() {
      return this.formula === null;
    }
  }, {
    key: "spansThroughSheetRows",
    value: function spansThroughSheetRows(sheet, startRow) {
      var endRow = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : startRow;
      return this.cellAddress.sheet === sheet && this.cellAddress.row <= endRow && startRow < this.cellAddress.row + this.height;
    }
  }, {
    key: "spansThroughSheetColumn",
    value: function spansThroughSheetColumn(sheet, col) {
      var columnEnd = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : col;
      return this.cellAddress.sheet === sheet && this.cellAddress.col <= columnEnd && col < this.cellAddress.col + this.width;
    }
  }, {
    key: "addRows",
    value: function addRows(sheet, row, numberOfRows) {
      if (this.matrix instanceof Matrix) {
        this.matrix.addRows(row - this.getAddress().row, numberOfRows);
      }
    }
  }, {
    key: "addColumns",
    value: function addColumns(sheet, column, numberOfColumns) {
      if (this.matrix instanceof Matrix) {
        this.matrix.addColumns(column - this.getAddress().col, numberOfColumns);
      }
    }
  }, {
    key: "removeRows",
    value: function removeRows(removedRows) {
      if (this.matrix instanceof Matrix) {
        var removedRowsFromMatrix = this.rowsFromMatrix().intersect(removedRows);
        this.matrix.removeRows(removedRowsFromMatrix.rowStart - this.getAddress().row, removedRowsFromMatrix.rowEnd - this.getAddress().row);
      }
    }
  }, {
    key: "removeColumns",
    value: function removeColumns(removedColumns) {
      if (this.matrix instanceof Matrix) {
        var removedColumnsFromMatrix = this.columnsFromMatrix().intersect(removedColumns);
        this.matrix.removeColumns(removedColumnsFromMatrix.columnStart - this.getAddress().col, removedColumnsFromMatrix.columnEnd - this.getAddress().col);
      }
    }
  }, {
    key: "isComputed",
    value: function isComputed() {
      return !(this.matrix instanceof NotComputedMatrix);
    }
  }, {
    key: "columnsFromMatrix",
    value: function columnsFromMatrix() {
      return ColumnsSpan.fromNumberOfColumns(this.cellAddress.sheet, this.cellAddress.col, this.width);
    }
  }, {
    key: "rowsFromMatrix",
    value: function rowsFromMatrix() {
      return RowsSpan.fromNumberOfRows(this.cellAddress.sheet, this.cellAddress.row, this.height);
    }
  }, {
    key: "width",
    get: function get() {
      return this.matrix.width();
    }
  }, {
    key: "height",
    get: function get() {
      return this.matrix.height();
    }
  }, {
    key: "sheet",
    get: function get() {
      return this.cellAddress.sheet;
    }
  }], [{
    key: "fromRange",
    value: function fromRange(range, formula) {
      return new MatrixVertex(range.start, range.width(), range.height(), formula);
    }
  }]);

  return MatrixVertex;
}();