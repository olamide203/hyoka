import { describe, expect, it } from 'vitest';
import { TreeNode, Modulo } from '../../../src/nodes';

const a = new TreeNode('10');
const b = new TreeNode('3');

describe('Modulo', () => {
  it('can print out its abstract syntax tree', () => {
    expect(new Modulo(a, b).toString()).toEqual('(10 % 3)');
  });
  it('can evaluate itself', () => {
    expect(new Modulo(a, b).evaluate()).toEqual('1');
  });
});
