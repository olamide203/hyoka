import { ITreeNode } from '../nodes/TreeNode';
import * as Nodes from '../nodes';

interface IOperator {
    [key:string]: number
}

export const BINARY_NODE_MAP:{[key:string]:(x:ITreeNode, y:ITreeNode)=>ITreeNode} = {
  '+': (x:ITreeNode, y:ITreeNode) => new Nodes.Add(x, y),
  '*': (x:ITreeNode, y:ITreeNode) => new Nodes.Multiply(x, y),
  '-': (x:ITreeNode, y:ITreeNode) => new Nodes.Subtract(x, y),
  '/': (x:ITreeNode, y:ITreeNode) => new Nodes.Divide(x, y),
  '^': (x:ITreeNode, y:ITreeNode) => new Nodes.Power(x, y),
  '%': (x:ITreeNode, y:ITreeNode) => new Nodes.Modulo(x, y),
};

export const UNARY_NODE_MAP:{[key:string]:(x:ITreeNode)=>ITreeNode} = {
  '-': (x:ITreeNode) => new Nodes.Subtract(x),
  '+': (x:ITreeNode) => new Nodes.Add(x),
  '!': (x:ITreeNode) => new Nodes.Factorial(x),
};

export const FUNC_NODE_MAP:{[key:string]:(x:ITreeNode[])=>ITreeNode} = {
  sin: (x:ITreeNode[]) => new Nodes.Sine(...x),
  gammln: (x:ITreeNode[]) => new Nodes.Gammln(...x),
  cos: (x:ITreeNode[]) => new Nodes.Cosine(...x),
  max: (x:ITreeNode[]) => new Nodes.Max(...x),
  min: (x:ITreeNode[]) => new Nodes.Min(...x),
  tan: (x:ITreeNode[]) => new Nodes.Tan(...x),
  asin: (x:ITreeNode[]) => new Nodes.Asin(...x),
  acos: (x:ITreeNode[]) => new Nodes.Acos(...x),
  atan: (x:ITreeNode[]) => new Nodes.Atan(...x),
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
  '%': 2,
  '^': 3,
};
