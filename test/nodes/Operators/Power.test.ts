import { describe, expect, it } from 'vitest';
import { Power, TreeNode } from '../../../src/nodes';

const a = new TreeNode('2');
const b = new TreeNode('3');

describe('Power', () => {
  it('can print out its abstract syntax tree', () => {
    expect(new Power(a, b).toString()).toEqual('(2 ^ 3)');
  });
  it('can evaluate itself', () => {
    expect(new Power(a, b).evaluate()).toEqual('8');
  });
});
