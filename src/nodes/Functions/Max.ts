import Decimal from 'decimal.js';
import TreeNode, { ITreeNode } from '../TreeNode';
/**
 * max function node class
 * @class Max
 * @implements {ITreeNode}
 * @extends {TreeNode}
 */

export default class Max extends TreeNode implements ITreeNode {
  args: TreeNode[];

  constructor(...x: TreeNode[]) {
    super('min');
    this.args = x;
  }

  evaluate(): string {
    const a = this.args.map((arg) => arg.evaluate());
    return Decimal.max(...a).toString();
  }

  toString(): string {
    return `max(${this.args.map((arg) => arg.toString()).join(', ')})`;
  }
}
