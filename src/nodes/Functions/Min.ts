import Decimal from 'decimal.js';
import TreeNode, { ITreeNode } from '../TreeNode';
/**
 * min function node class
 * @class Min
 * @implements {ITreeNode}
 * @extends {TreeNode}
 */

export default class Min extends TreeNode implements ITreeNode {
  args: TreeNode[];

  constructor(...x: TreeNode[]) {
    super('min');
    this.args = x;
  }

  evaluate(): string {
    const a = this.args.map((arg) => arg.evaluate());
    return Decimal.min(...a).toString();
  }

  toString(): string {
    return `min(${this.args.map((arg) => arg.toString()).join(', ')})`;
  }
}
