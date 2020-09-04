function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 * @license
 * Copyright (c) 2020 Handsoncode. All rights reserved.
 */

/**
 * Represents vertex which keeps static cell value
 */
export var ValueCellVertex = /*#__PURE__*/function () {
  function ValueCellVertex(cellValue) {
    _classCallCheck(this, ValueCellVertex);

    this.cellValue = cellValue;
  }
  /**
   * Returns cell value stored in vertex
   */


  _createClass(ValueCellVertex, [{
    key: "getCellValue",
    value: function getCellValue() {
      return this.cellValue;
    }
    /**
     * Sets computed cell value stored in this vertex
     */

  }, {
    key: "setCellValue",
    value: function setCellValue(cellValue) {
      this.cellValue = cellValue;
    }
  }]);

  return ValueCellVertex;
}();