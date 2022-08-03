export enum Tokens {NUMBER, ID, CONSTANT,
    OPERATOR, LEFT_PAREN,
    NEXT, FUNCTION,
    RIGHT_PAREN, BINARY_INFIX,
    UNARY_PREFIX, UNARY_POSTFIX, END, START, COMMA}

export interface IToken {
    type: number,
    value: string,
    isOperator(): boolean,
}
export default class Token implements IToken {
  type: number;

  value: string;

  constructor(type: number, value: string) {
    this.type = type;
    this.value = value;
  }

  toString():string {
    return `<Token ${this.type} '${this.value}'>`;
  }

  /**
   * @returns true if token is an operator
   */
  isOperator():boolean {
    return this.type === Tokens.BINARY_INFIX || this.type === Tokens.UNARY_PREFIX
    || this.type === Tokens.UNARY_POSTFIX;
  }

  /**
     * check if a token needs to be implicitly multiplied with this token
     * @param token the token to check
     */
  needsImplicitMultiplication(token: Token):boolean {
    if (token.type === Tokens.NUMBER || token.type === Tokens.CONSTANT
        || token.type === Tokens.ID) {
      switch (this.type) {
        case Tokens.NUMBER:
        case Tokens.CONSTANT:
        case Tokens.ID:
        case Tokens.FUNCTION:
        case Tokens.LEFT_PAREN:
          return true;
        default:
          return false;
      }
    }
    if (token.type === Tokens.RIGHT_PAREN) {
      switch (this.type) {
        case Tokens.NUMBER:
        case Tokens.CONSTANT:
        case Tokens.ID:
        case Tokens.FUNCTION:
        case Tokens.LEFT_PAREN:
          return true;
        default:
          return false;
      }
    }
    return false;
  }

  /**
     * check if a binary operator token should be treated as a unary operator
     * based on the token before it
     * @param token the token to check
     */
  isUnaryOperator(token: Token):boolean {
    if (this.value === '+' || this.value === '-') {
      return token.type === Tokens.BINARY_INFIX
      || token.type === Tokens.END || token.type === Tokens.UNARY_PREFIX;
    }
    return false;
  }

  /**
     * check if a token is left associative
     *
     */
  isLeftAssociative():boolean {
    return this.type === Tokens.BINARY_INFIX && this.value !== '^';
  }
}
