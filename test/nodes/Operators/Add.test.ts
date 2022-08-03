import {
  beforeEach, describe, expect, it,
} from 'vitest';
import TreeNode from '../../../src/nodes/TreeNode';
import Add from '../../../src/nodes/Operators/Add';

describe('Add', () => {
  let node: TreeNode;
  beforeEach(() => {
    const a = new TreeNode('1');
    const b = new TreeNode('2');
    node = new Add(a, b);
  });
  it('can print out the abstract syntax tree', () => {
    expect(node.toString()).toEqual('(1 + 2)');
  });
  it('can evaluate the abstract syntax tree', () => {
    expect(node.evaluate()).toEqual('3');
  });
});
