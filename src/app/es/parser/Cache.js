import "core-js/modules/es.array.iterator";
import "core-js/modules/es.array.some";
import "core-js/modules/es.map";
import "core-js/modules/es.object.to-string";
import "core-js/modules/es.string.iterator";
import "core-js/modules/web.dom-collections.iterator";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 * @license
 * Copyright (c) 2020 Handsoncode. All rights reserved.
 */
import { AstNodeType, collectDependencies } from './';

var buildCacheEntry = function buildCacheEntry(ast, relativeDependencies, hasVolatileFunction, hasStructuralChangeFunction) {
  return {
    ast: ast,
    relativeDependencies: relativeDependencies,
    hasVolatileFunction: hasVolatileFunction,
    hasStructuralChangeFunction: hasStructuralChangeFunction
  };
};

export var Cache = /*#__PURE__*/function () {
  function Cache(functionRegistry) {
    _classCallCheck(this, Cache);

    this.functionRegistry = functionRegistry;
    this.cache = new Map();
  }

  _createClass(Cache, [{
    key: "set",
    value: function set(hash, ast) {
      var astRelativeDependencies = collectDependencies(ast, this.functionRegistry);
      var cacheEntry = buildCacheEntry(ast, astRelativeDependencies, doesContainFunctions(ast, this.functionRegistry.isFunctionVolatile), doesContainFunctions(ast, this.functionRegistry.isFunctionDependentOnSheetStructureChange));
      this.cache.set(hash, cacheEntry);
      return cacheEntry;
    }
  }, {
    key: "get",
    value: function get(hash) {
      return this.cache.get(hash) || null;
    }
  }, {
    key: "maybeSetAndThenGet",
    value: function maybeSetAndThenGet(hash, ast) {
      var entryFromCache = this.cache.get(hash);

      if (entryFromCache) {
        return entryFromCache.ast;
      } else {
        this.set(hash, ast);
        return ast;
      }
    }
  }, {
    key: "destroy",
    value: function destroy() {
      this.cache.clear();
    }
  }]);

  return Cache;
}();
export var doesContainFunctions = function doesContainFunctions(ast, functionCriterion) {
  switch (ast.type) {
    case AstNodeType.EMPTY:
    case AstNodeType.NUMBER:
    case AstNodeType.STRING:
    case AstNodeType.ERROR:
    case AstNodeType.ERROR_WITH_RAW_INPUT:
    case AstNodeType.CELL_REFERENCE:
    case AstNodeType.CELL_RANGE:
    case AstNodeType.COLUMN_RANGE:
    case AstNodeType.ROW_RANGE:
    case AstNodeType.NAMED_EXPRESSION:
      return false;

    case AstNodeType.PERCENT_OP:
    case AstNodeType.PLUS_UNARY_OP:
    case AstNodeType.MINUS_UNARY_OP:
      {
        return doesContainFunctions(ast.value, functionCriterion);
      }

    case AstNodeType.CONCATENATE_OP:
    case AstNodeType.EQUALS_OP:
    case AstNodeType.NOT_EQUAL_OP:
    case AstNodeType.LESS_THAN_OP:
    case AstNodeType.GREATER_THAN_OP:
    case AstNodeType.LESS_THAN_OR_EQUAL_OP:
    case AstNodeType.GREATER_THAN_OR_EQUAL_OP:
    case AstNodeType.MINUS_OP:
    case AstNodeType.PLUS_OP:
    case AstNodeType.TIMES_OP:
    case AstNodeType.DIV_OP:
    case AstNodeType.POWER_OP:
      return doesContainFunctions(ast.left, functionCriterion) || doesContainFunctions(ast.right, functionCriterion);

    case AstNodeType.PARENTHESIS:
      return doesContainFunctions(ast.expression, functionCriterion);

    case AstNodeType.FUNCTION_CALL:
      {
        if (functionCriterion(ast.procedureName)) {
          return true;
        }

        return ast.args.some(function (arg) {
          return doesContainFunctions(arg, functionCriterion);
        });
      }
  }
};