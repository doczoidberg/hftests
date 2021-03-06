function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 * @license
 * Copyright (c) 2020 Handsoncode. All rights reserved.
 */
import { LazilyTransformingAstService } from './LazilyTransformingAstService';
import { CellContentParser } from './CellContentParser';
import { Exporter } from './CellValue';
import { buildColumnSearchStrategy } from './ColumnSearch/ColumnSearchStrategy';
import { Config } from './Config';
import { DateTimeHelper } from './DateTimeHelper';
import { CrudOperations } from './CrudOperations';
import { DependencyGraph } from './DependencyGraph';
import { Evaluator } from './Evaluator';
import { GraphBuilder } from './GraphBuilder';
import { UIElement } from './i18n';
import { NamedExpressions } from './NamedExpressions';
import { NumberLiteralHelper } from './NumberLiteralHelper';
import { buildLexerConfig, ParserWithCaching, Unparser } from './parser';
import { Serialization } from './Serialization';
import { EmptyStatistics, Statistics, StatType } from './statistics';
import { SheetSizeLimitExceededError } from './errors';
import { findBoundaries, validateAsSheet } from './Sheet';
import { FunctionRegistry } from './interpreter/FunctionRegistry';
export var BuildEngineFactory = /*#__PURE__*/function () {
  function BuildEngineFactory() {
    _classCallCheck(this, BuildEngineFactory);
  }

  _createClass(BuildEngineFactory, null, [{
    key: "buildEngine",
    value: function buildEngine(config) {
      var sheets = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var stats = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : config.useStats ? new Statistics() : new EmptyStatistics();
      stats.start(StatType.BUILD_ENGINE_TOTAL);
      var namedExpressions = new NamedExpressions();
      var functionRegistry = new FunctionRegistry(config);
      var lazilyTransformingAstService = new LazilyTransformingAstService(stats);
      var dependencyGraph = DependencyGraph.buildEmpty(lazilyTransformingAstService, config, functionRegistry, namedExpressions, stats);
      var columnSearch = buildColumnSearchStrategy(dependencyGraph, config, stats);
      var sheetMapping = dependencyGraph.sheetMapping;
      var addressMapping = dependencyGraph.addressMapping;

      for (var sheetName in sheets) {
        if (Object.prototype.hasOwnProperty.call(sheets, sheetName)) {
          var sheet = sheets[sheetName];
          validateAsSheet(sheet);
          var boundaries = findBoundaries(sheet);

          if (boundaries.height > config.maxRows || boundaries.width > config.maxColumns) {
            throw new SheetSizeLimitExceededError();
          }

          var sheetId = sheetMapping.addSheet(sheetName);
          addressMapping.autoAddSheet(sheetId, sheet, boundaries);
        }
      }

      var parser = new ParserWithCaching(config, functionRegistry, sheetMapping.get);
      var unparser = new Unparser(config, buildLexerConfig(config), sheetMapping.fetchDisplayName, namedExpressions);
      var dateHelper = new DateTimeHelper(config);
      var numberLiteralHelper = new NumberLiteralHelper(config);
      var cellContentParser = new CellContentParser(config, dateHelper, numberLiteralHelper);
      var crudOperations = new CrudOperations(config, stats, dependencyGraph, columnSearch, parser, cellContentParser, lazilyTransformingAstService, namedExpressions);
      stats.measure(StatType.GRAPH_BUILD, function () {
        var graphBuilder = new GraphBuilder(dependencyGraph, columnSearch, parser, cellContentParser, config, stats);
        graphBuilder.buildGraph(sheets);
      });
      lazilyTransformingAstService.undoRedo = crudOperations.undoRedo;
      lazilyTransformingAstService.parser = parser;
      var exporter = new Exporter(config, namedExpressions);
      var serialization = new Serialization(dependencyGraph, unparser, config, exporter);
      var evaluator = new Evaluator(dependencyGraph, columnSearch, config, stats, dateHelper, numberLiteralHelper, functionRegistry, namedExpressions, serialization);
      evaluator.run();
      stats.end(StatType.BUILD_ENGINE_TOTAL);
      return {
        config: config,
        stats: stats,
        dependencyGraph: dependencyGraph,
        columnSearch: columnSearch,
        parser: parser,
        unparser: unparser,
        cellContentParser: cellContentParser,
        evaluator: evaluator,
        lazilyTransformingAstService: lazilyTransformingAstService,
        crudOperations: crudOperations,
        exporter: exporter,
        namedExpressions: namedExpressions,
        serialization: serialization,
        functionRegistry: functionRegistry
      };
    }
  }, {
    key: "buildFromSheets",
    value: function buildFromSheets(sheets, configInput) {
      var config = new Config(configInput);
      return this.buildEngine(config, sheets);
    }
  }, {
    key: "buildFromSheet",
    value: function buildFromSheet(sheet, configInput) {
      var config = new Config(configInput);
      var newsheetprefix = config.translationPackage.getUITranslation(UIElement.NEW_SHEET_PREFIX) + '1';
      return this.buildEngine(config, _defineProperty({}, newsheetprefix, sheet));
    }
  }, {
    key: "buildEmpty",
    value: function buildEmpty(configInput) {
      return this.buildEngine(new Config(configInput));
    }
  }, {
    key: "rebuildWithConfig",
    value: function rebuildWithConfig(config, sheets, stats) {
      return this.buildEngine(config, sheets, stats);
    }
  }]);

  return BuildEngineFactory;
}();