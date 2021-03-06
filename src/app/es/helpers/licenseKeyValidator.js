import "core-js/modules/es.symbol";
import "core-js/modules/es.symbol.description";
import "core-js/modules/es.symbol.iterator";
import "core-js/modules/es.array.concat";
import "core-js/modules/es.array.from";
import "core-js/modules/es.array.iterator";
import "core-js/modules/es.array.slice";
import "core-js/modules/es.function.name";
import "core-js/modules/es.object.to-string";
import "core-js/modules/es.regexp.exec";
import "core-js/modules/es.regexp.to-string";
import "core-js/modules/es.string.iterator";
import "core-js/modules/es.string.split";
import "core-js/modules/web.dom-collections.iterator";

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

/**
 * @license
 * Copyright (c) 2020 Handsoncode. All rights reserved.
 */
import { checkKeySchema, extractTime } from './licenseKeyHelper';
/**
 * List of all not valid messages which may occur.
 */

var consoleMessages = {
  invalid: function invalid() {
    return 'The license key for HyperFormula is invalid.';
  },
  expired: function expired(_ref) {
    var keyValidityDate = _ref.keyValidityDate;
    return 'The license key for HyperFormula expired' + " on ".concat(keyValidityDate, ", and is not valid for the installed version.");
  },
  missing: function missing() {
    return 'The license key for HyperFormula is missing.';
  }
};
var _notified = false;
/**
 * Checks if the provided license key is grammatically valid or not expired.
 *
 * @param {string} licenseKey The license key to check.
 * @returns {LicenseKeyValidityState} Returns the checking state.
 */

export function checkLicenseKeyValidity(licenseKey) {
  var messageDescriptor = {
    template: "missing"
    /* MISSING */
    ,
    vars: {}
  };

  if (licenseKey === 'non-commercial-and-evaluation' || licenseKey === 'agpl-v3' || licenseKey === 'internal-use-in-handsontable') {
    messageDescriptor.template = "valid"
    /* VALID */
    ;
  } else if (typeof licenseKey === 'string' && checkKeySchema(licenseKey)) {
    var _split = ("21/07/2020" || '').split('/'),
        _split2 = _slicedToArray(_split, 3),
        day = _split2[0],
        month = _split2[1],
        year = _split2[2];

    var releaseDays = Math.floor(new Date("".concat(month, "/").concat(day, "/").concat(year)).getTime() / 8.64e7);
    var keyValidityDays = extractTime(licenseKey);
    messageDescriptor.vars.keyValidityDate = formatDate(new Date((keyValidityDays + 1) * 8.64e7));

    if (releaseDays > keyValidityDays) {
      messageDescriptor.template = "expired"
      /* EXPIRED */
      ;
    } else {
      messageDescriptor.template = "valid"
      /* VALID */
      ;
    }
  } else if (licenseKey !== '') {
    messageDescriptor.template = "invalid"
    /* INVALID */
    ;
  }

  if (!_notified && messageDescriptor.template !== "valid"
  /* VALID */
  ) {
      console.warn(consoleMessages[messageDescriptor.template](messageDescriptor.vars));
      _notified = true;
    }

  return messageDescriptor.template;
}
/**
 * Formats a Date instance to hard-coded format MMMM DD, YYYY.
 *
 * @param {Date} date The date to format.
 * @returns {string}
 */

function formatDate(date) {
  var monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  var month = monthNames[date.getMonth()];
  var day = date.getDate();
  var year = date.getFullYear();
  return "".concat(month, " ").concat(day, ", ").concat(year);
}