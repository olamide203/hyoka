# hyoka
[![Version](https://img.shields.io/npm/v/@olamide203/hyoka.svg)](https://www.npmjs.com/package/@olamide203/hyoka) [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://github.com/olamide203/hyoka/blob/main/LICENSE) [![GitHub release (latest by date)](https://img.shields.io/github/v/release/olamide203/hyoka?)](https://github.com/olamide203/hyoka/releases) [![Build Status](https://github.com/olamide203/hyoka/workflows/CI/badge.svg)](https://github.com/olamide203/hyoka/actions)


<!-- description -->
hyoka is a simple math expression parser and evaluator for JavaScript and TypeScript. it uses [decimal.js](https://mikemcl.github.io/decimal.js/) to ensure precision of floating point calculations.

## Features
- Supports implicit multiplication and parenthesis grouping
- Binary and unary operators are supported
- Supports mathematical functions
- Precision and rounding mode can be configured
## Installation

MathExpression can be used in both node.js and in the browser.

Using [npm](https://www.npmjs.com/package/@olamide203/hyoka):

```bash
npm install @olamide203/hyoka
```

Using [yarn](https://yarnpkg.com/en/package/@olamide203/hyoka):

```bash
yarn add @olamide203/hyoka
```

Load the library in the browser:
- UMD
```html
<script src="https://cdn.jsdelivr.net/npm/@olamide203/hyoka@0.1.1/dist/umd/mathExpression.js"></script>
```
- ESM
```html
<script src="https://cdn.jsdelivr.net/npm/@olamide203/hyoka@0.1.1/dist/esm/mathExpression.js" type="module"></script>
```


## Usage

```js
import MathExpression from 'hyoka';

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
