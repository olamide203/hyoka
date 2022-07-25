import TreeNode from './TreeNode';
import Divide from './Divide';
import Power from './Power';

const a = new TreeNode('0');
const b = new TreeNode('0.5');
const c = new TreeNode('1');
const d = new TreeNode('2');
const e = new TreeNode('3');

export const QUADRANT_SIGNS = {
  sin: ['', '', '-', '-'],
  cos: ['', '-', '-', ''],
  tan: ['', '-', '', '-'],
};

export const SPECIAL_ANGLES = {
  sin: {
    0: a,
    30: b,
    45: new Divide(c, new Power(d, b)),
    60: new Divide(new Power(e, b), d),
    90: c,
  },
  cos: {
    0: c,
    30: new Divide(new Power(e, b), d),
    45: new Divide(new Power(d, b), d),
    60: b,
    90: a,
  },
  tan: {
    0: a,
    30: new Divide(c, new Power(e, b)),
    45: c,
    60: new Power(e, b),
    90: new TreeNode('Infinity'),
  },
};
