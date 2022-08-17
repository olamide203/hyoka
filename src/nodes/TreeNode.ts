import Decimal from 'decimal.js';

export interface Config extends Decimal.Config {
    angles?: 'deg' | 'rad';
}

export interface ITreeNode{
    value: string;
    left?: ITreeNode;
    right?: ITreeNode;
    evaluate(): string;
    toString(): string;
}

export default class TreeNode implements ITreeNode {
  value: string;

  protected static angles:'deg'|'rad' = 'rad';

  constructor(value: string) {
    this.value = value;
  }

  evaluate(): string {
    return this.value;
  }

  toString(): string {
    return this.value;
  }

  static config(obj:Config) {
    const { angles, ...rest } = obj;
    Decimal.config(rest);
    if (angles === 'deg' || angles === 'rad') {
      TreeNode.angles = angles;
    }
  }
}
