import Lexer from './Lexer';
import Token, { Tokens } from './Token';
import TreeNode, { ITreeNode } from './nodes/TreeNode';
import {
  BINARY_NODE_MAP, UNARY_NODE_MAP,
  UNARY_OPERATOR_PREC, BINARAY_OPERATOR_PREC,
  FUNC_NODE_MAP,
} from './constants/nodeMaps';
import { Constant } from './nodes';

/**
 * Parser to be used by the interpreter
 * implementation of the shunting-yard a:lgorithm
 * https://en.wikipedia.org/wiki/Shunting_yard_algorithm
 */

export default class Parser {
  private operatorStack:Token[] = [];

  operandStack:ITreeNode[] = [];

  currentToken:Token;

  previousToken:Token;

  lexer: Lexer;

  constructor() {
    this.operandStack = [];
    this.operatorStack = [];
    this.lexer = new Lexer('');
    this.currentToken = this.lexer.next();
    this.previousToken = this.currentToken;
  }

  reset(input:string):void {
    this.currentToken = this.lexer.next();
    this.previousToken = this.currentToken;
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
    let node:TreeNode;
    switch (token.type) {
      case Tokens.NUMBER:
        node = new TreeNode(token.value);
        return this.operandStack.push(node);
      case Tokens.CONSTANT:
        node = new Constant(token.value);
        return this.operandStack.push(node);
      case Tokens.BINARY_INFIX:
        return this.createBinaryNode(token);
      case Tokens.UNARY_PREFIX:
      case Tokens.UNARY_POSTFIX:
        return this.createUnaryNode(token);
      default:
        throw new SyntaxError(`unexpected token '${token.value}'`);
    }
  }

  //   helper function to create function node
  private createFunctionNode(token:Token) {
    const args = [];
    while (this.operandStack[this.operandStack.length - 1].value !== '(') {
      args.unshift(this.getTopNode());
      if (this.operandStack.length === 0) {
        throw new SyntaxError('unexpected end of input');
      }
    }
    // assert there is a left parenthesis on the output queue
    if (this.operandStack[this.operandStack.length - 1].value !== '(') {
      throw new SyntaxError('unexpected end of input');
    }
    // remove the left parenthesis
    this.operandStack.pop();
    const node = FUNC_NODE_MAP[token.value](args);
    this.operandStack.push(node);
  }

  //   helper function to create binary node
  private createBinaryNode(token:Token) {
    const right = this.getTopNode();
    const left = this.getTopNode();
    const node = BINARY_NODE_MAP[token.value](left, right);
    this.operandStack.push(node);
  }

  //   helper function to create unary node
  private createUnaryNode(token:Token) {
    const left = this.getTopNode();
    const node = UNARY_NODE_MAP[token.value](left);
    this.operandStack.push(node);
  }

