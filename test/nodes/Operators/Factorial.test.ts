import { describe, expect, it } from 'vitest';
import { Factorial, TreeNode } from '../../../src/nodes';

const a = new TreeNode('4');
const b = new TreeNode('4.5');
describe('Factorial', () => {
  it('can print out its abstract syntax tree', () => {
    expect(new Factorial(a).toString()).toEqual('(4)!');
    expect(new Factorial(b).toString()).toEqual('(4.5)!');
  });
  it('can evaluate itself', () => {
    expect(new Factorial(a).evaluate()).toEqual('24');
    expect(new Factorial(b).evaluate().slice(0, 11)).toEqual('52.34277778');
  });
});
