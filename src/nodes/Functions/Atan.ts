import Decimal from 'decimal.js';
import { ITreeNode } from '../TreeNode';
import TrigFn from './TrigFn';

/**
 * atan function node
 * @class Atan
 * @extends {TreeNode}
 * @implements {ITreeNode}
 */

export default class Atan extends TrigFn implements ITreeNode {
  constructor(...x:ITreeNode[]) {
    if (x.length !== 1) {
      throw new SyntaxError(`atan takes exactly one argument received ${x.length}`);
    }
    super('atan', x[0]);
  }

  /**
   * evaluate the atan of a value
   * @returns the result of the atan function
   */
  evaluate():string {
    const x = this.operand.evaluate();
    const xx = Decimal.atan(x).toString();
    if (Atan.angles === 'deg') {
      const res = Atan.toDegrees(xx).toString();
      return res;
    }
    return xx;
  }

  /**
   * Returns a string representation of the atan node
   * @returns the string representation of the atan node
   */
  toString(): string {
    return `atan(${this.operand.toString()})`;
  }
}
