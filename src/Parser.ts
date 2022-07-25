import Lexer, { TOKEN } from './Lexer';
import { IToken } from './Token';
import TreeNode, { ITreeNode } from './nodes/TreeNode';
import {
  BINARY_NODE_MAP, UNARY_NODE_MAP,
  UNARY_OPERATOR_PREC, BINARAY_OPERATOR_PREC,
  FUNC_NODE_MAP, CONSTANT_NODES,
} from './constants';
import { isValidProp } from './utils';
/**
 * Parser to be used by the interpreter
 * implementation of the shunting-yard algorithm
 * https://en.wikipedia.org/wiki/Shunting_yard_algorithm
 */
export default class Parser {
  private operatorStack:IToken[] = [];

  operandStack:ITreeNode[] = [];

  currentToken:IToken;

  lexer: Lexer;

  constructor() {
    this.operandStack = [];
    this.operatorStack = [];
    this.lexer = new Lexer('');
    this.currentToken = this.lexer.next();
  }

  reset(input:string):void {
    this.lexer = new Lexer(input);
  }

  /**
   * create a new node from a
   * @param token the token to create the node from
   * @returns the new node
   */
  private createNode(token:IToken) {
    let node;
    if (token.kind === TOKEN.NUMBER) {
      node = new TreeNode(token.value);
    }
    if (token.kind === TOKEN.CONSTANT && isValidProp(token.value, CONSTANT_NODES)) {
      node = CONSTANT_NODES[token.value];
    }
    if (token.kind === TOKEN.BINARAY_OPERATOR && isValidProp(token.value, BINARY_NODE_MAP)) {
      const right = this.getTopNode();
      const left = this.getTopNode();
      node = BINARY_NODE_MAP[token.value](left, right);
    }
    if (token.kind === TOKEN.UNARY_OPERATOR && isValidProp(token.value, UNARY_NODE_MAP)) {
      node = UNARY_NODE_MAP[token.value](this.getTopNode());
    }
    if (token.kind === TOKEN.FUNCTION && isValidProp(token.value, FUNC_NODE_MAP)) {
      node = FUNC_NODE_MAP[token.value](this.getTopNode());
    }
    if (!node) {
      throw new SyntaxError(`unexpected token '${token.value}'`);
    }
    this.operandStack.push(node);
  }

  /**
   * helper function to check if there is an operator on the stack with higher
   * or equal precedence to this.currentToken other than the left parenthesis
   */
  private hasLowerPrecedence(token:IToken):boolean {
    const top = this.operatorStack[this.operatorStack.length - 1];
    // TODO: check if operator is unary or binary
    if (!top || top.kind === TOKEN.LEFT_PAREN) {
      return false;
    }
    return Parser.getPrecedence(token) < Parser.getPrecedence(top);
  }

  /**
   * helper function to remove the topmost node from the operand stack
   * @returns the last node from the operand stack
   * @throws if the operand stack is empty
   */
  private getTopNode():ITreeNode {
    const node = this.operandStack.pop();
    if (!node) {
      throw new SyntaxError('unexpected end of input');
    }
    return node;
  }

  /**
   * helper function to remove the topmost operator from the operator stack
   * @returns the last operator from the operator stack
   * @throws if the operator stack is empty
   */
  private getTopOperator():IToken {
    const operator = this.operatorStack.pop();
    if (!operator) {
      throw new SyntaxError('unexpected end of input');
    }
    return operator;
  }

  /**
   * helper function to determine the precedence of an operator
   * @param token the token to determine the precedence of
   * @returns the precedence of the token
   * @throws if the token is not an operator
   */
  private static getPrecedence(token:IToken):number {
    if (token.kind === TOKEN.BINARAY_OPERATOR && isValidProp(token.value, BINARAY_OPERATOR_PREC)) {
      return BINARAY_OPERATOR_PREC[token.value];
    }

    if (token.kind === TOKEN.UNARY_OPERATOR && isValidProp(token.value, UNARY_OPERATOR_PREC)) {
      return UNARY_OPERATOR_PREC[token.value];
    }
    throw new SyntaxError(`unexpected token '${token.value}'`);
  }

