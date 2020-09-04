import "core-js/modules/es.symbol";
import "core-js/modules/es.symbol.description";
import "core-js/modules/es.symbol.iterator";
import "core-js/modules/es.array.concat";
import "core-js/modules/es.array.iterator";
import "core-js/modules/es.array.slice";
import "core-js/modules/es.map";
import "core-js/modules/es.object.get-prototype-of";
import "core-js/modules/es.object.to-string";
import "core-js/modules/es.reflect.construct";
import "core-js/modules/es.regexp.to-string";
import "core-js/modules/es.string.iterator";
import "core-js/modules/web.dom-collections.iterator";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

/**
 * @license
 * Copyright (c) 2020 Handsoncode. All rights reserved.
 */
import { FunctionPlugin } from './FunctionPlugin';
import { HyperFormula } from '../../HyperFormula';
var LICENSE_STATUS_MAP = new Map([['agpl-v3', 1], ['non-commercial-and-evaluation', 2], ["missing"
/* MISSING */
, 3], ["invalid"
/* INVALID */
, 4], ["expired"
/* EXPIRED */
, 5]]);
export var VersionPlugin = /*#__PURE__*/function (_FunctionPlugin) {
  _inherits(VersionPlugin, _FunctionPlugin);

  var _super = _createSuper(VersionPlugin);

  function VersionPlugin() {
    _classCallCheck(this, VersionPlugin);

    return _super.apply(this, arguments);
  }

  _createClass(VersionPlugin, [{
    key: "version",
    value: function version() {
      var _this$config = this.config,
          validityState = _this$config.licenseKeyValidityState,
          licenseKey = _this$config.licenseKey;
      var status;

      if (LICENSE_STATUS_MAP.has(licenseKey)) {
        status = LICENSE_STATUS_MAP.get(licenseKey);
      } else if (LICENSE_STATUS_MAP.has(validityState)) {
        status = LICENSE_STATUS_MAP.get(validityState);
      } else if (!status && validityState === "valid"
      /* VALID */
      ) {
          status = licenseKey.slice(-5);
        }

      return "HyperFormula v".concat(HyperFormula.version, ", ").concat(status);
    }
  }]);

  return VersionPlugin;
}(FunctionPlugin);
VersionPlugin.implementedFunctions = {
  'VERSION': {
    method: 'version'
  }
};