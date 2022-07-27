import Decimal from 'decimal.js';
import TreeNode, { ITreeNode } from './TreeNode';

/**
 * Gammln node.
 * @returns the natural logarithm of the gamma function.
 */

export default class Gammln extends TreeNode implements ITreeNode {
  operand: TreeNode;

  constructor(x: TreeNode) {
    super('gammln');
    this.operand = x;
  }

  evaluate() {
    const x = new Decimal(this.operand.evaluate());
    let y; let tmp; let ser;
    const cof = [
      '57.1562356658629235', '-59.5979603554754912', '14.1360979747417471',
      '-0.491913816097620199', '0.339946499848118887e-4', '0.465236289270485756e-4',
      '-0.983744753048795646e-4', '0.158088703224912494e-3',
      '-0.210264441724104883e-3', '0.217439618115212643e-3',
      '-0.16431810653676389e-3', '0.844182239838527433e-4',
      '-0.261908384015814087e-4', '0.368991826595316234e-5',
    ];
    if (x.lt(0)) {
      throw new TypeError('bad arg in gammln');
    }
    y = x;

    tmp = x.plus('5.24218750000000000');
    tmp = x.plus('0.5').times(Decimal.ln(tmp)).minus(tmp);
    ser = new Decimal('0.999999999999997092');
    for (let j = 0; j < 14; j += 1) {
      y = y.plus('1');
      ser = ser.plus(new Decimal(cof[j]).div(y));
    }
    return tmp.plus(Decimal.ln(ser.times('2.5066282746310005').div(x))).toString();
  }

  toString(): string {
    return `gammln(${this.operand.toString()})`;
  }
}