  /**
   * helper function to update current token kind
   */
  private updateToken(token:IToken):IToken {
    const result = token;
    // count the number of nodes in the operand stack
    const nodes = this.operandStack.length;
    // count number of binay operators in the operator stack
    const binaryOperators = this.operatorStack.reduce((acc, curr) => {
      if (curr.kind === TOKEN.BINARAY_OPERATOR) {
        return acc + 1;
      }
      return acc;
    }, 0);

    if (nodes > binaryOperators && token.kind === TOKEN.OPERATOR) {
      result.kind = TOKEN.BINARAY_OPERATOR;
    }
    if (nodes <= binaryOperators && result.kind === TOKEN.OPERATOR
        && (result.value === '-' || result.value === '+')) {
      result.kind = TOKEN.UNARY_OPERATOR;
    }
    if (result.kind === TOKEN.OPERATOR) {
      throw new SyntaxError(`unexpected token '${result.value}'`);
    }
    return result;
  }

  /**
   * determine the next token and update the current token
   * @throws if the lexer has no more tokens
   */
  private getNextToken():IToken {
    // peek at the next token
    const token = this.lexer.peek();
    if (token.kind === TOKEN.RIGHT_PAREN) {
      return this.lexer.next();
    }
    const nodes = this.operandStack.length;
    // count number of binay operators in the operator stack
    const binaryOperators = this.operatorStack.reduce((acc, curr) => {
      if (curr.kind === TOKEN.BINARAY_OPERATOR) {
        return acc + 1;
      }
      return acc;
    }, 0);
    if (token.kind !== TOKEN.OPERATOR && nodes > binaryOperators) {
      return { kind: TOKEN.OPERATOR, value: '*' };
    }

    return this.lexer.next();
  }

  /**
     * Parses the input string and returns the root node of the tree
     * @returns the root node of the tree
     * @example
     * const parser = new Parser();
     * parser.parse('1+2*3');
     * // returns the root node of the tree
   */

  parse(input:string) {
    this.reset(input);
    // while there are tokens to be read read the next token

    while (!this.lexer.isAtEnd()) {
      this.currentToken = this.getNextToken();
      // if token is a number, put it into the output queue
      if (this.currentToken.kind === TOKEN.NUMBER) {
        this.createNode(this.currentToken);
      }
      //   if token is a constant
      if (this.currentToken.kind === TOKEN.CONSTANT) {
        this.createNode(this.currentToken);
      }
      //   if token is a function put it into the operator stack
      if (this.currentToken.kind === TOKEN.FUNCTION) {
        this.operatorStack.push(this.currentToken);
      }
      if (this.currentToken.kind === TOKEN.OPERATOR) {
        this.currentToken = this.updateToken(this.currentToken);
        while (this.hasLowerPrecedence(this.currentToken)) {
          // pop the operator from the operator stack and put it into the output queue
          this.createNode(this.getTopOperator());
        }
        // push the operator onto the operator stack
        this.operatorStack.push(this.currentToken);
      }
      if (this.currentToken.kind === TOKEN.LEFT_PAREN) {
        // TODO: check for implicit multiplication
        this.operatorStack.push(this.currentToken);
      }
      if (this.currentToken.kind === TOKEN.RIGHT_PAREN) {
        while (this.operatorStack[this.operatorStack.length - 1].kind !== TOKEN.LEFT_PAREN) {
        //   assert that the operator stack is not empty
          if (this.operatorStack.length === 0) {
            throw new SyntaxError('unexpected right parenthesis');
          }
          this.createNode(this.getTopOperator());
        }
        //   assert there is a left parenthesis on the operator stack
        if (this.operatorStack[this.operatorStack.length - 1].kind !== TOKEN.LEFT_PAREN) {
          throw new SyntaxError('unexpected right parenthesis');
        }
        this.operatorStack.pop();
        //   if there is a function on the operator stack, pop it and put it into the output queue
        if (this.operatorStack[this.operatorStack.length - 1]?.kind === TOKEN.FUNCTION) {
          this.createNode(this.getTopOperator());
        }
      }
    }
    // pop remaining items from operator stack into output queue
    while (this.operatorStack.length > 0) {
      // assert the operator on top of the stack is not a left parenthesis
      if (this.operatorStack[0].kind === TOKEN.LEFT_PAREN) {
        throw new SyntaxError('unexpected left parenthesis');
      }
      this.createNode(this.getTopOperator());
    }
    // return the root node of the tree
    return this.operandStack[0];
  }
}
