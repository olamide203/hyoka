import Decimal from 'decimal.js';
import TreeNode, { ITreeNode } from '../TreeNode';

/**
 * NaturalLog node
 * @class NaturalLog
 */

export default class NaturalLog extends TreeNode implements ITreeNode {
  operand : TreeNode;

  constructor(...x : TreeNode[]) {
    if (x.length !== 1) {
      throw new SyntaxError(`ln takes exactly one argument, received ${x.length}`);
    }
    super('ln');
    [this.operand] = x;
  }

  /**
   * Evaluates the natural log function
   * @returns the result of the natural log function
   */
  evaluate() {
    return Decimal.ln(this.operand.evaluate()).toString();
  }

  /**
   * print the abstract syntax tree of the natural log function
   * @returns the string representation of the natural log function
   */
  toString() {
    return `ln(${this.operand.toString()})`;
  }
}
