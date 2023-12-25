import {
  describe, expect, it,
} from 'vitest';
import TreeNode from '../../../src/nodes/TreeNode';
import { Expression } from '../../../src/Expression';
import NaturalLog from '../../../src/nodes/Functions/NaturalLog';

const a = new TreeNode('2');

describe('NaturalLog', () => {
  it('can print out the abstract syntax tree', () => {
    expect(new NaturalLog(a).toString()).toEqual('ln(2)');
  });
  it('can evaluate the abstract syntax tree', () => {
    Expression.config({ precision: 3 });
    expect(new NaturalLog(a).evaluate()).toEqual('0.69314718055994530942');
    expect(new Expression('ln(1)').evaluate()).toEqual('0');
    expect(new Expression('ln(2π)').evaluate()).toEqual('1.84');
    expect(new Expression('ln(ln(1))').evaluate()).toEqual('-Infinity');
  });
});
