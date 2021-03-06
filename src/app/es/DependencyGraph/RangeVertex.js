import "core-js/modules/es.array.for-each";
import "core-js/modules/es.array.iterator";
import "core-js/modules/es.map";
import "core-js/modules/es.object.to-string";
import "core-js/modules/es.set";
import "core-js/modules/es.string.iterator";
import "core-js/modules/web.dom-collections.for-each";
import "core-js/modules/web.dom-collections.iterator";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 * @license
 * Copyright (c) 2020 Handsoncode. All rights reserved.
 */

/**
 * Represents vertex bound to range
 */
export var RangeVertex = /*#__PURE__*/function () {
  function RangeVertex(range) {
    _classCallCheck(this, RangeVertex);

    this.range = range;
    this.functionCache = new Map();
    this.criterionFunctionCache = new Map();
    this.dependentCacheRanges = new Set();
    this.bruteForce = false;
  }

  _createClass(RangeVertex, [{
    key: "getFunctionValue",

    /**
     * Returns cached value stored for given function
     *
     * @param functionName - name of the function
     */
    value: function getFunctionValue(functionName) {
      return this.functionCache.get(functionName) || null;
    }
    /**
     * Stores cached value for given function
     *
     * @param functionName - name of the function
     * @param value - cached value
     */

  }, {
    key: "setFunctionValue",
    value: function setFunctionValue(functionName, value) {
      this.functionCache.set(functionName, value);
    }
    /**
     * Returns cached value for given cache key and criterion text representation
     *
     * @param cacheKey - key to retrieve from the cache
     * @param criterionString - criterion text (ex. '<=5')
     */

  }, {
    key: "getCriterionFunctionValue",
    value: function getCriterionFunctionValue(cacheKey, criterionString) {
      var values = this.getCriterionFunctionValues(cacheKey);
      var value = values.get(criterionString);
      return value ? value[0] : null;
    }
    /**
     * Returns all cached values stored for given criterion function
     *
     * @param cacheKey - key to retrieve from the cache
     */

  }, {
    key: "getCriterionFunctionValues",
    value: function getCriterionFunctionValues(cacheKey) {
      return this.criterionFunctionCache.get(cacheKey) || new Map();
    }
    /**
     * Stores all values for given criterion function
     *
     * @param cacheKey - key to store in the cache
     * @param values - map with values
     */

  }, {
    key: "setCriterionFunctionValues",
    value: function setCriterionFunctionValues(cacheKey, values) {
      this.criterionFunctionCache.set(cacheKey, values);
    }
  }, {
    key: "addDependentCacheRange",
    value: function addDependentCacheRange(dependentRange) {
      if (dependentRange !== this) {
        this.dependentCacheRanges.add(dependentRange);
      }
    }
    /**
     * Clears function cache
     */

  }, {
    key: "clearCache",
    value: function clearCache() {
      this.functionCache.clear();
      this.criterionFunctionCache.clear();
      this.dependentCacheRanges.forEach(function (range) {
        return range.criterionFunctionCache.clear();
      });
      this.dependentCacheRanges.clear();
    }
    /**
     * Returns start of the range (it's top-left corner)
     */

  }, {
    key: "getStart",
    value: function getStart() {
      return this.start;
    }
    /**
     * Returns end of the range (it's bottom-right corner)
     */

  }, {
    key: "getEnd",
    value: function getEnd() {
      return this.end;
    }
  }, {
    key: "start",
    get: function get() {
      return this.range.start;
    }
  }, {
    key: "end",
    get: function get() {
      return this.range.end;
    }
  }, {
    key: "sheet",
    get: function get() {
      return this.range.start.sheet;
    }
  }]);

  return RangeVertex;
}();