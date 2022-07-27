export enum Tokens {NUMBER, ID, CONSTANT,
    OPERATOR, LEFT_PAREN,
    NEXT, FUNCTION,
    RIGHT_PAREN, BINARY_INFIX,
    UNARY_PREFIX, UNARY_POSTFIX, END, START}

export interface IToken {
    kind: number,
    value: string,
    isOperator(): boolean,
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

  /**
   * @returns true if token is an operator
   */
  isOperator():boolean {
    return this.kind === Tokens.BINARY_INFIX || this.kind === Tokens.UNARY_PREFIX
    || this.kind === Tokens.UNARY_POSTFIX;
  }
}
