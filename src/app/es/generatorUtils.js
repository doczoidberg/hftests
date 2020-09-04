import "core-js/modules/es.symbol";
import "core-js/modules/es.symbol.description";
import "core-js/modules/es.symbol.iterator";
import "core-js/modules/es.array.iterator";
import "core-js/modules/es.object.to-string";
import "core-js/modules/es.string.iterator";
import "core-js/modules/web.dom-collections.iterator";
import "regenerator-runtime/runtime";

var _marked = /*#__PURE__*/regeneratorRuntime.mark(empty);

/**
 * @license
 * Copyright (c) 2020 Handsoncode. All rights reserved.
 */
export function empty() {
  return regeneratorRuntime.wrap(function empty$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
        case "end":
          return _context.stop();
      }
    }
  }, _marked);
}
export function split(iterable) {
  var iterator = iterable[Symbol.iterator]();

  var _iterator$next = iterator.next(),
      done = _iterator$next.done,
      value = _iterator$next.value;

  if (done) {
    return {
      rest: empty()
    };
  } else {
    return {
      value: value,
      rest: iterator
    };
  }
}
export function first(iterable) {
  var iterator = iterable[Symbol.iterator]();

  var _iterator$next2 = iterator.next(),
      done = _iterator$next2.done,
      value = _iterator$next2.value;

  if (!done) {
    return value;
  }

  return undefined;
}