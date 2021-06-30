# [@svgv/webpack](https://github.com/marella/svgv/tree/main/packages/webpack) [![tests](https://github.com/marella/svgv/actions/workflows/tests.yml/badge.svg)](https://github.com/marella/svgv/actions/workflows/tests.yml) [![Coverage Status](https://coveralls.io/repos/github/marella/svgv/badge.svg)](https://coveralls.io/github/marella/svgv)

Webpack loader to transform SVGs into Vue components.

## Installation

```sh
npm install @svgv/webpack --save-dev
```

## Usage

**webpack.config.js**

```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.svg$/,
        use: ['vue-loader', '@svgv/webpack'],
      },
    ],
  },
};
```

<details>
<summary><strong>vue.config.js</strong></summary><br>

```js
module.exports = {
  chainWebpack: (config) => {
    const svgRule = config.module.rule('svg');
    svgRule.uses.clear();
    svgRule
      .use('vue-loader')
      .loader('vue-loader')
      .end()
      .use('@svgv/webpack')
      .loader('@svgv/webpack')
      .end();
  },
};
```

</details>
<p></p>

**App.vue**

```html
<template>
  <div>
    <Star />
  </div>
</template>

<script>
import Star from './star.svg';

export default {
  components: {
    Star,
  },
};
</script>
```

### Using with `url-loader` or `file-loader`

> **Note:** This is an experimental feature.

**webpack.config.js**

```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.svg$/,
        use: ['vue-loader', '@svgv/webpack', 'url-loader'],
      },
    ],
  },
};
```

<details>
<summary><strong>vue.config.js</strong></summary><br>

```js
module.exports = {
  chainWebpack: (config) => {
    const svgRule = config.module.rule('svg');
    svgRule.uses.clear();
    svgRule
      .use('vue-loader')
      .loader('vue-loader')
      .end()
      .use('@svgv/webpack')
      .loader('@svgv/webpack')
      .end()
      .use('url-loader')
      .loader('url-loader')
      .end();
  },
};
```

</details>
<p></p>

**App.vue**

```html
<template>
  <div>
    <img :src="Star" />
    <Star />
  </div>
</template>

<script>
import Star from './star.svg';

export default {
  components: {
    Star,
  },
  data() {
    return {
      Star,
    };
  },
};
</script>
```

## Examples

See [examples](https://github.com/marella/svgv/tree/main/packages/webpack/examples).

## License

[MIT](https://github.com/marella/svgv/blob/main/packages/webpack/LICENSE)
