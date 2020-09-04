import "core-js/modules/es.symbol";
import "core-js/modules/es.symbol.description";
import "core-js/modules/es.symbol.iterator";
import "core-js/modules/es.array.for-each";
import "core-js/modules/es.array.from";
import "core-js/modules/es.array.iterator";
import "core-js/modules/es.array.reverse";
import "core-js/modules/es.array.slice";
import "core-js/modules/es.function.name";
import "core-js/modules/es.map";
import "core-js/modules/es.object.to-string";
import "core-js/modules/es.regexp.to-string";
import "core-js/modules/es.set";
import "core-js/modules/es.string.iterator";
import "core-js/modules/web.dom-collections.for-each";
import "core-js/modules/web.dom-collections.iterator";

function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 * @license
 * Copyright (c) 2020 Handsoncode. All rights reserved.
 */
var NodeVisitStatus;

(function (NodeVisitStatus) {
  NodeVisitStatus[NodeVisitStatus["ON_STACK"] = 0] = "ON_STACK";
  NodeVisitStatus[NodeVisitStatus["PROCESSED"] = 1] = "PROCESSED";
  NodeVisitStatus[NodeVisitStatus["POPPED"] = 2] = "POPPED";
})(NodeVisitStatus || (NodeVisitStatus = {}));
/**
 * Provides graph directed structure
 *
 * Invariants:
 * - this.edges(node) exists if and only if node is in the graph
 * - this.specialNodes* are always subset of this.nodes
 * - this.edges(node) is subset of this.nodes (i.e. it does not contain nodes not present in graph) -- this invariant DOES NOT HOLD right now
 */


