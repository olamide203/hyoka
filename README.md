<p align="center">
  <img src="https://raw.githubusercontent.com/olamide203/hyoka/520a6acfac8c05aceaf2c58898c977ffc06e5d55/.github/assets/logo.svg" alt="hyoka" height="200"/>
</p>

<p align="center">
  <a href="https://www.npmjs.com/package/hyoka" target="_blank">
  <img src="https://img.shields.io/npm/v/hyoka.svg" alt="Version"/>
  </a>
  <a href="https://github.com/olamide203/hyoka/blob/main/LICENSE" target="_blank">
  <img src="https://img.shields.io/badge/License-MIT-yellow.svg" alt="License"/>
  </a>
  <a href="https://github.com/olamide203/hyoka/releases" target="_blank">
  <img src="https://img.shields.io/github/v/release/olamide203/hyoka?" alt=""/>
  </a>
    <a href="https://github.com/olamide203/hyoka/actions" target="_blank">
  <img src="https://github.com/olamide203/hyoka/workflows/CI/badge.svg" alt=""/>
  </a>
  <a href="http://commitizen.github.io/cz-cli/" target="_blank">
  <img src="https://img.shields.io/badge/commitizen-friendly-brightgreen.svg" alt=""/>
  </a>
</p>

<!-- description -->
# hyoka
hyoka is a simple math expression parser and evaluator for JavaScript and TypeScript. it uses [decimal.js](https://mikemcl.github.io/decimal.js/) to ensure precision of floating point calculations.

## Features
- Supports implicit multiplication and parenthesis grouping
- Binary and unary operators are supported
- Supports mathematical functions
- Precision and rounding mode can be configured
## Installation

This library can be used in both node.js and in the browser.

Using [npm](https://www.npmjs.com/package/@olamide203/hyoka):

```bash
npm install hyoka
```

Using [yarn](https://yarnpkg.com/en/package/@olamide203/hyoka):

```bash
yarn add hyoka
```

in the browser:
- UMD
```html
<script src="https://cdn.jsdelivr.net/npm/hyoka@latest/dist/umd/hyoka.js"></script>
```
- ESM
```html
<script src="https://cdn.jsdelivr.net/npm/hyoka@latest/dist/esm/hyoka.mjs" type="module"></script>
```


## Usage

```js
// using ES6 import
import {Expression} from 'hyoka';
// or using require
const { Expression } = require('hyoka');
```

```js
new Expression('0.1 + 0.2').evaluate(); // 0.3
new Expression('2 * 6 / 3').evaluate(); // 4

// using unary prefix operators
new Expression('- 1 + 2').evaluate(); // 1
new Expression('+ 1 - - 2').evaluate(); // 3

// implicit multiplication
new Expression('2(6 / 3)').evaluate(); // 4

//Trig Functions
new Expression('sin(π)').evaluate(); // 0
new Expression('cos(pi / 2)').evaluate(); // -0.5

// Even more complex expressions
new Expression('2(4(6 / 3 + 2) + 2^3 / - 2(2.5!))').evaluate(); //5.413192236417259652
```
## Configuration

hyoka configuration extends that of [decimal.js](https://mikemcl.github.io/decimal.js/). this means that all configuration options of decimal.js are available. the following configuration options are available:
- `precision`: the number of digits of precision to use
- `rounding`: the rounding mode to use
- `modulo`: the modulo to use
- `toExpNeg`: the exponent of 10 to use for negative zero
- `toExpPos`: the exponent of 10 to use for positive zero
- `minE`: the minimum exponent value
- `maxE`: the maximum exponent value
- `crypto`: whether to use the crypto module for random number generation
- `angles`: the unit of angles to use for trig functions
- `decimalPlaces`: the number of decimal places of returned value
  
The config options can be set using the `config` method on the `Expression` class:


```js
import {Expression} from 'hyoka';
Expression.config({
  precision: 20,
  rounding: 4,
  angles: 'degrees'
});

new Expression('sin(30)').evaluate(); // 0.5
```

config options can also be passed to the `evaluate` method. this will override the global config options for that evaluation only:

```js
import {Expression} from 'hyoka';
Expression.config({
  precision: 20,
  rounding: 4,
  angles: 'degrees'
});

// using local config options
new Expression('sin(π/6)').evaluate({angles: 'radians'}); // 0.5
new Expression('1/3').evaluate({decimalPlaces: 3}); // 0.333

// using global config options
new Expression('sin(30)').evaluate(); // 0.5
```
## Supported Operators
<table>
  <tr>
    <th>Operator</th>
    <th>Description</th>
    <th>type</th>
    <th>Associativity</th>
  </tr>
  <tr>
    <td>+</td>
    <td>Addition</td>
    <td>Binary Infix</td>
    <td>Left</td>
  </tr>
  <tr>
    <td>-</td>
    <td>Subtraction</td>
    <td>Binary Infix</td>
    <td>Left</td>
  </tr>
  <tr>
    <td>*</td>
    <td>Multiplication</td>
    <td>Binary Infix</td>
    <td>Left</td>
  </tr>
  <tr>
    <td>/</td>
    <td>Division</td>
    <td>Binary Infix</td>
    <td>Left</td>
  </tr>
  <tr>
    <td>%</td>
    <td>Modulo</td>
    <td>Binary Infix</td>
    <td>Left</td>
  </tr>
  <tr>
    <td>^</td>
    <td>Exponentiation</td>
    <td>Binary Infix</td>
    <td>Right</td>
  </tr>
  <tr>
    <td>-</td>
    <td>Unary minus</td>
    <td>Unary Prefix</td>
    <td></td>
  </tr>
  <tr>
    <td>+</td>
    <td>Unary plus</td>
    <td>Unary Prefix</td>
    <td></td>
  </tr>
  <tr>
    <td>!</td>
    <td>Factorial</td>
    <td>Unary Postfix</td>
    <td></td>
  </tr>
</table>

## Supported Functions
<table>
  <tr>
    <th>Function</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>acos</td>
    <td>returns the inverse cosine of an expression</td>
  </tr>
  <tr>
    <td>asin</td>
    <td>returns the inverse sine of an expression</td>
  </tr>
  <tr>
    <td>atan</td>
    <td>returns the inverse tangent of an expression</td>
  </tr>
  <tr>
    <td>cos</td>
    <td>returns the cosine of an expression</td>
  </tr>
  <tr>
    <td>gammln</td>
    <td>returns the natural log of Γ(x) where x is a valid expression</td>
  </tr>
  <tr>
    <td>max</td>
    <td>returns the maximum value from a set of expressions</td>
  </tr>
  <tr>
    <td>min</td>
    <td>returns the minimum value from a set of expressions</td>
  </tr>
  <tr>
    <td>sin</td>
    <td>returns the sine of an expression</td>
  </tr>
  <tr>
    <td>tan</td>
    <td>returns the tangent of an expression</td>
  </tr>
  <tr>
    <td>ln</td>
    <td>returns the natural log of an expression</td>
  </tr>
</table>
