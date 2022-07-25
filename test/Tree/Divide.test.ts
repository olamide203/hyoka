import { describe, expect, it } from 'vitest';
import TreeNode from '../../src/nodes/TreeNode';
import Divide from '../../src/nodes/Divide';

const a = new TreeNode('4');
const b = new TreeNode('2');
const c = new TreeNode('3');
const d = new TreeNode('6');
const e = new Divide(a, b);
const f = new Divide(c, d);

describe('Divide', () => {
  it('can print out its abstract syntax tree', () => {
    expect(new Divide(a, b).toString()).toEqual('(4 / 2)');
    expect(new Divide(a, c).toString()).toEqual('(4 / 3)');
    expect(new Divide(a, d).toString()).toEqual('(4 / 6)');
    expect(new Divide(e, c).toString()).toEqual('((4 / 2) / 3)');
    expect(new Divide(e, d).toString()).toEqual('((4 / 2) / 6)');
    expect(new Divide(f, e).toString()).toEqual('((3 / 6) / (4 / 2))');
  });

  it('can evaluate itself', () => {
    expect(new Divide(a, b).evaluate()).toEqual('2');
    expect(new Divide(a, c).evaluate()).toEqual('1.3333333333333333333');
    expect(new Divide(d, a).evaluate()).toEqual('1.5');
    expect(new Divide(c, e).evaluate()).toEqual('1.5');
    expect(new Divide(d, e).evaluate()).toEqual('3');
    expect(new Divide(f, e).evaluate()).toEqual('0.25');
  });
});
