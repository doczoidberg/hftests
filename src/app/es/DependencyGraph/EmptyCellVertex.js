function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 * @license
 * Copyright (c) 2020 Handsoncode. All rights reserved.
 */
import { EmptyValue } from '../Cell';
/**
 * Represents singleton vertex bound to all empty cells
 */

export var EmptyCellVertex = /*#__PURE__*/function () {
  function EmptyCellVertex(address //might be outdated!
  ) {
    _classCallCheck(this, EmptyCellVertex);

    this.address = address;
  }
  /**
   * Retrieves cell value bound to that singleton
   */


  _createClass(EmptyCellVertex, [{
    key: "getCellValue",
    value: function getCellValue() {
      return EmptyValue;
    }
  }]);

  return EmptyCellVertex;
}();