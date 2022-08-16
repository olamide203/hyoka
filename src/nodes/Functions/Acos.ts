import Decimal from 'decimal.js';
import TrigFn from './TrigFn';
import { ITreeNode } from '../TreeNode';

/**
 * arccos function tree node
 * @class Acos
 * @extends {TrigFn}
 * @implements {ITreeNode}
 */

export default class Acos extends TrigFn implements ITreeNode {
  constructor(...x:ITreeNode[]) {
    if (x.length !== 1) {
      throw new SyntaxError(`acos takes exactly one argument, received ${x.length}`);
    }
    super('acos', x[0]);
  }

  /**
   * evaluates the acos of a value
   *
   */
  evaluate() {
    const x = this.operand.evaluate();
    const xx = Decimal.acos(x).toString();
    if (Acos.angles === 'deg') {
      const res = Acos.toDegrees(xx).toString();
      return res;
    }
    return xx;
  }

  /**
   * returns a string representation of the acos node
   */
  toString() {
    return `acos(${this.operand.toString()})`;
  }
}
