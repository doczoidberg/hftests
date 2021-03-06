import "core-js/modules/es.symbol";
import "core-js/modules/es.symbol.description";
import "core-js/modules/es.symbol.iterator";
import "core-js/modules/es.array.from";
import "core-js/modules/es.array.iterator";
import "core-js/modules/es.array.map";
import "core-js/modules/es.array.slice";
import "core-js/modules/es.function.name";
import "core-js/modules/es.object.assign";
import "core-js/modules/es.object.to-string";
import "core-js/modules/es.regexp.to-string";
import "core-js/modules/es.string.iterator";
import "core-js/modules/web.dom-collections.iterator";

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
import { CellError, ErrorType } from '../Cell';
import { AstNodeType, buildCellErrorAst, CellAddress } from '../parser';
export var Transformer = /*#__PURE__*/function () {
  function Transformer() {
    _classCallCheck(this, Transformer);
  }

  _createClass(Transformer, [{
    key: "performEagerTransformations",
    value: function performEagerTransformations(graph, parser) {
      var _iterator = _createForOfIteratorHelper(graph.matrixFormulaNodes()),
          _step;

      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var node = _step.value;

          var _this$transformSingle = this.transformSingleAst(node.getFormula(), node.getAddress()),
              _this$transformSingle2 = _slicedToArray(_this$transformSingle, 2),
              newAst = _this$transformSingle2[0],
              newAddress = _this$transformSingle2[1];

          var cachedAst = parser.rememberNewAst(newAst);
          node.setFormula(cachedAst);
          node.setAddress(newAddress);
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
    }
  }, {
    key: "transformSingleAst",
    value: function transformSingleAst(ast, address) {
      var newAst = this.transformAst(ast, address);
      var newAddress = this.fixNodeAddress(address);
      return [newAst, newAddress];
    }
  }, {
    key: "transformAst",
    value: function transformAst(ast, address) {
      var _this = this;

      switch (ast.type) {
        case AstNodeType.CELL_REFERENCE:
          {
            return this.transformCellReferenceAst(ast, address);
          }

        case AstNodeType.CELL_RANGE:
          {
            return this.transformCellRangeAst(ast, address);
          }

        case AstNodeType.COLUMN_RANGE:
          {
            return this.transformColumnRangeAst(ast, address);
          }

        case AstNodeType.ROW_RANGE:
          {
            return this.transformRowRangeAst(ast, address);
          }

        case AstNodeType.EMPTY:
        case AstNodeType.ERROR:
        case AstNodeType.NUMBER:
        case AstNodeType.NAMED_EXPRESSION:
        case AstNodeType.ERROR_WITH_RAW_INPUT:
        case AstNodeType.STRING:
          {
            return ast;
          }

        case AstNodeType.PERCENT_OP:
          {
            return Object.assign(Object.assign({}, ast), {
              type: ast.type,
              value: this.transformAst(ast.value, address)
            });
          }

        case AstNodeType.MINUS_UNARY_OP:
          {
            return Object.assign(Object.assign({}, ast), {
              type: ast.type,
              value: this.transformAst(ast.value, address)
            });
          }

        case AstNodeType.PLUS_UNARY_OP:
          {
            return Object.assign(Object.assign({}, ast), {
              type: ast.type,
              value: this.transformAst(ast.value, address)
            });
          }

        case AstNodeType.FUNCTION_CALL:
          {
            return Object.assign(Object.assign({}, ast), {
              type: ast.type,
              procedureName: ast.procedureName,
              args: ast.args.map(function (arg) {
                return _this.transformAst(arg, address);
              })
            });
          }

        case AstNodeType.PARENTHESIS:
          {
            return Object.assign(Object.assign({}, ast), {
              type: ast.type,
              expression: this.transformAst(ast.expression, address)
            });
          }

        default:
          {
            return Object.assign(Object.assign({}, ast), {
              type: ast.type,
              left: this.transformAst(ast.left, address),
              right: this.transformAst(ast.right, address)
            });
          }
      }
    }
  }, {
    key: "transformCellReferenceAst",
    value: function transformCellReferenceAst(ast, formulaAddress) {
      var newCellAddress = this.transformCellAddress(ast.reference, formulaAddress);

      if (newCellAddress instanceof CellAddress) {
        return Object.assign(Object.assign({}, ast), {
          reference: newCellAddress
        });
      } else if (newCellAddress === ErrorType.REF) {
        return buildCellErrorAst(new CellError(ErrorType.REF));
      } else {
        return ast;
      }
    }
  }, {
    key: "transformCellRangeAst",
    value: function transformCellRangeAst(ast, formulaAddress) {
      var newRange = this.transformCellRange(ast.start, ast.end, formulaAddress);

      if (Array.isArray(newRange)) {
        return Object.assign(Object.assign({}, ast), {
          start: newRange[0],
          end: newRange[1]
        });
      } else if (newRange === ErrorType.REF) {
        return buildCellErrorAst(new CellError(ErrorType.REF));
      } else {
        return ast;
      }
    }
  }, {
    key: "transformColumnRangeAst",
    value: function transformColumnRangeAst(ast, formulaAddress) {
      var newRange = this.transformColumnRange(ast.start, ast.end, formulaAddress);

      if (Array.isArray(newRange)) {
        return Object.assign(Object.assign({}, ast), {
          start: newRange[0],
          end: newRange[1]
        });
      } else if (newRange === ErrorType.REF) {
        return buildCellErrorAst(new CellError(ErrorType.REF));
      } else {
        return ast;
      }
    }
  }, {
    key: "transformRowRangeAst",
    value: function transformRowRangeAst(ast, formulaAddress) {
      var newRange = this.transformRowRange(ast.start, ast.end, formulaAddress);

      if (Array.isArray(newRange)) {
        return Object.assign(Object.assign({}, ast), {
          start: newRange[0],
          end: newRange[1]
        });
      } else if (newRange === ErrorType.REF) {
        return buildCellErrorAst(new CellError(ErrorType.REF));
      } else {
        return ast;
      }
    }
  }]);

  return Transformer;
}();