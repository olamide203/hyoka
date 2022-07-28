import Decimal from 'decimal.js';
import TreeNode, { ITreeNode } from './TreeNode';

/**
 * A modulo operation node.
 * @class Modulo
 * @extends {TreeNode}
 * @implements {ITreeNode}
 */
export default class Modulo extends TreeNode implements ITreeNode {
  left: ITreeNode;

  right: ITreeNode;

  constructor(left: ITreeNode, right: ITreeNode) {
    super('%');
    this.left = left;
    this.right = right;
  }

  /**
     * Evaluate the node.
     * @returns the result of the modulo operation.
     */
  evaluate():string {
    return new Decimal(this.left.evaluate()).mod(new Decimal(this.right.evaluate())).toString();
  }

  /**
     * print the node.
     * @returns the string representation of the node.
     */
  toString(): string {
    return `(${this.left.toString()} % ${this.right.toString()})`;
  }
}
