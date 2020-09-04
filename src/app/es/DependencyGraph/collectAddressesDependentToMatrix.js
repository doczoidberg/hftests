import "core-js/modules/es.array.filter";
import "core-js/modules/es.array.from";
import "core-js/modules/es.array.map";
import "core-js/modules/es.string.iterator";

/**
 * @license
 * Copyright (c) 2020 Handsoncode. All rights reserved.
 */
import { AddressDependency, collectDependencies } from '../parser';
import { FormulaCellVertex } from './FormulaCellVertex';
import { MatrixVertex } from './MatrixVertex';
import { RangeVertex } from './RangeVertex';
export var collectAddressesDependentToMatrix = function collectAddressesDependentToMatrix(funcitonRegistry, vertex, matrix, lazilyTransformingAstService, dependencyGraph) {
  var range = matrix.getRange();

  if (vertex instanceof RangeVertex) {
    var intersection = vertex.range.intersectionWith(range);

    if (intersection !== null) {
      return Array.from(intersection.addresses(dependencyGraph));
    } else {
      return [];
    }
  }

  var formula;
  var address;

  if (vertex instanceof FormulaCellVertex) {
    formula = vertex.getFormula(lazilyTransformingAstService);
    address = vertex.getAddress(lazilyTransformingAstService);
  } else if (vertex instanceof MatrixVertex && vertex.isFormula()) {
    formula = vertex.getFormula();
    address = vertex.getAddress();
  } else {
    return [];
  }

  return collectDependencies(formula, funcitonRegistry).filter(function (d) {
    return d instanceof AddressDependency;
  }).map(function (d) {
    return d.dependency.toSimpleCellAddress(address);
  }).filter(function (d) {
    return range.addressInRange(d);
  });
};