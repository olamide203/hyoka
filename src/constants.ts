import { ITreeNode } from './nodes/TreeNode';
import Add from './nodes/Add';
import Subtract from './nodes/Subtract';
import Multiply from './nodes/Multiply';
import Divide from './nodes/Divide';
import Power from './nodes/Power';
import Sine from './nodes/Sine';
import Pi from './nodes/Pi';
import Gammln from './nodes/Gammln';
import Factorial from './nodes/Factorial';

interface IOperator {
    [key:string]: number
}

export const BINARY_NODE_MAP:{[key:string]:Function} = {
  '+': (x:ITreeNode, y:ITreeNode) => new Add(x, y),
  '-': (x:ITreeNode, y:ITreeNode) => new Subtract(x, y),
  '*': (x:ITreeNode, y:ITreeNode) => new Multiply(x, y),
  '/': (x:ITreeNode, y:ITreeNode) => new Divide(x, y),
  '^': (x:ITreeNode, y:ITreeNode) => new Power(x, y),
};

export const UNARY_NODE_MAP:{[key:string]:(x:ITreeNode)=>ITreeNode} = {
  '-': (x:ITreeNode) => new Subtract(x),
  '+': (x:ITreeNode) => new Add(x),
  '!': (x:ITreeNode) => new Factorial(x),
};

export const FUNC_NODE_MAP:{[key:string]:(x:ITreeNode)=>ITreeNode} = {
  sin: (x:ITreeNode) => new Sine(x),
  gammln: (x:ITreeNode) => new Gammln(x),
};

export const UNARY_OPERATOR_PREC:IOperator = {
  '-': 4,
  '+': 4,
  '!': 5,
};

export const BINARAY_OPERATOR_PREC:IOperator = {
  '+': 1,
  '-': 1,
  '*': 2,
  '/': 2,
  '^': 3,
};

export const CONSTANT_NODES:{[key:string]:()=>ITreeNode} = {
  pi: () => new Pi(),
  π: () => new Pi(),
};
