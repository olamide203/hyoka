import Parser from './Parser';
import { TreeNode } from './nodes';
import { Config } from './nodes/TreeNode';
/**
 * Expression class for parsing and evaluating expressions.
 * @class MathExpression
 */

export default class MathExpression {
  parentNode: TreeNode;

  constructor(expression: string) {
    const parser = new Parser();
    this.parentNode = parser.parse(expression);
  }

  /**
   * Evaluate the expression.
   * @returns The result of the evaluation.
   */
  evaluate(): string {
    return this.parentNode.evaluate();
  }

  static config(obj:Config) {
    TreeNode.config(obj);
  }
}
