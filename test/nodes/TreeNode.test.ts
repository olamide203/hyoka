import { describe, expect, it } from 'vitest';
import TreeNode from '../../src/nodes/TreeNode';

describe('TreeNode', () => {
  it('can print out a correct representation of itself', () => {
    expect(new TreeNode('1').toString()).toEqual('1');
  });
  it('can evaluate itself', () => {
    expect(new TreeNode('1').evaluate()).toEqual('1');
  });
});
