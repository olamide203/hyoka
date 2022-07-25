import { ITreeNode } from './nodes/TreeNode';
import Add from './nodes/Add';
import Subtract from './nodes/Subtract';
import Multiply from './nodes/Multiply';
import Divide from './nodes/Divide';
import Power from './nodes/Power';
import Sine from './nodes/Sine';
import Pi from './nodes/Pi';

export const BINARY_NODE_MAP = {
  '+': (x:ITreeNode, y:ITreeNode) => new Add(x, y),
  '-': (x:ITreeNode, y:ITreeNode) => new Subtract(x, y),
  '*': (x:ITreeNode, y:ITreeNode) => new Multiply(x, y),
  '/': (x:ITreeNode, y:ITreeNode) => new Divide(x, y),
  '^': (x:ITreeNode, y:ITreeNode) => new Power(x, y),
};

export const UNARY_NODE_MAP = {
  '-': (x:ITreeNode) => new Subtract(x),
  '+': (x:ITreeNode) => new Add(x),
};

export const FUNC_NODE_MAP = {
  sin: (x:ITreeNode) => new Sine(x),
};

export const UNARY_OPERATOR_PREC = {
  '-': 4,
  '+': 4,
};

export const BINARAY_OPERATOR_PREC = {
  '+': 1,
  '-': 1,
  '*': 2,
  '/': 2,
  '^': 3,
};

export const CONSTANT_NODES = {
  pi: new Pi(),
  π: new Pi(),
};
