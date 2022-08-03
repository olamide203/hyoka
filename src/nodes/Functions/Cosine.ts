import Decimal from 'decimal.js';
import { ITreeNode } from '../TreeNode';
import TrigFn from './TrigFn';
import { SPECIAL_ANGLES, QUADRANT_SIGNS } from '../../constants/specialAngles';

/**
 * Cosine  function node
 * @class Cosine
 * @extends {TreeNode}
 */
export default class Cosine extends TrigFn implements ITreeNode {
  constructor(...x:ITreeNode[]) {
    if (x.length !== 1) {
      throw new SyntaxError(`Cosine takes exactly one argument received ${x.length}`);
    }
    super('cos', x[0]);
  }

  /**
   * Evaluates the cosine function
   * @returns the result of the cosine function
   */
  evaluate() {
    Decimal.set({ precision: 500 });
    let x = this.operand.evaluate();
    const xx = x;
    Decimal.set({ precision: 20 });
    if (Cosine.angle === 'radians') {
      x = Cosine.toDegrees(x).toString();
    }
    const y = Cosine.toFirstQuadrant(x);

    if (Cosine.isSpecialAngle(y)) {
      const z = Cosine.getQuadrant(x);
      return new Decimal(QUADRANT_SIGNS.cos[z] + SPECIAL_ANGLES.cos[y].evaluate()).toString();
    }
    if (Cosine.angle === 'degrees') {
      return Cosine.toRadins(xx).cos().toString();
    }
    return Decimal.cos(xx).toString();
  }

  /**
   * print the abstract syntax tree of the cosine function
   * @returns the string representation of the cosine function
   */
  toString() {
    return `cos(${this.operand.toString()})`;
  }
}
