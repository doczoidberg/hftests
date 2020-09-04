import "core-js/modules/es.array.map";

/**
 * @license
 * Copyright (c) 2020 Handsoncode. All rights reserved.
 */

/**
 * Converts dependencies from maybe relative addressing to absolute addressing.
 *
 * @param deps - list of addresses in R0C0 format
 * @param baseAddress - base address with regard to which make a convertion
 */
export var absolutizeDependencies = function absolutizeDependencies(deps, baseAddress) {
  return deps.map(function (dep) {
    return dep.absolutize(baseAddress);
  });
};