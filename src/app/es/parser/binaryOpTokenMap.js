var _binaryOpTokenMap;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * @license
 * Copyright (c) 2020 Handsoncode. All rights reserved.
 */
import { AstNodeType } from './Ast';
export var binaryOpTokenMap = (_binaryOpTokenMap = {}, _defineProperty(_binaryOpTokenMap, AstNodeType.PLUS_OP, '+'), _defineProperty(_binaryOpTokenMap, AstNodeType.MINUS_OP, '-'), _defineProperty(_binaryOpTokenMap, AstNodeType.TIMES_OP, '*'), _defineProperty(_binaryOpTokenMap, AstNodeType.DIV_OP, '/'), _defineProperty(_binaryOpTokenMap, AstNodeType.CONCATENATE_OP, '&'), _defineProperty(_binaryOpTokenMap, AstNodeType.POWER_OP, '^'), _defineProperty(_binaryOpTokenMap, AstNodeType.EQUALS_OP, '='), _defineProperty(_binaryOpTokenMap, AstNodeType.NOT_EQUAL_OP, '<>'), _defineProperty(_binaryOpTokenMap, AstNodeType.GREATER_THAN_OP, '>'), _defineProperty(_binaryOpTokenMap, AstNodeType.GREATER_THAN_OR_EQUAL_OP, '>='), _defineProperty(_binaryOpTokenMap, AstNodeType.LESS_THAN_OP, '<'), _defineProperty(_binaryOpTokenMap, AstNodeType.LESS_THAN_OR_EQUAL_OP, '<='), _binaryOpTokenMap);