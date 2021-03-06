import "core-js/modules/es.symbol";
import "core-js/modules/es.symbol.description";
import "core-js/modules/es.symbol.iterator";
import "core-js/modules/es.array.concat";
import "core-js/modules/es.array.for-each";
import "core-js/modules/es.array.from";
import "core-js/modules/es.array.iterator";
import "core-js/modules/es.array.map";
import "core-js/modules/es.array.slice";
import "core-js/modules/es.function.name";
import "core-js/modules/es.object.to-string";
import "core-js/modules/es.regexp.to-string";
import "core-js/modules/es.set";
import "core-js/modules/es.string.iterator";
import "core-js/modules/web.dom-collections.for-each";
import "core-js/modules/web.dom-collections.iterator";
import "regenerator-runtime/runtime";

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e2) { throw _e2; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e3) { didErr = true; err = _e3; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 * @license
 * Copyright (c) 2020 Handsoncode. All rights reserved.
 */
import assert from 'assert';
import { AbsoluteCellRange } from '../AbsoluteCellRange';
import { absolutizeDependencies } from '../absolutizeDependencies';
import { CellError, EmptyValue, ErrorType, simpleCellAddress } from '../Cell';
import { collectDependencies, NamedExpressionDependency } from '../parser';
import { ColumnsSpan, RowsSpan } from '../Span';
import { StatType } from '../statistics';
import { EmptyCellVertex, FormulaCellVertex, MatrixVertex, RangeVertex, ValueCellVertex } from './';
import { AddressMapping } from './AddressMapping/AddressMapping';
import { collectAddressesDependentToMatrix } from './collectAddressesDependentToMatrix';
import { Graph } from './Graph';
import { MatrixMapping } from './MatrixMapping';
import { RangeMapping } from './RangeMapping';
import { SheetMapping } from './SheetMapping';
import { SimpleRangeValue } from '../interpreter/InterpreterValue';
export var DependencyGraph = /*#__PURE__*/function () {
  function DependencyGraph(addressMapping, rangeMapping, sheetMapping, matrixMapping, stats, lazilyTransformingAstService, functionRegistry, namedExpressions) {
    var _this = this;

    _classCallCheck(this, DependencyGraph);

    this.addressMapping = addressMapping;
    this.rangeMapping = rangeMapping;
    this.sheetMapping = sheetMapping;
    this.matrixMapping = matrixMapping;
    this.stats = stats;
    this.lazilyTransformingAstService = lazilyTransformingAstService;
    this.functionRegistry = functionRegistry;
    this.namedExpressions = namedExpressions;

    this.dependencyQueryAddresses = function (vertex) {
      if (vertex instanceof RangeVertex) {
        return _this.rangeDependencyQuery(vertex).map(function (_ref) {
          var _ref2 = _slicedToArray(_ref, 2),
              address = _ref2[0],
              _ = _ref2[1];

          return address;
        });
      } else {
        var dependenciesResult = _this.formulaDependencyQuery(vertex);

        if (dependenciesResult !== undefined) {
          var _dependenciesResult = _slicedToArray(dependenciesResult, 2),
              address = _dependenciesResult[0],
              dependencies = _dependenciesResult[1];

          return dependencies.map(function (dependency) {
            if (dependency instanceof NamedExpressionDependency) {
              var namedExpression = _this.namedExpressions.namedExpressionOrPlaceholder(dependency.name, address.sheet);

              return namedExpression.address;
            } else {
              return dependency;
            }
          });
        } else {
          return undefined;
        }
      }
    };

    this.dependencyQueryVertices = function (vertex) {
      if (vertex instanceof RangeVertex) {
        return _this.rangeDependencyQuery(vertex).map(function (_ref3) {
          var _ref4 = _slicedToArray(_ref3, 2),
              _ = _ref4[0],
              vertex = _ref4[1];

          return vertex;
        });
      } else {
        var dependenciesResult = _this.formulaDependencyQuery(vertex);

        if (dependenciesResult !== undefined) {
          var _dependenciesResult2 = _slicedToArray(dependenciesResult, 2),
              address = _dependenciesResult2[0],
              dependencies = _dependenciesResult2[1];

          return dependencies.map(function (dependency) {
            if (dependency instanceof AbsoluteCellRange) {
              return _this.rangeMapping.fetchRange(dependency.start, dependency.end);
            } else if (dependency instanceof NamedExpressionDependency) {
              var namedExpression = _this.namedExpressions.namedExpressionOrPlaceholder(dependency.name, address.sheet);

              return _this.addressMapping.fetchCell(namedExpression.address);
            } else {
              return _this.addressMapping.fetchCell(dependency);
            }
          });
        } else {
          return undefined;
        }
      }
    };

    this.rangeDependencyQuery = function (vertex) {
      var allDeps = [];

      var _this$rangeMapping$fi = _this.rangeMapping.findSmallerRange(vertex.range),
          smallerRangeVertex = _this$rangeMapping$fi.smallerRangeVertex,
          restRange = _this$rangeMapping$fi.restRange; //checking whether this range was splitted by bruteForce or not


      var range;

      if (smallerRangeVertex !== null && _this.graph.adjacentNodes(smallerRangeVertex).has(vertex)) {
        range = restRange;
        allDeps.push([new AbsoluteCellRange(smallerRangeVertex.start, smallerRangeVertex.end), smallerRangeVertex]);
      } else {
        //did we ever need to use full range
        range = vertex.range;
      }

      var _iterator = _createForOfIteratorHelper(range.addresses(_this)),
          _step;

      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var address = _step.value;

          var cell = _this.addressMapping.getCell(address);

          if (cell instanceof EmptyCellVertex) {
            cell.address = address;
          }

          if (cell !== null) {
            allDeps.push([address, cell]);
          }
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }

      return allDeps;
    };

    this.formulaDependencyQuery = function (vertex) {
      var formula;
      var address;

      if (vertex instanceof FormulaCellVertex) {
        address = vertex.getAddress(_this.lazilyTransformingAstService);
        formula = vertex.getFormula(_this.lazilyTransformingAstService);
      } else if (vertex instanceof MatrixVertex && vertex.isFormula()) {
        address = vertex.getAddress();
        formula = vertex.getFormula();
      } else {
        return undefined;
      }

      var deps = collectDependencies(formula, _this.functionRegistry);
      return [address, absolutizeDependencies(deps, address)];
    };

    this.graph = new Graph(this.dependencyQueryVertices);
  }
  /*
   * Invariants:
   * - empty cell has associated EmptyCellVertex if and only if it is a dependency (possibly indirect, through range) to some formula
   */


  _createClass(DependencyGraph, [{
    key: "setFormulaToCell",
    value: function setFormulaToCell(address, ast, dependencies, hasVolatileFunction, hasStructuralChangeFunction) {
      var vertex = this.addressMapping.getCell(address);
      this.ensureThatVertexIsNonMatrixCellVertex(vertex);
      var newVertex = new FormulaCellVertex(ast, address, this.lazilyTransformingAstService.version());
      this.exchangeOrAddGraphNode(vertex, newVertex);
      this.addressMapping.setCell(address, newVertex);
      this.processCellDependencies(dependencies, newVertex);
      this.graph.markNodeAsSpecialRecentlyChanged(newVertex);

      if (hasVolatileFunction) {
        this.markAsVolatile(newVertex);
      }

      if (hasStructuralChangeFunction) {
        this.markAsDependentOnStructureChange(newVertex);
      }

      this.correctInfiniteRangesDependency(address);
    }
  }, {
    key: "setParsingErrorToCell",
    value: function setParsingErrorToCell(address, errorVertex) {
      var vertex = this.addressMapping.getCell(address);
      this.ensureThatVertexIsNonMatrixCellVertex(vertex);
      this.exchangeOrAddGraphNode(vertex, errorVertex);
      this.addressMapping.setCell(address, errorVertex);
      this.graph.markNodeAsSpecialRecentlyChanged(errorVertex);
      this.correctInfiniteRangesDependency(address);
    }
  }, {
    key: "setValueToCell",
    value: function setValueToCell(address, newValue) {
      var vertex = this.addressMapping.getCell(address);
      this.ensureThatVertexIsNonMatrixCellVertex(vertex);

      if (vertex instanceof ValueCellVertex) {
        var oldValue = vertex.getCellValue();

        if (oldValue !== newValue) {
          vertex.setCellValue(newValue);
          this.graph.markNodeAsSpecialRecentlyChanged(vertex);
        }
      } else {
        var newVertex = new ValueCellVertex(newValue);
        this.exchangeOrAddGraphNode(vertex, newVertex);
        this.addressMapping.setCell(address, newVertex);
        this.graph.markNodeAsSpecialRecentlyChanged(newVertex);
      }

      this.correctInfiniteRangesDependency(address);
    }
  }, {
    key: "setCellEmpty",
    value: function setCellEmpty(address) {
      var vertex = this.addressMapping.getCell(address);

      if (vertex === null) {
        return;
      }

      this.ensureThatVertexIsNonMatrixCellVertex(vertex);

      if (this.graph.adjacentNodes(vertex).size > 0) {
        var emptyVertex = new EmptyCellVertex(address);
        this.exchangeGraphNode(vertex, emptyVertex);

        if (this.graph.adjacentNodesCount(emptyVertex) === 0) {
          this.removeVertex(emptyVertex);
          this.addressMapping.removeCell(address);
        } else {
          this.graph.markNodeAsSpecialRecentlyChanged(emptyVertex);
          this.addressMapping.setCell(address, emptyVertex);
        }
      } else {
        this.removeVertex(vertex);
        this.addressMapping.removeCell(address);
      }
    }
  }, {
    key: "ensureThatVertexIsNonMatrixCellVertex",
    value: function ensureThatVertexIsNonMatrixCellVertex(vertex) {
      assert.ok(!(vertex instanceof MatrixVertex), 'Illegal operation');
    }
  }, {
    key: "clearRecentlyChangedVertices",
    value: function clearRecentlyChangedVertices() {
      this.graph.clearSpecialNodesRecentlyChanged();
    }
  }, {
    key: "verticesToRecompute",
    value: function verticesToRecompute() {
      return new Set([].concat(_toConsumableArray(this.graph.specialNodesRecentlyChanged), _toConsumableArray(this.volatileVertices())));
    }
  }, {
    key: "processCellDependencies",
    value: function processCellDependencies(cellDependencies, endVertex) {
      var _this2 = this;

      cellDependencies.forEach(function (dep) {
        if (dep instanceof AbsoluteCellRange) {
          var range = dep;

          var rangeVertex = _this2.getRange(range.start, range.end);

          if (rangeVertex === undefined) {
            rangeVertex = new RangeVertex(range);

            _this2.rangeMapping.setRange(rangeVertex);
          }

          _this2.graph.addNode(rangeVertex);

          if (!range.isFinite()) {
            _this2.graph.markNodeAsInfiniteRange(rangeVertex);
          }

          var _this2$rangeMapping$f = _this2.rangeMapping.findSmallerRange(range),
              smallerRangeVertex = _this2$rangeMapping$f.smallerRangeVertex,
              restRange = _this2$rangeMapping$f.restRange;

          if (smallerRangeVertex) {
            _this2.graph.addEdge(smallerRangeVertex, rangeVertex);

            if (rangeVertex.bruteForce) {
              rangeVertex.bruteForce = false;

              var _iterator2 = _createForOfIteratorHelper(range.addresses(_this2)),
                  _step2;

              try {
                for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
                  var cellFromRange = _step2.value;

                  //if we ever switch heuristic to processing by sorted sizes, this would be unnecessary
                  _this2.graph.removeEdge(_this2.fetchCell(cellFromRange), rangeVertex);
                }
              } catch (err) {
                _iterator2.e(err);
              } finally {
                _iterator2.f();
              }
            }
          } else {
            rangeVertex.bruteForce = true;
          }

          var matrix = _this2.matrixMapping.getMatrix(restRange);

          if (matrix !== undefined) {
            _this2.graph.addEdge(matrix, rangeVertex);
          } else {
            var _iterator3 = _createForOfIteratorHelper(restRange.addresses(_this2)),
                _step3;

            try {
              for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
                var _cellFromRange = _step3.value;

                _this2.graph.addEdge(_this2.fetchCellOrCreateEmpty(_cellFromRange), rangeVertex);
              }
            } catch (err) {
              _iterator3.e(err);
            } finally {
              _iterator3.f();
            }
          }

          _this2.graph.addEdge(rangeVertex, endVertex);

          if (range.isFinite()) {
            _this2.correctInfiniteRangesDependenciesByRangeVertex(rangeVertex);
          }
        } else if (dep instanceof NamedExpressionDependency) {
          var sheetOfVertex = endVertex.getAddress(_this2.lazilyTransformingAstService).sheet;

          var namedExpressionVertex = _this2.fetchNamedExpressionVertex(dep.name, sheetOfVertex);

          _this2.graph.addEdge(namedExpressionVertex, endVertex);
        } else {
          _this2.graph.addEdge(_this2.fetchCellOrCreateEmpty(dep), endVertex);
        }
      });
    }
  }, {
    key: "fetchNamedExpressionVertex",
    value: function fetchNamedExpressionVertex(expressionName, sheetId) {
      var namedExpression = this.namedExpressions.namedExpressionOrPlaceholder(expressionName, sheetId);
      return this.fetchCellOrCreateEmpty(namedExpression.address);
    }
  }, {
    key: "exchangeNode",
    value: function exchangeNode(addressFrom, addressTo) {
      var vertexFrom = this.fetchCellOrCreateEmpty(addressFrom);
      var vertexTo = this.fetchCellOrCreateEmpty(addressTo);
      this.addressMapping.removeCell(addressFrom);
      this.exchangeGraphNode(vertexFrom, vertexTo);
    }
  }, {
    key: "correctInfiniteRangesDependenciesByRangeVertex",
    value: function correctInfiniteRangesDependenciesByRangeVertex(vertex) {
      var _iterator4 = _createForOfIteratorHelper(this.graph.infiniteRanges),
          _step4;

      try {
        for (_iterator4.s(); !(_step4 = _iterator4.n()).done;) {
          var range = _step4.value;
          var infiniteRangeVertex = range;
          var intersection = vertex.range.intersectionWith(infiniteRangeVertex.range);

          if (intersection === null) {
            continue;
          }

          var _iterator5 = _createForOfIteratorHelper(intersection.addresses(this)),
              _step5;

          try {
            for (_iterator5.s(); !(_step5 = _iterator5.n()).done;) {
              var address = _step5.value;
              this.graph.addEdge(this.fetchCellOrCreateEmpty(address), range);
            }
          } catch (err) {
            _iterator5.e(err);
          } finally {
            _iterator5.f();
          }
        }
      } catch (err) {
        _iterator4.e(err);
      } finally {
        _iterator4.f();
      }
    }
  }, {
    key: "correctInfiniteRangesDependency",
    value: function correctInfiniteRangesDependency(address) {
      var vertex = null;

      var _iterator6 = _createForOfIteratorHelper(this.graph.infiniteRanges),
          _step6;

      try {
        for (_iterator6.s(); !(_step6 = _iterator6.n()).done;) {
          var range = _step6.value;
          var infiniteRangeVertex = range;

          if (infiniteRangeVertex.range.addressInRange(address)) {
            vertex = vertex || this.fetchCellOrCreateEmpty(address);
            this.graph.addEdge(vertex, infiniteRangeVertex);
          }
        }
      } catch (err) {
        _iterator6.e(err);
      } finally {
        _iterator6.f();
      }
    }
  }, {
    key: "fetchCellOrCreateEmpty",
    value: function fetchCellOrCreateEmpty(address) {
      var vertex = this.addressMapping.getCell(address);

      if (!vertex) {
        vertex = new EmptyCellVertex(address);
        this.graph.addNode(vertex);
        this.addressMapping.setCell(address, vertex);
      }

      return vertex;
    }
  }, {
    key: "removeRows",
    value: function removeRows(removedRows) {
      var _this3 = this;

      if (this.matrixMapping.isFormulaMatrixInRows(removedRows)) {
        throw Error('It is not possible to remove row with matrix');
      }

      this.stats.measure(StatType.ADJUSTING_GRAPH, function () {
        var _iterator7 = _createForOfIteratorHelper(_this3.addressMapping.verticesFromRowsSpan(removedRows)),
            _step7;

        try {
          for (_iterator7.s(); !(_step7 = _iterator7.n()).done;) {
            var vertex = _step7.value;

            var _iterator8 = _createForOfIteratorHelper(_this3.graph.adjacentNodes(vertex)),
                _step8;

            try {
              for (_iterator8.s(); !(_step8 = _iterator8.n()).done;) {
                var adjacentNode = _step8.value;

                _this3.graph.markNodeAsSpecialRecentlyChanged(adjacentNode);
              }
            } catch (err) {
              _iterator8.e(err);
            } finally {
              _iterator8.f();
            }

            if (vertex instanceof MatrixVertex) {
              continue;
            }

            _this3.removeVertex(vertex);
          }
        } catch (err) {
          _iterator7.e(err);
        } finally {
          _iterator7.f();
        }
      });
      this.stats.measure(StatType.ADJUSTING_MATRIX_MAPPING, function () {
        _this3.truncateMatricesAfterRemovingRows(removedRows);
      });
      this.stats.measure(StatType.ADJUSTING_ADDRESS_MAPPING, function () {
        _this3.addressMapping.removeRows(removedRows);
      });
      this.stats.measure(StatType.ADJUSTING_RANGES, function () {
        _this3.truncateRanges(removedRows, function (address) {
          return address.row;
        });
      });
      this.addStructuralNodesToChangeSet();
    }
  }, {
    key: "removeSheet",
    value: function removeSheet(removedSheetId) {
      var _this4 = this;

      var matrices = new Set();

      var _iterator9 = _createForOfIteratorHelper(this.addressMapping.sheetEntries(removedSheetId)),
          _step9;

      try {
        for (_iterator9.s(); !(_step9 = _iterator9.n()).done;) {
          var _step9$value = _slicedToArray(_step9.value, 2),
              adr = _step9$value[0],
              vertex = _step9$value[1];

          if (vertex instanceof MatrixVertex) {
            if (matrices.has(vertex)) {
              continue;
            } else {
              matrices.add(vertex);
            }
          }

          var _iterator12 = _createForOfIteratorHelper(this.graph.adjacentNodes(vertex)),
              _step12;

          try {
            for (_iterator12.s(); !(_step12 = _iterator12.n()).done;) {
              var adjacentNode = _step12.value;
              this.graph.markNodeAsSpecialRecentlyChanged(adjacentNode);
            }
          } catch (err) {
            _iterator12.e(err);
          } finally {
            _iterator12.f();
          }

          this.removeVertex(vertex);
          this.addressMapping.removeCell(adr);
        }
      } catch (err) {
        _iterator9.e(err);
      } finally {
        _iterator9.f();
      }

      this.stats.measure(StatType.ADJUSTING_MATRIX_MAPPING, function () {
        var _iterator10 = _createForOfIteratorHelper(matrices.values()),
            _step10;

        try {
          for (_iterator10.s(); !(_step10 = _iterator10.n()).done;) {
            var matrix = _step10.value;

            _this4.matrixMapping.removeMatrix(matrix.getRange());
          }
        } catch (err) {
          _iterator10.e(err);
        } finally {
          _iterator10.f();
        }
      });
      this.stats.measure(StatType.ADJUSTING_RANGES, function () {
        var rangesToRemove = _this4.rangeMapping.removeRangesInSheet(removedSheetId);

        var _iterator11 = _createForOfIteratorHelper(rangesToRemove),
            _step11;

        try {
          for (_iterator11.s(); !(_step11 = _iterator11.n()).done;) {
            var range = _step11.value;

            _this4.removeVertex(range);
          }
        } catch (err) {
          _iterator11.e(err);
        } finally {
          _iterator11.f();
        }

        _this4.stats.measure(StatType.ADJUSTING_ADDRESS_MAPPING, function () {
          _this4.addressMapping.removeSheet(removedSheetId);
        });
      });
      this.addStructuralNodesToChangeSet();
    }
  }, {
    key: "clearSheet",
    value: function clearSheet(sheetId) {
      var matrices = new Set();

      var _iterator13 = _createForOfIteratorHelper(this.addressMapping.sheetEntries(sheetId)),
          _step13;

      try {
        for (_iterator13.s(); !(_step13 = _iterator13.n()).done;) {
          var _step13$value = _slicedToArray(_step13.value, 2),
              address = _step13$value[0],
              vertex = _step13$value[1];

          if (vertex instanceof MatrixVertex) {
            matrices.add(vertex);
          } else {
            this.setCellEmpty(address);
          }
        }
      } catch (err) {
        _iterator13.e(err);
      } finally {
        _iterator13.f();
      }

      var _iterator14 = _createForOfIteratorHelper(matrices.values()),
          _step14;

      try {
        for (_iterator14.s(); !(_step14 = _iterator14.n()).done;) {
          var matrix = _step14.value;
          this.setMatrixEmpty(matrix);
        }
      } catch (err) {
        _iterator14.e(err);
      } finally {
        _iterator14.f();
      }

      this.addStructuralNodesToChangeSet();
    }
  }, {
    key: "removeColumns",
    value: function removeColumns(removedColumns) {
      var _this5 = this;

      if (this.matrixMapping.isFormulaMatrixInColumns(removedColumns)) {
        throw Error('It is not possible to remove column within matrix');
      }

      this.stats.measure(StatType.ADJUSTING_GRAPH, function () {
        var _iterator15 = _createForOfIteratorHelper(_this5.addressMapping.verticesFromColumnsSpan(removedColumns)),
            _step15;

        try {
          for (_iterator15.s(); !(_step15 = _iterator15.n()).done;) {
            var vertex = _step15.value;

            var _iterator16 = _createForOfIteratorHelper(_this5.graph.adjacentNodes(vertex)),
                _step16;

            try {
              for (_iterator16.s(); !(_step16 = _iterator16.n()).done;) {
                var adjacentNode = _step16.value;

                _this5.graph.markNodeAsSpecialRecentlyChanged(adjacentNode);
              }
            } catch (err) {
              _iterator16.e(err);
            } finally {
              _iterator16.f();
            }

            if (vertex instanceof MatrixVertex) {
              continue;
            }

            _this5.removeVertex(vertex);
          }
        } catch (err) {
          _iterator15.e(err);
        } finally {
          _iterator15.f();
        }
      });
      this.stats.measure(StatType.ADJUSTING_MATRIX_MAPPING, function () {
        _this5.truncateMatricesAfterRemovingColumns(removedColumns);
      });
      this.stats.measure(StatType.ADJUSTING_ADDRESS_MAPPING, function () {
        _this5.addressMapping.removeColumns(removedColumns);
      });
      this.stats.measure(StatType.ADJUSTING_RANGES, function () {
        _this5.truncateRanges(removedColumns, function (address) {
          return address.col;
        });
      });
      this.addStructuralNodesToChangeSet();
    }
  }, {
    key: "addRows",
    value: function addRows(addedRows) {
      var _this6 = this;

      this.stats.measure(StatType.ADJUSTING_ADDRESS_MAPPING, function () {
        _this6.addressMapping.addRows(addedRows.sheet, addedRows.rowStart, addedRows.numberOfRows);
      });
      this.stats.measure(StatType.ADJUSTING_MATRIX_MAPPING, function () {
        _this6.expandMatricesAfterAddingRows(addedRows.sheet, addedRows.rowStart, addedRows.numberOfRows);
      });
      this.stats.measure(StatType.ADJUSTING_RANGES, function () {
        _this6.rangeMapping.moveAllRangesInSheetAfterRowByRows(addedRows.sheet, addedRows.rowStart, addedRows.numberOfRows);

        _this6.fixRangesWhenAddingRows(addedRows.sheet, addedRows.rowStart, addedRows.numberOfRows);
      });

      var _iterator17 = _createForOfIteratorHelper(this.addressMapping.verticesFromRowsSpan(addedRows)),
          _step17;

      try {
        for (_iterator17.s(); !(_step17 = _iterator17.n()).done;) {
          var vertex = _step17.value;
          this.graph.markNodeAsSpecialRecentlyChanged(vertex);
        }
      } catch (err) {
        _iterator17.e(err);
      } finally {
        _iterator17.f();
      }

      this.addStructuralNodesToChangeSet();
    }
  }, {
    key: "addColumns",
    value: function addColumns(addedColumns) {
      var _this7 = this;

      this.stats.measure(StatType.ADJUSTING_ADDRESS_MAPPING, function () {
        _this7.addressMapping.addColumns(addedColumns.sheet, addedColumns.columnStart, addedColumns.numberOfColumns);
      });
      this.stats.measure(StatType.ADJUSTING_MATRIX_MAPPING, function () {
        _this7.expandMatricesAfterAddingColumns(addedColumns.sheet, addedColumns.columnStart, addedColumns.numberOfColumns);
      });
      this.stats.measure(StatType.ADJUSTING_RANGES, function () {
        _this7.rangeMapping.moveAllRangesInSheetAfterColumnByColumns(addedColumns.sheet, addedColumns.columnStart, addedColumns.numberOfColumns);

        _this7.fixRangesWhenAddingColumns(addedColumns.sheet, addedColumns.columnStart, addedColumns.numberOfColumns);
      });

      var _iterator18 = _createForOfIteratorHelper(this.addressMapping.verticesFromColumnsSpan(addedColumns)),
          _step18;

      try {
        for (_iterator18.s(); !(_step18 = _iterator18.n()).done;) {
          var vertex = _step18.value;
          this.graph.markNodeAsSpecialRecentlyChanged(vertex);
        }
      } catch (err) {
        _iterator18.e(err);
      } finally {
        _iterator18.f();
      }

      this.addStructuralNodesToChangeSet();
    }
  }, {
    key: "ensureNoMatrixInRange",
    value: function ensureNoMatrixInRange(range) {
      if (this.matrixMapping.isFormulaMatrixInRange(range)) {
        throw Error('It is not possible to move / replace cells with matrix');
      }
    }
  }, {
    key: "moveCells",
    value: function moveCells(sourceRange, toRight, toBottom, toSheet) {
      var _iterator19 = _createForOfIteratorHelper(sourceRange.addressesWithDirection(toRight, toBottom, this)),
          _step19;

      try {
        for (_iterator19.s(); !(_step19 = _iterator19.n()).done;) {
          var sourceAddress = _step19.value;
          var targetAddress = simpleCellAddress(toSheet, sourceAddress.col + toRight, sourceAddress.row + toBottom);
          var sourceVertex = this.addressMapping.getCell(sourceAddress);
          var targetVertex = this.addressMapping.getCell(targetAddress);
          this.addressMapping.removeCell(sourceAddress);

          if (sourceVertex !== null) {
            this.graph.markNodeAsSpecialRecentlyChanged(sourceVertex);
            this.addressMapping.setCell(targetAddress, sourceVertex);
            var emptyVertex = null;

            var _iterator21 = _createForOfIteratorHelper(this.graph.adjacentNodes(sourceVertex)),
                _step21;

            try {
              for (_iterator21.s(); !(_step21 = _iterator21.n()).done;) {
                var adjacentNode = _step21.value;

                if (adjacentNode instanceof RangeVertex && !sourceRange.containsRange(adjacentNode.range)) {
                  emptyVertex = emptyVertex || this.fetchCellOrCreateEmpty(sourceAddress);
                  this.graph.addEdge(emptyVertex, adjacentNode);
                  this.graph.removeEdge(sourceVertex, adjacentNode);
                }
              }
            } catch (err) {
              _iterator21.e(err);
            } finally {
              _iterator21.f();
            }

            if (emptyVertex) {
              this.graph.markNodeAsSpecialRecentlyChanged(emptyVertex);
              this.addressMapping.setCell(sourceAddress, emptyVertex);
            }
          }

          if (targetVertex !== null) {
            if (sourceVertex === null) {
              this.addressMapping.removeCell(targetAddress);
            }

            var _iterator22 = _createForOfIteratorHelper(this.graph.adjacentNodes(targetVertex)),
                _step22;

            try {
              for (_iterator22.s(); !(_step22 = _iterator22.n()).done;) {
                var _adjacentNode = _step22.value;
                sourceVertex = sourceVertex !== null && sourceVertex !== void 0 ? sourceVertex : this.fetchCellOrCreateEmpty(targetAddress);
                this.graph.addEdge(sourceVertex, _adjacentNode);
                this.graph.markNodeAsSpecialRecentlyChanged(sourceVertex);
              }
            } catch (err) {
              _iterator22.e(err);
            } finally {
              _iterator22.f();
            }

            this.removeVertex(targetVertex);
          }
        }
      } catch (err) {
        _iterator19.e(err);
      } finally {
        _iterator19.f();
      }

      var _iterator20 = _createForOfIteratorHelper(this.rangeMapping.rangeVerticesContainedInRange(sourceRange)),
          _step20;

      try {
        for (_iterator20.s(); !(_step20 = _iterator20.n()).done;) {
          var rangeVertex = _step20.value;

          var _iterator23 = _createForOfIteratorHelper(this.graph.adjacentNodes(rangeVertex)),
              _step23;

          try {
            for (_iterator23.s(); !(_step23 = _iterator23.n()).done;) {
              var _adjacentNode2 = _step23.value;

              if (_adjacentNode2 instanceof RangeVertex && !sourceRange.containsRange(_adjacentNode2.range)) {
                this.graph.removeEdge(rangeVertex, _adjacentNode2);

                var _iterator24 = _createForOfIteratorHelper(rangeVertex.range.addresses(this)),
                    _step24;

                try {
                  for (_iterator24.s(); !(_step24 = _iterator24.n()).done;) {
                    var address = _step24.value;
                    var newEmptyVertex = this.fetchCellOrCreateEmpty(address);
                    this.graph.addEdge(newEmptyVertex, _adjacentNode2);
                    this.addressMapping.setCell(address, newEmptyVertex);
                    this.graph.markNodeAsSpecialRecentlyChanged(newEmptyVertex);
                  }
                } catch (err) {
                  _iterator24.e(err);
                } finally {
                  _iterator24.f();
                }
              }
            }
          } catch (err) {
            _iterator23.e(err);
          } finally {
            _iterator23.f();
          }
        }
      } catch (err) {
        _iterator20.e(err);
      } finally {
        _iterator20.f();
      }

      this.rangeMapping.moveRangesInsideSourceRange(sourceRange, toRight, toBottom, toSheet);
    }
  }, {
    key: "disableNumericMatrices",
    value: function disableNumericMatrices() {
      var _iterator25 = _createForOfIteratorHelper(this.matrixMapping.numericMatrices()),
          _step25;

      try {
        for (_iterator25.s(); !(_step25 = _iterator25.n()).done;) {
          var _step25$value = _slicedToArray(_step25.value, 2),
              _ = _step25$value[0],
              matrixVertex = _step25$value[1];

          this.breakNumericMatrix(matrixVertex);
        }
      } catch (err) {
        _iterator25.e(err);
      } finally {
        _iterator25.f();
      }
    }
  }, {
    key: "breakNumericMatricesInRange",
    value: function breakNumericMatricesInRange(range) {
      var _iterator26 = _createForOfIteratorHelper(this.matrixMapping.numericMatricesInRange(range)),
          _step26;

      try {
        for (_iterator26.s(); !(_step26 = _iterator26.n()).done;) {
          var _step26$value = _slicedToArray(_step26.value, 2),
              _ = _step26$value[0],
              matrix = _step26$value[1];

          this.breakNumericMatrix(matrix);
        }
      } catch (err) {
        _iterator26.e(err);
      } finally {
        _iterator26.f();
      }
    }
  }, {
    key: "breakNumericMatrix",
    value: function breakNumericMatrix(matrixVertex) {
      var matrixRange = AbsoluteCellRange.spanFrom(matrixVertex.getAddress(), matrixVertex.width, matrixVertex.height);
      var adjacentNodes = this.graph.adjacentNodes(matrixVertex);

      var _iterator27 = _createForOfIteratorHelper(matrixRange.addresses(this)),
          _step27;

      try {
        for (_iterator27.s(); !(_step27 = _iterator27.n()).done;) {
          var address = _step27.value;
          var value = this.getCellValue(address); // We wouldn't need that typecast if we would take values from Matrix

          var valueVertex = new ValueCellVertex(value);
          this.addVertex(address, valueVertex);
        }
      } catch (err) {
        _iterator27.e(err);
      } finally {
        _iterator27.f();
      }

      var _iterator28 = _createForOfIteratorHelper(adjacentNodes.values()),
          _step28;

      try {
        for (_iterator28.s(); !(_step28 = _iterator28.n()).done;) {
          var adjacentNode = _step28.value;
          var nodeDependencies = collectAddressesDependentToMatrix(this.functionRegistry, adjacentNode, matrixVertex, this.lazilyTransformingAstService, this);

          var _iterator29 = _createForOfIteratorHelper(nodeDependencies),
              _step29;

          try {
            for (_iterator29.s(); !(_step29 = _iterator29.n()).done;) {
              var _address = _step29.value;
              var vertex = this.fetchCell(_address);
              this.graph.addEdge(vertex, adjacentNode);
            }
          } catch (err) {
            _iterator29.e(err);
          } finally {
            _iterator29.f();
          }
        }
      } catch (err) {
        _iterator28.e(err);
      } finally {
        _iterator28.f();
      }

      this.removeVertex(matrixVertex);
      this.matrixMapping.removeMatrix(matrixVertex.getRange());
    }
  }, {
    key: "setMatrixEmpty",
    value: function setMatrixEmpty(matrixVertex) {
      var matrixRange = AbsoluteCellRange.spanFrom(matrixVertex.getAddress(), matrixVertex.width, matrixVertex.height);
      var adjacentNodes = this.graph.adjacentNodes(matrixVertex);

      var _iterator30 = _createForOfIteratorHelper(matrixRange.addresses(this)),
          _step30;

      try {
        for (_iterator30.s(); !(_step30 = _iterator30.n()).done;) {
          var address = _step30.value;
          this.addressMapping.removeCell(address);
        }
      } catch (err) {
        _iterator30.e(err);
      } finally {
        _iterator30.f();
      }

      var _iterator31 = _createForOfIteratorHelper(adjacentNodes.values()),
          _step31;

      try {
        for (_iterator31.s(); !(_step31 = _iterator31.n()).done;) {
          var adjacentNode = _step31.value;
          var nodeDependencies = collectAddressesDependentToMatrix(this.functionRegistry, adjacentNode, matrixVertex, this.lazilyTransformingAstService, this);

          var _iterator32 = _createForOfIteratorHelper(nodeDependencies),
              _step32;

          try {
            for (_iterator32.s(); !(_step32 = _iterator32.n()).done;) {
              var _address2 = _step32.value;
              var vertex = this.fetchCellOrCreateEmpty(_address2);
              this.graph.addEdge(vertex, adjacentNode);
            }
          } catch (err) {
            _iterator32.e(err);
          } finally {
            _iterator32.f();
          }

          if (nodeDependencies.length > 0) {
            this.graph.markNodeAsSpecialRecentlyChanged(adjacentNode);
          }
        }
      } catch (err) {
        _iterator31.e(err);
      } finally {
        _iterator31.f();
      }

      this.removeVertex(matrixVertex);
      this.matrixMapping.removeMatrix(matrixVertex.getRange());
    }
  }, {
    key: "addVertex",
    value: function addVertex(address, vertex) {
      this.graph.addNode(vertex);
      this.setVertexAddress(address, vertex);
    }
  }, {
    key: "addMatrixVertex",
    value: function addMatrixVertex(address, vertex) {
      this.graph.addNode(vertex);
      this.setAddressMappingForMatrixVertex(vertex, address);
    }
  }, {
    key: "addNewMatrixVertex",
    value: function addNewMatrixVertex(matrixVertex) {
      var range = AbsoluteCellRange.spanFrom(matrixVertex.getAddress(), matrixVertex.width, matrixVertex.height);

      var _iterator33 = _createForOfIteratorHelper(this.verticesFromRange(range)),
          _step33;

      try {
        for (_iterator33.s(); !(_step33 = _iterator33.n()).done;) {
          var vertex = _step33.value;

          if (vertex instanceof MatrixVertex) {
            throw Error('You cannot modify only part of an array');
          }
        }
      } catch (err) {
        _iterator33.e(err);
      } finally {
        _iterator33.f();
      }

      this.setMatrix(range, matrixVertex);

      var _iterator34 = _createForOfIteratorHelper(this.entriesFromRange(range)),
          _step34;

      try {
        for (_iterator34.s(); !(_step34 = _iterator34.n()).done;) {
          var _step34$value = _slicedToArray(_step34.value, 2),
              address = _step34$value[0],
              _vertex = _step34$value[1];

          if (_vertex) {
            this.exchangeGraphNode(_vertex, matrixVertex);
          }

          this.setVertexAddress(address, matrixVertex);
        }
      } catch (err) {
        _iterator34.e(err);
      } finally {
        _iterator34.f();
      }
    }
  }, {
    key: "matrixFormulaNodes",
    value: /*#__PURE__*/regeneratorRuntime.mark(function matrixFormulaNodes() {
      var _iterator35, _step35, vertex;

      return regeneratorRuntime.wrap(function matrixFormulaNodes$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _iterator35 = _createForOfIteratorHelper(this.graph.nodes);
              _context.prev = 1;

              _iterator35.s();

            case 3:
              if ((_step35 = _iterator35.n()).done) {
                _context.next = 10;
                break;
              }

              vertex = _step35.value;

              if (!(vertex instanceof MatrixVertex && vertex.isFormula())) {
                _context.next = 8;
                break;
              }

              _context.next = 8;
              return vertex;

            case 8:
              _context.next = 3;
              break;

            case 10:
              _context.next = 15;
              break;

            case 12:
              _context.prev = 12;
              _context.t0 = _context["catch"](1);

              _iterator35.e(_context.t0);

            case 15:
              _context.prev = 15;

              _iterator35.f();

              return _context.finish(15);

            case 18:
            case "end":
              return _context.stop();
          }
        }
      }, matrixFormulaNodes, this, [[1, 12, 15, 18]]);
    })
  }, {
    key: "entriesFromRowsSpan",
    value: /*#__PURE__*/regeneratorRuntime.mark(function entriesFromRowsSpan(rowsSpan) {
      return regeneratorRuntime.wrap(function entriesFromRowsSpan$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              return _context2.delegateYield(this.addressMapping.entriesFromRowsSpan(rowsSpan), "t0", 1);

            case 1:
            case "end":
              return _context2.stop();
          }
        }
      }, entriesFromRowsSpan, this);
    })
  }, {
    key: "entriesFromColumnsSpan",
    value: /*#__PURE__*/regeneratorRuntime.mark(function entriesFromColumnsSpan(columnsSpan) {
      return regeneratorRuntime.wrap(function entriesFromColumnsSpan$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              return _context3.delegateYield(this.addressMapping.entriesFromColumnsSpan(columnsSpan), "t0", 1);

            case 1:
            case "end":
              return _context3.stop();
          }
        }
      }, entriesFromColumnsSpan, this);
    })
  }, {
    key: "existsVertex",
    value: function existsVertex(address) {
      return this.addressMapping.has(address);
    }
  }, {
    key: "fetchCell",
    value: function fetchCell(address) {
      return this.addressMapping.fetchCell(address);
    }
  }, {
    key: "getCell",
    value: function getCell(address) {
      return this.addressMapping.getCell(address);
    }
  }, {
    key: "getCellValue",
    value: function getCellValue(address) {
      return this.addressMapping.getCellValue(address);
    }
  }, {
    key: "getScalarValue",
    value: function getScalarValue(address) {
      var value = this.addressMapping.getCellValue(address);

      if (value instanceof SimpleRangeValue) {
        return new CellError(ErrorType.VALUE);
      }

      return value;
    }
  }, {
    key: "setVertexAddress",
    value: function setVertexAddress(address, vertex) {
      this.addressMapping.setCell(address, vertex);
    }
  }, {
    key: "existsEdge",
    value: function existsEdge(fromNode, toNode) {
      return this.graph.existsEdge(fromNode, toNode);
    }
  }, {
    key: "getSheetId",
    value: function getSheetId(sheetName) {
      return this.sheetMapping.fetch(sheetName);
    }
  }, {
    key: "getSheetName",
    value: function getSheetName(sheetId) {
      return this.sheetMapping.fetchDisplayName(sheetId);
    }
  }, {
    key: "getSheetHeight",
    value: function getSheetHeight(sheet) {
      return this.addressMapping.getHeight(sheet);
    }
  }, {
    key: "getSheetWidth",
    value: function getSheetWidth(sheet) {
      return this.addressMapping.getWidth(sheet);
    }
  }, {
    key: "getMatrix",
    value: function getMatrix(range) {
      return this.matrixMapping.getMatrix(range);
    }
  }, {
    key: "setMatrix",
    value: function setMatrix(range, vertex) {
      this.matrixMapping.setMatrix(range, vertex);
    }
  }, {
    key: "getRange",
    value: function getRange(start, end) {
      return this.rangeMapping.getRange(start, end);
    }
  }, {
    key: "topSortWithScc",
    value: function topSortWithScc() {
      return this.graph.topSortWithScc();
    }
  }, {
    key: "markAsVolatile",
    value: function markAsVolatile(vertex) {
      this.graph.markNodeAsSpecial(vertex);
    }
  }, {
    key: "markAsDependentOnStructureChange",
    value: function markAsDependentOnStructureChange(vertex) {
      this.graph.markNodeAsChangingWithStructure(vertex);
    }
  }, {
    key: "forceApplyPostponedTransformations",
    value: function forceApplyPostponedTransformations() {
      var _iterator36 = _createForOfIteratorHelper(this.graph.nodes.values()),
          _step36;

      try {
        for (_iterator36.s(); !(_step36 = _iterator36.n()).done;) {
          var vertex = _step36.value;

          if (vertex instanceof FormulaCellVertex) {
            vertex.ensureRecentData(this.lazilyTransformingAstService);
          }
        }
      } catch (err) {
        _iterator36.e(err);
      } finally {
        _iterator36.f();
      }
    }
  }, {
    key: "volatileVertices",
    value: function volatileVertices() {
      return this.graph.specialNodes;
    }
  }, {
    key: "destroy",
    value: function destroy() {
      this.graph.destroy();
      this.addressMapping.destroy();
      this.rangeMapping.destroy();
      this.sheetMapping.destroy();
      this.matrixMapping.destroy();
    }
  }, {
    key: "verticesFromRange",
    value: /*#__PURE__*/regeneratorRuntime.mark(function verticesFromRange(range) {
      var _iterator37, _step37, address, vertex;

      return regeneratorRuntime.wrap(function verticesFromRange$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              _iterator37 = _createForOfIteratorHelper(range.addresses(this));
              _context4.prev = 1;

              _iterator37.s();

            case 3:
              if ((_step37 = _iterator37.n()).done) {
                _context4.next = 11;
                break;
              }

              address = _step37.value;
              vertex = this.getCell(address);

              if (!vertex) {
                _context4.next = 9;
                break;
              }

              _context4.next = 9;
              return vertex;

            case 9:
              _context4.next = 3;
              break;

            case 11:
              _context4.next = 16;
              break;

            case 13:
              _context4.prev = 13;
              _context4.t0 = _context4["catch"](1);

              _iterator37.e(_context4.t0);

            case 16:
              _context4.prev = 16;

              _iterator37.f();

              return _context4.finish(16);

            case 19:
            case "end":
              return _context4.stop();
          }
        }
      }, verticesFromRange, this, [[1, 13, 16, 19]]);
    })
  }, {
    key: "valuesFromRange",
    value: /*#__PURE__*/regeneratorRuntime.mark(function valuesFromRange(range) {
      var _iterator38, _step38, address, value;

      return regeneratorRuntime.wrap(function valuesFromRange$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              _iterator38 = _createForOfIteratorHelper(range.addresses(this));
              _context5.prev = 1;

              _iterator38.s();

            case 3:
              if ((_step38 = _iterator38.n()).done) {
                _context5.next = 11;
                break;
              }

              address = _step38.value;
              value = this.getScalarValue(address);

              if (!(value !== EmptyValue)) {
                _context5.next = 9;
                break;
              }

              _context5.next = 9;
              return [value, address];

            case 9:
              _context5.next = 3;
              break;

            case 11:
              _context5.next = 16;
              break;

            case 13:
              _context5.prev = 13;
              _context5.t0 = _context5["catch"](1);

              _iterator38.e(_context5.t0);

            case 16:
              _context5.prev = 16;

              _iterator38.f();

              return _context5.finish(16);

            case 19:
            case "end":
              return _context5.stop();
          }
        }
      }, valuesFromRange, this, [[1, 13, 16, 19]]);
    })
  }, {
    key: "entriesFromRange",
    value: /*#__PURE__*/regeneratorRuntime.mark(function entriesFromRange(range) {
      var _iterator39, _step39, address;

      return regeneratorRuntime.wrap(function entriesFromRange$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              _iterator39 = _createForOfIteratorHelper(range.addresses(this));
              _context6.prev = 1;

              _iterator39.s();

            case 3:
              if ((_step39 = _iterator39.n()).done) {
                _context6.next = 9;
                break;
              }

              address = _step39.value;
              _context6.next = 7;
              return [address, this.getCell(address)];

            case 7:
              _context6.next = 3;
              break;

            case 9:
              _context6.next = 14;
              break;

            case 11:
              _context6.prev = 11;
              _context6.t0 = _context6["catch"](1);

              _iterator39.e(_context6.t0);

            case 14:
              _context6.prev = 14;

              _iterator39.f();

              return _context6.finish(14);

            case 17:
            case "end":
              return _context6.stop();
          }
        }
      }, entriesFromRange, this, [[1, 11, 14, 17]]);
    })
  }, {
    key: "exchangeGraphNode",
    value: function exchangeGraphNode(oldNode, newNode) {
      var _this8 = this;

      this.graph.addNode(newNode);
      var adjNodesStored = this.graph.adjacentNodes(oldNode);
      this.removeVertex(oldNode);
      adjNodesStored.forEach(function (adjacentNode) {
        if (_this8.graph.hasNode(adjacentNode)) {
          _this8.graph.addEdge(newNode, adjacentNode);
        }
      });
    }
  }, {
    key: "exchangeOrAddGraphNode",
    value: function exchangeOrAddGraphNode(oldNode, newNode) {
      if (oldNode) {
        this.exchangeGraphNode(oldNode, newNode);
      } else {
        this.graph.addNode(newNode);
      }
    }
  }, {
    key: "addStructuralNodesToChangeSet",
    value: function addStructuralNodesToChangeSet() {
      var _iterator40 = _createForOfIteratorHelper(this.graph.specialNodesStructuralChanges),
          _step40;

      try {
        for (_iterator40.s(); !(_step40 = _iterator40.n()).done;) {
          var vertex = _step40.value;
          this.graph.markNodeAsSpecialRecentlyChanged(vertex);
        }
      } catch (err) {
        _iterator40.e(err);
      } finally {
        _iterator40.f();
      }
    }
  }, {
    key: "fixRangesWhenAddingRows",
    value: function fixRangesWhenAddingRows(sheet, row, numberOfRows) {
      var originalValues = Array.from(this.rangeMapping.rangesInSheet(sheet));

      for (var _i2 = 0, _originalValues = originalValues; _i2 < _originalValues.length; _i2++) {
        var rangeVertex = _originalValues[_i2];

        if (rangeVertex.range.includesRow(row + numberOfRows)) {
          if (rangeVertex.bruteForce) {
            var addedSubrangeInThatRange = rangeVertex.range.rangeWithSameWidth(row, numberOfRows);

            var _iterator41 = _createForOfIteratorHelper(addedSubrangeInThatRange.addresses(this)),
                _step41;

            try {
              for (_iterator41.s(); !(_step41 = _iterator41.n()).done;) {
                var address = _step41.value;
                this.graph.addEdge(this.fetchCellOrCreateEmpty(address), rangeVertex);
              }
            } catch (err) {
              _iterator41.e(err);
            } finally {
              _iterator41.f();
            }
          } else {
            var currentRangeVertex = rangeVertex;
            var find = this.rangeMapping.findSmallerRange(currentRangeVertex.range);

            if (find.smallerRangeVertex !== null) {
              continue;
            }

            while (find.smallerRangeVertex === null) {
              var newRangeVertex = new RangeVertex(AbsoluteCellRange.spanFrom(currentRangeVertex.range.start, currentRangeVertex.range.width(), currentRangeVertex.range.height() - 1));
              this.rangeMapping.setRange(newRangeVertex);
              this.graph.addNode(newRangeVertex);
              var restRange = new AbsoluteCellRange(simpleCellAddress(currentRangeVertex.range.start.sheet, currentRangeVertex.range.start.col, currentRangeVertex.range.end.row), currentRangeVertex.range.end);
              this.addAllFromRange(restRange, currentRangeVertex);
              this.graph.addEdge(newRangeVertex, currentRangeVertex);
              currentRangeVertex = newRangeVertex;
              find = this.rangeMapping.findSmallerRange(currentRangeVertex.range);
            }

            this.graph.addEdge(find.smallerRangeVertex, currentRangeVertex);
            this.addAllFromRange(find.restRange, currentRangeVertex);
            this.graph.removeEdge(find.smallerRangeVertex, rangeVertex);
          }
        }
      }
    }
  }, {
    key: "addAllFromRange",
    value: function addAllFromRange(range, vertex) {
      var _iterator42 = _createForOfIteratorHelper(range.addresses(this)),
          _step42;

      try {
        for (_iterator42.s(); !(_step42 = _iterator42.n()).done;) {
          var address = _step42.value;
          this.graph.addEdge(this.fetchCellOrCreateEmpty(address), vertex);
        }
      } catch (err) {
        _iterator42.e(err);
      } finally {
        _iterator42.f();
      }
    }
  }, {
    key: "fixRangesWhenAddingColumns",
    value: function fixRangesWhenAddingColumns(sheet, column, numberOfColumns) {
      var _iterator43 = _createForOfIteratorHelper(this.rangeMapping.rangesInSheet(sheet)),
          _step43;

      try {
        for (_iterator43.s(); !(_step43 = _iterator43.n()).done;) {
          var rangeVertex = _step43.value;

          if (rangeVertex.range.includesColumn(column + numberOfColumns)) {
            var subrange = void 0;

            if (rangeVertex.bruteForce) {
              subrange = rangeVertex.range.rangeWithSameHeight(column, numberOfColumns);
            } else {
              subrange = AbsoluteCellRange.spanFrom(simpleCellAddress(sheet, column, rangeVertex.range.end.row), numberOfColumns, 1);
            }

            var _iterator44 = _createForOfIteratorHelper(subrange.addresses(this)),
                _step44;

            try {
              for (_iterator44.s(); !(_step44 = _iterator44.n()).done;) {
                var address = _step44.value;
                this.graph.addEdge(this.fetchCellOrCreateEmpty(address), rangeVertex);
              }
            } catch (err) {
              _iterator44.e(err);
            } finally {
              _iterator44.f();
            }
          }
        }
      } catch (err) {
        _iterator43.e(err);
      } finally {
        _iterator43.f();
      }
    }
  }, {
    key: "setAddressMappingForMatrixVertex",
    value: function setAddressMappingForMatrixVertex(vertex, formulaAddress) {
      this.setVertexAddress(formulaAddress, vertex);

      if (!(vertex instanceof MatrixVertex)) {
        return;
      }

      var range = AbsoluteCellRange.spanFrom(formulaAddress, vertex.width, vertex.height);
      this.setMatrix(range, vertex);

      var _iterator45 = _createForOfIteratorHelper(range.addresses(this)),
          _step45;

      try {
        for (_iterator45.s(); !(_step45 = _iterator45.n()).done;) {
          var address = _step45.value;
          this.setVertexAddress(address, vertex);
        }
      } catch (err) {
        _iterator45.e(err);
      } finally {
        _iterator45.f();
      }
    }
  }, {
    key: "truncateMatricesAfterRemovingRows",
    value: function truncateMatricesAfterRemovingRows(removedRows) {
      var _this9 = this;

      var verticesToRemove = this.matrixMapping.truncateMatricesByRows(removedRows);
      verticesToRemove.forEach(function (vertex) {
        _this9.removeVertex(vertex);
      });
    }
  }, {
    key: "truncateRanges",
    value: function truncateRanges(span, coordinate) {
      var _this$rangeMapping$tr = this.rangeMapping.truncateRanges(span, coordinate),
          verticesToRemove = _this$rangeMapping$tr.verticesToRemove,
          verticesToMerge = _this$rangeMapping$tr.verticesToMerge;

      var _iterator46 = _createForOfIteratorHelper(verticesToMerge),
          _step46;

      try {
        for (_iterator46.s(); !(_step46 = _iterator46.n()).done;) {
          var _step46$value = _slicedToArray(_step46.value, 2),
              existingVertex = _step46$value[0],
              mergedVertex = _step46$value[1];

          this.mergeRangeVertices(existingVertex, mergedVertex);
        }
      } catch (err) {
        _iterator46.e(err);
      } finally {
        _iterator46.f();
      }

      var _iterator47 = _createForOfIteratorHelper(verticesToRemove),
          _step47;

      try {
        for (_iterator47.s(); !(_step47 = _iterator47.n()).done;) {
          var rangeVertex = _step47.value;
          this.removeVertexAndCleanupDependencies(rangeVertex);
        }
      } catch (err) {
        _iterator47.e(err);
      } finally {
        _iterator47.f();
      }
    }
  }, {
    key: "truncateMatricesAfterRemovingColumns",
    value: function truncateMatricesAfterRemovingColumns(removedColumns) {
      var _this10 = this;

      var verticesToRemove = this.matrixMapping.truncateMatricesByColumns(removedColumns);
      verticesToRemove.forEach(function (vertex) {
        _this10.removeVertex(vertex);
      });
    }
  }, {
    key: "expandMatricesAfterAddingRows",
    value: function expandMatricesAfterAddingRows(sheet, rowStart, numberOfRows) {
      var _iterator48 = _createForOfIteratorHelper(this.matrixMapping.numericMatricesInRows(RowsSpan.fromRowStartAndEnd(sheet, rowStart, rowStart))),
          _step48;

      try {
        for (_iterator48.s(); !(_step48 = _iterator48.n()).done;) {
          var _step48$value = _slicedToArray(_step48.value, 2),
              matrix = _step48$value[1];

          matrix.addRows(sheet, rowStart, numberOfRows);
          var addedRange = AbsoluteCellRange.spanFrom(simpleCellAddress(sheet, matrix.getAddress().col, rowStart), matrix.width, numberOfRows);

          var _iterator49 = _createForOfIteratorHelper(addedRange.addresses(this)),
              _step49;

          try {
            for (_iterator49.s(); !(_step49 = _iterator49.n()).done;) {
              var address = _step49.value;
              this.addressMapping.setCell(address, matrix);
            }
          } catch (err) {
            _iterator49.e(err);
          } finally {
            _iterator49.f();
          }
        }
      } catch (err) {
        _iterator48.e(err);
      } finally {
        _iterator48.f();
      }
    }
  }, {
    key: "expandMatricesAfterAddingColumns",
    value: function expandMatricesAfterAddingColumns(sheet, columnStart, numberOfColumns) {
      var _iterator50 = _createForOfIteratorHelper(this.matrixMapping.numericMatricesInColumns(ColumnsSpan.fromColumnStartAndEnd(sheet, columnStart, columnStart))),
          _step50;

      try {
        for (_iterator50.s(); !(_step50 = _iterator50.n()).done;) {
          var _step50$value = _slicedToArray(_step50.value, 2),
              matrix = _step50$value[1];

          matrix.addColumns(sheet, columnStart, numberOfColumns);
          var addedRange = AbsoluteCellRange.spanFrom(simpleCellAddress(sheet, columnStart, matrix.getAddress().row), numberOfColumns, matrix.height);

          var _iterator51 = _createForOfIteratorHelper(addedRange.addresses(this)),
              _step51;

          try {
            for (_iterator51.s(); !(_step51 = _iterator51.n()).done;) {
              var address = _step51.value;
              this.addressMapping.setCell(address, matrix);
            }
          } catch (err) {
            _iterator51.e(err);
          } finally {
            _iterator51.f();
          }
        }
      } catch (err) {
        _iterator50.e(err);
      } finally {
        _iterator50.f();
      }
    }
  }, {
    key: "removeVertex",
    value: function removeVertex(vertex) {
      this.removeVertexAndCleanupDependencies(vertex);

      if (vertex instanceof RangeVertex) {
        this.rangeMapping.removeRange(vertex);
      }
    }
  }, {
    key: "mergeRangeVertices",
    value: function mergeRangeVertices(existingVertex, newVertex) {
      var _this11 = this;

      var adjNodesStored = this.graph.adjacentNodes(newVertex);
      this.removeVertexAndCleanupDependencies(newVertex);
      this.graph.softRemoveEdge(existingVertex, newVertex);
      adjNodesStored.forEach(function (adjacentNode) {
        if (_this11.graph.hasNode(adjacentNode)) {
          _this11.graph.addEdge(existingVertex, adjacentNode);
        }
      });
    }
  }, {
    key: "removeVertexAndCleanupDependencies",
    value: function removeVertexAndCleanupDependencies(vertex) {
      var dependencies = new Set(this.graph.removeNode(vertex));

      while (dependencies.size > 0) {
        var _vertex2 = dependencies.values().next().value;
        dependencies.delete(_vertex2);

        if (this.graph.hasNode(_vertex2) && this.graph.adjacentNodesCount(_vertex2) === 0) {
          if (_vertex2 instanceof RangeVertex || _vertex2 instanceof EmptyCellVertex) {
            this.graph.removeNode(_vertex2).forEach(function (candidate) {
              return dependencies.add(candidate);
            });
          }

          if (_vertex2 instanceof RangeVertex) {
            this.rangeMapping.removeRange(_vertex2);
          } else if (_vertex2 instanceof EmptyCellVertex) {
            this.addressMapping.removeCell(_vertex2.address);
          }
        }
      }
    }
  }, {
    key: "getAdjacentNodesAddresses",
    value: function getAdjacentNodesAddresses(vertex) {
      var _this12 = this;

      var deps = this.graph.adjacentNodes(vertex);
      var ret = [];
      deps.forEach(function (vertex) {
        var castVertex = vertex;

        if (castVertex instanceof RangeVertex) {
          ret.push(new AbsoluteCellRange(castVertex.start, castVertex.end));
        } else if (castVertex instanceof FormulaCellVertex) {
          ret.push(castVertex.getAddress(_this12.lazilyTransformingAstService));
        } else {
          ret.push(castVertex.getAddress());
        }
      });
      return ret;
    }
  }], [{
    key: "buildEmpty",
    value: function buildEmpty(lazilyTransformingAstService, config, functionRegistry, namedExpressions, stats) {
      var addressMapping = new AddressMapping(config.chooseAddressMappingPolicy);
      var rangeMapping = new RangeMapping();
      return new DependencyGraph(addressMapping, rangeMapping, new SheetMapping(config.translationPackage), new MatrixMapping(), stats, lazilyTransformingAstService, functionRegistry, namedExpressions);
    }
  }]);

  return DependencyGraph;
}();