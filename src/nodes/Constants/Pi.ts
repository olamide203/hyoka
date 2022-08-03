import Decimal from 'decimal.js';
import TreeNode, { ITreeNode } from '../TreeNode';

/**
 * pi node class
 * @class Pi
 * @implements {ITreeNode}
 * @extends {TreeNode}
 */
export default class Pi extends TreeNode implements ITreeNode {
  str: string;

  constructor() {
    Decimal.set({ precision: 500 });
    const value = Decimal.acos(-1).toString();
    Decimal.set({ precision: 20 });
    super(value);
    this.str = 'π';
  }

  evaluate(): string {
    return this.value;
  }

  toString(): string {
    return this.str;
  }
}
