# MathExpression
[![Version](https://img.shields.io/npm/v/@olamide203/math-expression.svg)](https://www.npmjs.com/package/@olamide203/math-expression) [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://github.com/olamide203/math-expression/blob/main/LICENSE) [![GitHub release (latest by date)](https://img.shields.io/github/v/release/olamide203/math-expression?)](https://github.com/olamide203/math-expression/releases) [![Build Status](https://github.com/olamide203/math-expression/workflows/CI/badge.svg)](https://github.com/olamide203/math-expression/actions)


<!-- description -->
MathExpression is a simple math expression parser and evaluator for JavaScript and TypeScript.


## Usage

MathExpression can be used in both node.js and in the browser.

Install via [npm](https://www.npmjs.com/package/mathjs):

    npm install @olamide203/math-expression

```js
import MathExpression from '@olamide203/math-expression';

const x = new MathExpression('0.1 + 0.2');
x.evaluate(); // 0.3

const y = new MathExpression('cos(sin(π))')
y.evaluate(); // 0
```
