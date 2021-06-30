const path = require('path');
const { promisify } = require('util');
const webpack = require('webpack');
const { createFsFromVolume, Volume } = require('memfs');
const VueLoaderPlugin = require('vue-loader/dist/plugin.js').default;

/**
 * @see https://webpack.js.org/contribute/writing-a-loader/
 * @see https://github.com/marella/new-url-loader/blob/main/test/utils.js
 */
const compile = async (entry, loaders) => {
  entry = `./fixtures/${entry}`;
  const compiler = webpack({
    mode: 'production',
    context: __dirname,
    entry,
    module: {
      rules: [
        {
          test: /\.vue$/,
          loader: 'vue-loader',
        },
        {
          test: /\.svg$/,
          use: loaders,
        },
      ],
    },
    plugins: [new VueLoaderPlugin()],
  });

  compiler.outputFileSystem = createFsFromVolume(new Volume());
  compiler.outputFileSystem.join = path.join.bind(path); // Support webpack 4

  const run = promisify(compiler.run.bind(compiler));
  const stats = await run();
  if (stats.hasErrors()) {
    throw new CompileError(stats.toJson().errors);
  }
  return stats
    .toJson({ source: true })
    .modules.find(({ name }) => name.startsWith(entry))
    .modules.filter(
      ({ name }) =>
        name === entry ||
        name.indexOf('templateLoader') !== -1 ||
        name.indexOf('url-loader') !== -1 ||
        name.indexOf('file-loader') !== -1
    )
    .map(({ source }) => source);
};

/**
 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error#custom_error_types
 * @see https://stackoverflow.com/a/32750746
 */
class CompileError extends Error {
  constructor(errors, ...params) {
    super(...params);
    this.name = this.constructor.name;
    this.errors = errors;
  }
}

module.exports = {
  compile,
  CompileError,
};
