import "core-js/modules/es.symbol";
import "core-js/modules/es.symbol.description";
import "core-js/modules/es.symbol.iterator";
import "core-js/modules/es.array.concat";
import "core-js/modules/es.array.find";
import "core-js/modules/es.array.for-each";
import "core-js/modules/es.array.from";
import "core-js/modules/es.array.iterator";
import "core-js/modules/es.array.slice";
import "core-js/modules/es.function.name";
import "core-js/modules/es.map";
import "core-js/modules/es.object.keys";
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
import { FunctionPluginValidationError, ProtectedFunctionError } from '../errors';
import { HyperFormula } from '../HyperFormula';
import { VersionPlugin } from './plugin/VersionPlugin';
export var FunctionRegistry = /*#__PURE__*/function () {
  function FunctionRegistry(config) {
    var _this = this;

    _classCallCheck(this, FunctionRegistry);

    this.config = config;
    this.functions = new Map();
    this.volatileFunctions = new Set();
    this.structuralChangeFunctions = new Set();
    this.functionsWhichDoesNotNeedArgumentsToBeComputed = new Set();

    this.doesFunctionNeedArgumentToBeComputed = function (functionId) {
      return _this.functionsWhichDoesNotNeedArgumentsToBeComputed.has(functionId);
    };

    this.isFunctionVolatile = function (functionId) {
      return _this.volatileFunctions.has(functionId);
    };

    this.isFunctionDependentOnSheetStructureChange = function (functionId) {
      return _this.structuralChangeFunctions.has(functionId);
    };

    if (config.functionPlugins.length > 0) {
      this.instancePlugins = new Map();

      var _iterator = _createForOfIteratorHelper(config.functionPlugins),
          _step;

      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var plugin = _step.value;
          FunctionRegistry.loadPluginFunctions(plugin, this.instancePlugins);
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
    } else {
      this.instancePlugins = new Map(FunctionRegistry.plugins);
    }

    var _iterator2 = _createForOfIteratorHelper(FunctionRegistry.protectedFunctions()),
        _step2;

    try {
      for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
        var _step2$value = _slicedToArray(_step2.value, 2),
            functionId = _step2$value[0],
            _plugin = _step2$value[1];

        FunctionRegistry.loadFunctionUnprotected(_plugin, functionId, this.instancePlugins);
      }
    } catch (err) {
      _iterator2.e(err);
    } finally {
      _iterator2.f();
    }

    var _iterator3 = _createForOfIteratorHelper(this.instancePlugins.entries()),
        _step3;

    try {
      for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
        var _step3$value = _slicedToArray(_step3.value, 2),
            _functionId = _step3$value[0],
            _plugin2 = _step3$value[1];

        this.categorizeFunction(_functionId, _plugin2.implementedFunctions[_functionId]);
      }
    } catch (err) {
      _iterator3.e(err);
    } finally {
      _iterator3.f();
    }
  }

  _createClass(FunctionRegistry, [{
    key: "initializePlugins",
    value: function initializePlugins(interpreter) {
      var _this2 = this;

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      var instances = [];

      var _iterator4 = _createForOfIteratorHelper(this.instancePlugins.entries()),
          _step4;

      try {
        var _loop = function _loop() {
          var _step4$value = _slicedToArray(_step4.value, 2),
              functionId = _step4$value[0],
              plugin = _step4$value[1];

          var pluginInstance = instances.find(function (pluginInstance) {
            return pluginInstance instanceof plugin;
          });

          if (pluginInstance === undefined) {
            pluginInstance = new plugin(interpreter);
            instances.push(pluginInstance);
          }

          var methodName = plugin.implementedFunctions[functionId].method;

          _this2.functions.set(functionId, [methodName, pluginInstance]);
        };

        for (_iterator4.s(); !(_step4 = _iterator4.n()).done;) {
          _loop();
        }
      } catch (err) {
        _iterator4.e(err);
      } finally {
        _iterator4.f();
      }
    }
  }, {
    key: "getFunctionPlugin",
    value: function getFunctionPlugin(functionId) {
      if (FunctionRegistry.functionIsProtected(functionId)) {
        return undefined;
      }

      return this.instancePlugins.get(functionId);
    }
  }, {
    key: "getFunction",
    value: function getFunction(functionId) {
      return this.functions.get(functionId);
    }
  }, {
    key: "getPlugins",
    value: function getPlugins() {
      var plugins = new Set();

      var _iterator5 = _createForOfIteratorHelper(this.instancePlugins),
          _step5;

      try {
        for (_iterator5.s(); !(_step5 = _iterator5.n()).done;) {
          var _step5$value = _slicedToArray(_step5.value, 2),
              functionId = _step5$value[0],
              plugin = _step5$value[1];

          if (!FunctionRegistry.functionIsProtected(functionId)) {
            plugins.add(plugin);
          }
        }
      } catch (err) {
        _iterator5.e(err);
      } finally {
        _iterator5.f();
      }

      return Array.from(plugins);
    }
  }, {
    key: "getRegisteredFunctionIds",
    value: function getRegisteredFunctionIds() {
      return Array.from(this.functions.keys());
    }
  }, {
    key: "categorizeFunction",
    value: function categorizeFunction(functionId, functionMetadata) {
      if (functionMetadata.isVolatile) {
        this.volatileFunctions.add(functionId);
      }

      if (functionMetadata.doesNotNeedArgumentsToBeComputed) {
        this.functionsWhichDoesNotNeedArgumentsToBeComputed.add(functionId);
      }

      if (functionMetadata.isDependentOnSheetStructureChange) {
        this.structuralChangeFunctions.add(functionId);
      }
    }
  }], [{
    key: "registerFunctionPlugin",
    value: function registerFunctionPlugin(plugin, translations) {
      this.loadPluginFunctions(plugin, this.plugins);

      if (translations !== undefined) {
        this.loadTranslations(translations);
      }
    }
  }, {
    key: "registerFunction",
    value: function registerFunction(functionId, plugin, translations) {
      var entry = plugin.implementedFunctions[functionId];

      if (entry !== undefined) {
        this.loadPluginFunction(plugin, functionId, this.plugins);
      } else {
        throw FunctionPluginValidationError.functionNotDeclaredInPlugin(functionId, plugin.name);
      }

      if (translations !== undefined) {
        this.loadTranslations(translations);
      }
    }
  }, {
    key: "unregisterFunction",
    value: function unregisterFunction(functionId) {
      if (this.functionIsProtected(functionId)) {
        throw ProtectedFunctionError.cannotUnregisterFunctionWithId(functionId);
      }

      this.plugins.delete(functionId);
    }
  }, {
    key: "unregisterFunctionPlugin",
    value: function unregisterFunctionPlugin(plugin) {
      var _iterator6 = _createForOfIteratorHelper(this.protectedPlugins()),
          _step6;

      try {
        for (_iterator6.s(); !(_step6 = _iterator6.n()).done;) {
          var protectedPlugin = _step6.value;

          if (protectedPlugin === plugin) {
            throw ProtectedFunctionError.cannotUnregisterProtectedPlugin();
          }
        }
      } catch (err) {
        _iterator6.e(err);
      } finally {
        _iterator6.f();
      }

      var _iterator7 = _createForOfIteratorHelper(this.plugins.entries()),
          _step7;

      try {
        for (_iterator7.s(); !(_step7 = _iterator7.n()).done;) {
          var _step7$value = _slicedToArray(_step7.value, 2),
              functionId = _step7$value[0],
              registeredPlugin = _step7$value[1];

          if (registeredPlugin === plugin) {
            this.plugins.delete(functionId);
          }
        }
      } catch (err) {
        _iterator7.e(err);
      } finally {
        _iterator7.f();
      }
    }
  }, {
    key: "unregisterAll",
    value: function unregisterAll() {
      this.plugins.clear();
    }
  }, {
    key: "getRegisteredFunctionIds",
    value: function getRegisteredFunctionIds() {
      return [].concat(_toConsumableArray(Array.from(this.plugins.keys())), _toConsumableArray(Array.from(this._protectedPlugins.keys())));
    }
  }, {
    key: "getPlugins",
    value: function getPlugins() {
      return Array.from(new Set(this.plugins.values()).values());
    }
  }, {
    key: "getFunctionPlugin",
    value: function getFunctionPlugin(functionId) {
      if (this.functionIsProtected(functionId)) {
        return undefined;
      } else {
        return this.plugins.get(functionId);
      }
    }
  }, {
    key: "loadTranslations",
    value: function loadTranslations(translations) {
      var registeredLanguages = new Set(HyperFormula.getRegisteredLanguagesCodes());
      Object.keys(translations).forEach(function (code) {
        if (registeredLanguages.has(code)) {
          HyperFormula.getLanguage(code).extendFunctions(translations[code]);
        }
      });
    }
  }, {
    key: "loadPluginFunctions",
    value: function loadPluginFunctions(plugin, registry) {
      var _this3 = this;

      Object.keys(plugin.implementedFunctions).forEach(function (functionName) {
        _this3.loadPluginFunction(plugin, functionName, registry);
      });
    }
  }, {
    key: "loadPluginFunction",
    value: function loadPluginFunction(plugin, functionId, registry) {
      if (this.functionIsProtected(functionId)) {
        throw ProtectedFunctionError.cannotRegisterFunctionWithId(functionId);
      } else {
        this.loadFunctionUnprotected(plugin, functionId, registry);
      }
    }
  }, {
    key: "loadFunctionUnprotected",
    value: function loadFunctionUnprotected(plugin, functionId, registry) {
      var methodName = plugin.implementedFunctions[functionId].method;

      if (Object.prototype.hasOwnProperty.call(plugin.prototype, methodName)) {
        registry.set(functionId, plugin);
      } else {
        throw FunctionPluginValidationError.functionMethodNotFound(methodName, plugin.name);
      }
    }
  }, {
    key: "functionIsProtected",
    value: function functionIsProtected(functionId) {
      return this._protectedPlugins.has(functionId);
    }
  }, {
    key: "protectedFunctions",
    value: /*#__PURE__*/regeneratorRuntime.mark(function protectedFunctions() {
      var _iterator8, _step8, _step8$value, functionId, plugin;

      return regeneratorRuntime.wrap(function protectedFunctions$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _iterator8 = _createForOfIteratorHelper(this._protectedPlugins);
              _context.prev = 1;

              _iterator8.s();

            case 3:
              if ((_step8 = _iterator8.n()).done) {
                _context.next = 10;
                break;
              }

              _step8$value = _slicedToArray(_step8.value, 2), functionId = _step8$value[0], plugin = _step8$value[1];

              if (!(plugin !== undefined)) {
                _context.next = 8;
                break;
              }

              _context.next = 8;
              return [functionId, plugin];

            case 8:
              _context.next = 3;
              break;

            case 10:
              _context.next = 15;
              break;

            case 12:
              _context.prev = 12;
              _context.t0 = _context["catch"](1);

              _iterator8.e(_context.t0);

            case 15:
              _context.prev = 15;

              _iterator8.f();

              return _context.finish(15);

            case 18:
            case "end":
              return _context.stop();
          }
        }
      }, protectedFunctions, this, [[1, 12, 15, 18]]);
    })
  }, {
    key: "protectedPlugins",
    value: /*#__PURE__*/regeneratorRuntime.mark(function protectedPlugins() {
      var _iterator9, _step9, _step9$value, plugin;

      return regeneratorRuntime.wrap(function protectedPlugins$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _iterator9 = _createForOfIteratorHelper(this._protectedPlugins);
              _context2.prev = 1;

              _iterator9.s();

            case 3:
              if ((_step9 = _iterator9.n()).done) {
                _context2.next = 10;
                break;
              }

              _step9$value = _slicedToArray(_step9.value, 2), plugin = _step9$value[1];

              if (!(plugin !== undefined)) {
                _context2.next = 8;
                break;
              }

              _context2.next = 8;
              return plugin;

            case 8:
              _context2.next = 3;
              break;

            case 10:
              _context2.next = 15;
              break;

            case 12:
              _context2.prev = 12;
              _context2.t0 = _context2["catch"](1);

              _iterator9.e(_context2.t0);

            case 15:
              _context2.prev = 15;

              _iterator9.f();

              return _context2.finish(15);

            case 18:
            case "end":
              return _context2.stop();
          }
        }
      }, protectedPlugins, this, [[1, 12, 15, 18]]);
    })
  }]);

  return FunctionRegistry;
}();
FunctionRegistry.plugins = new Map();
FunctionRegistry._protectedPlugins = new Map([['VERSION', VersionPlugin], ['OFFSET', undefined]]);