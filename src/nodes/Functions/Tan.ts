import Decimal from 'decimal.js';
import { ITreeNode } from '../TreeNode';
import TrigFn from './TrigFn';
import { SPECIAL_ANGLES, QUADRANT_SIGNS } from '../../constants/specialAngles';

/**
 * Tan function node.
 * @class Tan
 * @extends {TreeNode}
 * @implements {ITreeNode}
 */

export default class Tan extends TrigFn implements ITreeNode {
  constructor(...x:ITreeNode[]) {
    if (x.length !== 1) {
      throw new SyntaxError(`Sine takes exactly one argument received ${x.length}`);
    }
    super('tan', x[0]);
  }

  /**
   * Evaluates the sine function
   * @returns the result of the sine function
   */
  evaluate() {
    Decimal.set({ precision: 500 });
    let x = this.operand.evaluate();
    const xx = x;
    Decimal.set({ precision: 20 });
    if (Tan.angle === 'radians') {
      x = Tan.toDegrees(x).toString();
    }
    const y = Tan.toFirstQuadrant(x);

    if (Tan.isSpecialAngle(y)) {
      const z = Tan.getQuadrant(x);
      return new Decimal(QUADRANT_SIGNS.sin[z] + SPECIAL_ANGLES.sin[y].evaluate()).toString();
    }
    if (Tan.angle === 'degrees') {
      return Tan.toRadins(xx).sin().toString();
    }
    return Decimal.sin(xx).toString();
  }

  /**
   * print the abstract syntax tree of the sine function
   * @returns the string representation of the sine function
   */
  toString() {
    return `tan(${this.operand.toString()})`;
  }
}
