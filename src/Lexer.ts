import Token, { Tokens } from './Token';

// specifications for the tokenizer
const spec:[RegExp, Tokens][] = [
  [/^\d+(\.\d+)?(e[+-]?\d+)?(?!\.)/, Tokens.NUMBER],
  [/^(sin|cos|tan|log|ln|gammln|max|min|asin|acos)/, Tokens.FUNCTION],
  [/^(π|pi|e)/, Tokens.CONSTANT],
  [/^[A-Za-z_][A-za-z0-9_]*/, Tokens.ID],
  [/^[/+*%^-]/, Tokens.BINARY_INFIX],
  [/^[-+]/, Tokens.UNARY_PREFIX],
  [/^!/, Tokens.UNARY_POSTFIX],
  [/^\(/, Tokens.LEFT_PAREN],
  [/^,/, Tokens.COMMA],
  [/^\)/, Tokens.RIGHT_PAREN],
  [/^\s+/, Tokens.NEXT],

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
      return new Token(Tokens.END, '');
    }
    const str = this.input.slice(this.cursor);

    for (let i = 0; i < spec.length; i += 1) {
      const [regex, type] = spec[i];
      const match = str.match(regex);
      if (match && type === Tokens.NEXT) {
        this.cursor += match[0].length;
        return this.next();
      }
      if (match) {
        this.cursor += match[0].length;
        return new Token(type, match[0]);
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
