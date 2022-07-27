import Decimal from 'decimal.js';
import Gammln from './Gammln';
import TreeNode, { ITreeNode } from './TreeNode';

/**
 * Factorial node.
 * @param xx cc
 * @returns
 */
export default class Factorial extends TreeNode implements ITreeNode {
  operand: TreeNode;

  constructor(x: TreeNode) {
    super('!');
    this.operand = x;
  }

  evaluate():string {
    const x = new Decimal(this.operand.evaluate());
    if (x.lt(0)) {
      throw new TypeError('bad arg in factorial');
    }
    // return 1 for (o)! and 1!
    if (x.eq(0) || x.eq(1)) {
      return '1';
    }
    if (x.isInt()) {
      let i = new Decimal(1);
      for (let j = 2; j <= +x; j += 1) {
        i = i.times(j);
      }
      return i.toString();
    }
    // n! = gamma(n+1)
    const y = x.plus(1).toString();
    return Decimal.exp(new Gammln(new TreeNode(y)).evaluate()).toString();
  }
}
