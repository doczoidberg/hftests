import "core-js/modules/es.symbol";
import "core-js/modules/es.symbol.description";
import "core-js/modules/es.symbol.iterator";
import "core-js/modules/es.array.concat";
import "core-js/modules/es.array.from";
import "core-js/modules/es.array.iterator";
import "core-js/modules/es.array.reduce";
import "core-js/modules/es.array.slice";
import "core-js/modules/es.function.name";
import "core-js/modules/es.object.to-string";
import "core-js/modules/es.regexp.exec";
import "core-js/modules/es.regexp.to-string";
import "core-js/modules/es.string.code-point-at";
import "core-js/modules/es.string.iterator";
import "core-js/modules/es.string.pad-start";
import "core-js/modules/es.string.replace";
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
// @ts-nocheck

/* eslint-disable */
var _rl = '\x6C\x65\x6E\x67\x74\x68';

var _hd = function _hd(v) {
  return parseInt(v, 16);
};

var _pi = function _pi(v) {
  return parseInt(v, 10);
};

var _nm = function _nm(v) {
  return (v + '').replace(/\-/g, '');
};

var _ss = function _ss(v, s, l) {
  return v['\x73\x75\x62\x73\x74\x72'](s, l);
};

var _cp = function _cp(v) {
  return v['\x63\x6F\x64\x65\x50\x6F\x69\x6E\x74\x41\x74'](0) - 65;
};

export function extractTime(v) {
  return _nm(v)[_rl] === 50 >> 1 ? _hd(_ss(_nm(v), _hd('12'), _cp('\x46'))) / (_hd(_ss(_nm(v), _cp('C'), _cp('\x59') >> 4)) || (~~![][_rl] << 3) + 1) : 0;
}
export function checkKeySchema(v) {
  v = (v + '').replace(/\-/g, '');

  if (v[_rl] !== _cp('\x5A')) {
    return false;
  }

  var sp = 0;
  return [[0, _cp('\x47') + 1], [_cp('\x48'), _cp('\x48') - 1], [_cp('G') + _cp('H'), _cp('\x47')]].reduce(function (e, _ref, c) {
    var _ref2 = _slicedToArray(_ref, 2),
        a = _ref2[0],
        b = _ref2[1];

    e |= (_pi("".concat(_pi(_hd(_ss.apply(void 0, [v].concat([sp + a - (c === 3 >> 2 ? 0 : 2), b + (!c ? 0 : 2)]))) + (_hd(_ss.apply(void 0, [v].concat([sp + a + b, 2]))) + []).padStart(2, '0')))) % 97 || 2) >> 1;
    sp += 2;
    return e;
  }, _cp('A')) === [] + 1 >> 1;
}
/* eslint-enable */