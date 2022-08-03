import { describe, expect, it } from 'vitest';
import Parser from '../src/Parser';

describe('Parser', () => {
  it('can parse a simple expression', () => {
    const parser = new Parser();
    const ast = parser.parse('1 + 2');
    const ast2 = parser.parse('1 - 2');
    expect(ast.toString()).toEqual('(1 + 2)');
    expect(ast2.toString()).toEqual('(1 - 2)');
  });
  it('can parse a simple expression with spaces', () => {
    const parser = new Parser();
    const ast1 = parser.parse('1   + 2');
    const ast2 = parser.parse('2 ^ 2 ^ 3');
    expect(ast1.toString()).toEqual('(1 + 2)');
    expect(ast2.toString()).toEqual('(2 ^ (2 ^ 3))');
  });
  it('can parse expressions with nested parenthesis', () => {
    const parser = new Parser();
    const ast = parser.parse('1 + (2 +(3 + 4))');
    expect(ast.toString()).toEqual('(1 + (2 + (3 + 4)))');
  });
  it('can parse operations with implicit multiplication', () => {
    const parser = new Parser();
    const ast = parser.parse('1 + 2(3+5)');
    expect(ast.toString()).toEqual('(1 + (2 * (3 + 5)))');
  });
  it('can parse expressions with unary operators', () => {
    const parser = new Parser();
    const ast1 = parser.parse('-1 + 2');
    const ast2 = parser.parse('-1 + -2');
    const ast3 = parser.parse('3 - - -1');
    const ast4 = parser.parse('-1 + + -2 - - +3');
    expect(ast1.toString()).toEqual('((0 - 1) + 2)');
    expect(ast2.toString()).toEqual('((0 - 1) + (0 - 2))');
    expect(ast3.toString()).toEqual('(3 - (0 - (0 - 1)))');
    expect(ast4.toString()).toEqual('(((0 - 1) + (0 + (0 - 2))) - (0 - (0 + 3)))');
  });
});
