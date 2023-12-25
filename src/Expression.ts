import Decimal from 'decimal.js';
import Parser from './Parser';
import { TreeNode } from './nodes';
import { Config } from './nodes/TreeNode';
/**
 * Expression class for parsing and evaluating expressions.
 * @class Expression
 */
/* eslint-disable import/prefer-default-export */
export class Expression {
  parentNode: TreeNode;

  static #globalConfig: Config;

  constructor(expression: string) {
    const parser = new Parser();
    this.parentNode = parser.parse(expression);
  }

  /**
   * Evaluate the expression.
   * @returns The result of the evaluation.
   */
  evaluate(options?:Config): string {
    const mergedConfig = { ...Expression.#globalConfig, ...options };
    const { decimalPlaces, ...rest } = mergedConfig;
    TreeNode.config(rest);
    let result = this.parentNode.evaluate();
    if (decimalPlaces) {
      result = new Decimal(result).toDecimalPlaces(decimalPlaces).toString();
    }
    return result;
  }

  static config(obj:Config) {
    this.#globalConfig = obj;
  }
}
