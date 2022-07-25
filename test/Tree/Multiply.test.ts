import { describe, expect, it } from 'vitest';
import TreeNode from '../../src/nodes/TreeNode';
import Multiply from '../../src/nodes/Multiply';

const a = new TreeNode('4');
const b = new TreeNode('2');
const c = new TreeNode('3');
const d = new TreeNode('6');
const e = new Multiply(a, b);
const f = new Multiply(c, d);

describe('Multiply', () => {
  it('can print out its abstract syntax tree', () => {
    expect(new Multiply(a, b).toString()).toEqual('(4 * 2)');
    expect(new Multiply(a, c).toString()).toEqual('(4 * 3)');
    expect(new Multiply(a, d).toString()).toEqual('(4 * 6)');
    expect(new Multiply(e, c).toString()).toEqual('((4 * 2) * 3)');
    expect(new Multiply(e, d).toString()).toEqual('((4 * 2) * 6)');
    expect(new Multiply(f, e).toString()).toEqual('((3 * 6) * (4 * 2))');
  });

  it('can evaluate itself', () => {
    expect(new Multiply(a, b).evaluate()).toEqual('8');
    expect(new Multiply(a, c).evaluate()).toEqual('12');
    expect(new Multiply(a, d).evaluate()).toEqual('24');
    expect(new Multiply(e, c).evaluate()).toEqual('24');
    expect(new Multiply(e, d).evaluate()).toEqual('48');
    expect(new Multiply(f, e).evaluate()).toEqual('144');
  });
});
