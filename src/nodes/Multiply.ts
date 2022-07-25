import Decimal from 'decimal.js';
import TreeNode, { ITreeNode } from './TreeNode';

/**
 * class Multiply
 * @class Multiply
 * @implements {ITreeNode}
 */

export default class Multiply extends TreeNode implements ITreeNode {
  left: ITreeNode;

  right: ITreeNode;

  constructor(left: ITreeNode, right: ITreeNode) {
    super('*');
    this.left = left;
    this.right = right;
  }

  /**
     * evaluates the node
     * @returns the result of the evaluation
     * @example
     * const node = new Multiply(new TreeNode('1'), new TreeNode('2'));
     * node.evaluate();
     * // returns '2'
     */
  evaluate() {
    return Decimal.mul(this.left.evaluate(), this.right.evaluate()).toString();
  }

  /**
     * Returns the string representation of the node.
     * @returns  The string representation of the node.
     * @example
     * const node = new Multiply(new TreeNode('1'), new TreeNode('2'));
     * node.toString();
     * // returns '(1*2)'
     */
  toString() {
    return `(${this.left.toString()} ${this.value} ${this.right.toString()})`;
  }
}
