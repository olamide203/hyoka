import Decimal from 'decimal.js';
import TreeNode, { ITreeNode } from '../TreeNode';

/**
 * class Divide
 * @class Divide
 * @implements {ITreeNode}
 */

export default class Divide extends TreeNode implements ITreeNode {
  left: ITreeNode;

  right: ITreeNode;

  constructor(left: ITreeNode, right: ITreeNode) {
    super('/');
    this.left = left;
    this.right = right;
  }

  /**
   * evaluates the node
   * @returns the result of the evaluation
   * @example
   * const node = new Divide(new TreeNode('1'), new TreeNode('2'));
   * node.evaluate();
   * // returns '0.5'
   */
  evaluate() {
    return Decimal.div(this.left.evaluate(), this.right.evaluate()).toString();
  }

  /**
   * Returns the string representation of the node.
   * @returns  The string representation of the node.
   * @example
   * const node = new Divide(new TreeNode('1'), new TreeNode('2'));
   * node.toString();
   * // returns '(1/2)'
   */
  toString() {
    return `(${this.left.toString()} ${this.value} ${this.right.toString()})`;
  }
}
