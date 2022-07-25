export interface IToken {
    kind: number,
    value: string,
}
export default class Token implements IToken {
  kind: number;

  value: string;

  constructor(kind: number, value: string) {
    this.kind = kind;
    this.value = value;
  }

  toString():string {
    return `<Token ${this.kind} '${this.value}'>`;
  }
}
