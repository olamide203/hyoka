import Decimal from 'decimal.js';
import TreeNode, { ITreeNode } from './TreeNode';

/**
 * class Subtract
 */

export default class Subtract extends TreeNode implements ITreeNode {
  left: ITreeNode;

  right: ITreeNode;

  constructor(left: ITreeNode, right?: ITreeNode) {
    super('-');
    this.left = right ? left : new TreeNode('0');
    this.right = right || left;
  }

  /**
   * evaluates the node
   * @returns the result of the evaluation
   * @example
   * const node = new Subtract(new TreeNode('1'), new TreeNode('2'));
   * node.evaluate();
   * // returns '-1'
   */
  evaluate() {
    return Decimal.sub(this.left.evaluate(), this.right.evaluate()).toString();
  }

  /**
     * Returns the string representation of the node.
     * @returns The string representation of the node.
     * @example
     * const node = new Subtract(new TreeNode('1'), new TreeNode('2'));
     * node.toString();
     */
  toString() {
    return `(${this.left.toString()} ${this.value} ${this.right.toString()})`;
  }
}