export var Graph = /*#__PURE__*/function () {
  function Graph(dependencyQuery) {
    _classCallCheck(this, Graph);

    this.dependencyQuery = dependencyQuery;
    /** Set with nodes in graph. */

    this.nodes = new Set();
    this.specialNodes = new Set();
    this.specialNodesStructuralChanges = new Set();
    this.specialNodesRecentlyChanged = new Set();
    this.infiniteRanges = new Set();
    /** Nodes adjacency mapping. */

    this.edges = new Map();
  }
  /**
   * Adds node to a graph
   *
   * @param node - a node to be added
   */


  _createClass(Graph, [{
    key: "addNode",
    value: function addNode(node) {
      this.nodes.add(node);

      if (!this.edges.has(node)) {
        this.edges.set(node, new Set());
      }
    }
    /**
     * Adds edge between nodes.
     *
     * The nodes had to be added to the graph before, or the error will be raised
     *
     * @param fromNode - node from which edge is outcoming
     * @param toNode - node to which edge is incoming
     */

  }, {
    key: "addEdge",
    value: function addEdge(fromNode, toNode) {
      if (!this.nodes.has(fromNode)) {
        throw new Error("Unknown node ".concat(fromNode));
      }

      if (!this.nodes.has(toNode)) {
        throw new Error("Unknown node ".concat(toNode));
      } // eslint-disable-next-line @typescript-eslint/no-non-null-assertion


      this.edges.get(fromNode).add(toNode);
    }
  }, {
    key: "removeEdge",
    value: function removeEdge(fromNode, toNode) {
      if (this.existsEdge(fromNode, toNode)) {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        this.edges.get(fromNode).delete(toNode);
      } else {
        throw new Error('Edge does not exist');
      }
    }
  }, {
    key: "softRemoveEdge",
    value: function softRemoveEdge(fromNode, toNode) {
      var _a;

      (_a = this.edges.get(fromNode)) === null || _a === void 0 ? void 0 : _a.delete(toNode);
    }
  }, {
    key: "removeIncomingEdges",
    value: function removeIncomingEdges(toNode) {
      this.edges.forEach(function (nodeEdges) {
        nodeEdges.delete(toNode);
      });
    }
    /**
     * Returns nodes adjacent to given node
     *
     * @param node - node to which adjacent nodes we want to retrieve
     */

  }, {
    key: "adjacentNodes",
    value: function adjacentNodes(node) {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      return this.edges.get(node);
    }
  }, {
    key: "adjacentNodesCount",
    value: function adjacentNodesCount(node) {
      return this.adjacentNodes(node).size;
    }
    /**
     * Checks whether a node is present in graph
     *
     * @param node - node to check
     */

  }, {
    key: "hasNode",
    value: function hasNode(node) {
      return this.nodes.has(node);
    }
    /**
     * Returns number of nodes in graph
     */

  }, {
    key: "nodesCount",
    value: function nodesCount() {
      return this.nodes.size;
    }
    /**
     * Returns number of edges in graph
     */

  }, {
    key: "edgesCount",
    value: function edgesCount() {
      var result = 0;
      this.edges.forEach(function (edgesForNode) {
        return result += edgesForNode.size;
      });
      return result;
    }
  }, {
    key: "removeNode",
    value: function removeNode(node) {
      var _iterator = _createForOfIteratorHelper(this.adjacentNodes(node).values()),
          _step;

      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var adjacentNode = _step.value;
          this.markNodeAsSpecialRecentlyChanged(adjacentNode);
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }

      this.edges.delete(node);
      this.nodes.delete(node);
      this.specialNodes.delete(node);
      this.specialNodesRecentlyChanged.delete(node);
      this.specialNodesStructuralChanges.delete(node);
      this.infiniteRanges.delete(node);
      return this.removeDependencies(node);
    }
  }, {
    key: "markNodeAsSpecial",
    value: function markNodeAsSpecial(node) {
      this.specialNodes.add(node);
    }
  }, {
    key: "markNodeAsSpecialRecentlyChanged",
    value: function markNodeAsSpecialRecentlyChanged(node) {
      if (this.nodes.has(node)) {
        this.specialNodesRecentlyChanged.add(node);
      }
    }
  }, {
    key: "markNodeAsChangingWithStructure",
    value: function markNodeAsChangingWithStructure(node) {
      this.specialNodesStructuralChanges.add(node);
    }
  }, {
    key: "clearSpecialNodesRecentlyChanged",
    value: function clearSpecialNodesRecentlyChanged() {
      this.specialNodesRecentlyChanged.clear();
    }
  }, {
    key: "markNodeAsInfiniteRange",
    value: function markNodeAsInfiniteRange(node) {
      this.infiniteRanges.add(node);
    }
    /**
     * Checks whether exists edge between nodes
     *
     * @param fromNode - node from which edge is outcoming
     * @param toNode - node to which edge is incoming
     */

  }, {
    key: "existsEdge",
    value: function existsEdge(fromNode, toNode) {
      var _a, _b;

      return (_b = (_a = this.edges.get(fromNode)) === null || _a === void 0 ? void 0 : _a.has(toNode)) !== null && _b !== void 0 ? _b : false;
    }
    /*
     * return a topological sort order, but separates vertices that exist in some cycle
     */

  }, {
    key: "topSortWithScc",
    value: function topSortWithScc() {
      return this.getTopSortedWithSccSubgraphFrom(Array.from(this.nodes), function (_node) {
        return true;
      }, function (_node) {});
    }
    /**
     *
     * computes topological sort order, but vertices that are on cycles are kept separate
     *
     * @param modifiedNodes - seed for computation. During engine init run, all of the vertices of grap. In recomputation run, changed vertices.
     * @param operatingFunction - recomputes value of a node, and returns whether a change occured
     * @param onCycle - action to be performed when node is on cycle
     */

  }, {
    key: "getTopSortedWithSccSubgraphFrom",
    value: function getTopSortedWithSccSubgraphFrom(modifiedNodes, operatingFunction, onCycle) {
      var _this = this;

      var entranceTime = new Map();
      var low = new Map();
      var parent = new Map(); // node status life cycle:
      // undefined -> ON_STACK -> PROCESSED -> POPPED

      var nodeStatus = new Map();
      var order = [];
      var time = 0;
      modifiedNodes.reverse().forEach(function (v) {
        if (nodeStatus.get(v) !== undefined) {
          return;
        }

        time++;
        var DFSstack = [v];
        nodeStatus.set(v, NodeVisitStatus.ON_STACK);

        var _loop = function _loop() {
          var u = DFSstack[DFSstack.length - 1]; // eslint-disable-next-line @typescript-eslint/no-non-null-assertion

          switch (nodeStatus.get(u)) {
            case NodeVisitStatus.ON_STACK:
              {
                nodeStatus.set(u, NodeVisitStatus.PROCESSED);
                entranceTime.set(u, time);
                low.set(u, time);

                _this.adjacentNodes(u).forEach(function (t) {
                  switch (nodeStatus.get(t)) {
                    case NodeVisitStatus.POPPED:
                      break;

                    case NodeVisitStatus.PROCESSED:
                      {
                        //backward edge
                        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                        low.set(u, Math.min(low.get(u), entranceTime.get(t)));
                        break;
                      }

                    case undefined: // not visited
                    // process as in the case of ON_STACK
                    // eslint-disable-next-line no-fallthrough

                    case NodeVisitStatus.ON_STACK:
                      {
                        // or visited but not processed
                        parent.set(t, u);
                        DFSstack.push(t);
                        nodeStatus.set(t, NodeVisitStatus.ON_STACK);
                        time++;
                        break;
                      }
                  }
                });

                break;
              }

            case NodeVisitStatus.PROCESSED:
              {
                // leaving this DFS subtree
                var pu = parent.get(u);

                if (pu !== null) {
                  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                  low.set(pu, Math.min(low.get(pu), low.get(u)));
                }

                nodeStatus.set(u, NodeVisitStatus.POPPED);
                order.push(u);
                DFSstack.pop();
                break;
              }

            case NodeVisitStatus.POPPED:
              {
                // it's a 'shadow' copy, we already processed this vertex and can ignore it
                DFSstack.pop();
                break;
              }
          }
        };

        while (DFSstack.length > 0) {
          _loop();
        }
      });
      var sccMap = new Map();
      var sccNonSingletons = new Set();
      order.reverse();
      order.forEach(function (v) {
        if (entranceTime.get(v) === low.get(v)) {
          sccMap.set(v, v);
        } else {
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          sccMap.set(v, sccMap.get(parent.get(v)));
        }
      });
      this.edges.forEach(function (targets, v) {
        targets.forEach(function (u) {
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          var uRepr = sccMap.get(u); // eslint-disable-next-line @typescript-eslint/no-non-null-assertion

          var vRepr = sccMap.get(v);

          if (uRepr === vRepr) {
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            sccNonSingletons.add(uRepr);
          }
        });
      });
      var shouldBeUpdatedMapping = new Set(modifiedNodes);
      var sorted = [];
      var cycled = [];
      order.forEach(function (t) {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        if (!sccNonSingletons.has(sccMap.get(t))) {
          sorted.push(t);

          if (shouldBeUpdatedMapping.has(t) && operatingFunction(t)) {
            _this.adjacentNodes(t).forEach(function (s) {
              return shouldBeUpdatedMapping.add(s);
            });
          }
        } else {
          cycled.push(t);
          onCycle(t);

          _this.adjacentNodes(t).forEach(function (s) {
            return shouldBeUpdatedMapping.add(s);
          });
        }
      });
      return {
        sorted: sorted,
        cycled: cycled
      };
    }
  }, {
    key: "getDependencies",
    value: function getDependencies(vertex) {
      var result = [];
      this.edges.forEach(function (adjacentNodes, sourceNode) {
        if (adjacentNodes.has(vertex)) {
          result.push(sourceNode);
        }
      });
      return result;
    }
  }, {
    key: "destroy",
    value: function destroy() {
      this.edges.clear();
      this.nodes.clear();
      this.specialNodes.clear();
      this.specialNodesStructuralChanges.clear();
      this.clearSpecialNodesRecentlyChanged();
    }
  }, {
    key: "removeDependencies",
    value: function removeDependencies(node) {
      var dependencies = this.dependencyQuery(node);

      if (!dependencies) {
        return [];
      }

      var _iterator2 = _createForOfIteratorHelper(dependencies),
          _step2;

      try {
        for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
          var dependency = _step2.value;
          this.softRemoveEdge(dependency, node);
        }
      } catch (err) {
        _iterator2.e(err);
      } finally {
        _iterator2.f();
      }

      return dependencies;
    }
  }]);

  return Graph;
}();