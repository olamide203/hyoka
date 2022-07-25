import Token from './Token';

export enum TOKEN {NUMBER, ID, CONSTANT,
                   OPERATOR, LEFT_PAREN,
                   NEXT, FUNCTION,
                   RIGHT_PAREN, BINARAY_OPERATOR,
                   UNARY_OPERATOR, END}
// specifications for the tokenizer
const spec:[RegExp, TOKEN][] = [
  [/^\d+(\.\d+)?(e[+-]?\d+)?(?!\.)/, TOKEN.NUMBER],
  [/^(sin|cos|tan|log|ln)/, TOKEN.FUNCTION],
  [/^(π|pi|e)/, TOKEN.CONSTANT],
  [/^[A-Za-z_][A-za-z0-9_]*/, TOKEN.ID],
  [/^[/+*%^-]/, TOKEN.OPERATOR],
  [/^\(/, TOKEN.LEFT_PAREN],
  [/^\)/, TOKEN.RIGHT_PAREN],
  [/^\s+/, TOKEN.NEXT],

];

/**
 * Tokenizer to be used by parser
 */

export default class Lexer {
  cursor: number;

  input: string;

  constructor(input: string) {
    this.input = input;
    this.cursor = 0;
  }

  // checks if the cursor is at the end of the input
  isAtEnd():boolean {
    return this.cursor >= this.input.length;
  }

  /**
     * function to get next token
     */
  next():Token {
    if (this.isAtEnd()) {
      return new Token(TOKEN.END, '');
    }
    const str = this.input.slice(this.cursor);
    for (let i = 0; i < spec.length; i += 1) {
      const [regex, kind] = spec[i];
      const match = str.match(regex);
      if (match && kind === TOKEN.NEXT) {
        this.cursor += match[0].length;
        return this.next();
      }
      if (match) {
        this.cursor += match[0].length;
        return new Token(kind, match[0]);
      }
    }
    throw new Error(`Invalid token '${this.input[this.cursor]}' at position ${this.cursor}`);
  }

  /**
     * lookahead function to get the next token without advancing the cursor
     * @returns the next token
     */
  peek():Token {
    const token = this.next();
    this.cursor -= token.value.length;
    return token;
  }
}
