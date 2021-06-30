# [@svgv/core](https://github.com/marella/svgv/tree/main/packages/core) [![tests](https://github.com/marella/svgv/actions/workflows/tests.yml/badge.svg)](https://github.com/marella/svgv/actions/workflows/tests.yml) [![Coverage Status](https://coveralls.io/repos/github/marella/svgv/badge.svg)](https://coveralls.io/github/marella/svgv)

Node.js API to transform SVGs into Vue components.

> For webpack loader, see [`@svgv/webpack`](https://www.npmjs.com/package/@svgv/webpack)

## Installation

```sh
npm install @svgv/core
```

## Usage

```js
const { transform } = require('@svgv/core');

const code = await transform(svg, config, state);
```

## License

[MIT](https://github.com/marella/svgv/blob/main/packages/core/LICENSE)
