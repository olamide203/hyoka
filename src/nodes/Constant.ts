import Decimal from 'decimal.js';
import TreeNode, { ITreeNode } from './TreeNode';

/**
 * A node that represents a mathematical constant
 * @class Constant
 * @implements {ITreeNode}
 * @extends {TreeNode}
 */
export default class Constant extends TreeNode implements ITreeNode {
  constructor(x:string) {
    const c = ['pi', 'PI', 'π', 'e', 'E'];
    if (c.indexOf(x) === -1) {
      throw new Error(`Invalid constant '${x}'`);
    }
    super(x);
  }

  evaluate(): string {
    switch (this.value) {
      case 'pi':
      case 'PI':
      case 'π':
        return Decimal.acos(-1).toString();
      case 'e':
      case 'E':
        return Decimal.exp(1).toString();
      default:
        throw new Error(`Invalid constant '${this.value}'`);
    }
  }
}
