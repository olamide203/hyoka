export interface Scope {
    [key: string]: string | number | boolean;
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

  constructor(value: string) {
    this.value = value;
  }

  evaluate(): string {
    return this.value;
  }

  toString(): string {
    return this.value;
  }
}