  /**
   * helper function to check if there is an operator on the stack with higher
   * or equal precedence to this.currentToken other than the left parenthesis
   */
  private hasLowerPrecedence(token:Token):boolean {
    const top = this.operatorStack[this.operatorStack.length - 1];
    // TODO: check if operator is unary or binary
    if (!top || top.type === Tokens.LEFT_PAREN) {
      return false;
    }
    const x = Parser.getTokenPrec(token);
    const y = Parser.getTokenPrec(top);
    return x < y || (token.isLeftAssociative() && x === y);
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
  private static getTokenPrec(token:Token):number {
    switch (token.type) {
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
    switch (token.type) {
      case Tokens.BINARY_INFIX:
        return this.checkBinaryToken();
      case Tokens.RIGHT_PAREN:
      case Tokens.UNARY_POSTFIX:
        return this.checkPostfixToken();
      default:
        return this.checkImplicitMultiplication(token);
    }
  }

  /**
   * helper function to check if a binary token is a valid next token
   */
  private checkBinaryToken():Token {
    const x = this.lexer.next();
    if (x.isUnaryOperator(this.previousToken)) {
      x.type = Tokens.UNARY_PREFIX;
      return x;
    }
    if (x.type === Tokens.BINARY_INFIX) {
      switch (this.previousToken.type) {
        case Tokens.BINARY_INFIX:
        case Tokens.FUNCTION:
        case Tokens.LEFT_PAREN:
        case Tokens.END:
          throw new SyntaxError(`unexpected token '${x.value}'`);
        default:
          return x;
      }
    }
    throw new SyntaxError(`unexpected token ${x.value}`);
  }

  /**
     * helper function to check if a right parenthesis token is a valid next token
     * @throws if the token is not a right parenthesis
     */
  private checkPostfixToken():Token {
    const x = this.lexer.next();
    if (x.type === Tokens.RIGHT_PAREN || x.type === Tokens.UNARY_POSTFIX) {
      switch (this.previousToken.type) {
        case Tokens.BINARY_INFIX:
        case Tokens.FUNCTION:
        case Tokens.LEFT_PAREN:
        case Tokens.END:
        case Tokens.UNARY_PREFIX:
          throw new SyntaxError(`unexpected token '${x.value}'`);
        default:
          return x;
      }
    }
    throw new SyntaxError(`unexpected token '${x.value}'`);
  }

  checkImplicitMultiplication(token:Token):Token {
    if (token.needsImplicitMultiplication(this.previousToken)) {
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
      this.previousToken = this.currentToken;
      this.currentToken = this.getNextToken();
      // if token is a number, put it into the output queue
      if (this.currentToken.type === Tokens.NUMBER) {
        this.createNode(this.currentToken);
      }
      //   if token is a constant
      if (this.currentToken.type === Tokens.CONSTANT) {
        this.createNode(this.currentToken);
      }
      //   if token is a function put it into the operator stack
      if (this.currentToken.type === Tokens.FUNCTION) {
        // push a dummy left parenthesis onto the output queue
        this.operandStack.push(new TreeNode('('));
        // push the function onto the operator stack
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
      if (this.currentToken.type === Tokens.LEFT_PAREN) {
        // TODO: check for implicit multiplication
        this.operatorStack.push(this.currentToken);
      }
      if (this.currentToken.type === Tokens.RIGHT_PAREN) {
        while (this.operatorStack[this.operatorStack.length - 1].type !== Tokens.LEFT_PAREN) {
        //   assert that the operator stack is not empty
          if (this.operatorStack.length === 0) {
            throw new SyntaxError('unexpected right parenthesis');
          }
          this.createNode(this.getTopOperator());
        }
        //   assert there is a left parenthesis on the operator stack
        if (this.operatorStack[this.operatorStack.length - 1].type !== Tokens.LEFT_PAREN) {
          throw new SyntaxError('unexpected right parenthesis');
        }
        this.operatorStack.pop();
        //   if there is a function on the operator stack, pop it and put it into the output queue
        if (this.operatorStack[this.operatorStack.length - 1]?.type === Tokens.FUNCTION) {
          this.createFunctionNode(this.getTopOperator());
        }
      }
      if (this.currentToken.type === Tokens.COMMA) {
        let len = this.operatorStack.length;
        while (this.operatorStack[len - 1].type !== Tokens.LEFT_PAREN) {
          if (this.operatorStack.length === 0) {
            throw new SyntaxError('unexpected comma');
          }
          this.createNode(this.getTopOperator());
          len = this.operatorStack.length;
        }
        len = this.operatorStack.length;
        // assert there is a left parenthesis or comma at the top of the operator stack
        if (this.operatorStack[len - 1].type !== Tokens.LEFT_PAREN) {
          throw new SyntaxError('unexpected comma');
        }
      }
    }
    // pop remaining items from operator stack into output queue
    while (this.operatorStack.length > 0) {
      // assert the operator on top of the stack is not a left parenthesis
      if (this.operatorStack[0].type === Tokens.LEFT_PAREN) {
        throw new SyntaxError('unexpected left parenthesis');
      }
      this.createNode(this.getTopOperator());
    }
    if (Array.isArray(this.operandStack[0])) {
      throw new SyntaxError('unexpected left parenthesis');
    }
    // return the root node of the tree
    return this.operandStack[0];
  }
}
