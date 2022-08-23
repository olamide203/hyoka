# MathExpression
[![Version](https://img.shields.io/npm/v/@olamide203/math-expression.svg)](https://www.npmjs.com/package/@olamide203/math-expression) [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://github.com/olamide203/math-expression/blob/main/LICENSE) [![GitHub release (latest by date)](https://img.shields.io/github/v/release/olamide203/math-expression?)](https://github.com/olamide203/math-expression/releases) [![Build Status](https://github.com/olamide203/math-expression/workflows/CI/badge.svg)](https://github.com/olamide203/math-expression/actions)


<!-- description -->
MathExpression is a simple math expression parser and evaluator for JavaScript and TypeScript.

## Features
- supports implicit multiplication and parenthesis grouping
- Binary and unary operators are supported
- supports mathematical functions
- Precision and rounding mode can be configured
## Installation

MathExpression can be used in both node.js and in the browser.

Install via [npm](https://www.npmjs.com/package/@olamide203/math-expression):

```bash
npm install @olamide203/math-expression
```
## Usage

```js
import MathExpression from '@olamide203/math-expression';

new MathExpression('0.1 + 0.2').evaluate(); // 0.3
new MathExpression('2 * 6 / 3').evaluate(); // 4

// using unary prefix operators
new MathExpression('- 1 + 2').evaluate(); // 1
new MathExpression('+ 1 - - 2').evaluate(); // 3

// implicit multiplication
new MathExpression('2(6 / 3)').evaluate(); // 4

//Trig Functions
new MathExpression('sin(π)').evaluate(); // 0
new MathExpression('cos(pi / 2)').evaluate(); // -0.5

// Even more complex expressions
new MathExpression('2(4(6 / 3 + 2) + 2^3 / - 2(2.5!))').evaluate(); //5.413192236417259652
```
