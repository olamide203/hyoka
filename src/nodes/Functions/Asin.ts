import Decimal from 'decimal.js';
import TrigFn from './TrigFn';
import { ITreeNode } from '../TreeNode';

/**
 * Asin function node
 * @class Asin
 * @extends {TrigFn}
 * @implements {ITreeNode}
 */

export default class Asin extends TrigFn implements ITreeNode {
  constructor(...x:ITreeNode[]) {
    if (x.length !== 1) {
      throw new SyntaxError(`asin takes exactly one argument received ${x.length}`);
    }
    super('asin', x[0]);
  }

  /**
   * Evaluates the asin of a value
   * @returns the result of the asin function
   */
  evaluate():string {
    const x = this.operand.evaluate();
    const xx = Decimal.asin(x).toString();
    if (Asin.angles === 'deg') {
      const res = Asin.toDegrees(xx).toString();
      return res;
    }
    return xx;
  }

  /**
   * Returns a string representation of the asin node
   *
   */
  toString(): string {
    return `asin(${this.operand.toString()})`;
  }
}
