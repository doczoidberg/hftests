function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 * @license
 * Copyright (c) 2020 Handsoncode. All rights reserved.
 */
import { DenseStrategy } from './DenseStrategy';
import { SparseStrategy } from './SparseStrategy';
export var DenseSparseChooseBasedOnThreshold = /*#__PURE__*/function () {
  function DenseSparseChooseBasedOnThreshold(threshold) {
    _classCallCheck(this, DenseSparseChooseBasedOnThreshold);

    this.threshold = threshold;
  }

  _createClass(DenseSparseChooseBasedOnThreshold, [{
    key: "call",
    value: function call(fill) {
      if (fill > this.threshold) {
        return DenseStrategy;
      } else {
        return SparseStrategy;
      }
    }
  }]);

  return DenseSparseChooseBasedOnThreshold;
}();
export var AlwaysSparse = /*#__PURE__*/function () {
  function AlwaysSparse() {
    _classCallCheck(this, AlwaysSparse);
  }

  _createClass(AlwaysSparse, [{
    key: "call",
    value: function call() {
      return SparseStrategy;
    }
  }]);

  return AlwaysSparse;
}();
export var AlwaysDense = /*#__PURE__*/function () {
  function AlwaysDense() {
    _classCallCheck(this, AlwaysDense);
  }

  _createClass(AlwaysDense, [{
    key: "call",
    value: function call() {
      return DenseStrategy;
    }
  }]);

  return AlwaysDense;
}();