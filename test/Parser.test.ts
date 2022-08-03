import { describe, expect, it } from 'vitest';
import Parser from '../src/Parser';

describe('Parser', () => {
  it('can parse a simple expression', () => {
    const parser = new Parser();
    const ast = parser.parse('1 + 2');
    expect(ast.toString()).toEqual('(1 + 2)');
  });
});
