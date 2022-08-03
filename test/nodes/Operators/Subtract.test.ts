import { describe, expect, it } from 'vitest';
import TreeNode from '../../../src/nodes/TreeNode';
import Subtract from '../../../src/nodes/Operators/Subtract';

const a = new TreeNode('4');
const b = new TreeNode('2');
const c = new TreeNode('3');
const d = new TreeNode('6');
const e = new Subtract(a, b);
const f = new Subtract(c, d);
describe('Subtract', () => {
  it('can print out the abstract syntax tree', () => {
    expect(new Subtract(a).toString()).toEqual('(0 - 4)');
    expect(new Subtract(a, b).toString()).toEqual('(4 - 2)');
    expect(new Subtract(a, c).toString()).toEqual('(4 - 3)');
    expect(new Subtract(a, d).toString()).toEqual('(4 - 6)');
    expect(new Subtract(e, c).toString()).toEqual('((4 - 2) - 3)');
    expect(new Subtract(e, d).toString()).toEqual('((4 - 2) - 6)');
    expect(new Subtract(f, e).toString()).toEqual('((3 - 6) - (4 - 2))');
  });

  it('can evaluate the abstract syntax tree', () => {
    expect(new Subtract(a).evaluate()).toEqual('-4');
    expect(new Subtract(a, b).evaluate()).toEqual('2');
    expect(new Subtract(a, c).evaluate()).toEqual('1');
    expect(new Subtract(a, d).evaluate()).toEqual('-2');
    expect(new Subtract(e, c).evaluate()).toEqual('-1');
    expect(new Subtract(e, d).evaluate()).toEqual('-4');
    expect(new Subtract(f, e).evaluate()).toEqual('-5');
  });
});
