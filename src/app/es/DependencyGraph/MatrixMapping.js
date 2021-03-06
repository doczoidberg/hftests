import "core-js/modules/es.symbol";
import "core-js/modules/es.symbol.description";
import "core-js/modules/es.symbol.iterator";
import "core-js/modules/es.array.from";
import "core-js/modules/es.array.iterator";
import "core-js/modules/es.array.slice";
import "core-js/modules/es.function.name";
import "core-js/modules/es.map";
import "core-js/modules/es.object.to-string";
import "core-js/modules/es.regexp.to-string";
import "core-js/modules/es.string.iterator";
import "core-js/modules/web.dom-collections.iterator";
import "regenerator-runtime/runtime";

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e2) { throw _e2; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e3) { didErr = true; err = _e3; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 * @license
 * Copyright (c) 2020 Handsoncode. All rights reserved.
 */
export var MatrixMapping = /*#__PURE__*/function () {
  function MatrixMapping() {
    _classCallCheck(this, MatrixMapping);

    this.matrixMapping = new Map();
  }

  _createClass(MatrixMapping, [{
    key: "getMatrix",
    value: function getMatrix(range) {
      return this.matrixMapping.get(range.toString());
    }
  }, {
    key: "setMatrix",
    value: function setMatrix(range, vertex) {
      this.matrixMapping.set(range.toString(), vertex);
    }
  }, {
    key: "removeMatrix",
    value: function removeMatrix(range) {
      this.matrixMapping.delete(range.toString());
    }
  }, {
    key: "isFormulaMatrixInRow",
    value: function isFormulaMatrixInRow(sheet, row) {
      var _iterator = _createForOfIteratorHelper(this.matrixMapping.values()),
          _step;

      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var mtx = _step.value;

          if (mtx.spansThroughSheetRows(sheet, row) && mtx.isFormula()) {
            return true;
          }
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }

      return false;
    }
  }, {
    key: "isFormulaMatrixInRows",
    value: function isFormulaMatrixInRows(span) {
      var _iterator2 = _createForOfIteratorHelper(span.rows()),
          _step2;

      try {
        for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
          var row = _step2.value;

          if (this.isFormulaMatrixInRow(span.sheet, row)) {
            return true;
          }
        }
      } catch (err) {
        _iterator2.e(err);
      } finally {
        _iterator2.f();
      }

      return false;
    }
  }, {
    key: "isFormulaMatrixInColumn",
    value: function isFormulaMatrixInColumn(sheet, column) {
      var _iterator3 = _createForOfIteratorHelper(this.matrixMapping.values()),
          _step3;

      try {
        for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
          var mtx = _step3.value;

          if (mtx.spansThroughSheetColumn(sheet, column) && mtx.isFormula()) {
            return true;
          }
        }
      } catch (err) {
        _iterator3.e(err);
      } finally {
        _iterator3.f();
      }

      return false;
    }
  }, {
    key: "isFormulaMatrixInColumns",
    value: function isFormulaMatrixInColumns(span) {
      var _iterator4 = _createForOfIteratorHelper(span.columns()),
          _step4;

      try {
        for (_iterator4.s(); !(_step4 = _iterator4.n()).done;) {
          var col = _step4.value;

          if (this.isFormulaMatrixInColumn(span.sheet, col)) {
            return true;
          }
        }
      } catch (err) {
        _iterator4.e(err);
      } finally {
        _iterator4.f();
      }

      return false;
    }
  }, {
    key: "isFormulaMatrixInRange",
    value: function isFormulaMatrixInRange(range) {
      var _iterator5 = _createForOfIteratorHelper(this.matrixMapping.values()),
          _step5;

      try {
        for (_iterator5.s(); !(_step5 = _iterator5.n()).done;) {
          var mtx = _step5.value;

          if (mtx.isFormula() && mtx.getRange().doesOverlap(range)) {
            return true;
          }
        }
      } catch (err) {
        _iterator5.e(err);
      } finally {
        _iterator5.f();
      }

      return false;
    }
  }, {
    key: "isFormulaMatrixAtAddress",
    value: function isFormulaMatrixAtAddress(address) {
      var _iterator6 = _createForOfIteratorHelper(this.matrixMapping.values()),
          _step6;

      try {
        for (_iterator6.s(); !(_step6 = _iterator6.n()).done;) {
          var mtx = _step6.value;

          if (mtx.getRange().addressInRange(address) && mtx.isFormula()) {
            return true;
          }
        }
      } catch (err) {
        _iterator6.e(err);
      } finally {
        _iterator6.f();
      }

      return false;
    }
  }, {
    key: "numericMatrices",
    value: /*#__PURE__*/regeneratorRuntime.mark(function numericMatrices() {
      var _iterator7, _step7, _step7$value, mtxKey, mtx;

      return regeneratorRuntime.wrap(function numericMatrices$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _iterator7 = _createForOfIteratorHelper(this.matrixMapping.entries());
              _context.prev = 1;

              _iterator7.s();

            case 3:
              if ((_step7 = _iterator7.n()).done) {
                _context.next = 10;
                break;
              }

              _step7$value = _slicedToArray(_step7.value, 2), mtxKey = _step7$value[0], mtx = _step7$value[1];

              if (mtx.isFormula()) {
                _context.next = 8;
                break;
              }

              _context.next = 8;
              return [mtxKey, mtx];

            case 8:
              _context.next = 3;
              break;

            case 10:
              _context.next = 15;
              break;

            case 12:
              _context.prev = 12;
              _context.t0 = _context["catch"](1);

              _iterator7.e(_context.t0);

            case 15:
              _context.prev = 15;

              _iterator7.f();

              return _context.finish(15);

            case 18:
            case "end":
              return _context.stop();
          }
        }
      }, numericMatrices, this, [[1, 12, 15, 18]]);
    })
  }, {
    key: "numericMatricesInRows",
    value: /*#__PURE__*/regeneratorRuntime.mark(function numericMatricesInRows(rowsSpan) {
      var _iterator8, _step8, _step8$value, mtxKey, mtx;

      return regeneratorRuntime.wrap(function numericMatricesInRows$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _iterator8 = _createForOfIteratorHelper(this.matrixMapping.entries());
              _context2.prev = 1;

              _iterator8.s();

            case 3:
              if ((_step8 = _iterator8.n()).done) {
                _context2.next = 10;
                break;
              }

              _step8$value = _slicedToArray(_step8.value, 2), mtxKey = _step8$value[0], mtx = _step8$value[1];

              if (!(mtx.spansThroughSheetRows(rowsSpan.sheet, rowsSpan.rowStart, rowsSpan.rowEnd) && !mtx.isFormula())) {
                _context2.next = 8;
                break;
              }

              _context2.next = 8;
              return [mtxKey, mtx];

            case 8:
              _context2.next = 3;
              break;

            case 10:
              _context2.next = 15;
              break;

            case 12:
              _context2.prev = 12;
              _context2.t0 = _context2["catch"](1);

              _iterator8.e(_context2.t0);

            case 15:
              _context2.prev = 15;

              _iterator8.f();

              return _context2.finish(15);

            case 18:
            case "end":
              return _context2.stop();
          }
        }
      }, numericMatricesInRows, this, [[1, 12, 15, 18]]);
    })
  }, {
    key: "numericMatricesInColumns",
    value: /*#__PURE__*/regeneratorRuntime.mark(function numericMatricesInColumns(columnsSpan) {
      var _iterator9, _step9, _step9$value, mtxKey, mtx;

      return regeneratorRuntime.wrap(function numericMatricesInColumns$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _iterator9 = _createForOfIteratorHelper(this.matrixMapping.entries());
              _context3.prev = 1;

              _iterator9.s();

            case 3:
              if ((_step9 = _iterator9.n()).done) {
                _context3.next = 10;
                break;
              }

              _step9$value = _slicedToArray(_step9.value, 2), mtxKey = _step9$value[0], mtx = _step9$value[1];

              if (!(mtx.spansThroughSheetColumn(columnsSpan.sheet, columnsSpan.columnStart, columnsSpan.columnEnd) && !mtx.isFormula())) {
                _context3.next = 8;
                break;
              }

              _context3.next = 8;
              return [mtxKey, mtx];

            case 8:
              _context3.next = 3;
              break;

            case 10:
              _context3.next = 15;
              break;

            case 12:
              _context3.prev = 12;
              _context3.t0 = _context3["catch"](1);

              _iterator9.e(_context3.t0);

            case 15:
              _context3.prev = 15;

              _iterator9.f();

              return _context3.finish(15);

            case 18:
            case "end":
              return _context3.stop();
          }
        }
      }, numericMatricesInColumns, this, [[1, 12, 15, 18]]);
    })
  }, {
    key: "numericMatricesInRange",
    value: /*#__PURE__*/regeneratorRuntime.mark(function numericMatricesInRange(range) {
      var _iterator10, _step10, _step10$value, mtxKey, mtx;

      return regeneratorRuntime.wrap(function numericMatricesInRange$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              _iterator10 = _createForOfIteratorHelper(this.matrixMapping.entries());
              _context4.prev = 1;

              _iterator10.s();

            case 3:
              if ((_step10 = _iterator10.n()).done) {
                _context4.next = 10;
                break;
              }

              _step10$value = _slicedToArray(_step10.value, 2), mtxKey = _step10$value[0], mtx = _step10$value[1];

              if (!mtx.getRange().doesOverlap(range)) {
                _context4.next = 8;
                break;
              }

              _context4.next = 8;
              return [mtxKey, mtx];

            case 8:
              _context4.next = 3;
              break;

            case 10:
              _context4.next = 15;
              break;

            case 12:
              _context4.prev = 12;
              _context4.t0 = _context4["catch"](1);

              _iterator10.e(_context4.t0);

            case 15:
              _context4.prev = 15;

              _iterator10.f();

              return _context4.finish(15);

            case 18:
            case "end":
              return _context4.stop();
          }
        }
      }, numericMatricesInRange, this, [[1, 12, 15, 18]]);
    })
  }, {
    key: "truncateMatricesByRows",
    value: function truncateMatricesByRows(rowsSpan) {
      var verticesToRemove = Array();

      var _iterator11 = _createForOfIteratorHelper(this.numericMatricesInRows(rowsSpan)),
          _step11;

      try {
        for (_iterator11.s(); !(_step11 = _iterator11.n()).done;) {
          var _step11$value = _slicedToArray(_step11.value, 2),
              key = _step11$value[0],
              matrix = _step11$value[1];

          matrix.removeRows(rowsSpan);

          if (matrix.height === 0) {
            this.removeMatrix(key);
            verticesToRemove.push(matrix);
          }
        }
      } catch (err) {
        _iterator11.e(err);
      } finally {
        _iterator11.f();
      }

      return verticesToRemove;
    }
  }, {
    key: "truncateMatricesByColumns",
    value: function truncateMatricesByColumns(columnsSpan) {
      var verticesToRemove = Array();

      var _iterator12 = _createForOfIteratorHelper(this.numericMatricesInColumns(columnsSpan)),
          _step12;

      try {
        for (_iterator12.s(); !(_step12 = _iterator12.n()).done;) {
          var _step12$value = _slicedToArray(_step12.value, 2),
              key = _step12$value[0],
              matrix = _step12$value[1];

          matrix.removeColumns(columnsSpan);

          if (matrix.width === 0) {
            this.removeMatrix(key);
            verticesToRemove.push(matrix);
          }
        }
      } catch (err) {
        _iterator12.e(err);
      } finally {
        _iterator12.f();
      }

      return verticesToRemove;
    }
  }, {
    key: "destroy",
    value: function destroy() {
      this.matrixMapping.clear();
    }
  }]);

  return MatrixMapping;
}();