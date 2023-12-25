import { describe, expect, it } from 'vitest';
import { Expression } from '../src/Expression';

describe('Expression', () => {
  it('can evaluate an expression using global configs', () => {
    Expression.config({ decimalPlaces: 2 });
    const expr = new Expression('1/3');
    expect(expr.evaluate()).toEqual('0.33');
  });
  it('can evaluate an expression using local configs', () => {
    Expression.config({ decimalPlaces: 3 });
    const expr = new Expression('1/3');
    expect(expr.evaluate({ decimalPlaces: 3 })).toEqual('0.333');
  });
});
