import Decimal from 'decimal.js';
import TreeNode, { ITreeNode } from '../TreeNode';

type SpecialAngle = 0 | 30 | 45 | 60 | 90;

/**
 * Trig function node
 * @class TrigFn
 * @extends {TreeNode}
 * @implements {ITreeNode}
 * @param {ITreeNode} operand
 */

export default class TrigFn extends TreeNode implements ITreeNode {
  operand:ITreeNode;

  constructor(value:string, operand:ITreeNode) {
    super(value);
    this.operand = operand;
  }

  /**
   * convert value from degrees to radians
   * @param x the value to convert
   * @returns {Decimal} the result of the conversion
  */
  static toRadins(x:string):Decimal {
    return Decimal.div(x, '180').times(Decimal.acos(-1));
  }

  //   convert value from radians to degrees
  static toDegrees(x:string):Decimal {
    return Decimal.div(x, Decimal.acos(-1)).times(180);
  }

  /**
   * get the quadrant of a angle
   * @param x the angle to in degrees
   * @returns {number} the quadrant of the angle
  */
  static getQuadrant(x:string):number {
    let y = new Decimal(x);
    while (y.gte(360)) {
      y = y.minus(360).abs();
    }
    return y.div(90).floor().toNumber();
  }

  /**
   * convert an angle to its first quadrant equivalent in degrees
   * @param x the angle to convert in degrees
   * @returns the result of the conversion
   */
  static toFirstQuadrant(x:string):number {
    let y = new Decimal(x);
    while (y.gt(90)) {
      y = y.minus(180).abs();
    }
    return +y;
  }

  /**
   * check if ana angle is a special angle [0, 30, 45, 60, 90]
   * @param x the angle to
   * @returns {boolean} true if the angle is a special angle
   */
  static isSpecialAngle(x:number):x is SpecialAngle {
    return [0, 30, 45, 60, 90].indexOf(x) > -1;
  }
}
