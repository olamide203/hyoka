import Lexer from './Lexer';
import Token, { Tokens } from './Token';
import TreeNode, { ITreeNode } from './nodes/TreeNode';
import {
  BINARY_NODE_MAP, UNARY_NODE_MAP,
  UNARY_OPERATOR_PREC, BINARAY_OPERATOR_PREC,
  FUNC_NODE_MAP, CONSTANT_NODES,
} from './constants';
/**
 * Parser to be used by the interpreter
 * implementation of the shunting-yard a:lgorithm
 * https://en.wikipedia.org/wiki/Shunting_yard_algorithm
 */
export default class Parser {
  private operatorStack:Token[] = [];

  operandStack:ITreeNode[] = [];

  currentToken:Token;

  lexer: Lexer;

  constructor() {
    this.operandStack = [];
    this.operatorStack = [];
    this.lexer = new Lexer('');
    this.currentToken = this.lexer.next();
  }

  reset(input:string):void {
    this.lexer = new Lexer(input);
    this.operandStack = [];
    this.operatorStack = [];
  }

  /**
   * create a new node from a
   * @param token the token to create the node from
   * @returns the new node
   */
  private createNode(token:Token) {
    let left; let right; let node;
    switch (token.kind) {
      case Tokens.NUMBER:
        node = new TreeNode(token.value);
        break;
      case Tokens.BINARY_INFIX:
        right = this.getTopNode();
        left = this.getTopNode();
        node = BINARY_NODE_MAP[token.value](left, right);
        break;
      case Tokens.UNARY_PREFIX:
        left = this.getTopNode();
        node = UNARY_NODE_MAP[token.value](left);
        break;
      case Tokens.UNARY_POSTFIX:
        left = this.getTopNode();
        node = UNARY_NODE_MAP[token.value](left);
        break;
      case Tokens.FUNCTION:
        left = this.getTopNode();
        node = FUNC_NODE_MAP[token.value](left);
        break;
      case Tokens.CONSTANT:
        node = CONSTANT_NODES[token.value]();
        break;
      default:
        throw new SyntaxError(`unexpected token '${token.value}'`);
    }
    this.operandStack.push(node);
  }

  /**
   * helper function to check if there is an operator on the stack with higher
   * or equal precedence to this.currentToken other than the left parenthesis
   */
  private hasLowerPrecedence(token:Token):boolean {
    const top = this.operatorStack[this.operatorStack.length - 1];
    // TODO: check if operator is unary or binary
    if (!top || top.kind === Tokens.LEFT_PAREN) {
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
  private getTopOperator():Token {
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
  private static getPrecedence(token:Token):number {
    switch (token.kind) {
      case Tokens.BINARY_INFIX:
        return BINARAY_OPERATOR_PREC[token.value];
      case Tokens.UNARY_PREFIX:
        return UNARY_OPERATOR_PREC[token.value];
      case Tokens.UNARY_POSTFIX:
        return UNARY_OPERATOR_PREC[token.value];
      default:
        throw new SyntaxError(`unexpected token '${token.value}'`);
    }
  }

  /**
   * determine the next token and update the current token
   * @throws if the lexer has no more tokens
   */
  private getNextToken():Token {
    // peek at the next token
    const token = this.lexer.peek();
    switch (token.kind) {
      case Tokens.BINARY_INFIX:
        return this.checkUnary(this.lexer.next());
      case Tokens.RIGHT_PAREN:
        return this.lexer.next();
      case Tokens.UNARY_POSTFIX:
        return this.checkUnary(this.lexer.next());
      default:
        return this.checkImplicitMultiplication();
    }
  }

  /**
   * check if it needs to be converted to a unary operator
   */
  private checkUnary(token:Token):Token {
    const x = token;
    const nodes = this.operandStack.length;
    // count number of binay operators in the operator stack
    const binaryOperators = this.operatorStack.reduce((acc, curr) => {
      if (curr.kind === Tokens.BINARY_INFIX) {
        return acc + 1;
      }
      return acc;
    }, 0);
    if (nodes <= binaryOperators && token.kind === Tokens.UNARY_POSTFIX) {
      throw new SyntaxError(`unexpected token '${token.value}'`);
    }
    if (nodes <= binaryOperators && (token.value === '-' || token.value === '+')) {
      x.kind = Tokens.UNARY_PREFIX;
    }

    return x;
  }

  checkImplicitMultiplication():Token {
    const nodes = this.operandStack.length;
    // count number of binay operators in the operator stack
    const binaryOperators = this.operatorStack.reduce((acc, curr) => {
      if (curr.kind === Tokens.BINARY_INFIX) {
        return acc + 1;
      }
      return acc;
    }, 0);
    if (nodes > binaryOperators) {
      return new Token(Tokens.BINARY_INFIX, '*');
    }
    return this.lexer.next();
  }
  /**
();
     * parser.parse('1+2*3');
     * // returns the root node of the tree
   */

  parse(input:string):ITreeNode {
    this.reset(input);
    // while there are tokens to be read read the next token

    while (!this.lexer.isAtEnd()) {
      this.currentToken = this.getNextToken();
      // if token is a number, put it into the output queue
      if (this.currentToken.kind === Tokens.NUMBER) {
        this.createNode(this.currentToken);
      }
      //   if token is a constant
      if (this.currentToken.kind === Tokens.CONSTANT) {
        this.createNode(this.currentToken);
      }
      //   if token is a function put it into the operator stack
      if (this.currentToken.kind === Tokens.FUNCTION) {
        this.operatorStack.push(this.currentToken);
      }
      if (this.currentToken.isOperator()) {
        // this.currentToken = this.updateToken(this.currentToken);
        while (this.hasLowerPrecedence(this.currentToken)) {
          // pop the operator from the operator stack and put it into the output queue
          this.createNode(this.getTopOperator());
        }
        // push the operator onto the operator stack
        this.operatorStack.push(this.currentToken);
      }
      if (this.currentToken.kind === Tokens.LEFT_PAREN) {
        // TODO: check for implicit multiplication
        this.operatorStack.push(this.currentToken);
      }
      if (this.currentToken.kind === Tokens.RIGHT_PAREN) {
        while (this.operatorStack[this.operatorStack.length - 1].kind !== Tokens.LEFT_PAREN) {
        //   assert that the operator stack is not empty
          if (this.operatorStack.length === 0) {
            throw new SyntaxError('unexpected right parenthesis');
          }
          this.createNode(this.getTopOperator());
        }
        //   assert there is a left parenthesis on the operator stack
        if (this.operatorStack[this.operatorStack.length - 1].kind !== Tokens.LEFT_PAREN) {
          throw new SyntaxError('unexpected right parenthesis');
        }
        this.operatorStack.pop();
        //   if there is a function on the operator stack, pop it and put it into the output queue
        if (this.operatorStack[this.operatorStack.length - 1]?.kind === Tokens.FUNCTION) {
          this.createNode(this.getTopOperator());
        }
      }
    }
    // pop remaining items from operator stack into output queue
    while (this.operatorStack.length > 0) {
      // assert the operator on top of the stack is not a left parenthesis
      if (this.operatorStack[0].kind === Tokens.LEFT_PAREN) {
        throw new SyntaxError('unexpected left parenthesis');
      }
      this.createNode(this.getTopOperator());
    }
    // return the root node of the tree
    return this.operandStack[0];
  }
}
