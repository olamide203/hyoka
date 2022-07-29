import Decimal from 'decimal.js';
import { ITreeNode } from './TreeNode';
import TrigFn from './TrigFn';
import { SPECIAL_ANGLES, QUADRANT_SIGNS } from './constants';

/**
 * Sine  function node
 * @class Sine
 * @extends {TreeNode}
 */
export default class Sine extends TrigFn implements ITreeNode {
  constructor(operand:ITreeNode) {
    super('sin', operand);
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
    if (Sine.angle === 'radians') {
      x = Sine.toDegrees(x).toString();
    }
    const y = Sine.toFirstQuadrant(x);

    if (Sine.isSpecialAngle(y)) {
      const z = Sine.getQuadrant(x);
      return new Decimal(QUADRANT_SIGNS.sin[z] + SPECIAL_ANGLES.sin[y].evaluate()).toString();
    }
    if (Sine.angle === 'degrees') {
      return Sine.toRadins(xx).sin().toString();
    }
    return Decimal.sin(xx).toString();
  }

  /**
   * print the abstract syntax tree of the sine function
   * @returns the string representation of the sine function
   */
  toString() {
    return `sin(${this.operand.toString()})`;
  }
}
