import Decimal from 'decimal.js';
import TreeNode, { ITreeNode } from '../TreeNode';

/**
 * Additive node class.
 * @class
 * @implements {ITreeNode}
 * @param left - The left child of the node.
 * @param right - The right child of the node.
 */
export default class Add extends TreeNode implements ITreeNode {
  left: ITreeNode;

  right: ITreeNode;

  constructor(a:ITreeNode, b?:ITreeNode) {
    super('+');
    this.left = b ? a : new TreeNode('0');
    this.right = b || a;
  }

  /**
   * Evaluates the node.
   * @returns The result of the evaluation.
   * @example
   * const node = new Add(new TreeNode('1'), new TreeNode('2'));
   * node.evaluate();
   * // returns '3'
   */
  evaluate(): string {
    return Decimal.add(this.left.evaluate(), this.right.evaluate()).toString();
  }
  /**
     * Returns the string representation of the node.
     *  @returns The string representation of the node.
     * @example
     * const node = new Add(new TreeNode('1'), new TreeNode('2'));
     * node.toString();
     * // returns '1'
     */

  toString(): string {
    return `(${this.left.toString()} ${this.value} ${this.right.toString()})`;
  }
}
